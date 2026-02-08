import { TrendingUp, Eye, User } from "lucide-react";
import Link from "next/link";
import db from "@/db/db";
import { DeleteInvestmentButton } from "@/components/DeleteInvestmentButton";

async function getAllInvestments() {
  const investments = await db.investment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      agent: true,
      _count: {
        select: { offers: true, visitLogs: true },
      },
    },
  });
  return investments;
}

export default async function AdminInvestmentsPage() {
  const investments = await getAllInvestments();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              إدارة الاستثمارات
            </h1>
            <p className="text-slate-500">
              {investments.length} استثمار مسجل في النظام
            </p>
          </div>
        </div>
      </div>

      {/* Investments Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="text-right">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  العنوان
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  الوكيل
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  السعر الإجمالي
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  المساهمة
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  التقدم
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  الحالة
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {investments.length > 0 ? (
                investments.map((investment) => {
                  const progress =
                    investment.price && investment.acceptedContributions
                      ? Math.round(
                          (investment.acceptedContributions /
                            investment.price) *
                            100,
                        )
                      : 0;

                  return (
                    <tr
                      key={investment.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-800 dark:text-white">
                            {investment.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-300">
                            {investment.agent?.name || "غير معروف"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-teal-600">
                          {investment.price?.toLocaleString() || 0} د.م
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 dark:text-slate-300">
                          {investment.contribution?.toLocaleString() || 0} د.م
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[40px]">
                            {progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            investment.status
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {investment.status ? "نشط" : "مغلق"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/ar/investments/${investment.id}`}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                            title="عرض"
                          >
                            <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </Link>
                          <DeleteInvestmentButton
                            investmentId={investment.id}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    لا توجد استثمارات مسجلة في النظام
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
