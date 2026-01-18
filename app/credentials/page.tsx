'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CredentialsPage() {
  const router = useRouter();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!clientId.trim() || !clientSecret.trim()) {
      setError('Please enter both Client ID and Client Secret');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/music/top-artists', {
        method: 'GET',
        headers: {
          'X-Spotify-Client-Id': clientId,
          'X-Spotify-Client-Secret': clientSecret,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid credentials. Please check your Client ID and Secret.');
      }

      localStorage.setItem('spotify_client_id', clientId);
      localStorage.setItem('spotify_client_secret', clientSecret);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    localStorage.removeItem('spotify_client_id');
    localStorage.removeItem('spotify_client_secret');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition">
            <span className="font-semibold text-white">Music Trends</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)] px-4 sm:px-6 py-6 sm:py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Connect Spotify
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mb-2">Spotifyを接続</p>
            <p className="text-gray-400 text-xs sm:text-sm">Enter your API credentials to analyze your music</p>
          </div>

          {/* Form Card */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Client ID Input */}
              <div>
                <label htmlFor="clientId" className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Client ID
                </label>
                <input
                  type="text"
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Enter your Client ID"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-900 transition"
                />
              </div>

              {/* Client Secret Input */}
              <div>
                <label htmlFor="clientSecret" className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Client Secret
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="clientSecret"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    placeholder="Enter your Client Secret"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-900 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-xs sm:text-sm"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                  <p className="text-red-400 text-xs sm:text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Connect</span>
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-gray-700 mt-4 sm:mt-6 pt-4 sm:pt-6 text-center">
              <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">or</p>
              <button
                onClick={handleDemo}
                className="text-green-500 hover:text-green-400 font-medium text-xs sm:text-sm transition"
              >
                Explore with demo data
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 sm:mt-8 bg-green-900/20 border border-green-700/50 rounded-lg p-4 sm:p-6 text-xs sm:text-sm">
            <p className="font-semibold text-green-400 mb-2">Need credentials?</p>
            <p className="text-green-300 mb-2 sm:mb-3 text-xs sm:text-sm">Create a free Spotify Developer app at <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:opacity-70">developer.spotify.com</a></p>
            <p className="text-xs text-green-400">No user authentication needed—we use Client Credentials Flow.</p>
          </div>

          {/* Back Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition text-xs sm:text-sm">
              ← Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
