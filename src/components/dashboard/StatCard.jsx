import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({ title, value, change, icon: Icon, className }) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={cn(
      "rounded-xl bg-card p-6 shadow-card transition-all duration-200 hover:shadow-elevated animate-fade-in",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive && "text-success",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}>
              {isPositive && <TrendingUp className="h-4 w-4" />}
              {isNegative && <TrendingDown className="h-4 w-4" />}
              <span>{isPositive ? "+" : ""}{change}%</span>
              <span className="text-muted-foreground font-normal">vs last week</span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-6 w-6 text-accent-foreground" />
        </div>
      </div>
    </div>
  );
}

