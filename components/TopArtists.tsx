/**
 * TopArtists Component
 * Client component that fetches and displays top artists
 */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TopArtist } from '@/lib/transformers';

interface TopArtistsProps {
  clientId?: string | null;
  clientSecret?: string | null;
}

export default function TopArtists({ clientId, clientSecret }: TopArtistsProps) {
  const [artists, setArtists] = useState<TopArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const headers: HeadersInit = {};
        if (clientId) headers['X-Spotify-Client-Id'] = clientId;
        if (clientSecret) headers['X-Spotify-Client-Secret'] = clientSecret;

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/music/top-artists?limit=10`, {
          headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch top artists');
        }

        const data = await response.json();
        setArtists(data.artists || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load top artists';
        setError(message);
        console.error('Error fetching top artists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, [clientId, clientSecret]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 animate-pulse shadow-2xl">
        <div className="h-6 sm:h-8 bg-gray-800/50 rounded w-1/2 mb-4 sm:mb-6" />
        <div className="space-y-2 sm:space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 sm:h-12 bg-gray-800/50 rounded-lg sm:rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-red-700/50 p-4 sm:p-8 shadow-2xl">
        <h3 className="text-red-400 font-semibold mb-2 text-xs sm:text-sm">Error Loading Artists</h3>
        <p className="text-red-300 text-xs sm:text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-8 shadow-2xl">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">
        Top Artists
      </h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-8">あなたのトップアーティスト</p>

      {artists && artists.length > 0 ? (
        <div className="space-y-2 sm:space-y-4">
          {artists.map((artist: TopArtist, index: number) => (
            <div
              key={artist.id}
              className="group relative bg-gray-800/40 hover:bg-green-600/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50 hover:border-green-600/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                {/* Rank Badge */}
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {index + 1}
                </div>

                {/* Artist Image or Initials */}
                {artist.imageUrl ? (
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0 ring-2 ring-green-200"
                    onError={(e) => {
                      // If image fails to load, hide it
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                {!artist.imageUrl && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 ring-2 ring-green-200 flex items-center justify-center text-white font-bold text-xs">
                    {artist.name.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Artist Info */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-white truncate text-xs sm:text-sm">
                    {artist.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-grow bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-green-600 h-1 rounded-full transition-all"
                        style={{ width: `${artist.popularity}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                      {artist.popularity}%
                    </span>
                  </div>
                  {artist.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5 sm:mt-2">
                      {artist.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="text-xs bg-green-600/20 text-green-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-green-600/30"
                        >
                          {genre}
                        </span>
                      ))}
                      {artist.genres.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{artist.genres.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 text-xs sm:text-sm">No artists found. Check your Spotify credentials.</p>
        </div>
      )}
    </div>
  );
}
