import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Music Trends</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black">
        {/* Background accent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-10" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-900/30 border border-green-600/50 rounded-full mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-green-400">Spotify Analytics</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6">
              Your Music,
              <span className="block bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                Visualized
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
              Discover your listening patterns, explore genre preferences, and analyze audio characteristics that define your music taste—all powered by Spotify data.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
              <Link
                href="/credentials"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-black font-semibold rounded-full hover:bg-green-500 transition-colors duration-200 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Connect Spotify
              </Link>
              <Link
                href="/dashboard"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 inline-flex items-center justify-center gap-2 border border-gray-700 text-sm sm:text-base"
              >
                View Demo
              </Link>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 lg:pt-16 border-t border-gray-800">
              <div className="text-left">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎤</div>
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Top Artists</h3>
                <p className="text-xs sm:text-sm text-gray-400">Discover your most-listened artists ranked by popularity and engagement metrics</p>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📊</div>
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Genre Distribution</h3>
                <p className="text-xs sm:text-sm text-gray-400">Visual breakdown of your music preferences across different genres</p>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎚️</div>
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Audio Analysis</h3>
                <p className="text-xs sm:text-sm text-gray-400">Understand energy, danceability, valence, and other audio characteristics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-950 border-t border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">How it works</h2>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">使い方</p>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-black rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Try Demo First</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">デモを試す - Click "View Demo" to explore the dashboard with sample data—no setup required</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-black rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Get Spotify Credentials</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">認証情報を取得 - Create a free developer app at <a href="https://developer.spotify.com" className="text-green-500 hover:text-green-400 font-medium">developer.spotify.com</a> to get your Client ID and Secret</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-black rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Connect & Analyze</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">接続して分析 - Enter your credentials and start analyzing your real Spotify data in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-gray-500">
          <p>Built with Next.js • TypeScript • Tailwind • Recharts • Spotify API</p>
        </div>
      </footer>
    </div>
  );
}
