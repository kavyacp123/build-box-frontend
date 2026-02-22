import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Copy, ExternalLink, Calendar, Link as LinkIcon, Code, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/DashboardSidebar";

interface ProjectDetail {
  id: number;
  name: string;
  slug: string;
  repoUrl: string;
  basePath: string;
  backend_link: string;
  deploy_url: string;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  team?: {
    id: number;
    name: string;
  };
  status?: string;
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectDetails();
  }, [slug]);

  const fetchProjectDetails = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:9000/api";
      const response = await axios.get(`${apiUrl}/projects/${slug}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProject(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch project details", err);
      setError("Failed to load project details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-foreground/60">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 ml-64 flex flex-col">
          <div className="border-b border-border bg-card/50 backdrop-blur-sm p-8">
            <Button variant="ghost" onClick={() => navigate("/dashboard/projects")} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error || "Project not found"}</p>
              <Button onClick={() => navigate("/dashboard/projects")}>Return to Projects</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const InfoField = ({ label, value, copyable = false, link = false }: { label: string; value: string | null; copyable?: boolean; link?: boolean }) => (
    <div className="mb-6">
      <label className="text-sm font-semibold text-foreground/70 block mb-2">{label}</label>
      <div className="flex items-center gap-2">
        {link ? (
          <a
            href={value || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center gap-1 break-all"
          >
            {value}
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          </a>
        ) : (
          <code className="bg-muted p-2 rounded text-sm block flex-1 break-all">{value || "—"}</code>
        )}
        {copyable && value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(value, label)}
            className="flex-shrink-0"
            title="Copy to clipboard"
          >
            <Copy className={`w-4 h-4 ${copied === label ? "text-green-500" : ""}`} />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm p-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/projects")}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-sm text-foreground/60 font-mono">{project.slug}</p>
            </div>
            {project.team && (
              <Badge variant="secondary" className="text-sm">
                Team: {project.team.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl">
            {/* Project Overview */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" /> Project Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-foreground/70">Project ID</label>
                  <p className="text-foreground mt-1">{project.id}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground/70 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Created At
                  </label>
                  <p className="text-foreground mt-1">
                    {new Date(project.createdAt).toLocaleDateString()} {new Date(project.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              {project.user && (
                <div className="mt-6 pt-6 border-t border-border">
                  <label className="text-sm font-semibold text-foreground/70">Owner</label>
                  <p className="text-foreground mt-1">{project.user.name}</p>
                  <p className="text-sm text-foreground/60">{project.user.email}</p>
                </div>
              )}
            </Card>

            {/* Repository Section */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-primary" /> Repository
              </h2>
              <InfoField label="Repository URL" value={project.repoUrl} copyable link />
              <InfoField label="Base Path" value={project.basePath} copyable />
            </Card>

            {/* Deployment Section */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-primary" /> Deployment
              </h2>
              <InfoField label="Deployment URL" value={project.deploy_url} copyable link />
              <InfoField label="Backend Link" value={project.backend_link} copyable link />
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => window.open(project.deploy_url, "_blank")}
                disabled={!project.deploy_url}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Deployment
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(project.repoUrl, "_blank")}
                disabled={!project.repoUrl}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Repository
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/dashboard/projects/${project.slug}/logs`)}
              >
                <Terminal className="w-4 h-4 mr-2" />
                View Backend Logs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
