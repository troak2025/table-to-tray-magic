import { Building, Bell, CreditCard, Users, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import styles from "./Settings.module.css";

const settingsSections = [
  { icon: Building, label: "Restaurant Info", description: "Basic restaurant details and contact" },
  { icon: Bell, label: "Notifications", description: "Manage alerts and notifications" },
  { icon: CreditCard, label: "Payments", description: "Payment methods and processing" },
  { icon: Users, label: "Staff & Roles", description: "Manage team members and permissions" },
  { icon: Shield, label: "Security", description: "Authentication and access control" },
  { icon: Palette, label: "Appearance", description: "Customize look and feel" },
];

export default function Settings() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Manage your restaurant configuration and preferences.</p>
      </div>

      <div className={styles.contentGrid}>
        {/* Settings Navigation */}
        <div>
          <div className={styles.navCard}>
            <nav className={styles.navList}>
              {settingsSections.map((section, index) => (
                <button
                  key={section.label}
                  className={`${styles.navButton} ${index === 0 ? styles.navButtonActive : styles.navButtonInactive}`}
                >
                  <section.icon className={styles.navIcon} />
                  <div>
                    <p className={styles.navLabel}>{section.label}</p>
                    <p className={`${styles.navDescription} ${index === 0 ? styles.navDescriptionActive : styles.navDescriptionInactive}`}>
                      {section.description}
                    </p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className={styles.settingsContent}>
          {/* Restaurant Info */}
          <div className={styles.settingsCard}>
            <h2 className={styles.settingsTitle}>Restaurant Information</h2>
            
            <div className={styles.formGrid}>
              <div className={`${styles.formGrid} ${styles.formGridHalf}`}>
                <div className={styles.formGroup}>
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input id="name" defaultValue="The Gourmet Kitchen" />
                </div>
                <div className={styles.formGroup}>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, New York, NY 10001" />
              </div>

              <div className={`${styles.formGrid} ${styles.formGridHalf}`}>
                <div className={styles.formGroup}>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contact@gourmetkitchen.com" />
                </div>
                <div className={styles.formGroup}>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.gourmetkitchen.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className={styles.settingsCard} style={{ animationDelay: "50ms" }}>
            <h2 className={styles.settingsTitle}>Notification Preferences</h2>
            
            <div className={styles.notificationList}>
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <h4>New Order Alerts</h4>
                  <p>Get notified when new orders come in</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <h4>Low Stock Warnings</h4>
                  <p>Alert when inventory is running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <h4>Daily Reports</h4>
                  <p>Receive daily summary emails</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <h4>Sound Notifications</h4>
                  <p>Play sound for new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className={styles.saveButtonWrapper}>
            <Button size="lg">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
