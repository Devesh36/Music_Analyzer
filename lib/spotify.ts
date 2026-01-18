/**
 * Spotify Web API utility with token caching and automatic refresh
 * Handles authentication and provides methods to fetch music data
 * Falls back to mock data when credentials are not available
 */

import {
  MOCK_TOP_ARTISTS,
  MOCK_TOP_TRACKS,
  MOCK_AUDIO_FEATURES,
} from './mockData';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

// Token cache per credentials pair
const tokenCaches = new Map<string, TokenCache>();

/**
 * Get or refresh the Spotify access token using Client Credentials Flow
 * @param clientId - Spotify Client ID
 * @param clientSecret - Spotify Client Secret
 */
async function getAccessToken(clientId?: string, clientSecret?: string): Promise<string> {
  // Check environment variables as fallback
  const id = clientId || process.env.SPOTIFY_CLIENT_ID;
  const secret = clientSecret || process.env.SPOTIFY_CLIENT_SECRET;

  // Use mock token if credentials are not available
  if (!id || !secret) {
    return 'mock-token-' + Date.now();
  }

  const cacheKey = `${id}:${secret}`;

  // Check if cached token is still valid
  const cached = tokenCaches.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.accessToken;
  }

  // Encode credentials in base64
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Spotify token request failed: ${response.statusText}`);
    }

    const data = await response.json() as {
      access_token: string;
      expires_in: number;
      token_type: string;
    };

    // Cache the token with expiration time (subtract 60 seconds for safety margin)
    const tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };

    tokenCaches.set(cacheKey, tokenCache);
    return data.access_token;
  } catch (error) {
    throw new Error(`Failed to authenticate with Spotify: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Make an authenticated request to the Spotify Web API
 */
async function spotifyRequest<T>(
  endpoint: string,
  clientId?: string,
  clientSecret?: string,
  options: RequestInit = {}
): Promise<T> {
  // Check if we should use mock data
  const shouldUseMockData = !clientId && !clientSecret && !process.env.SPOTIFY_CLIENT_ID && !process.env.SPOTIFY_CLIENT_SECRET;

  // Return mock data if credentials are not available
  if (shouldUseMockData) {
    if (endpoint.includes('/me/top/artists')) {
      return MOCK_TOP_ARTISTS as T;
    }
    if (endpoint.includes('/me/top/tracks')) {
      return MOCK_TOP_TRACKS as T;
    }
    if (endpoint.includes('/audio-features')) {
      return MOCK_AUDIO_FEATURES as T;
    }
    return {} as T;
  }

  const token = await getAccessToken(clientId, clientSecret);

  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Spotify API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Get current user's top artists
 */
export async function getTopArtists(
  limit: number = 20,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
): Promise<any> {
  const data = await spotifyRequest(
    `/me/top/artists?limit=${limit}&time_range=${timeRange}`
  );
  return data;
}

/**
 * Get audio features for multiple tracks
 */
export async function getAudioFeatures(trackIds: string[]): Promise<any> {
  if (trackIds.length === 0) {
    return { audio_features: [] };
  }

  // Spotify API limits to 100 IDs per request
  const chunks = [];
  for (let i = 0; i < trackIds.length; i += 100) {
    chunks.push(trackIds.slice(i, i + 100));
  }

  const results = await Promise.all(
    chunks.map((chunk) =>
      spotifyRequest(`/audio-features?ids=${chunk.join(',')}`)
    )
  );

  return {
    audio_features: results.flatMap((r: any) => r.audio_features),
  };
}

/**
 * Get current user's top tracks
 */
export async function getTopTracks(
  limit: number = 50,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
): Promise<any> {
  const data = await spotifyRequest(
    `/me/top/tracks?limit=${limit}&time_range=${timeRange}`
  );
  return data;
}

/**
 * Search for artists
 */
export async function searchArtists(query: string, limit: number = 20) {
  const data = await spotifyRequest(
    `/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}`
  );
  return data;
}

export type { TokenCache };
