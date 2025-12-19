import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  Package, 
  BarChart3, 
  Settings,
  ChefHat,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: UtensilsCrossed, label: "Menu", path: "/menu" },
  { icon: ClipboardList, label: "Orders", path: "/orders" },
  { icon: Users, label: "Tables", path: "/tables" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

function SidebarContent({ onNavClick }) {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-warm">
          <ChefHat className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold">RestaurantOS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 bg-sidebar text-sidebar-foreground lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center gap-3 border-b border-border bg-background px-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground">
            <SidebarContent onNavClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-warm">
            <ChefHat className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold">RestaurantOS</span>
        </div>
      </header>
    </>
  );
}

