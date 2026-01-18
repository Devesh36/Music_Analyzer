/**
 * Dashboard Page
 * Main page displaying music trends and analysis
 * Client-side component that checks for stored credentials
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import TopArtists from '@/components/TopArtists';
import GenreChart from '@/components/GenreChart';
import AudioFeatures from '@/components/AudioFeatures';

function LoadingCard() {
  return (
    <div className="bg-gray-800/40 rounded-lg p-4 sm:p-6 animate-pulse border border-gray-700/50 backdrop-blur-sm">
      <div className="h-6 sm:h-8 bg-gray-700/50 rounded w-1/3 mb-4 sm:mb-6" />
      <div className="space-y-2 sm:space-y-3">
        <div className="h-3 sm:h-4 bg-gray-700/50 rounded" />
        <div className="h-3 sm:h-4 bg-gray-700/50 rounded w-5/6" />
      </div>
    </div>
  );
}

function DashboardContent() {
  const [genreData, setGenreData] = useState<any[]>([]);
  const [audioFeaturesData, setAudioFeaturesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Get credentials from localStorage
    const id = localStorage.getItem('spotify_client_id');
    const secret = localStorage.getItem('spotify_client_secret');
    setClientId(id);
    setClientSecret(secret);

    // Fetch data
    const fetchData = async () => {
      try {
        const headers: HeadersInit = {};
        if (id) headers['X-Spotify-Client-Id'] = id;
        if (secret) headers['X-Spotify-Client-Secret'] = secret;

        // Fetch genre data
        const genreResponse = await fetch('/api/music/genre-distribution', {
          headers,
        });
        if (genreResponse.ok) {
          const genreResult = await genreResponse.json();
          setGenreData(genreResult.genres || []);
        }

        // Fetch audio features data
        const audioResponse = await fetch('/api/music/audio-features', {
          headers,
        });
        if (audioResponse.ok) {
          setAudioFeaturesData(await audioResponse.json());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotify_client_id');
    localStorage.removeItem('spotify_client_secret');
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition">
            <span className="font-semibold text-white">Music Trends</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2">
              Your Music Story
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm lg:text-base mb-2 sm:mb-4">あなたの音楽ストーリー</p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl font-light">
              {clientId && clientSecret
                ? 'Analyzing your real Spotify data...'
                : 'Viewing sample data with popular artists and trends.'}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 mb-12">
            {/* Left Column - Top Artists */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Suspense fallback={<LoadingCard />}>
                  <TopArtists clientId={clientId} clientSecret={clientSecret} />
                </Suspense>
              </div>
            </div>

            {/* Right Column - Charts */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-6">
              {/* Genre Distribution */}
              <GenreChart initialData={genreData} />

              {/* Audio Features */}
              <AudioFeatures initialData={audioFeaturesData} />
            </div>
          </div>

          {/* Info Box */}
          {!clientId && !clientSecret && (
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 sm:p-6 text-xs sm:text-sm">
              <p className="text-green-300">
                <strong>Demo Mode</strong> — This dashboard is showing sample data. To analyze your real Spotify listening habits,{' '}
                <Link href="/credentials" className="underline font-medium hover:opacity-70">
                  connect your Spotify account
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default DashboardContent;
