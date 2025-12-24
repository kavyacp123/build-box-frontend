import PlaceholderPage from "@/components/PlaceholderPage";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Manage your account and application settings"
      icon={<Settings className="w-12 h-12 text-primary/50" />}
    />
  );
}
