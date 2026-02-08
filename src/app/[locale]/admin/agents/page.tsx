import {
  Users,
  Mail,
  Phone,
  Building2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import db from "@/db/db";

async function getAllAgents() {
  const agents = await db.agent.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { properties: true, investments: true },
      },
    },
  });
  return agents;
}

export default async function AdminAgentsPage() {
  const agents = await getAllAgents();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              إدارة الوكلاء
            </h1>
            <p className="text-slate-500">
              {agents.length} وكيل مسجل في النظام
            </p>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow"
            >
              {/* Agent Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {agent.name?.charAt(0) || agent.email?.charAt(0) || "و"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 dark:text-white truncate">
                    {agent.name || "وكيل غير معروف"}
                  </h3>
                  <p className="text-sm text-slate-500 truncate">
                    {agent.email || "لا يوجد بريد إلكتروني"}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                {agent.email && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="truncate" dir="ltr">
                      {agent.email}
                    </span>
                  </div>
                )}
                {agent.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">{agent.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    انضم في{" "}
                    {new Date(agent.createdAt).toLocaleDateString("ar-MA")}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {agent._count.properties}
                    </p>
                    <p className="text-xs text-slate-500">عقار</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {agent._count.investments}
                    </p>
                    <p className="text-xs text-slate-500">استثمار</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            لا يوجد وكلاء مسجلين في النظام
          </div>
        )}
      </div>
    </div>
  );
}
