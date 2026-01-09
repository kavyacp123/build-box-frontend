import DashboardSidebar from "@/components/DashboardSidebar";
import { MessageCircle, Zap } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({
  title,
  description,
  icon = <Zap className="w-12 h-12 text-primary/50" />,
}: PlaceholderPageProps) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-foreground/60 text-sm mt-1">{description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <div className="text-center">
            {icon}
            <h2 className="text-2xl font-bold mt-6">Coming Soon</h2>
            <p className="text-foreground/60 max-w-md mt-2">
              This page is being built. Ask me to continue developing this
              section if you'd like to see the full implementation.
            </p>

            <div className="flex items-center justify-center gap-2 mt-8 text-sm text-primary">
              <MessageCircle className="w-4 h-4" />
              {/*<span>Prompt me to build this page</span>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
