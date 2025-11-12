import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe Simplify - AI Recipe Extractor',
  description: 'Extract recipes from any website using AI. Built with Supabase and OpenAI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700">
                🍳 Recipe Simplify
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/extract"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Extract
                </Link>
                <Link
                  href="/recipes"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Recipes
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-100 border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-gray-600">
            <p>Built with ❤️ using Next.js, Supabase, and OpenAI</p>
            <p className="text-sm mt-2">
              <a
                href="https://github.com/McMuff86/recipe-simplify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
