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

/* ------------------ TEMP STATIC DATA (replace later with API) ------------------ */

const projects = [
  {
    id: 1,
    name: "React Dashboard",
    status: "success",
    lastDeployed: "2 hours ago",
    deployments: 24,
    url: "react-dashboard.buildbox.dev",
  },
  {
    id: 2,
    name: "API Server",
    status: "building",
    lastDeployed: "In progress",
    deployments: 18,
    url: "api-server.buildbox.dev",
  },
  {
    id: 3,
    name: "Mobile App Backend",
    status: "failed",
    lastDeployed: "1 day ago",
    deployments: 12,
    url: "mobile-api.buildbox.dev",
  },
  {
    id: 4,
    name: "Docs Website",
    status: "success",
    lastDeployed: "5 days ago",
    deployments: 8,
    url: "docs.buildbox.dev",
  },
];

const recentDeployments = [
  {
    id: 1,
    project: "React Dashboard",
    status: "success",
    commit: "feat: add dark mode",
    branch: "main",
    author: "John Doe",
    time: "2 hours ago",
  },
  {
    id: 2,
    project: "API Server",
    status: "building",
    commit: "fix: database connection",
    branch: "develop",
    author: "Jane Smith",
    time: "10 minutes ago",
  },
  {
    id: 3,
    project: "Mobile App Backend",
    status: "failed",
    commit: "refactor: optimize queries",
    branch: "feature/optimize",
    author: "Bob Johnson",
    time: "1 day ago",
  },
  {
    id: 4,
    project: "Docs Website",
    status: "success",
    commit: "docs: update readme",
    branch: "main",
    author: "Alice Lee",
    time: "5 days ago",
  },
];

/* ------------------ HELPERS ------------------ */

function getStatusIcon(status) {
  switch (status) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "failed":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case "building":
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("Fetching user details");

        const response = await axios.get("http://localhost:9000/me", {
          params: {
            email: localStorage.getItem("email"),
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.status === 200) {
          setUser(response.data);
          localStorage.setItem("userId", response.data.id);
          setLoading(false);
        }
      } catch (err) {
        console.error("Not authenticated", err);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, []);

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
                Welcome back, <b>{user.name}</b> ({user.email})
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
                <p className="text-sm text-foreground/60">Total Deployments</p>
                <p className="text-3xl font-bold">62</p>
              </Card>

              <Card className="bg-card p-6 border border-border">
                <p className="text-sm text-foreground/60">Success Rate</p>
                <p className="text-3xl font-bold">98%</p>
              </Card>

              <Card className="bg-card p-6 border border-border">
                <p className="text-sm text-foreground/60">Uptime</p>
                <p className="text-3xl font-bold">99.9%</p>
              </Card>
            </div>

            {/* Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {projects.map((project) => (
                <Card key={project.id} className="p-6 border border-border">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    {getStatusIcon(project.status)}
                  </div>
                  <p className="text-sm text-foreground/60">{project.url}</p>
                </Card>
              ))}
            </div>

            {/* Recent Deployments */}
            <Card className="border border-border">
              <div className="divide-y divide-border">
                {recentDeployments.map((d) => (
                  <div key={d.id} className="p-4 flex gap-4">
                    {getStatusIcon(d.status)}
                    <div>
                      <p className="font-semibold">{d.project}</p>
                      <p className="text-sm text-foreground/60">{d.commit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
