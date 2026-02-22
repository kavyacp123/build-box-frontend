import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ArrowLeft, Terminal, RefreshCw, AlertCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function BackendLogs() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const fetchLogs = async () => {
    if (!slug) {
      setError("No project slug provided");
      setLoading(false);
      return;
    }

    try {
      const buildServerUrl = import.meta.env.VITE_BUILD_SERVER_URL || "http://localhost:9191";
      const response = await axios.get<string[]>(`${buildServerUrl}/api/builds/tasks/${slug}/logs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      
      setLogs(response.data || []);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch logs", err);
      if (err.response?.status === 404) {
        setError("No backend task found for this project. The project may not be deployed yet.");
      } else {
        setError("Failed to load backend logs. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [slug]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchLogs();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, slug]);

  const handleRefresh = () => {
    setLoading(true);
    fetchLogs();
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/dashboard/projects/${slug}`)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Project
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-primary" />
                  Backend Logs
                </h1>
                <p className="text-sm text-foreground/60 mt-1 font-mono">{slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Logs Content */}
        <div className="flex-1 overflow-hidden p-6">
          <Card className="h-full flex flex-col">
            {loading && logs.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-foreground/60">Loading backend logs...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-foreground/80 mb-4">{error}</p>
                  <Button onClick={handleRefresh} variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-md font-mono text-sm">
                {logs.length === 0 ? (
                  <div className="text-slate-400 text-center py-8">
                    No logs available yet. Deploy your project to see logs here.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className={`${
                          log.toLowerCase().includes("error")
                            ? "text-red-400"
                            : log.toLowerCase().includes("warn")
                            ? "text-yellow-400"
                            : log.toLowerCase().includes("success") || log.toLowerCase().includes("✓")
                            ? "text-green-400"
                            : "text-slate-300"
                        }`}
                      >
                        <span className="text-slate-500 mr-2 select-none">
                          {String(index + 1).padStart(4, "0")}
                        </span>
                        {log}
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                )}
              </div>
            )}
            {autoRefresh && !error && (
              <div className="border-t border-border p-3 text-sm text-foreground/60 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Auto-refreshing every 5 seconds...
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
