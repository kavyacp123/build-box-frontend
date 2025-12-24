import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/DashboardPages/Projects";
import NewProject from "./pages/DashboardPages/NewProject";
import Deployments from "./pages/DashboardPages/Deployments";
import Domains from "./pages/DashboardPages/Domains";
import Analytics from "./pages/DashboardPages/Analytics";
import SettingsPage from "./pages/DashboardPages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/projects/new" element={<NewProject />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/deployments" element={<Deployments />} />
          <Route path="/dashboard/domains" element={<Domains />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Store root instance to prevent re-creating on HMR
let root: ReturnType<typeof createRoot> | null = null;

const rootElement = document.getElementById("root");
if (rootElement) {
  if (!root) {
    root = createRoot(rootElement);
  }
  root.render(<App />);
}
