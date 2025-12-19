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
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import styles from "./Sidebar.module.css";

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
    <div className={styles.sidebarContent}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <div className={`${styles.logoWrapper} gradient-warm`}>
          <ChefHat className={styles.logoIconLarge} />
        </div>
        <span className={styles.logoTextLarge}>RestaurantOS</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavClick}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`.trim()}
              >
                <item.icon className={styles.navIcon} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User section */}
      <div className={styles.userSection}>
        <div className={styles.userContainer}>
          <div className={styles.userAvatar}>
            JD
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>John Doe</p>
            <p className={styles.userRole}>Admin</p>
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
      <aside className={styles.sidebar}>
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={styles.menuButton}>
              <Menu className={styles.logoIconSmall} style={{ width: '1.25rem', height: '1.25rem' }} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className={styles.sheetContent}>
            <SidebarContent onNavClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className={styles.logoContainer}>
          <div className={`${styles.logoIcon} gradient-warm`}>
            <ChefHat className={styles.logoIconSmall} />
          </div>
          <span className={styles.logoText}>RestaurantOS</span>
        </div>
      </header>
    </>
  );
}
