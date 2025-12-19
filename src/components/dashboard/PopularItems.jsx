import { TrendingUp } from "lucide-react";
import styles from "./PopularItems.module.css";

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
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Selling Items</h2>
        <span className={styles.subtitle}>This week</span>
      </div>

      <div className={styles.itemsList}>
        {mockItems.map((item, index) => (
          <div 
            key={item.id} 
            className={styles.item}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className={styles.itemHeader}>
              <div className={styles.itemInfo}>
                <span className={styles.rank}>
                  {index + 1}
                </span>
                <span className={styles.itemName}>{item.name}</span>
              </div>
              <div className={styles.itemStats}>
                <span className={styles.ordersCount}>{item.orders} orders</span>
                <div className={`${styles.trend} ${item.trend > 0 ? styles.trendPositive : styles.trendNegative}`}>
                  <TrendingUp className={`${styles.trendIcon} ${item.trend < 0 ? styles.trendIconNegative : ""}`} />
                  <span>
                    {item.trend > 0 ? "+" : ""}{item.trend}%
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(item.orders / maxOrders) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
