import { TrendingUp } from "lucide-react";

const mockItems = [
  { id: "1", name: "Classic Burger", orders: 156, revenue: 2184, trend: 12 },
  { id: "2", name: "Margherita Pizza", orders: 134, revenue: 1876, trend: 8 },
  { id: "3", name: "Caesar Salad", orders: 98, revenue: 1078, trend: 15 },
  { id: "4", name: "Grilled Salmon", orders: 87, revenue: 2175, trend: 5 },
  { id: "5", name: "Pasta Carbonara", orders: 76, revenue: 1140, trend: -3 },
];

export function PopularItems() {
  const maxOrders = Math.max(...mockItems.map(item => item.orders));

  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Top Selling Items</h2>
        <span className="text-sm text-muted-foreground">This week</span>
      </div>

      <div className="space-y-4">
        {mockItems.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="font-medium text-card-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{item.orders} orders</span>
                <div className="flex items-center gap-1 text-sm">
                  {item.trend > 0 ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-destructive rotate-180" />
                  )}
                  <span className={item.trend > 0 ? "text-success" : "text-destructive"}>
                    {item.trend > 0 ? "+" : ""}{item.trend}%
                  </span>
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-warm transition-all duration-500"
                style={{ width: `${(item.orders / maxOrders) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

