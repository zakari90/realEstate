import { UserSquare2, Mail, Phone, Calendar, DollarSign } from "lucide-react";
import db from "@/db/db";

async function getAllClients() {
  const clients = await db.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      offers: {
        include: {
          property: true,
        },
      },
      investmentOffer: {
        include: {
          investment: true,
        },
      },
    },
  });
  return clients;
}

export default async function AdminClientsPage() {
  const clients = await getAllClients();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg">
            <UserSquare2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              إدارة العملاء
            </h1>
            <p className="text-slate-500">
              {clients.length} عميل مسجل في النظام
            </p>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="text-right">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  الاسم
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  الهاتف
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  عرض العقار
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  عرض الاستثمار
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  تاريخ التسجيل
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold shadow">
                          {client.name?.charAt(0) || "ع"}
                        </div>
                        <span className="font-medium text-slate-800 dark:text-white">
                          {client.name || "عميل غير معروف"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span dir="ltr">{client.email || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span dir="ltr">{client.phone || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {client.offers ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-teal-500" />
                            <span className="font-semibold text-teal-600">
                              {client.offers.amount.toLocaleString()} د.م
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {client.offers.property?.address || "عقار غير محدد"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {client.investmentOffer ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                            <span className="font-semibold text-emerald-600">
                              {client.investmentOffer.amount.toLocaleString()}{" "}
                              د.م
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {client.investmentOffer.investment?.title ||
                              "استثمار غير محدد"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(client.createdAt).toLocaleDateString("ar-MA")}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    لا يوجد عملاء مسجلين في النظام
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
