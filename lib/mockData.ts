/**
 * Mock data for development when Spotify API is unavailable
 * Provides realistic sample data that mimics Spotify API responses
 */

export const MOCK_TOP_ARTISTS = {
  items: [
    {
      id: '74ASZWbe4lXaubB0NYbqNm',
      name: 'Arctic Monkeys',
      popularity: 88,
      genres: ['alternative rock', 'indie rock', 'british indie rock'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Arctic+Monkeys',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '1Xyo4u8uTS0ZA9x08aBgX5',
      name: 'The Weeknd',
      popularity: 92,
      genres: ['canadian contemporary r&b', 'pop', 'synthwave'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=The+Weeknd',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '3TVXtAsR1InumggscjfW6o',
      name: 'Drake',
      popularity: 90,
      genres: ['canadian hip hop', 'hip hop', 'pop rap', 'toronto rap'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Drake',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '6deJr65NQTVQvO3dCJ5dP6',
      name: 'Dua Lipa',
      popularity: 87,
      genres: ['british pop', 'dance pop', 'pop'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Dua+Lipa',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '7qiZfU4dY1lsylvNFQuFOp',
      name: 'Olivia Rodrigo',
      popularity: 85,
      genres: ['pop', 'gen z pop'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Olivia+Rodrigo',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '246dkjvS1V8By7TP1RZpSR',
      name: 'Harry Styles',
      popularity: 84,
      genres: ['pop', 'british pop'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Harry+Styles',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '4q3ewBCX7sLccsSLwLclGQ',
      name: 'Bad Bunny',
      popularity: 89,
      genres: ['latin trap', 'reggaeton', 'trap latino'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Bad+Bunny',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '2takcwFFEiYzcJeFDxPZdw',
      name: 'Post Malone',
      popularity: 86,
      genres: ['hip hop', 'pop rap', 'rap'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Post+Malone',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '0EmeFodog0BqHMVEHl2Ym3',
      name: 'The Beatles',
      popularity: 87,
      genres: ['british invasion', 'classic rock', 'rock'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=The+Beatles',
          height: 640,
          width: 640,
        },
      ],
    },
    {
      id: '0diZqB94uDHlA6USUkaLeO',
      name: 'Billie Eilish',
      popularity: 88,
      genres: ['alt z', 'electropop', 'pop'],
      images: [
        {
          url: 'https://via.placeholder.com/640x640?text=Billie+Eilish',
          height: 640,
          width: 640,
        },
      ],
    },
  ],
};

export const MOCK_TOP_TRACKS = {
  items: [
    { id: 'track1', name: 'Blinding Lights' },
    { id: 'track2', name: 'As It Was' },
    { id: 'track3', name: 'Levitating' },
    { id: 'track4', name: 'Good 4 U' },
    { id: 'track5', name: 'Sunroof' },
    { id: 'track6', name: 'Anti-Hero' },
    { id: 'track7', name: 'One Dance' },
    { id: 'track8', name: 'Heat Waves' },
    { id: 'track9', name: 'Industry Baby' },
    { id: 'track10', name: 'Paint The Town Red' },
    { id: 'track11', name: 'Flowers' },
    { id: 'track12', name: 'Vampire' },
    { id: 'track13', name: 'I Had Some Help' },
    { id: 'track14', name: 'Cruel Summer' },
    { id: 'track15', name: 'Bad Habit' },
    { id: 'track16', name: 'That\'s So True' },
    { id: 'track17', name: 'Running Up That Hill' },
    { id: 'track18', name: 'Starlight' },
    { id: 'track19', name: 'Golden' },
    { id: 'track20', name: 'Drivers License' },
  ],
};

export const MOCK_AUDIO_FEATURES = {
  audio_features: [
    { id: 'track1', energy: 0.73, danceability: 0.81, tempo: 103, valence: 0.33, acousticness: 0.18 },
    { id: 'track2', energy: 0.62, danceability: 0.75, tempo: 174, valence: 0.68, acousticness: 0.09 },
    { id: 'track3', energy: 0.76, danceability: 0.87, tempo: 128, valence: 0.88, acousticness: 0.12 },
    { id: 'track4', energy: 0.54, danceability: 0.69, tempo: 117, valence: 0.45, acousticness: 0.21 },
    { id: 'track5', energy: 0.82, danceability: 0.91, tempo: 120, valence: 0.79, acousticness: 0.08 },
    { id: 'track6', energy: 0.59, danceability: 0.66, tempo: 100, valence: 0.35, acousticness: 0.14 },
    { id: 'track7', energy: 0.71, danceability: 0.79, tempo: 104, valence: 0.61, acousticness: 0.11 },
    { id: 'track8', energy: 0.68, danceability: 0.83, tempo: 99, valence: 0.69, acousticness: 0.19 },
    { id: 'track9', energy: 0.85, danceability: 0.88, tempo: 143, valence: 0.82, acousticness: 0.06 },
    { id: 'track10', energy: 0.77, danceability: 0.84, tempo: 92, valence: 0.75, acousticness: 0.05 },
    { id: 'track11', energy: 0.64, danceability: 0.77, tempo: 104, valence: 0.74, acousticness: 0.16 },
    { id: 'track12', energy: 0.42, danceability: 0.44, tempo: 133, valence: 0.31, acousticness: 0.08 },
    { id: 'track13', energy: 0.80, danceability: 0.85, tempo: 96, valence: 0.73, acousticness: 0.13 },
    { id: 'track14', energy: 0.71, danceability: 0.80, tempo: 120, valence: 0.71, acousticness: 0.17 },
    { id: 'track15', energy: 0.73, danceability: 0.76, tempo: 94, valence: 0.51, acousticness: 0.12 },
    { id: 'track16', energy: 0.68, danceability: 0.82, tempo: 110, valence: 0.76, acousticness: 0.14 },
    { id: 'track17', energy: 0.61, danceability: 0.54, tempo: 92, valence: 0.47, acousticness: 0.34 },
    { id: 'track18', energy: 0.75, danceability: 0.84, tempo: 128, valence: 0.84, acousticness: 0.09 },
    { id: 'track19', energy: 0.69, danceability: 0.81, tempo: 107, valence: 0.77, acousticness: 0.15 },
    { id: 'track20', energy: 0.48, danceability: 0.58, tempo: 178, valence: 0.29, acousticness: 0.52 },
  ],
};
