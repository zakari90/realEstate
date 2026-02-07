import { InvestmentDTO } from "@/_actions/client/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, MapPin, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ContactInvestor } from "./investmentContactDialog";

export interface PropertyInvestmentCardProps {
  id: string;
  title: string;
  description: string;
  price: number | undefined;
  contribution: number | undefined;
  numContributors: number;
  location: string;
  purpose: string;
  currentContribution: number;
}

export default function InvestmentCard({
  investment,
}: {
  investment: InvestmentDTO;
}) {
  // Unified theme for all investment cards: Rose/Pink gradient
  const backgroundColorClass = "from-rose-500 to-pink-600";

  return (
    <Card className="w-full h-full min-h-[320px] flex flex-col mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-none bg-white/80 backdrop-blur-sm shadow-md group">
      <div className="relative w-full h-36 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${backgroundColorClass} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
        ></div>

        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>

        <Link
          href={`/investments/${investment.id}`}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-inner">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-lg font-bold text-white leading-tight drop-shadow-sm line-clamp-2">
            {investment.title}
          </CardTitle>
        </Link>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center gap-2 text-rose-600/80 mb-3 text-xs font-medium uppercase tracking-wide">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{investment.location}</span>
        </div>

        <CardDescription className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {investment.description}
        </CardDescription>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-slate-400 font-medium mb-0.5">
                رأس المال المطلوب
              </p>
              <p className="text-lg font-bold text-slate-800 leading-none">
                {new Intl.NumberFormat("ar-MA", {
                  style: "currency",
                  currency: "MAD",
                  maximumFractionDigits: 0,
                }).format(investment.price || 0)}
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-rose-50 px-2.5 py-1.5 rounded-lg text-rose-700">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">
                {investment.numContributors}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardFooter className="p-4 pt-0 gap-3">
        <Button
          asChild
          variant="default" // Changed to default for better CTA
          size="sm"
          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
        >
          <Link href={`/investments/${investment.id}`}>التفاصيل</Link>
        </Button>
        <ContactInvestor investment={investment} />
      </CardFooter>
    </Card>
  );
}
