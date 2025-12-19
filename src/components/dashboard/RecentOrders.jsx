import { Clock, CheckCircle, ChefHat, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  confirmed: { label: "Confirmed", icon: CheckCircle, className: "bg-primary/10 text-primary border-primary/20" },
  preparing: { label: "Preparing", icon: ChefHat, className: "bg-accent text-accent-foreground border-accent" },
  ready: { label: "Ready", icon: Utensils, className: "bg-success/10 text-success border-success/20" },
  served: { label: "Served", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  completed: { label: "Completed", icon: CheckCircle, className: "bg-muted text-muted-foreground border-muted" },
  cancelled: { label: "Cancelled", icon: Clock, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const mockOrders = [
  {
    id: "ORD-001",
    tableNumber: 5,
    status: "preparing",
    items: [],
    total: 45.99,
    createdAt: new Date(Date.now() - 15 * 60000),
    type: "dine-in",
  },
  {
    id: "ORD-002",
    status: "ready",
    items: [],
    total: 28.50,
    createdAt: new Date(Date.now() - 25 * 60000),
    customerName: "Sarah M.",
    type: "takeout",
  },
  {
    id: "ORD-003",
    tableNumber: 12,
    status: "pending",
    items: [],
    total: 67.25,
    createdAt: new Date(Date.now() - 5 * 60000),
    type: "dine-in",
  },
  {
    id: "ORD-004",
    status: "confirmed",
    items: [],
    total: 34.00,
    createdAt: new Date(Date.now() - 10 * 60000),
    customerName: "Online Order",
    type: "online",
  },
];

function formatTime(date) {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export function RecentOrders() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Recent Orders</h2>
        <a href="/orders" className="text-sm font-medium text-primary hover:underline">
          View all
        </a>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order, index) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-sm font-semibold text-foreground">
                  {order.tableNumber ? `T${order.tableNumber}` : "🛒"}
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.tableNumber ? `Table ${order.tableNumber}` : order.customerName}
                    {" · "}
                    {formatTime(order.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className={cn("gap-1", config.className)}>
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </Badge>
                <span className="font-semibold text-card-foreground">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

