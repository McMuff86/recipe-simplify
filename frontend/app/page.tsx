import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-8">
              <span className="text-accent text-sm font-medium">✨ AI-Powered</span>
              <span className="text-text-secondary text-sm">Recipe Extraction</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
              Simplify Your <span className="text-accent">Recipes</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Extract and organize recipes from any website using AI. 
              Build your personal collection with just a URL.
            </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link
                    href="/ai-chef"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-accent/20"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI Chef
                  </Link>
                  <Link
                    href="/extract"
                    className="inline-flex items-center justify-center gap-2 bg-surface hover:bg-muted border border-border text-text-primary px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Extract Recipe
                  </Link>
                  <Link
                    href="/recipes"
                    className="inline-flex items-center justify-center gap-2 bg-surface hover:bg-muted border border-border text-text-primary px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    View Collection
                  </Link>
                </div>

            {/* Social Proof / Stats */}
            <div className="flex items-center justify-center gap-8 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Everything you need
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Powerful features to extract, organize, and manage your recipe collection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              AI Extraction
            </h3>
            <p className="text-text-secondary text-sm">
              Powered by OpenAI GPT-4o-mini to accurately extract recipe details from any website
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Edge Functions
            </h3>
            <p className="text-text-secondary text-sm">
              Built on Supabase Edge Functions for instant, reliable performance worldwide
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Your Collection
            </h3>
            <p className="text-text-secondary text-sm">
              Save and organize recipes in your personal database with full control
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <p className="text-center text-sm text-text-secondary mb-6">
            Built with modern technologies
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            {['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'TailwindCSS'].map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-text-secondary text-sm">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
