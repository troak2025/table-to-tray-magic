import { useState } from "react";
import { Package, AlertTriangle, Search, Plus, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import styles from "./Inventory.module.css";

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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Inventory</h1>
          <p>Track and manage your stock levels.</p>
        </div>
        <Button className={styles.addButton}>
          <Plus className={styles.buttonIcon} />
          Add Item
        </Button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className={styles.lowStockAlert}>
          <div className={styles.alertContent}>
            <AlertTriangle className={styles.alertIcon} />
            <div>
              <p className={styles.alertTitle}>Low Stock Alert</p>
              <p className={styles.alertDescription}>
                {lowStockItems.length} items are running low: {lowStockItems.map(i => i.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.categoryFilters}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.categoryButtonActive : styles.categoryButtonInactive}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableHeaderCell}>Item</th>
                <th className={styles.tableHeaderCell}>Category</th>
                <th className={styles.tableHeaderCell}>Stock Level</th>
                <th className={styles.tableHeaderCell}>Quantity</th>
                <th className={styles.tableHeaderCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => {
                const stockPercentage = (item.quantity / (item.minStock * 2)) * 100;
                const isLowStock = item.quantity < item.minStock;

                return (
                  <tr
                    key={item.id}
                    className={styles.tableRow}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className={styles.tableCell}>
                      <div className={styles.itemCell}>
                        <div className={styles.itemIcon}>
                          <Package className={styles.itemIconSvg} />
                        </div>
                        <span className={styles.itemName}>{item.name}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className={`${styles.tableCell} ${styles.stockCell}`}>
                      <Progress 
                        value={Math.min(stockPercentage, 100)} 
                        className={`${styles.progressBar} ${isLowStock ? styles.progressBarLow : ""}`}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.quantityCell}>
                        <span className={styles.quantity}>
                          {item.quantity} {item.unit}
                        </span>
                        <span className={styles.minStock}>
                          (min: {item.minStock})
                        </span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      {isLowStock ? (
                        <Badge className={`${styles.statusBadge} ${styles.statusBadgeLow}`}>
                          <TrendingDown className={styles.statusIcon} />
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge className={`${styles.statusBadge} ${styles.statusBadgeOk}`}>
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
