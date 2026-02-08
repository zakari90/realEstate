import {
  Building2,
  TrendingUp,
  Users,
  UserSquare2,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import db from "@/db/db";

async function getAdminStats() {
  const [propertiesCount, investmentsCount, agentsCount, clientsCount] =
    await Promise.all([
      db.property.count(),
      db.investment.count(),
      db.agent.count(),
      db.client.count(),
    ]);

  return {
    propertiesCount,
    investmentsCount,
    agentsCount,
    clientsCount,
  };
}

async function getRecentActivity() {
  const [recentProperties, recentInvestments, recentOffers] = await Promise.all(
    [
      db.property.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { agent: true },
      }),
      db.investment.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { agent: true },
      }),
      db.propertyOffer.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { client: true, property: true },
      }),
    ],
  );

  return { recentProperties, recentInvestments, recentOffers };
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const activity = await getRecentActivity();

  const statCards = [
    {
      title: "إجمالي العقارات",
      count: stats.propertiesCount,
      href: "/admin/properties",
      icon: Building2,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
    },
    {
      title: "إجمالي الاستثمارات",
      count: stats.investmentsCount,
      href: "/admin/investments",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      title: "الوكلاء المسجلين",
      count: stats.agentsCount,
      href: "/admin/agents",
      icon: Users,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-500/10 to-purple-500/10",
    },
    {
      title: "العملاء",
      count: stats.clientsCount,
      href: "/admin/clients",
      icon: UserSquare2,
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-500/10 to-pink-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم الإدارية 🎯</h1>
          <p className="text-teal-100 opacity-90">
            مرحباً بك في لوحة إدارة النظام - تحكم كامل في جميع البيانات
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="group block">
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgGradient} p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/50 dark:border-slate-700/50`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {card.title}
                    </p>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white">
                      {card.count}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform duration-300">
                  عرض التفاصيل
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              أحدث العقارات
            </h2>
          </div>
          <div className="space-y-4">
            {activity.recentProperties.length > 0 ? (
              activity.recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {property.address || "عنوان غير محدد"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {property.agent?.name || "وكيل غير معروف"}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-teal-600">
                      {property.price?.toLocaleString()} د.م
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(property.createdAt).toLocaleDateString("ar-MA")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">
                لا توجد عقارات بعد
              </p>
            )}
          </div>
        </div>

        {/* Recent Investments */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              أحدث الاستثمارات
            </h2>
          </div>
          <div className="space-y-4">
            {activity.recentInvestments.length > 0 ? (
              activity.recentInvestments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {investment.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {investment.agent?.name || "وكيل غير معروف"}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-emerald-600">
                      {investment.price?.toLocaleString()} د.م
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(investment.createdAt).toLocaleDateString(
                        "ar-MA",
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">
                لا توجد استثمارات بعد
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Offers */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
            <Activity className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            أحدث العروض
          </h2>
        </div>
        <div className="overflow-x-auto">
          {activity.recentOffers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-right border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-3 text-sm font-medium text-slate-500">
                    العميل
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-500">
                    العقار
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-500">
                    المبلغ
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-500">
                    التاريخ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activity.recentOffers.map((offer) => (
                  <tr key={offer.id}>
                    <td className="py-4 text-slate-800 dark:text-white">
                      {offer.client?.name || "غير معروف"}
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">
                      {offer.property?.address || "غير محدد"}
                    </td>
                    <td className="py-4 font-semibold text-teal-600">
                      {offer.amount.toLocaleString()} د.م
                    </td>
                    <td className="py-4 text-slate-500 text-sm">
                      {new Date(offer.createdAt).toLocaleDateString("ar-MA")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-slate-500 text-center py-4">لا توجد عروض بعد</p>
          )}
        </div>
      </div>
    </div>
  );
}
