import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-6 animate-fade-in">
              🍳 Recipe Simplify
            </h1>
            <p className="text-2xl mb-8 text-white/90">
              Extract recipes from any website with AI
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Simply paste a recipe URL and let our AI extract the title, ingredients, and cooking steps.
              Save your favorite recipes and build your personal collection.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/extract"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Extract Recipe 🔍
            </Link>
            <Link
              href="/recipes"
              className="bg-purple-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-800/70 transition-colors shadow-lg border-2 border-white/30"
            >
              View Collection 📚
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-col-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-white/80">
                Uses OpenAI GPT-4o-mini to accurately extract recipe information
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-white/80">
                Powered by Supabase Edge Functions for instant results
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-semibold mb-2">Save & Organize</h3>
              <p className="text-white/80">
                Build your personal recipe collection with ease
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-sm text-white/60 mb-4">Built with</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/10 px-4 py-2 rounded-full">Next.js</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">TypeScript</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">Supabase</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">OpenAI</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">TailwindCSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
