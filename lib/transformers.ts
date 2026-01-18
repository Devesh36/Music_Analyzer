/**
 * Data transformation utilities
 * Normalize and transform raw Spotify API data for frontend consumption
 */

interface RawArtist {
  id: string;
  name: string;
  popularity: number;
  genres: string[];
  images: Array<{ url: string }>;
}

interface RawAudioFeature {
  id: string;
  energy: number;
  danceability: number;
  tempo: number;
  valence: number;
  acousticness: number;
}

interface RawArtistsResponse {
  items: RawArtist[];
}

interface RawAudioFeaturesResponse {
  audio_features: (RawAudioFeature | null)[];
}

export interface TopArtist {
  id: string;
  name: string;
  popularity: number;
  genres: string[];
  imageUrl: string | null;
}

export interface GenreItem {
  genre: string;
  count: number;
}

export interface AudioFeaturesStats {
  energy: number;
  danceability: number;
  tempo: number;
  valence: number;
  acousticness: number;
}

/**
 * Transform raw artists data to frontend format
 */
export function transformTopArtists(rawData: RawArtistsResponse): TopArtist[] {
  return rawData.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    popularity: artist.popularity,
    genres: artist.genres,
    imageUrl: artist.images[0]?.url ?? null,
  }));
}

/**
 * Extract and count genres from artists
 */
export function extractGenreDistribution(artists: TopArtist[]): GenreItem[] {
  const genreCount: Record<string, number> = {};

  artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genreCount[genre] = (genreCount[genre] ?? 0) + 1;
    });
  });

  return Object.entries(genreCount)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15); // Top 15 genres
}

/**
 * Calculate average audio features
 */
export function calculateAverageAudioFeatures(
  rawFeatures: RawAudioFeaturesResponse
): AudioFeaturesStats {
  const features = rawFeatures.audio_features.filter(
    (f): f is RawAudioFeature => f !== null
  );

  if (features.length === 0) {
    return {
      energy: 0,
      danceability: 0,
      tempo: 0,
      valence: 0,
      acousticness: 0,
    };
  }

  return {
    energy: Number(
      (features.reduce((sum, f) => sum + f.energy, 0) / features.length).toFixed(2)
    ),
    danceability: Number(
      (features.reduce((sum, f) => sum + f.danceability, 0) / features.length).toFixed(2)
    ),
    tempo: Number(
      (features.reduce((sum, f) => sum + f.tempo, 0) / features.length).toFixed(0)
    ),
    valence: Number(
      (features.reduce((sum, f) => sum + f.valence, 0) / features.length).toFixed(2)
    ),
    acousticness: Number(
      (features.reduce((sum, f) => sum + f.acousticness, 0) / features.length).toFixed(2)
    ),
  };
}

/**
 * Handle and format API errors
 */
export function formatErrorResponse(error: unknown): {
  message: string;
  status: number;
} {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
}
