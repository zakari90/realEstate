"use client";
import React from "react";

import { useOrganization, useSession, useUser } from "@clerk/nextjs";
import Image from "next/image";

function page() {
  return <UserDetails />;
}

export default page;

function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  if (!user || !session) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col gap-8">
        {/* Profile Header */}
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-100 p-8 md:p-12 overflow-visible mt-16">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-500 to-emerald-600"></div>

          <div className="relative flex flex-col md:flex-row items-end md:items-center gap-6 mt-4">
            <div className="relative -mt-16 md:-mt-0">
              <div className="p-1.5 rounded-full bg-white shadow-lg">
                <Image
                  width={160}
                  height={160}
                  src={user.imageUrl || ""}
                  className="size-32 md:size-40 rounded-full object-cover border-4 border-slate-50"
                  alt={"agent image"}
                />
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>

            <div className="flex-1 pb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-slate-500 font-medium text-lg flex items-center gap-2 mt-1">
                {user.emailAddresses[0]?.emailAddress}
              </p>
              <div className="flex gap-2 mt-4">
                <span className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-semibold border border-teal-100">
                  وكيل معتمد
                </span>
                <span className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full text-sm font-semibold border border-slate-200">
                  ID: {user.id.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Session Details */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                تفاصيل الجلسة
              </h2>
            </div>

            <div className="space-y-4">
              <Row desc="معرف الجلسة" value={session.id} />
              <Row desc="الحالة" value={session.status} />
              <Row
                desc="آخر نشاط"
                value={formatDateWithNumbers(session.lastActiveAt)}
              />
              <Row
                desc="انتهاء الصلاحية"
                value={formatDateWithNumbers(session.expireAt)}
              />
              <Row
                desc="آخر تسجيل دخول"
                value={formatDate(user.lastSignInAt!)}
              />
              <Row desc="تاريخ الانضمام" value={formatDate(user.createdAt!)} />
            </div>
          </div>

          {/* Organization Details */}
          {organization && (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M12 6h.01" />
                    <path d="M12 10h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 10h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 10h.01" />
                    <path d="M8 14h.01" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  تفاصيل المنظمة
                </h2>
              </div>
              <div className="space-y-4">
                <Row desc="اسم المنظمة" value={organization.name} />
                <Row desc="معرف المنظمة" value={organization.id} />
                <Row
                  desc="عدد الأعضاء"
                  value={String(organization.membersCount)}
                />
                <Row
                  desc="دعوات معلقة"
                  value={String(organization.pendingInvitationsCount)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ desc, value }: { desc: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
      <span className="text-sm font-semibold text-slate-700">{desc}</span>
      <span className="text-sm text-slate-500 font-mono truncate max-w-[200px] group-hover:text-slate-800 transition-colors bg-slate-100 px-2 py-1 rounded">
        {value}
      </span>
    </div>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateWithNumbers(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
