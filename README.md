# Music Analyzer

A modern web application that visualizes your Spotify listening patterns and music preferences through interactive analytics and real-time data visualization.

## Overview

Music Analyzer is a full-stack web application built with Next.js that connects to the Spotify Web API to analyze your music taste. It provides detailed insights into your top artists, genre distribution, and audio feature characteristics across different time periods .

## Features

- **Spotify Integration**: Securely connect your Spotify account. 
- **Top Artists Analysis**: View your most-listened artists with interactive visualizations
- **Genre Distribution**: Understand your music preferences through genre breakdown charts
- **Audio Feature Analysis**: Deep dive into the characteristics of your favorite tracks:
  - Energy levels
  - Danceability
  - Acousticness
  - Instrumentalness
  - And more Spotify audio metrics
  - Last 4 weeks (short-term)
  - Last 6 months (medium-term)
  - All-time (long-term)
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Mock Data Fallback**: Explore the app with sample data even without Spotify credentials

## Why This Idea?

I chose to build a music analytics application because:

1. **Personal Relevance**: Music is a universal interest that resonates with developers and non-technical users alike
2. **Technical Variety**: It showcases full-stack development skills—API integration, data transformation, state management, and UI/UX design
3. **Real-World Problem**: Users genuinely want to understand their listening habits and discover patterns they might not notice
4. **API Integration**: Spotify's robust Web API provides rich, real-world data for meaningful analysis
5. **Scalability**: The architecture can easily extend to include recommendations, playlist generation, and social features

## Technical Decisions & Trade-offs

### 1. **Framework Choice: Next.js 16**
- **Decision**: Use Next.js for full-stack development
- **Rationale**: Built-in API routes eliminate the need for a separate backend server, seamless client-side rendering with React, excellent TypeScript support
- **Trade-off**: Next.js adds complexity compared to a simple SPA, but provides better performance and SEO

### 2. **Authentication: Client-Credential Flow**
- **Decision**: Implement Client Credentials Flow instead of OAuth 2.0 User Authorization
- **Rationale**: Simpler implementation for a portfolio project; users can manually input their credentials
- **Trade-off**: Less secure than proper OAuth (users manage credentials), but acceptable for a development project. Full OAuth implementation is a future enhancement

### 3. **State Management: React Hooks**
- **Decision**: Use built-in React hooks (useState, useEffect) instead of Redux/Zustand
- **Rationale**: Reduces bundle size and complexity; sufficient for this application's data flow
- **Trade-off**: Less scalable for very large apps, but cleaner and faster to develop

### 4. **Data Visualization: Recharts**
- **Decision**: Use Recharts library for chart rendering
- **Rationale**: Lightweight, responsive, and easy to customize with React
- **Trade-off**: Less feature-rich than D3.js, but much simpler to implement and sufficient for our use case

### 5. **Styling: Tailwind CSS**
- **Decision**: Use Tailwind CSS for styling with a dark theme
- **Rationale**: Utility-first approach enables rapid development; matches Spotify's modern dark aesthetic
- **Trade-off**: Larger HTML bundle with class names, but provides consistent design and fast prototyping

### 6. **Token Caching: In-Memory Cache**
- **Decision**: Cache Spotify access tokens in memory to reduce API calls
- **Rationale**: Improves performance and avoids rate limiting on token generation
- **Trade-off**: Cache is lost on server restart; for production, would use Redis or similar

### 7. **Client-Side Credential Storage**
- **Decision**: Store Spotify credentials in localStorage
- **Rationale**: Simple implementation for demo purposes
- **Trade-off**: Security risk in production; should use secure HTTP-only cookies with backend session management in real-world scenario

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Framework**: Next.js 16.1.3
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3.6.0
- **HTTP Client**: Axios
- **Type Safety**: TypeScript 5
- **Code Quality**: ESLint

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Spotify Developer Account (optional, for real data)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd musicanalyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Spotify API credentials (optional)**
   - Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create an application to get Client ID and Client Secret
   - You can use these credentials in the app, or skip this step to use mock data

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run start
```

## Usage

1. **Landing Page**: Start at the home page to learn about the app
2. **Connect Spotify**: Click "Connect Spotify" and enter your:
   - Client ID
   - Client Secret
   - These are securely stored in your browser's localStorage
3. **View Dashboard**: Explore your music analytics:
   - Scroll through your top artists
   - View genre distribution pie chart
   - Analyze audio features of your favorite tracks
4. **Switch Time Ranges**: Use the time range selector to see:
   - Last 4 weeks
   - Last 6 months
   - All-time listening history

## API Routes

- `GET /api/music/top-artists` - Fetch user's top artists
- `GET /api/music/genre-distribution` - Calculate genre distribution
- `GET /api/music/audio-features` - Analyze audio features of top tracks

All endpoints support:
- `limit` query parameter (1-50 items)
- `timeRange` query parameter (short_term, medium_term, long_term)

## Project Structure

```
musicanalyzer/
├── app/                           # Next.js app directory
│   ├── api/                      # API route handlers
│   │   └── music/               # Spotify data endpoints
│   ├── dashboard/               # Main analytics page
│   ├── credentials/             # Credential input page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                  # Reusable React components
│   ├── TopArtists.tsx
│   ├── GenreChart.tsx
│   └── AudioFeatures.tsx
├── lib/                         # Utility functions
│   ├── spotify.ts              # Spotify API integration
│   ├── transformers.ts         # Data transformation logic
│   └── mockData.ts             # Sample data for demo mode
└── public/                      # Static assets
```

## Future Enhancements

- [ ] OAuth 2.0 User Authorization Flow for secure authentication
- [ ] User accounts with data persistence
- [ ] Playlist recommendations based on audio features
- [ ] Social features (share playlists, compare taste with friends)
- [ ] Export analytics as PDF or image
- [ ] Machine learning-based recommendations
- [ ] Real-time notifications when new music is added

## Challenges & Solutions

**Challenge**: Spotify API rate limiting
**Solution**: Implemented token caching and efficient batch requests

**Challenge**: Data transformation complexity
**Solution**: Created dedicated transformer functions for clean separation of concerns

**Challenge**: Making the app work without credentials
**Solution**: Built comprehensive mock data system for demo experience

## Notes for Reviewers

- The app includes comprehensive TypeScript types for type safety
- All API endpoints include proper error handling and validation
- Components are modular and reusable
- The UI is fully responsive and follows modern design principles
- Mock data allows testing the full app experience without Spotify credentials

## License

MIT License - feel free to use this project for learning or building upon it.

---

**Built as a portfolio project showcasing full-stack development capabilities with modern web technologies.**
# Music_Analyzer
