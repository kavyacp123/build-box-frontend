import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Plus, GitBranch, Clock, CheckCircle, AlertCircle, Zap } from "lucide-react";

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

function getStatusIcon(status: string) {
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

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-foreground/60 text-sm mt-1">
                Welcome back! Here's your deployment overview.
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm font-medium">
                      Total Projects
                    </p>
                    <p className="text-3xl font-bold mt-1">4</p>
                  </div>
                  <Zap className="w-8 h-8 text-primary/50" />
                </div>
              </Card>
              <Card className="bg-card p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm font-medium">
                      Total Deployments
                    </p>
                    <p className="text-3xl font-bold mt-1">62</p>
                  </div>
                  <GitBranch className="w-8 h-8 text-primary/50" />
                </div>
              </Card>
              <Card className="bg-card p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm font-medium">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold mt-1">98%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500/50" />
                </div>
              </Card>
              <Card className="bg-card p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm font-medium">
                      Uptime
                    </p>
                    <p className="text-3xl font-bold mt-1">99.9%</p>
                  </div>
                  <Clock className="w-8 h-8 text-primary/50" />
                </div>
              </Card>
            </div>

            {/* Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Projects</h2>
                <a href="#view-all" className="text-primary hover:text-primary/80 transition-colors text-sm">
                  View all
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-card p-6 border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-foreground/60 mt-1">
                          {project.url}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(project.status)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-foreground/60">
                      <span>{project.deployments} deployments</span>
                      <span>{project.lastDeployed}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Deployments */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Deployments</h2>
                <a href="#view-all" className="text-primary hover:text-primary/80 transition-colors text-sm">
                  View timeline
                </a>
              </div>

              <Card className="bg-card border border-border overflow-hidden">
                <div className="divide-y divide-border">
                  {recentDeployments.map((deployment) => (
                    <div
                      key={deployment.id}
                      className="px-6 py-4 hover:bg-card/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 min-w-fit">
                          {getStatusIcon(deployment.status)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold truncate">
                              {deployment.project}
                            </p>
                            <span className="text-xs text-foreground/60 bg-card px-2 py-1 rounded">
                              {deployment.branch}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/60 truncate">
                            {deployment.commit}
                          </p>
                          <p className="text-xs text-foreground/50 mt-1">
                            by {deployment.author} • {deployment.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
