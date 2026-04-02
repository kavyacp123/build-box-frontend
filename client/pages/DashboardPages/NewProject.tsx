import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

type EnvVar = {
  name: string;
  value: string;
};

export default function NewProject() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [repository, setRepository] = useState("");
  const [frontendDir, setFrontendDir] = useState("");
  const [backendDir, setBackendDir] = useState("");
  const [frontendEnvVars, setFrontendEnvVars] = useState<EnvVar[]>([{ name: "", value: "" }]);
  const [backendEnvVars, setBackendEnvVars] = useState<EnvVar[]>([{ name: "", value: "" }]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId") || "your-user-id";
  const trimmedProjectName = projectName.trim();
  const generatedFrontendUrl = trimmedProjectName
    ? `https://buildbox-frontend.s3.ap-south-1.amazonaws.com/${userId}/${trimmedProjectName}/Frontend/index.html`
    : "";
  const generatedBackendUrl = trimmedProjectName
    ? `api.${trimmedProjectName}.localhost:8000`
    : "";

  const copyToClipboard = async (value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      alert("Copied to clipboard");
    } catch {
      alert("Could not copy automatically. Please copy manually.");
    }
  };

  const addEnvRow = (type: "FRONTEND" | "BACKEND") => {
    if (type === "FRONTEND") {
      setFrontendEnvVars((prev) => [...prev, { name: "", value: "" }]);
      return;
    }
    setBackendEnvVars((prev) => [...prev, { name: "", value: "" }]);
  };

  const removeEnvRow = (type: "FRONTEND" | "BACKEND", index: number) => {
    if (type === "FRONTEND") {
      setFrontendEnvVars((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    setBackendEnvVars((prev) => prev.filter((_, i) => i !== index));
  };

  const updateEnvRow = (
    type: "FRONTEND" | "BACKEND",
    index: number,
    field: "name" | "value",
    value: string
  ) => {
    if (type === "FRONTEND") {
      setFrontendEnvVars((prev) =>
        prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
      );
      return;
    }
    setBackendEnvVars((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !repository || !frontendDir || !backendDir) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const formatEnvVars = (vars) => 
      vars.reduce((acc, curr) => {
        if (curr.name.trim()) {
          acc[curr.name.trim()] = curr.value;
        }
        return acc;
      }, {});

      const response = await axios.post("http://localhost:9000/deployProject/v2", {
        projectName: projectName,
        link: repository,
        frontendDirectory: frontendDir,
        backendDirectory: backendDir,
        userId: localStorage.getItem("userId"),
        backendEnvVars: formatEnvVars(backendEnvVars),
        frontendEnvVars: formatEnvVars(frontendEnvVars),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status === 200 || response.status === 202) {
        const taskId = response.data?.buildId;
        if (taskId) {
          navigate(`/dashboard/deployments/${taskId}/logs?project=${projectName}`);
        } else {
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

                {trimmedProjectName && (
                  <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-4">
                    <h3 className="text-sm font-semibold">Generated URLs For This Project</h3>
                    <p className="text-xs text-foreground/60">
                      These are the URLs that will be generated at project creation. You can copy and use them in environment variables.
                    </p>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground/70">Frontend URL</label>
                      <div className="flex gap-2">
                        <Input value={generatedFrontendUrl} readOnly className="font-mono text-xs" />
                        <Button type="button" variant="outline" onClick={() => copyToClipboard(generatedFrontendUrl)}>
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground/70">Backend URL</label>
                      <div className="flex gap-2">
                        <Input value={generatedBackendUrl} readOnly className="font-mono text-xs" />
                        <Button type="button" variant="outline" onClick={() => copyToClipboard(generatedBackendUrl)}>
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 border border-border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Frontend Environment Variables</h3>
                    <Button type="button" variant="outline" onClick={() => addEnvRow("FRONTEND")}>Add</Button>
                  </div>
                  {frontendEnvVars.map((env, idx) => (
                    <div key={`frontend-${idx}`} className="grid grid-cols-12 gap-2">
                      <Input
                        className="col-span-5"
                        placeholder="KEY (e.g. VITE_API_URL)"
                        value={env.name}
                        onChange={(e) => updateEnvRow("FRONTEND", idx, "name", e.target.value)}
                      />
                      <Input
                        className="col-span-6"
                        placeholder="VALUE"
                        value={env.value}
                        onChange={(e) => updateEnvRow("FRONTEND", idx, "value", e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="col-span-1"
                        onClick={() => removeEnvRow("FRONTEND", idx)}
                        disabled={frontendEnvVars.length === 1}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border border-border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Backend Environment Variables</h3>
                    <Button type="button" variant="outline" onClick={() => addEnvRow("BACKEND")}>Add</Button>
                  </div>
                  {backendEnvVars.map((env, idx) => (
                    <div key={`backend-${idx}`} className="grid grid-cols-12 gap-2">
                      <Input
                        className="col-span-5"
                        placeholder="KEY (e.g. DATABASE_URL)"
                        value={env.name}
                        onChange={(e) => updateEnvRow("BACKEND", idx, "name", e.target.value)}
                      />
                      <Input
                        className="col-span-6"
                        placeholder="VALUE"
                        value={env.value}
                        onChange={(e) => updateEnvRow("BACKEND", idx, "value", e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="col-span-1"
                        onClick={() => removeEnvRow("BACKEND", idx)}
                        disabled={backendEnvVars.length === 1}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>

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