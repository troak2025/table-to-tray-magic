import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./Reports.module.css";

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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Reports & Analytics</h1>
          <p>Track your restaurant's performance and insights.</p>
        </div>
        <Button variant="outline" className={styles.dateButton}>
          <Calendar className={styles.buttonIcon} />
          This Week
        </Button>
      </div>

      {/* Summary Stats */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryContent}>
            <div className={styles.summaryInfo}>
              <p className={styles.summaryLabel}>Weekly Revenue</p>
              <p className={styles.summaryValue}>$26,100</p>
              <div className={styles.summaryChange}>
                <TrendingUp className={styles.changeIcon} />
                <span>+12.5% from last week</span>
              </div>
            </div>
            <div className={styles.summaryIconWrapper}>
              <DollarSign className={styles.summaryIcon} />
            </div>
          </div>
        </div>

        <div className={styles.summaryCard} style={{ animationDelay: "50ms" }}>
          <div className={styles.summaryContent}>
            <div className={styles.summaryInfo}>
              <p className={styles.summaryLabel}>Total Orders</p>
              <p className={styles.summaryValue}>949</p>
              <div className={styles.summaryChange}>
                <TrendingUp className={styles.changeIcon} />
                <span>+8.2% from last week</span>
              </div>
            </div>
            <div className={styles.summaryIconWrapper}>
              <ShoppingBag className={styles.summaryIcon} />
            </div>
          </div>
        </div>

        <div className={styles.summaryCard} style={{ animationDelay: "100ms" }}>
          <div className={styles.summaryContent}>
            <div className={styles.summaryInfo}>
              <p className={styles.summaryLabel}>Avg. Order Value</p>
              <p className={styles.summaryValue}>$27.50</p>
              <div className={styles.summaryChange}>
                <TrendingUp className={styles.changeIcon} />
                <span>+3.8% from last week</span>
              </div>
            </div>
            <div className={styles.summaryIconWrapper}>
              <BarChart3 className={styles.summaryIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className={styles.chartsGrid}>
        {/* Revenue Chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Daily Revenue</h3>
          <div className={styles.revenueList}>
            {weeklyData.map((data, index) => (
              <div key={data.day} className={styles.revenueItem}>
                <span className={styles.dayLabel}>{data.day}</span>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{ 
                      width: `${(data.revenue / maxRevenue) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
                <span className={styles.revenueValue}>
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className={styles.chartCard} style={{ animationDelay: "100ms" }}>
          <h3 className={styles.chartTitle}>Sales by Category</h3>
          <div className={styles.categoryList}>
            {topCategories.map((category, index) => (
              <div key={category.name} className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryName}>{category.name}</span>
                  <div className={styles.categoryStats}>
                    <span className={styles.categoryPercentage}>{category.percentage}%</span>
                    <span className={styles.categoryRevenue}>
                      ${category.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progressFill} ${index === 0 ? styles.progressFillPrimary : styles.progressFillSecondary}`}
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
      <div className={styles.peakHoursCard} style={{ animationDelay: "200ms" }}>
        <h3 className={styles.chartTitle}>Peak Hours Analysis</h3>
        <div className={styles.peakHoursChart}>
          {Array.from({ length: 12 }, (_, i) => {
            const hour = i + 11;
            const value = Math.random() * 80 + 20;
            const isPeak = hour >= 12 && hour <= 14 || hour >= 18 && hour <= 20;
            
            return (
              <div key={hour} className={styles.hourBar}>
                <div className={styles.barWrapper}>
                  <div
                    className={`${styles.peakBar} ${isPeak ? styles.peakBarActive : styles.peakBarInactive}`}
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className={styles.hourLabel}>
                  {hour > 12 ? `${hour - 12}pm` : hour === 12 ? "12pm" : `${hour}am`}
                </span>
              </div>
            );
          })}
        </div>
        <p className={styles.peakHoursNote}>
          Peak hours are typically <span className={styles.peakTime}>12-2 PM</span> and <span className={styles.peakTime}>6-8 PM</span>
        </p>
      </div>
    </div>
  );
}
