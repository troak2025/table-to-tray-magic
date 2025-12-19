import { useState } from "react";
import { Users, Clock, Utensils, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig = {
  available: { label: "Available", className: "text-success", bgClassName: "bg-success/10 border-success/30" },
  occupied: { label: "Occupied", className: "text-primary", bgClassName: "bg-primary/10 border-primary/30" },
  reserved: { label: "Reserved", className: "text-warning", bgClassName: "bg-warning/10 border-warning/30" },
  cleaning: { label: "Cleaning", className: "text-muted-foreground", bgClassName: "bg-muted border-border" },
};

const mockTables = [
  { id: "1", number: 1, seats: 2, status: "available" },
  { id: "2", number: 2, seats: 2, status: "occupied" },
  { id: "3", number: 3, seats: 4, status: "occupied" },
  { id: "4", number: 4, seats: 4, status: "available" },
  { id: "5", number: 5, seats: 4, status: "reserved" },
  { id: "6", number: 6, seats: 6, status: "cleaning" },
  { id: "7", number: 7, seats: 6, status: "available" },
  { id: "8", number: 8, seats: 8, status: "occupied" },
  { id: "9", number: 9, seats: 2, status: "available" },
  { id: "10", number: 10, seats: 4, status: "occupied" },
  { id: "11", number: 11, seats: 4, status: "available" },
  { id: "12", number: 12, seats: 6, status: "reserved" },
];

const statusFilters = ["all", "available", "occupied", "reserved", "cleaning"];

export default function Tables() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTables = mockTables.filter((table) => {
    return selectedStatus === "all" || table.status === selectedStatus;
  });

  const stats = {
    total: mockTables.length,
    available: mockTables.filter(t => t.status === "available").length,
    occupied: mockTables.filter(t => t.status === "occupied").length,
    reserved: mockTables.filter(t => t.status === "reserved").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Table Management</h1>
          <p className="text-muted-foreground">Monitor and manage table occupancy in real-time.</p>
        </div>
        <Button className="gap-2">
          <Users className="h-4 w-4" />
          Add Table
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total Tables</p>
          <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-success/10 p-4 border border-success/20">
          <p className="text-sm text-success">Available</p>
          <p className="text-2xl font-bold text-success">{stats.available}</p>
        </div>
        <div className="rounded-xl bg-primary/10 p-4 border border-primary/20">
          <p className="text-sm text-primary">Occupied</p>
          <p className="text-2xl font-bold text-primary">{stats.occupied}</p>
        </div>
        <div className="rounded-xl bg-warning/10 p-4 border border-warning/20">
          <p className="text-sm text-warning">Reserved</p>
          <p className="text-2xl font-bold text-warning">{stats.reserved}</p>
        </div>
      </div>

      {/* Status Filters */}
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
            {status === "all" ? "All Tables" : statusConfig[status].label}
          </button>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filteredTables.map((table, index) => {
          const config = statusConfig[table.status];
          const StatusIcon = table.status === "available" ? Sparkles : 
                           table.status === "occupied" ? Utensils : 
                           table.status === "reserved" ? Clock : Sparkles;

          return (
            <div
              key={table.id}
              className={cn(
                "relative rounded-xl border-2 p-6 transition-all duration-200 hover:scale-105 cursor-pointer animate-scale-in",
                config.bgClassName
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className={cn("text-xs", config.className)}>
                  {config.label}
                </Badge>
              </div>
              
              <div className="flex flex-col items-center text-center pt-4">
                <div className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full mb-3",
                  table.status === "available" ? "bg-success/20" : 
                  table.status === "occupied" ? "bg-primary/20" :
                  table.status === "reserved" ? "bg-warning/20" : "bg-muted"
                )}>
                  <span className="text-3xl font-bold text-foreground">{table.number}</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{table.seats} seats</span>
                </div>

                {table.status === "occupied" && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Order in progress
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

