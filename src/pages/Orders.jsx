import { useState } from "react";
import { Search, Filter, Clock, CheckCircle, ChefHat, Utensils, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "text-warning", bgClassName: "bg-warning/10" },
  confirmed: { label: "Confirmed", icon: CheckCircle, className: "text-primary", bgClassName: "bg-primary/10" },
  preparing: { label: "Preparing", icon: ChefHat, className: "text-accent-foreground", bgClassName: "bg-accent" },
  ready: { label: "Ready", icon: Utensils, className: "text-success", bgClassName: "bg-success/10" },
  served: { label: "Served", icon: Package, className: "text-success", bgClassName: "bg-success/10" },
  completed: { label: "Completed", icon: CheckCircle, className: "text-muted-foreground", bgClassName: "bg-muted" },
  cancelled: { label: "Cancelled", icon: Clock, className: "text-destructive", bgClassName: "bg-destructive/10" },
};

const statusFilters = ["all", "pending", "confirmed", "preparing", "ready", "completed"];

const mockOrders = [
  {
    id: "ORD-001",
    tableNumber: 5,
    status: "preparing",
    items: [
      { id: "1", menuItem: { id: "1", name: "Classic Burger", description: "", price: 14.99, category: "", available: true }, quantity: 2 },
      { id: "2", menuItem: { id: "2", name: "Caesar Salad", description: "", price: 11.99, category: "", available: true }, quantity: 1 },
    ],
    total: 41.97,
    createdAt: new Date(Date.now() - 15 * 60000),
    type: "dine-in",
  },
  {
    id: "ORD-002",
    status: "ready",
    items: [
      { id: "3", menuItem: { id: "3", name: "Margherita Pizza", description: "", price: 16.99, category: "", available: true }, quantity: 1 },
    ],
    total: 16.99,
    createdAt: new Date(Date.now() - 25 * 60000),
    customerName: "Sarah M.",
    type: "takeout",
  },
  {
    id: "ORD-003",
    tableNumber: 12,
    status: "pending",
    items: [
      { id: "4", menuItem: { id: "4", name: "Grilled Salmon", description: "", price: 24.99, category: "", available: true }, quantity: 2 },
      { id: "5", menuItem: { id: "5", name: "Tiramisu", description: "", price: 9.99, category: "", available: true }, quantity: 2 },
    ],
    total: 69.96,
    createdAt: new Date(Date.now() - 5 * 60000),
    type: "dine-in",
  },
  {
    id: "ORD-004",
    status: "confirmed",
    items: [
      { id: "6", menuItem: { id: "6", name: "Classic Burger", description: "", price: 14.99, category: "", available: true }, quantity: 1 },
      { id: "7", menuItem: { id: "7", name: "Fresh Lemonade", description: "", price: 4.99, category: "", available: true }, quantity: 2 },
    ],
    total: 24.97,
    createdAt: new Date(Date.now() - 10 * 60000),
    customerName: "Online Order",
    type: "online",
  },
  {
    id: "ORD-005",
    tableNumber: 8,
    status: "completed",
    items: [
      { id: "8", menuItem: { id: "8", name: "Pasta Carbonara", description: "", price: 15.99, category: "", available: true }, quantity: 3 },
    ],
    total: 47.97,
    createdAt: new Date(Date.now() - 60 * 60000),
    type: "dine-in",
  },
];

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function Orders() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage and track all restaurant orders.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                selectedStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {status === "all" ? "All Orders" : statusConfig[status].label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={order.id}
              className="rounded-xl bg-card p-6 shadow-card transition-all duration-200 hover:shadow-elevated animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Order Info */}
                <div className="flex items-start gap-4">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", config.bgClassName)}>
                    <StatusIcon className={cn("h-6 w-6", config.className)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-card-foreground">{order.id}</h3>
                      <Badge variant="outline" className="text-xs">
                        {order.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.tableNumber ? `Table ${order.tableNumber}` : order.customerName}
                      {" · "}
                      {formatTime(order.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 lg:px-6">
                  <p className="text-sm text-muted-foreground">
                    {order.items.map((item, i) => (
                      <span key={item.id}>
                        {item.quantity}x {item.menuItem.name}
                        {i < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-card-foreground">
                    ${order.total.toFixed(2)}
                  </span>
                  <Badge className={cn("gap-1", config.bgClassName, config.className, "border-0")}>
                    {config.label}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

