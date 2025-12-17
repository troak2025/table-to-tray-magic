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
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

const categories = ["All", "Appetizers", "Main Course", "Desserts", "Beverages"];

const mockMenuItems: MenuItem[] = [
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">Manage your restaurant's menu items and categories.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

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
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="group rounded-xl bg-card p-4 shadow-card transition-all duration-200 hover:shadow-elevated animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image placeholder */}
            <div className="relative mb-4 aspect-[4/3] rounded-lg bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                🍽️
              </div>
              {!item.available && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <Badge variant="secondary">Unavailable</Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-card-foreground line-clamp-1">{item.name}</h3>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {item.category}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
