/**
 * GET /api/music/genre-distribution
 * Analyzes genres from user's top artists
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTopArtists } from '@/lib/spotify';
import { transformTopArtists, extractGenreDistribution, formatErrorResponse } from '@/lib/transformers';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 50);
    const timeRange = (searchParams.get('timeRange') ?? 'medium_term') as 'short_term' | 'medium_term' | 'long_term';

    // Get credentials from headers (passed from client)
    const clientId = request.headers.get('X-Spotify-Client-Id') || undefined;
    const clientSecret = request.headers.get('X-Spotify-Client-Secret') || undefined;

    // Fetch top artists (need more artists to get good genre distribution)
    const rawData = await getTopArtists(limit, timeRange, clientId, clientSecret);
    const artists = transformTopArtists(rawData as any);

    // Extract genre distribution
    const genres = extractGenreDistribution(artists);

    return NextResponse.json(
      {
        genres,
        totalGenres: genres.length,
        totalArtists: artists.length,
        timeRange,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    const { message, status } = formatErrorResponse(error);
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
