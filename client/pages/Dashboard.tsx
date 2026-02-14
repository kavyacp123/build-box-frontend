import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import {
  Plus,
  GitBranch,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

/* ------------------ HELPERS ------------------ */

function getStatusIcon(status) {
  switch (status?.toLowerCase()) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "failed":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case "building":
    case "in_progress":
      return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
    default:
      return null;
  }
}

/* ------------------ DASHBOARD ------------------ */

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [recentDeployments, setRecentDeployments] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch User Details
        const userRes = await axios.get(`${apiUrl}/auth/me`, { headers });
        setUser(userRes.data);
        localStorage.setItem("userId", userRes.data.id);

        // 2. Fetch Projects & Recent Deployments
        const [projRes, depRes] = await Promise.all([
          axios.get(`${apiUrl}/projects`, { headers }),
          axios.get(`${apiUrl}/deployments`, { headers })
        ]);

        setProjects(projRes.data);
        const deployments = depRes.data || [];
        setRecentDeployments(deployments.slice(0, 5));

        setLoading(false);
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
        navigate("/login");
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  /* ------------------ LOADING SCREEN ------------------ */

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  /* ------------------ UI ------------------ */

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-foreground/60 text-sm mt-1">
                Welcome back, <b>{user?.name || "User"}</b> ({user?.email})
              </p>
            </div>
            <Link to="/dashboard/projects/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl">

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-card p-6 border border-border">
                <p className="text-sm text-foreground/60">Total Projects</p>
                <p className="text-3xl font-bold">{projects.length}</p>
              </Card>

              <Card className="bg-card p-6 border border-border">
                <p className="text-sm text-foreground/60">Success Rate</p>
                <p className="text-3xl font-bold">
                  {projects.length > 0 ? "98%" : "N/A"}
                </p>
              </Card>

              <Card className="bg-card p-6 border border-border">
                <p className="text-sm text-foreground/60">Active Builds</p>
                <p className="text-3xl font-bold">
                  {projects.filter(p => p.status?.toLowerCase() === "building").length}
                </p>
              </Card>

              <Card className="bg-card p-6 border border-border">
                <p className="text-sm text-foreground/60">Uptime</p>
                <p className="text-3xl font-bold">99.9%</p>
              </Card>
            </div>

            {/* Projects */}
            <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {projects.length === 0 ? (
                <p className="text-foreground/60">No projects yet. Create one to get started!</p>
              ) : (
                projects.map((project) => (
                  <Card key={project.id} className="p-6 border border-border">
                    <div className="flex justify-between mb-2">
                      <Link to={`/dashboard/projects/${project.slug}`} className="hover:text-primary transition-colors">
                        <h3 className="font-semibold">{project.name}</h3>
                      </Link>
                      {getStatusIcon(project.status)}
                    </div>
                    <p className="text-xs text-foreground/60 font-mono truncate">{project.repoUrl}</p>
                  </Card>
                ))
              )}
            </div>

            {/* Recent Deployments */}
            <h2 className="text-lg font-semibold mb-4">Recent Deployments</h2>
            <Card className="border border-border">
              {recentDeployments.length === 0 ? (
                <div className="p-8 text-center text-foreground/60">No deployment history found.</div>
              ) : (
                <div className="divide-y divide-border">
                  {recentDeployments.map((d) => (
                    <div key={d.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(d.status)}
                        <div>
                          <p className="font-semibold text-sm">{d.project?.name || "Unknown Project"}</p>
                          <p className="text-xs text-foreground/60">{d.commitMessage || "Initial Deploy"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-foreground/40">{d.branch}</p>
                        <p className="text-[10px] text-foreground/30">{new Date(d.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
