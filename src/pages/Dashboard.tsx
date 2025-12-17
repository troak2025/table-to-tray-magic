import { DollarSign, ShoppingBag, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { PopularItems } from "@/components/dashboard/PopularItems";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <PopularItems />
        </div>
      </div>
    </div>
  );
}
