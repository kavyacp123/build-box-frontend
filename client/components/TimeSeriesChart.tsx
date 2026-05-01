import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

interface TimeSeriesData {
  timeseries: Record<string, number>;
  interval: string;
  projectId: string;
  totalRequests: number;
}

interface TimeSeriesChartProps {
  projectSlug?: string;
  accountId?: string;
  days: number;
  interval?: 'day' | 'hour';
}

export function TimeSeriesChart({ projectSlug, accountId, days, interval = 'day' }: TimeSeriesChartProps) {
  const [data, setData] = useState<{timestamp: string, requests: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeSeriesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const analyticsApiUrl = import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:9012/api';
        
        let url: string;
        if (projectSlug) {
          url = `${analyticsApiUrl}/analytics/projects/${projectSlug}/timeseries?interval=${interval}&days=${days}`;
        } else if (accountId) {
          url = `${analyticsApiUrl}/analytics/account/timeseries?accountId=${accountId}&interval=${interval}&days=${days}`;
        } else {
          throw new Error('Either projectSlug or accountId must be provided');
        }
        
        console.log('[TimeSeriesChart] Fetching from:', url);
        
        const response = await axios.get<TimeSeriesData>(url);
        
        console.log('[TimeSeriesChart] Response:', response.data);
        
        // Transform the timeseries object into array format for recharts
        const chartData = Object.entries(response.data.timeseries).map(([timestamp, requests]) => ({
          timestamp,
          requests
        }));
        
        setData(chartData);
      } catch (err) {
        console.error('[TimeSeriesChart] Fetch error:', err);
        setError('Failed to load time-series data: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSeriesData();
  }, [projectSlug, accountId, days, interval]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Requests Over Time</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Requests Over Time</CardTitle>
        </CardHeader>
        <CardContent className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Requests Over Time</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-500 text-center py-8">
          No time-series data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Requests Over Time ({interval === 'hour' ? 'Hourly' : 'Daily'})</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              label={{ value: 'Requests', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px'
              }}
              formatter={(value) => [value, 'Requests']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="requests" 
              stroke="#3b82f6" 
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
              name="Total Requests"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
