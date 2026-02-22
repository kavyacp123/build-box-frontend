import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Rocket,
  Globe,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Projects", icon: Boxes, href: "/dashboard/projects" },
  { label: "Deployments", icon: Rocket, href: "/dashboard/deployments" },
  { label: "Domains", icon: Globe, href: "/dashboard/domains" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardSidebar() {
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = () => {
    console.log("Signing out");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }


  return (


    <div className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-bold group-hover:text-sidebar-primary transition-colors">
            BuildBox
          </span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4 space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="w-4 h-4 mr-2"/>
          <span className="text-sm" onClick={handleSignOut}>Sign out</span>
        </Button>
      </div>
    </div>
  );
}
