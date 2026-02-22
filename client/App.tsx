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
import ProjectDetail from "./pages/DashboardPages/ProjectDetail";
import Deployments from "./pages/DashboardPages/Deployments";
import DeploymentLogs from "./pages/DashboardPages/DeploymentLogs";
import BackendLogs from "./pages/DashboardPages/BackendLogs";
import Domains from "./pages/DashboardPages/Domains";
import Analytics from "./pages/DashboardPages/Analytics";
import SettingsPage from "./pages/DashboardPages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./context/AuthChecker.jsx";

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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/projects/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
          <Route path="/dashboard/projects/:slug" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
          <Route path="/dashboard/projects/:slug/logs" element={<ProtectedRoute><BackendLogs /></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/dashboard/deployments" element={<ProtectedRoute><Deployments /></ProtectedRoute>} />
          <Route path="/dashboard/deployments/:taskId/logs" element={<ProtectedRoute><DeploymentLogs /></ProtectedRoute>} />
          <Route path="/dashboard/domains" element={<ProtectedRoute><Domains /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
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
