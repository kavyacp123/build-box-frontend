import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Boxes, Plus, CheckCircle, Clock, AlertCircle, Trash2 } from "lucide-react";

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "failed": return <AlertCircle className="w-4 h-4 text-red-500" />;
    case "building": case "in_progress": return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
    default: return null;
  }
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
      const response = await axios.get(`${apiUrl}/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (slug) => {
    if (!confirm("Are you sure you want to delete this project? Statistics and deployment history will be lost.")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
      await axios.delete(`${apiUrl}/projects/${slug}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
      alert("Failed to delete project.");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm p-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Boxes className="w-6 h-6 text-primary" /> Projects
            </h1>
            <p className="text-sm text-foreground/60">Manage your deployments</p>
          </div>
          <Link to="/dashboard/projects/new">
            <Button><Plus className="w-4 h-4 mr-2" /> New Project</Button>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <Card key={p.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    {getStatusIcon(p.status)}
                  </div>
                  <p className="text-sm text-foreground/60 mb-4 font-mono truncate">{p.repoUrl}</p>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/projects/${p.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-foreground/40 hover:text-red-500 transition-colors"
                      onClick={() => handleDeleteProject(p.slug)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
