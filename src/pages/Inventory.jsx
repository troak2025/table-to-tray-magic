import { useState } from "react";
import { Package, AlertTriangle, Search, Plus, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const mockInventory = [
  { id: "1", name: "Beef Patties", category: "Proteins", quantity: 45, unit: "kg", minStock: 20, lastUpdated: new Date() },
  { id: "2", name: "Chicken Breast", category: "Proteins", quantity: 12, unit: "kg", minStock: 15, lastUpdated: new Date() },
  { id: "3", name: "Fresh Lettuce", category: "Vegetables", quantity: 8, unit: "kg", minStock: 10, lastUpdated: new Date() },
  { id: "4", name: "Tomatoes", category: "Vegetables", quantity: 25, unit: "kg", minStock: 15, lastUpdated: new Date() },
  { id: "5", name: "Mozzarella Cheese", category: "Dairy", quantity: 15, unit: "kg", minStock: 10, lastUpdated: new Date() },
  { id: "6", name: "Olive Oil", category: "Pantry", quantity: 20, unit: "L", minStock: 10, lastUpdated: new Date() },
  { id: "7", name: "Pasta", category: "Pantry", quantity: 30, unit: "kg", minStock: 20, lastUpdated: new Date() },
  { id: "8", name: "Salmon Fillet", category: "Proteins", quantity: 5, unit: "kg", minStock: 8, lastUpdated: new Date() },
];

const categories = ["All", "Proteins", "Vegetables", "Dairy", "Pantry"];

export default function Inventory() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockInventory.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const lowStockItems = mockInventory.filter(item => item.quantity < item.minStock);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground">Track and manage your stock levels.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-medium text-destructive">Low Stock Alert</p>
              <p className="text-sm text-muted-foreground">
                {lowStockItems.length} items are running low: {lowStockItems.map(i => i.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Item</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stock Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => {
                const stockPercentage = (item.quantity / (item.minStock * 2)) * 100;
                const isLowStock = item.quantity < item.minStock;

                return (
                  <tr
                    key={item.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                          <Package className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <span className="font-medium text-card-foreground">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <Progress 
                        value={Math.min(stockPercentage, 100)} 
                        className={cn("h-2", isLowStock && "[&>div]:bg-destructive")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-card-foreground">
                        {item.quantity} {item.unit}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        (min: {item.minStock})
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isLowStock ? (
                        <Badge className="bg-destructive/10 text-destructive border-0 gap-1">
                          <TrendingDown className="h-3 w-3" />
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge className="bg-success/10 text-success border-0">
                          In Stock
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

