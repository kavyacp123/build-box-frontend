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
  const [frontendDir, setFrontendDir] = useState("");
  const [backendDir, setBackendDir] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !repository || !frontendDir || !backendDir) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:9000/deployProject/v2", {
        projectName: projectName,
        link: repository,
        frontendDirectory: frontendDir,
        backendDirectory: backendDir,
        userId: localStorage.getItem("userId")
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Backend returns 202 Accepted with { message: "Deployment started", taskId: "..." }
      if (response.status === 200 || response.status === 202) {
        const taskId = response.data?.taskId;

        if (taskId) {
          console.log("Deployment started with taskId:", taskId);
          // Navigate to deployment logs page
          navigate(`/dashboard/deployments/${taskId}/logs?project=${projectName}`);
        } else {
          console.error("No taskId in response:", response.data);
          alert("Deployment started but task ID not found. Check dashboard for updates.");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Deployment failed", err);
      alert("Deployment failed. Check console.");
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

                {/* Frontend Dir */}
                <Input
                  placeholder="Frontend directory (e.g. frontend or client)"
                  value={frontendDir}
                  onChange={(e) => setFrontendDir(e.target.value)}
                />

                {/* Backend Dir */}
                <Input
                  placeholder="Backend directory (e.g. backend or server)"
                  value={backendDir}
                  onChange={(e) => setBackendDir(e.target.value)}
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
