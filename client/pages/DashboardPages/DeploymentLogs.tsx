import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { stat } from "fs";

interface DeploymentLogsResponse {
  logs: string[];
  status: "SUCCESS" | "FAILED" | "IN_PROGRESS" | "PENDING";
}

export default function DeploymentLogs() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const [searchParams] = useSearchParams();

  // 👇 projectName should be passed as ?project=xxx
  const projectName = searchParams.get("project");

  // 👇 userId stored at login time
  const userId = localStorage.getItem("userId");

  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<DeploymentLogsResponse["status"]>("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  useEffect(() => {
    if (!taskId) {
      setError("No task ID provided");
      return;
    }

    setLoading(true);

    const eventSource = new EventSource(
      `http://localhost:9001/api/v2/buildLogs/${taskId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data: DeploymentLogsResponse = JSON.parse(event.data);

        setLogs(data.logs || []);
        setStatus(data.status);
        setLoading(false);

        if (data.status === "SUCCESS" || data.status === "FAILED") {
          eventSource.close();
        }
      } catch (err) {
        console.error("Failed to parse SSE data", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error", err);
      setError("Lost connection to log stream.");
      setLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [status === "IN_PROGRESS" || status === "PENDING"]);

  const getStatusIcon = () => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "FAILED":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "SUCCESS":
        return "Deployment Successful";
      case "FAILED":
        return "Deployment Failed";
      default:
        return "Deployment In Progress";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "SUCCESS":
        return "text-green-500 border-green-500/20 bg-green-500/10";
      case "FAILED":
        return "text-red-500 border-red-500/20 bg-red-500/10";
      default:
        return "text-primary border-primary/20 bg-primary/10";
    }
  };

  // 🌍 Construct URL ONLY in frontend
  const frontendUrl =
    status === "SUCCESS" && userId && projectName
      ? `https://buildbox-frontend.s3.ap-south-1.amazonaws.com/${userId}/${projectName}/Frontend/index.html`
      : null;

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

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Deployment Logs</h1>
                <p className="text-foreground/60 text-sm mt-1">
                  Task ID: {taskId}
                </p>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="text-sm font-medium">{getStatusText()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Card className="bg-card border border-border">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Build Logs</h2>

                {error && (
                  <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {loading && logs.length === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    <span className="ml-2 text-foreground/60">Connecting to log stream...</span>
                  </div>
                )}

                {logs.length > 0 && (
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div className="space-y-1">
                      {logs.map((log, index) => (
                        <div key={index} className="text-foreground/90 whitespace-pre-wrap break-words">
                          {log}
                        </div>
                      ))}
                    </div>
                    <div ref={logsEndRef} />
                  </div>
                )}

                {/* ✅ SUCCESS ACTIONS */}
                {status === "SUCCESS" && frontendUrl && (
                  <div className="mt-6 flex gap-4 items-center">
                    <a
                      href={frontendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Live Website
                    </a>

                    <Button variant="outline" onClick={() => navigate("/dashboard")}>
                      Back to Dashboard
                    </Button>
                  </div>
                )}

                {/* ❌ FAILED ACTIONS */}
                {status === "FAILED" && (
                  <div className="mt-6 flex gap-3">
                    <Button onClick={() => navigate("/dashboard/projects/new")}>
                      Try Again
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/dashboard")}>
                      Back to Dashboard
                    </Button>
                  </div>
                )}

              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
