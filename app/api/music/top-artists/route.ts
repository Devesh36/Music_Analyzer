/**
 * GET /api/music/top-artists
 * Fetches the user's top artists from Spotify and returns normalized data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTopArtists } from '@/lib/spotify';
import { transformTopArtists, extractGenreDistribution, formatErrorResponse } from '@/lib/transformers';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50);
    const timeRange = (searchParams.get('timeRange') ?? 'medium_term') as 'short_term' | 'medium_term' | 'long_term';

    // Get credentials from headers (passed from client)
    const clientId = request.headers.get('X-Spotify-Client-Id') || undefined;
    const clientSecret = request.headers.get('X-Spotify-Client-Secret') || undefined;

    // Validate parameters
    if (![1, 50].includes(limit) && (limit < 1 || limit > 50)) {
      return NextResponse.json(
        { error: 'limit must be between 1 and 50' },
        { status: 400 }
      );
    }

    if (!['short_term', 'medium_term', 'long_term'].includes(timeRange)) {
      return NextResponse.json(
        { error: 'timeRange must be short_term, medium_term, or long_term' },
        { status: 400 }
      );
    }

    // Fetch from Spotify
    const rawData = await getTopArtists(limit, timeRange, clientId, clientSecret);

    // Transform data
    const artists = transformTopArtists(rawData as any);
    const genreDistribution = extractGenreDistribution(artists);

    return NextResponse.json(
      {
        artists,
        genreDistribution,
        count: artists.length,
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
