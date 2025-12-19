import { useState } from "react";
import { Search, Filter, Clock, CheckCircle, ChefHat, Utensils, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import styles from "./Orders.module.css";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, bgClass: styles.bgWarning, textClass: styles.textWarning },
  confirmed: { label: "Confirmed", icon: CheckCircle, bgClass: styles.bgPrimary, textClass: styles.textPrimary },
  preparing: { label: "Preparing", icon: ChefHat, bgClass: styles.bgAccent, textClass: styles.textAccent },
  ready: { label: "Ready", icon: Utensils, bgClass: styles.bgSuccess, textClass: styles.textSuccess },
  served: { label: "Served", icon: Package, bgClass: styles.bgSuccess, textClass: styles.textSuccess },
  completed: { label: "Completed", icon: CheckCircle, bgClass: styles.bgMuted, textClass: styles.textMuted },
  cancelled: { label: "Cancelled", icon: Clock, bgClass: styles.bgDestructive, textClass: styles.textDestructive },
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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Orders</h1>
          <p>Manage and track all restaurant orders.</p>
        </div>
        <Button variant="outline" className={styles.filterButton}>
          <Filter className={styles.buttonIcon} />
          Filter
        </Button>
      </div>

      {/* Status Filters */}
      <div className={styles.filters}>
        <div className={styles.statusFilters}>
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`${styles.statusButton} ${selectedStatus === status ? styles.statusButtonActive : styles.statusButtonInactive}`}
            >
              {status === "all" ? "All Orders" : statusConfig[status].label}
            </button>
          ))}
        </div>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className={styles.ordersList}>
        {filteredOrders.map((order, index) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={order.id}
              className={styles.orderCard}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={styles.orderContent}>
                {/* Order Info */}
                <div className={styles.orderInfo}>
                  <div className={`${styles.statusIconWrapper} ${config.bgClass}`}>
                    <StatusIcon className={`${styles.statusIcon} ${config.textClass}`} />
                  </div>
                  <div className={styles.orderDetails}>
                    <h3>
                      {order.id}
                      <Badge variant="outline" className={styles.typeBadge}>
                        {order.type}
                      </Badge>
                    </h3>
                    <p>
                      {order.tableNumber ? `Table ${order.tableNumber}` : order.customerName}
                      {" · "}
                      {formatTime(order.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className={styles.orderItems}>
                  <p>
                    {order.items.map((item, i) => (
                      <span key={item.id}>
                        {item.quantity}x {item.menuItem.name}
                        {i < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Actions */}
                <div className={styles.orderActions}>
                  <span className={styles.orderTotal}>
                    ${order.total.toFixed(2)}
                  </span>
                  <Badge className={`${styles.statusBadge} ${config.bgClass} ${config.textClass}`}>
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
