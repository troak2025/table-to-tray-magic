import { DollarSign, ShoppingBag, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { PopularItems } from "@/components/dashboard/PopularItems";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
        </div>
        <div className={styles.date}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Today's Revenue"
          value="$4,829"
          change={12.5}
          icon={DollarSign}
        />
        <StatCard
          title="Orders Today"
          value="156"
          change={8.2}
          icon={ShoppingBag}
        />
        <StatCard
          title="Active Orders"
          value="23"
          change={-3.1}
          icon={Clock}
        />
        <StatCard
          title="Avg. Order Value"
          value="$30.95"
          change={5.7}
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        <div>
          <RecentOrders />
        </div>
        <div>
          <PopularItems />
        </div>
      </div>
    </div>
  );
}
