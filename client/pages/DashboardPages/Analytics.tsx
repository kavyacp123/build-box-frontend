import PlaceholderPage from "@/components/PlaceholderPage";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  return (
    <PlaceholderPage
      title="Analytics"
      description="View detailed analytics and metrics for your deployments"
      icon={<BarChart3 className="w-12 h-12 text-primary/50" />}
    />
  );
}
