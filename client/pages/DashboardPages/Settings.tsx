import { useEffect, useState } from "react";
import axios from "axios";
import { Settings, User, Mail, Database, Shield, Save } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        const response = await axios.get(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <div className="border-b border-border p-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" /> Settings
          </h1>
          <p className="text-sm text-foreground/60">Manage your profile and platform preferences</p>
        </div>
        <div className="flex-1 overflow-y-auto p-8 max-w-4xl">
          {loading ? (
            <p>Loading settings...</p>
          ) : (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <User className="w-5 h-5" /> Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <Input value={user.name} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email Address</label>
                    <Input value={user.email} readOnly />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5" /> Security
                </h2>
                <p className="text-sm text-foreground/60 mb-4">Authentication is handled via JWT and OAuth2 providers.</p>
                <Button variant="outline">Change Password</Button>
              </Card>

              <Card className="p-6 opacity-50">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5" /> Environment Variables
                </h2>
                <p className="text-sm text-foreground/60">Manage secrets for your deployments (Coming Soon)</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
