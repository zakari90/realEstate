"use client";

import { useState, useEffect, useTransition } from "react";
import { Bell, X, Home, TrendingUp, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getAgentNotifications,
  markNotificationAsRead,
  clearAllNotifications,
  NotificationData,
} from "@/_actions/agent/notificationActions";

export function NotificationBell() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isPending, startTransition] = useTransition();

  // Fetch notifications on mount and when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getAgentNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = async (notification: NotificationData) => {
    // Mark as read
    startTransition(async () => {
      await markNotificationAsRead(notification.id);
      await fetchNotifications();
    });

    // Navigate to the entity
    if (notification.entityType === "PROPERTY") {
      router.push(`/properties/${notification.entityId}`);
    } else if (notification.entityType === "INVESTMENT") {
      router.push(`/investments/${notification.entityId}`);
    }

    setIsOpen(false);
  };

  const handleClearAll = async () => {
    startTransition(async () => {
      await clearAllNotifications();
      await fetchNotifications();
    });
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return d.toLocaleDateString("fr-FR");
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 hover:bg-white transition-all duration-200 group"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-slate-700 group-hover:text-teal-600 transition-colors" />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-full shadow-lg animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
              <h3 className="font-semibold text-lg">اشعارات</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <Bell className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">لا يوجد اشعارات</p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-teal-50 ${
                        !notification.isRead ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 p-2 rounded-xl ${
                            notification.entityType === "PROPERTY"
                              ? "bg-gradient-to-br from-teal-500 to-emerald-600"
                              : "bg-gradient-to-br from-rose-500 to-pink-600"
                          }`}
                        >
                          {notification.entityType === "PROPERTY" ? (
                            <Home className="w-4 h-4 text-white" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm leading-snug ${
                              !notification.isRead
                                ? "font-medium text-slate-800"
                                : "text-slate-600"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>

                        {/* Unread Indicator */}
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer - Clear All */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={handleClearAll}
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "مسح الكل"
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
