/**
 * GET /api/music/audio-features
 * Analyzes audio features from user's top tracks
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTopTracks, getAudioFeatures } from '@/lib/spotify';
import { calculateAverageAudioFeatures, formatErrorResponse } from '@/lib/transformers';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 50);
    const timeRange = (searchParams.get('timeRange') ?? 'medium_term') as 'short_term' | 'medium_term' | 'long_term';

    // Get credentials from headers (passed from client)
    const clientId = request.headers.get('X-Spotify-Client-Id') || undefined;
    const clientSecret = request.headers.get('X-Spotify-Client-Secret') || undefined;

    // Fetch top tracks
    const rawTracks = await getTopTracks(limit, timeRange, clientId, clientSecret);
    const trackIds = (rawTracks as any).items.map((track: any) => track.id);

    if (trackIds.length === 0) {
      return NextResponse.json(
        {
          features: {
            energy: 0,
            danceability: 0,
            tempo: 0,
            valence: 0,
            acousticness: 0,
          },
          tracksAnalyzed: 0,
          timeRange,
        },
        { status: 200 }
      );
    }

    // Fetch audio features for the tracks
    const rawFeatures = await getAudioFeatures(trackIds, clientId, clientSecret);

    // Calculate average audio features
    const features = calculateAverageAudioFeatures(rawFeatures as any);

    return NextResponse.json(
      {
        features,
        tracksAnalyzed: trackIds.length,
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
