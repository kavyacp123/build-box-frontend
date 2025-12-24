import PlaceholderPage from "@/components/PlaceholderPage";
import { Rocket } from "lucide-react";

export default function Deployments() {
  return (
    <PlaceholderPage
      title="Deployments"
      description="View and manage your deployment history"
      icon={<Rocket className="w-12 h-12 text-primary/50" />}
    />
  );
}
