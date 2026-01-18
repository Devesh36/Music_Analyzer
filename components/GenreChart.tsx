'use client';

/**
 * GenreChart Component
 * Client component for visualizing genre distribution with Recharts
 */

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface GenreItem {
  genre: string;
  count: number;
}

interface GenreChartProps {
  initialData?: GenreItem[];
}

const COLORS = [
  '#7c3aed', '#db2777', '#f59e0b', '#059669', '#2563eb',
  '#0891b2', '#dc2626', '#ea580c', '#8b5cf6', '#6366f1',
];

export default function GenreChart({ initialData = [] }: GenreChartProps) {
  const [data, setData] = useState<GenreItem[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData);
      setLoading(false);
      return;
    }

    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers: HeadersInit = {};
        const clientId = typeof window !== 'undefined' ? localStorage.getItem('spotify_client_id') : null;
        const clientSecret = typeof window !== 'undefined' ? localStorage.getItem('spotify_client_secret') : null;
        if (clientId) headers['X-Spotify-Client-Id'] = clientId;
        if (clientSecret) headers['X-Spotify-Client-Secret'] = clientSecret;

        const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/music/genre-distribution`, { headers });

        if (!response.ok) {
          throw new Error(`Failed to fetch genre distribution: ${response.status}`);
        }

        const result = await response.json();
        console.log('Genre fetch result:', result);
        setData(result.genres || []);
      } catch (err) {
        console.error('Genre fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [initialData]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6">
          Genre Distribution
        </h2>
        <div className="flex items-center justify-center h-64 sm:h-80 bg-gray-800/30 rounded-lg sm:rounded-xl">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-green-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm sm:text-base">Loading genre data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-red-700/50 p-4 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6">
          Genre Distribution
        </h2>
        <div className="bg-red-900/30 border border-red-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <p className="text-red-400 text-xs sm:text-sm">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6">
          Genre Distribution
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No genre data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 shadow-2xl">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">
        Genre Distribution
      </h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">ジャンル分布</p>

      <div className="w-full mb-4 sm:mb-6 bg-gray-800/30 rounded-lg sm:rounded-xl p-2 sm:p-4" style={{ minHeight: '280px', height: '280px' }}>
        <ResponsiveContainer width="100%" height={260} minWidth={200}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 15, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="genre"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value) => [`${value} artists`, 'Count']}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={1000}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="bg-green-600/20 border border-green-600/30 p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Genres</p>
          <p className="text-2xl sm:text-3xl font-black text-green-400">
            {data.length}
          </p>
        </div>
        <div className="bg-green-600/10 border border-green-600/20 p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Most Common</p>
          <p className="text-lg sm:text-xl font-bold text-green-400 capitalize truncate">
            {data[0]?.genre}
          </p>
        </div>
      </div>
    </div>
  );
}
