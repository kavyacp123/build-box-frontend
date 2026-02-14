import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, TrendingUp, Boxes, Rocket, CheckCircle, XCircle } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card } from "@/components/ui/card";

export default function Analytics() {
  const [stats, setStats] = useState({ totalProjects: 0, totalDeployments: 0, successRate: 0, failedDeployments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [projRes, depRes] = await Promise.all([
          axios.get(`${apiUrl}/projects`, { headers }),
          axios.get(`${apiUrl}/deployments`, { headers })
        ]);

        const projects = projRes.data;
        const deployments = depRes.data;
        const success = deployments.filter(d => d.status === "SUCCESS" || d.status === "READY").length;
        const failed = deployments.filter(d => d.status === "FAILED").length;

        setStats({
          totalProjects: projects.length,
          totalDeployments: deployments.length,
          failedDeployments: failed,
          successRate: deployments.length > 0 ? Math.round((success / deployments.length) * 100) : 0
        });
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <div className="border-b border-border p-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Analytics
          </h1>
          <p className="text-sm text-foreground/60">Platform-wide usage and performance</p>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <p>Analyzing data...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <Boxes className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-foreground/60">Total Projects</span>
                </div>
                <p className="text-2xl font-bold">{stats.totalProjects}</p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <Rocket className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-foreground/60">Total Deployments</span>
                </div>
                <p className="text-2xl font-bold">{stats.totalDeployments}</p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-foreground/60">Success Rate</span>
                </div>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-foreground/60">Failed Builds</span>
                </div>
                <p className="text-2xl font-bold">{stats.failedDeployments}</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
