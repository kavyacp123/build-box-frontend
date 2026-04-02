import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ArrowLeft, Terminal, RefreshCw, AlertCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type RuntimeLogEntry = {
  source: string;
  message: string;
};

export default function BackendLogs() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [logs, setLogs] = useState<RuntimeLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const closeStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const appendLog = (data: string) => {
    if (!data) {
      return;
    }

    console.log("Received log data:", data);

    const separatorIndex = data.indexOf("|");
    const source = separatorIndex >= 0 ? data.slice(0, separatorIndex) : "runtime";
    const message = separatorIndex >= 0 ? data.slice(separatorIndex + 1) : data;

    if (source === "heartbeat") {
      return;
    }

    setLogs((prev) => [...prev, { source, message }]);
    setLoading(false);
  };

  const openStream = (resetLogs: boolean) => {
    if (!slug) {
      setError("No project slug provided");
      setLoading(false);
      return;
    }

    closeStream();
    if (resetLogs) {
      setLogs([]);
    }

    setLoading(true);
    setError(null);

    const runtimeApiUrl = import.meta.env.VITE_RUNTIME_LOGS_URL || "http://localhost:9012";
    const streamUrl = `${runtimeApiUrl}/api/v2/runtime/${slug}/logs`;
    const eventSource = new EventSource(streamUrl);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("log", (event) => {
      const data = typeof event.data === "string" ? event.data : "";
      appendLog(data);
    });

    eventSource.addEventListener("system", (event) => {
      const data = typeof event.data === "string" ? event.data : "";
      appendLog(data);
    });

    eventSource.addEventListener("heartbeat", () => {
      setLoading(false);
    });

    eventSource.onerror = (err) => {
      console.error("SSE error", err);
      setError("Lost connection to runtime log stream.");
      setLoading(false);
      closeStream();
    };
  };

  useEffect(() => {
    if (!autoRefresh) {
      closeStream();
      return undefined;
    }

    openStream(true);

    return () => closeStream();
  }, [autoRefresh, slug]);

  const handleRefresh = () => {
    if (!autoRefresh) {
      setAutoRefresh(true);
    }
    openStream(true);
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
                {autoRefresh ? "Live stream ON" : "Live stream OFF"}
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
                              log.message.toLowerCase().includes("error")
                            ? "text-red-400"
                                : log.message.toLowerCase().includes("warn")
                            ? "text-yellow-400"
                                : log.message.toLowerCase().includes("success") || log.message.toLowerCase().includes("✓")
                            ? "text-green-400"
                            : "text-slate-300"
                        }`}
                      >
                        <span className="text-slate-500 mr-2 select-none">
                          {String(index + 1).padStart(4, "0")}
                        </span>
                            <span className="text-slate-500 mr-2 uppercase">[{log.source}]</span>
                            {log.message}
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
                    Live streaming runtime logs...
                  </div>
                )}
          </Card>
        </div>
      </div>
    </div>
  );
}
