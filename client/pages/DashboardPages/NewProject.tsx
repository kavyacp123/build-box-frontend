import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ArrowLeft, Github, GitBranch } from "lucide-react";
import { useState } from "react";

export default function NewProject() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [repository, setRepository] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      {/* Main content */}
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main form */}
              <div className="lg:col-span-2">
                <Card className="bg-card border border-border p-6">
                  <h2 className="text-lg font-semibold mb-6">
                    Project Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Project Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="my-awesome-app"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="bg-input/50 border-border/50 focus:border-primary"
                        required
                      />
                      <p className="text-xs text-foreground/50 mt-1">
                        This will be used in your deployment URL
                      </p>
                    </div>

                    {/* Git Repository */}
                    <div>
                      <label
                        htmlFor="repo"
                        className="block text-sm font-medium mb-2"
                      >
                        Git Repository URL
                      </label>
                      <div className="relative">
                        <GitBranch className="absolute left-3 top-3 w-4 h-4 text-foreground/40" />
                        <Input
                          id="repo"
                          type="url"
                          placeholder="https://github.com/username/repo"
                          value={repository}
                          onChange={(e) => setRepository(e.target.value)}
                          className="bg-input/50 border-border/50 focus:border-primary pl-9"
                          required
                        />
                      </div>
                      <p className="text-xs text-foreground/50 mt-1">
                        Connect your GitHub repository for automatic deployments
                      </p>
                    </div>

                    {/* Framework Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Framework (Optional)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: "React", id: "react" },
                          { name: "Vue", id: "vue" },
                          { name: "Next.js", id: "nextjs" },
                          { name: "Nuxt", id: "nuxt" },
                          { name: "Svelte", id: "svelte" },
                          { name: "Node.js", id: "nodejs" },
                        ].map((framework) => (
                          <button
                            key={framework.id}
                            type="button"
                            className="px-4 py-2 rounded-lg border border-border/50 text-sm text-foreground/70 hover:border-primary/50 hover:bg-primary/5 transition-colors text-left"
                          >
                            {framework.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Environment Variables */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Environment Variables (Optional)
                      </label>
                      <div className="bg-input/30 rounded-lg p-4 border border-border/50">
                        <p className="text-xs text-foreground/60">
                          You can add environment variables after creating the
                          project
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={loading || !projectName || !repository}
                        className="bg-primary hover:bg-primary/90 flex-1"
                      >
                        {loading ? "Creating..." : "Create Project"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/dashboard")}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Sidebar info */}
              <div>
                <Card className="bg-card border border-border p-6 sticky top-24">
                  <h3 className="font-semibold mb-4">Quick Start</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">1</span>
                      <span className="text-foreground/70">
                        Connect your Git repository
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">2</span>
                      <span className="text-foreground/70">
                        Configure build settings
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">3</span>
                      <span className="text-foreground/70">
                        Deploy automatically on push
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <h4 className="font-semibold text-sm mb-3">
                      GitHub Integration
                    </h4>
                    <Button
                      variant="outline"
                      className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Connect GitHub
                    </Button>
                  </div>

                  <div className="mt-4">
                    <a
                      href="#docs"
                      className="text-primary text-sm hover:text-primary/80 transition-colors"
                    >
                      View documentation →
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
