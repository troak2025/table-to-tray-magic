import { Building, Bell, CreditCard, Users, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your restaurant configuration and preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <nav className="space-y-1">
              {settingsSections.map((section, index) => (
                <button
                  key={section.label}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                    index === 0 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium">{section.label}</p>
                    <p className={`text-xs ${index === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {section.description}
                    </p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Restaurant Info */}
          <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Restaurant Information</h2>
            
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input id="name" defaultValue="The Gourmet Kitchen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, New York, NY 10001" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contact@gourmetkitchen.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.gourmetkitchen.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: "50ms" }}>
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Notification Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-foreground">New Order Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when new orders come in</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-foreground">Low Stock Warnings</p>
                  <p className="text-sm text-muted-foreground">Alert when inventory is running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-foreground">Daily Reports</p>
                  <p className="text-sm text-muted-foreground">Receive daily summary emails</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-foreground">Sound Notifications</p>
                  <p className="text-sm text-muted-foreground">Play sound for new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

