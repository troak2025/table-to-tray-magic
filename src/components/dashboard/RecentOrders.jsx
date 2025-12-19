import { Clock, CheckCircle, ChefHat, Utensils } from "lucide-react";
import styles from "./RecentOrders.module.css";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: styles.statusPending },
  confirmed: { label: "Confirmed", icon: CheckCircle, className: styles.statusConfirmed },
  preparing: { label: "Preparing", icon: ChefHat, className: styles.statusPreparing },
  ready: { label: "Ready", icon: Utensils, className: styles.statusReady },
  served: { label: "Served", icon: CheckCircle, className: styles.statusServed },
  completed: { label: "Completed", icon: CheckCircle, className: styles.statusCompleted },
  cancelled: { label: "Cancelled", icon: Clock, className: styles.statusCancelled },
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
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Orders</h2>
        <a href="/orders" className={styles.viewAll}>
          View all
        </a>
      </div>

      <div className={styles.ordersList}>
        {mockOrders.map((order, index) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={order.id}
              className={styles.orderItem}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={styles.orderInfo}>
                <div className={styles.tableNumber}>
                  {order.tableNumber ? `T${order.tableNumber}` : "🛒"}
                </div>
                <div className={styles.orderDetails}>
                  <h4>{order.id}</h4>
                  <p>
                    {order.tableNumber ? `Table ${order.tableNumber}` : order.customerName}
                    {" · "}
                    {formatTime(order.createdAt)}
                  </p>
                </div>
              </div>

              <div className={styles.orderActions}>
                <span className={`${styles.statusBadge} ${config.className}`}>
                  <StatusIcon className={styles.statusIcon} />
                  {config.label}
                </span>
                <span className={styles.orderTotal}>
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
