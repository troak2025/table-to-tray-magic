import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from "./Menu.module.css";

const categories = ["All", "Appetizers", "Main Course", "Desserts", "Beverages"];

const mockMenuItems = [
  { id: "1", name: "Classic Burger", description: "Juicy beef patty with fresh lettuce, tomato, and our special sauce", price: 14.99, category: "Main Course", available: true },
  { id: "2", name: "Margherita Pizza", description: "Fresh mozzarella, tomatoes, and basil on crispy dough", price: 16.99, category: "Main Course", available: true },
  { id: "3", name: "Caesar Salad", description: "Crisp romaine, parmesan, croutons with Caesar dressing", price: 11.99, category: "Appetizers", available: true },
  { id: "4", name: "Grilled Salmon", description: "Atlantic salmon with lemon butter sauce and vegetables", price: 24.99, category: "Main Course", available: true },
  { id: "5", name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", price: 8.99, category: "Desserts", available: false },
  { id: "6", name: "Fresh Lemonade", description: "House-made lemonade with fresh lemons and mint", price: 4.99, category: "Beverages", available: true },
  { id: "7", name: "Garlic Bread", description: "Toasted bread with garlic butter and herbs", price: 5.99, category: "Appetizers", available: true },
  { id: "8", name: "Tiramisu", description: "Classic Italian dessert with espresso and mascarpone", price: 9.99, category: "Desserts", available: true },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockMenuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Menu Management</h1>
          <p>Manage your restaurant's menu items and categories.</p>
        </div>
        <Button className={styles.addButton}>
          <Plus className={styles.buttonIcon} />
          Add Item
        </Button>
      </div>

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
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className={styles.menuGrid}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={styles.menuCard}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image placeholder */}
            <div className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                🍽️
              </div>
              {!item.available && (
                <div className={styles.unavailableOverlay}>
                  <Badge variant="secondary">Unavailable</Badge>
                </div>
              )}
            </div>

            <div className={styles.menuContent}>
              <div className={styles.menuHeader}>
                <div>
                  <h3 className={styles.menuName}>{item.name}</h3>
                  <Badge variant="outline" className={styles.categoryBadge}>
                    {item.category}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={styles.menuButton}>
                      <MoreVertical className={styles.menuButtonIcon} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className={styles.dropdownItem}>
                      <Edit className={styles.dropdownIcon} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`${styles.dropdownItem} ${styles.destructiveItem}`}>
                      <Trash2 className={styles.dropdownIcon} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className={styles.menuDescription}>{item.description}</p>
              <p className={styles.menuPrice}>${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
