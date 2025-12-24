import PlaceholderPage from "@/components/PlaceholderPage";
import { Globe } from "lucide-react";

export default function Domains() {
  return (
    <PlaceholderPage
      title="Domains"
      description="Add and manage your custom domains"
      icon={<Globe className="w-12 h-12 text-primary/50" />}
    />
  );
}
