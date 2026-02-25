import { useEffect, useState } from 'react';
import { Activity, Users, AlertCircle, Clock, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar';
import axios from 'axios';

interface AnalyticsData {
  totalRequests: number;
  uniqueUsers: number;
  errorCount: number;
  errorRate: string;
  avgResponseTime: string;
  totalBytesIn: number;
  totalBytesOut: number;
  methodBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
  topPaths: Record<string, number>;
  days: number;
}

export default function AccountAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use accountId if available, fallback to userId, then to 'default'
        const accountId = localStorage.getItem('accountId') || localStorage.getItem('userId') || 'default';
        const analyticsApiUrl = import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:9001/api';
        
        console.log('[AccountAnalytics] Fetching from:', `${analyticsApiUrl}/analytics/account`);
        console.log('[AccountAnalytics] AccountId:', accountId);
        
        const response = await axios.get(`${analyticsApiUrl}/analytics/account?accountId=${accountId}&days=${days}`);
        console.log('[AccountAnalytics] Response:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('[AccountAnalytics] Fetch error:', err);
        setError('Failed to load analytics data: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [days]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return ((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-gray-500">No analytics data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 overflow-auto">
        <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Account Analytics</h1>
          <p className="text-gray-600 mt-1">Last {days} days</p>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded font-medium transition ${
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

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-gray-600">API calls processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueUsers}</div>
            <p className="text-xs text-gray-600">Unique IP addresses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.errorRate}%</div>
            <p className="text-xs text-gray-600">{data.errorCount} errors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgResponseTime}ms</div>
            <p className="text-xs text-gray-600">Mean latency</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Transfer Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inbound Traffic</CardTitle>
            <Download className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(data.totalBytesIn)}</div>
            <p className="text-xs text-gray-600">Request bodies received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outbound Traffic</CardTitle>
            <Upload className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(data.totalBytesOut)}</div>
            <p className="text-xs text-gray-600">Response bodies sent</p>
          </CardContent>
        </Card>
      </div>

      {/* Request Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Requests by Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.methodBreakdown).map(([method, count]) => (
                <div key={method} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {method || 'UNKNOWN'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (count / data.totalRequests) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requests by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.sourceBreakdown).map(([source, count]) => {
                const sourceColor =
                  source === 'frontend'
                    ? 'bg-purple-500'
                    : source === 'backend'
                      ? 'bg-cyan-500'
                      : 'bg-gray-500';
                return (
                  <div key={source} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {source}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`${sourceColor} h-2 rounded-full`}
                          style={{
                            width: `${
                              (count / data.totalRequests) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Paths */}
      <Card>
        <CardHeader>
          <CardTitle>Top Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(data.topPaths)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([path, count]) => (
                <div key={path} className="flex justify-between items-center">
                  <span className="text-sm font-mono text-gray-700 truncate">
                    {path}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-40 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (count / Math.max(...Object.values(data.topPaths))) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
}
