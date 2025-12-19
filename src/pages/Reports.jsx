import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const weeklyData = [
  { day: "Mon", revenue: 2400, orders: 85 },
  { day: "Tue", revenue: 3200, orders: 112 },
  { day: "Wed", revenue: 2800, orders: 98 },
  { day: "Thu", revenue: 3600, orders: 134 },
  { day: "Fri", revenue: 4200, orders: 156 },
  { day: "Sat", revenue: 5100, orders: 189 },
  { day: "Sun", revenue: 4800, orders: 175 },
];

const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));

const topCategories = [
  { name: "Main Course", revenue: 12450, percentage: 45 },
  { name: "Appetizers", revenue: 5520, percentage: 20 },
  { name: "Beverages", revenue: 4140, percentage: 15 },
  { name: "Desserts", revenue: 3312, percentage: 12 },
  { name: "Other", revenue: 2208, percentage: 8 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track your restaurant's performance and insights.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          This Week
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weekly Revenue</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">$26,100</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+12.5% from last week</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <DollarSign className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">949</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+8.2% from last week</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <ShoppingBag className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">$27.50</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+3.8% from last week</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <BarChart3 className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Daily Revenue</h3>
          <div className="space-y-4">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex items-center gap-4">
                <span className="w-10 text-sm font-medium text-muted-foreground">{data.day}</span>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full gradient-warm rounded-lg transition-all duration-500"
                    style={{ 
                      width: `${(data.revenue / maxRevenue) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
                <span className="w-20 text-sm font-semibold text-card-foreground text-right">
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                    <span className="text-sm font-semibold text-card-foreground">
                      ${category.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      index === 0 ? "gradient-warm" : "bg-primary/60"
                    )}
                    style={{ 
                      width: `${category.percentage}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Hours */}
      <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Peak Hours Analysis</h3>
        <div className="flex items-end gap-2 h-48">
          {Array.from({ length: 12 }, (_, i) => {
            const hour = i + 11;
            const value = Math.random() * 80 + 20;
            const isPeak = hour >= 12 && hour <= 14 || hour >= 18 && hour <= 20;
            
            return (
              <div key={hour} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={cn(
                      "w-full rounded-t-lg transition-all duration-500",
                      isPeak ? "gradient-warm" : "bg-muted"
                    )}
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {hour > 12 ? `${hour - 12}pm` : hour === 12 ? "12pm" : `${hour}am`}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Peak hours are typically <span className="font-medium text-primary">12-2 PM</span> and <span className="font-medium text-primary">6-8 PM</span>
        </p>
      </div>
    </div>
  );
}

