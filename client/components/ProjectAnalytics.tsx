import { useEffect, useState } from 'react';
import { Activity, Users, AlertCircle, Clock, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { TimeSeriesChart } from './TimeSeriesChart';

interface ProjectAnalyticsData {
  totalRequests: number;
  uniqueUsers: number;
  errorCount: number;
  errorRate: string;
  avgResponseTime: string;
  totalBytesIn: number;
  totalBytesOut: number;
  methodBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
  statusBreakdown: Record<number, number>;
  topPaths: Record<string, number>;
  days: number;
}

interface ProjectAnalyticsProps {
  projectSlug: string;
}

export function ProjectAnalytics({ projectSlug }: ProjectAnalyticsProps) {
  const [data, setData] = useState<ProjectAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const analyticsApiUrl = import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:9012/api';
        
        console.log('[ProjectAnalytics] Fetching from:', `${analyticsApiUrl}/analytics/projects/${projectSlug}`);
        
        const response = await axios.get(
          `${analyticsApiUrl}/analytics/projects/${projectSlug}?days=${days}`
        );
        console.log('[ProjectAnalytics] Response:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('[ProjectAnalytics] Fetch error:', err);
        setError('Failed to load analytics data: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [projectSlug, days]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return ((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-gray-500">No analytics data available</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Analytics</h2>
          <p className="text-gray-600 text-sm mt-1">Last {days} days</p>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                days === d
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Requests</p>
                <p className="text-lg font-bold mt-1">
                  {data.totalRequests.toLocaleString()}
                </p>
              </div>
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Unique Users</p>
                <p className="text-lg font-bold mt-1">{data.uniqueUsers}</p>
              </div>
              <Users className="h-4 w-4 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Error Rate</p>
                <p className="text-lg font-bold mt-1">{data.errorRate}%</p>
              </div>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Avg Response</p>
                <p className="text-lg font-bold mt-1">{data.avgResponseTime}ms</p>
              </div>
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time-Series Chart */}
      <TimeSeriesChart projectSlug={projectSlug} days={days} interval={days > 7 ? 'day' : 'day'} />

      {/* Traffic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Download className="h-4 w-4" />
              Inbound Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatBytes(data.totalBytesIn)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Outbound Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatBytes(data.totalBytesOut)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Methods & Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">HTTP Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(data.methodBreakdown).map(([method, count]) => (
                <div key={method} className="flex justify-between text-sm">
                  <span className="text-gray-700">{method}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Request Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(data.sourceBreakdown).map(([source, count]) => (
                <div key={source} className="flex justify-between text-sm">
                  <span className="text-gray-700 capitalize">{source}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Codes */}
      {Object.keys(data.statusBreakdown).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">HTTP Status Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(data.statusBreakdown)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([status, count]) => {
                  const statusNum = parseInt(status);
                  let bgColor = 'bg-gray-100';
                  if (statusNum < 300) bgColor = 'bg-green-100';
                  else if (statusNum < 400) bgColor = 'bg-blue-100';
                  else if (statusNum < 500) bgColor = 'bg-yellow-100';
                  else bgColor = 'bg-red-100';

                  return (
                    <div
                      key={status}
                      className={`${bgColor} p-3 rounded text-center`}
                    >
                      <p className="text-lg font-bold">{status}</p>
                      <p className="text-xs text-gray-600">{count}</p>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Top Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(data.topPaths)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([path, count]) => (
                <div key={path} className="flex justify-between items-center">
                  <span className="text-sm font-mono text-gray-700 truncate">
                    {path}
                  </span>
                  <span className="text-sm font-medium ml-2">{count}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
