'use client';

/**
 * AudioFeatures Component
 * Client component for visualizing audio features with Recharts
 */

import { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { AudioFeaturesStats } from '@/lib/transformers';

interface AudioFeaturesProps {
  initialData?: AudioFeaturesStats | any;
}

export default function AudioFeatures({ initialData }: AudioFeaturesProps) {
  const [data, setData] = useState<AudioFeaturesStats | null>(
    initialData && typeof initialData === 'object' && 'energy' in initialData ? initialData : null
  );
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData && typeof initialData === 'object' && 'energy' in initialData) {
      setData(initialData);
      setLoading(false);
      return;
    }

    const fetchAudioFeatures = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers: HeadersInit = {};
        const clientId = typeof window !== 'undefined' ? localStorage.getItem('spotify_client_id') : null;
        const clientSecret = typeof window !== 'undefined' ? localStorage.getItem('spotify_client_secret') : null;
        if (clientId) headers['X-Spotify-Client-Id'] = clientId;
        if (clientSecret) headers['X-Spotify-Client-Secret'] = clientSecret;

        const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/music/audio-features`, { headers });

        if (!response.ok) {
          throw new Error(`Failed to fetch audio features: ${response.status}`);
        }

        const result = await response.json();
        console.log('Audio features result:', result);
        setData(result.features || result);
      } catch (err) {
        console.error('Audio features fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFeatures();
  }, [initialData]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6">
          Audio Features Analysis
        </h2>
        <div className="flex items-center justify-center h-64 sm:h-80">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-600/30 border-t-green-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm sm:text-base">Loading audio features...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black border border-red-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6">
          Audio Features Analysis
        </h2>
        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 sm:p-4">
          <p className="text-red-400 text-xs sm:text-sm">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6">
          Audio Features Analysis
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No audio features data available</p>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Energy', value: Math.round(data.energy * 100) },
    { name: 'Danceability', value: Math.round(data.danceability * 100) },
    { name: 'Valence', value: Math.round(data.valence * 100) },
    { name: 'Acousticness', value: Math.round(data.acousticness * 100) },
  ];

  const features = [
    {
      label: 'Energy',
      value: data.energy,
      description: 'Intensity & activity',
      color: 'from-gray-800/40 to-gray-900/40',
      textColor: 'text-green-400',
      icon: '⚡',
    },
    {
      label: 'Danceability',
      value: data.danceability,
      description: 'Suitable for dancing',
      color: 'from-gray-800/40 to-gray-900/40',
      textColor: 'text-green-400',
      icon: '💃',
    },
    {
      label: 'Valence',
      value: data.valence,
      description: 'Musical positivity',
      color: 'from-gray-800/40 to-gray-900/40',
      textColor: 'text-green-400',
      icon: '😊',
    },
    {
      label: 'Acousticness',
      value: data.acousticness,
      description: 'Acoustic instruments',
      color: 'from-gray-800/40 to-gray-900/40',
      textColor: 'text-green-400',
      icon: '🎸',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 shadow-2xl">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">
        Audio Features Analysis
      </h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">オーディオ機能分析</p>

      {/* Radar Chart */}
      <div className="w-full mb-6 sm:mb-8 bg-gray-800/30 rounded-lg sm:rounded-xl p-2 sm:p-4" style={{ minHeight: '280px', height: '280px' }}>
        <ResponsiveContainer width="100%" height={260} minWidth={200}>
          <RadarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <PolarGrid stroke="#374151" opacity={0.3} />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#9ca3af' }} />
            <Radar
              name="Features"
              dataKey="value"
              stroke="#10b981"
              fill="#059669"
              fillOpacity={0.3}
              animationDuration={1000}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {features.map((feature) => (
          <div
            key={feature.label}
            className={`bg-gradient-to-br ${feature.color} rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50 hover:border-green-600/30 backdrop-blur-sm transition-all duration-300`}
          >
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{feature.icon}</span>
                  <h3 className={`font-semibold text-xs sm:text-sm text-white truncate`}>{feature.label}</h3>
                </div>
                <p className="text-xs text-gray-400">{feature.description}</p>
              </div>
              <span className={`text-lg sm:text-2xl font-bold ${feature.textColor} flex-shrink-0 ml-2`}>
                {(feature.value * 100).toFixed(0)}%
              </span>
            </div>
            <div className="bg-gray-700/40 rounded-full h-1.5 sm:h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                style={{ width: `${feature.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tempo Stats */}
      <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-600/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
        <h3 className="font-black text-white mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
          Tempo Information
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-green-400">
              {Math.round(data.tempo)}
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">BPM</p>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-300">
              {data.tempo < 100
                ? 'Relaxed tempo - perfect for unwinding'
                : data.tempo < 130
                  ? 'Moderate tempo - steady and balanced'
                  : 'Energetic tempo - fast-paced and uplifting'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
