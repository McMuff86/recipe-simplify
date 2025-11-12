import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/contexts/AuthContext';
import NavigationBar from '@/components/NavigationBar';

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
        <AuthProvider>
        <NavigationBar />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-border bg-surface">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-secondary">
                © 2025 Recipe Simplify. Built with Next.js, Supabase, and OpenAI.
              </p>
              <div className="flex items-center gap-6 text-sm text-text-secondary">
                <a 
                  href="https://github.com/McMuff86/recipe-simplify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Supabase
                </a>
                <a 
                  href="https://openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  OpenAI
                </a>
              </div>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
