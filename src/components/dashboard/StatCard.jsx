import { TrendingUp, TrendingDown } from "lucide-react";
import styles from "./StatCard.module.css";

export function StatCard({ title, value, change, icon: Icon, className }) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={`${styles.card} ${className || ""}`.trim()}>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <p className={styles.value}>{value}</p>
          {change !== undefined && (
            <div className={`${styles.change} ${isPositive ? styles.changePositive : isNegative ? styles.changeNegative : styles.changeNeutral}`.trim()}>
              {isPositive && <TrendingUp className={styles.changeIcon} />}
              {isNegative && <TrendingDown className={styles.changeIcon} />}
              <span>{isPositive ? "+" : ""}{change}%</span>
              <span className={styles.changeLabel}>vs last week</span>
            </div>
          )}
        </div>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} />
        </div>
      </div>
    </div>
  );
}
