import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Rocket, CheckCircle, Clock, AlertCircle } from "lucide-react";

const getStatusIcon = (status) => {
  switch (status?.toUpperCase()) {
    case "SUCCESS": return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "FAILED": return <AlertCircle className="w-4 h-4 text-red-500" />;
    case "IN_PROGRESS": return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
    default: return <Clock className="w-4 h-4 text-foreground/40" />;
  }
};

export default function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        const response = await axios.get(`${apiUrl}/deployments`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setDeployments(response.data);
      } catch (err) {
        console.error("Failed to fetch deployments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeployments();
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <div className="border-b border-border p-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" /> Deployments
          </h1>
          <p className="text-sm text-foreground/60">History of all your builds</p>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <p>Loading history...</p>
          ) : (
            <Card className="divide-y divide-border overflow-hidden">
              {deployments.map(d => (
                <div key={d.id} className="p-4 flex items-center justify-between hover:bg-card/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(d.status)}
                    <div>
                      <p className="font-semibold text-sm">Deployment #{d.id}</p>
                      <p className="text-xs text-foreground/60">{d.commitMessage || "No commit message"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-foreground/40">{d.commitId?.substring(0, 7) || "Local"}</p>
                    <p className="text-xs text-foreground/60">{d.createdAt ? formatDistanceToNow(new Date(d.createdAt)) + " ago" : ""}</p>
                  </div>
                </div>
              ))}
              {deployments.length === 0 && (
                <div className="p-12 text-center text-foreground/40">
                  <Rocket className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No deployments found yet.</p>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
