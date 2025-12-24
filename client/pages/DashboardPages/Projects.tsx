import PlaceholderPage from "@/components/PlaceholderPage";
import { Boxes } from "lucide-react";

export default function Projects() {
  return (
    <PlaceholderPage
      title="Projects"
      description="Manage all your projects in one place"
      icon={<Boxes className="w-12 h-12 text-primary/50" />}
    />
  );
}
