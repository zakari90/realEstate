import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
}
