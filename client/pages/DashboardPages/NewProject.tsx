import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function NewProject() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [repository, setRepository] = useState("");
  const [basePath, setBasePath] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !repository) {
      alert("Project name and repository are required");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Create Project metadata
      const projectResponse = await axios.post(`${apiUrl}/projects`, {
        name: projectName,
        repoUrl: repository,
        basePath: basePath
      }, { headers });

      const project = projectResponse.data;
      console.log("Project created:", project);

      // 2. Trigger initial Deployment
      const deployResponse = await axios.post(`${apiUrl}/projects/${project.slug}/deployments`, {
        branch: "main",
        commitMessage: "Initial Deployment"
      }, { headers });

      const deployment = deployResponse.data;
      console.log("Deployment triggered:", deployment);

      if (deployment.taskId) {
        navigate(`/dashboard/deployments/${deployment.taskId}/logs?project=${projectName}`);
      } else {
        alert("Project created and deployment triggered. Redirecting to dashboard.");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Project creation failed", err);
      alert(err.response?.data?.error || "Failed to create project. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold">Create New Project</h1>
            <p className="text-foreground/60 text-sm mt-1">
              Deploy a new application to BuildBox
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-3xl">
            <Card className="bg-card border border-border p-6">
              <h2 className="text-lg font-semibold mb-6">Project Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Project Name */}
                <Input
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />

                {/* Repo */}
                <Input
                  placeholder="https://github.com/user/repo"
                  value={repository}
                  onChange={(e) => setRepository(e.target.value)}
                />

                {/* Application Path */}
                <Input
                  placeholder="Application Path (e.g. / or backend)"
                  value={basePath}
                  onChange={(e) => setBasePath(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary flex-1"
                  >
                    {loading ? "Creating..." : "Create Project"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                </div>

              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
