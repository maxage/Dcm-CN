import { ContainerSubmissionForm } from '@/components/container-submission-form';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import type React from 'react';
import { siGithub } from 'simple-icons';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Docker Compose Generator',
  description: 'Select tools to generate your docker-compose.yaml file',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col bg-stripes dark:bg-stripes-dark">
            <header className="relative z-10 bg-primary/80 text-primary-foreground py-8 shadow-md">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 motion-safe:animate-slide-in-left">
                      Docker Compose Generator
                    </h1>
                    <p className="text-lg opacity-90 motion-safe:animate-slide-in-left [animation-delay:150ms]">
                      Select the tools you want to include in your docker-compose.yaml
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <ContainerSubmissionForm />
                    <Link href="https://ko-fi.com/ajnart" target="_blank">
                      <Button
                        variant="outline"
                        className="group relative overflow-hidden bg-primary-foreground/15 hover:bg-primary-foreground/25 border-primary-foreground/30 text-primary-foreground font-medium px-4 py-2 motion-safe:animate-slide-in-right transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span>
                            <Heart fill="currentColor" />
                          </span>
                          <span>Support this project</span>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </Link>
                    <Link href="https://github.com/ajnart/docker-compose-selector" target="_blank">
                      <Button
                        variant="outline"
                        className="group relative overflow-hidden bg-primary-foreground/15 hover:bg-primary-foreground/25 border-primary-foreground/30 text-primary-foreground font-medium px-4 py-2 motion-safe:animate-slide-in-right transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span>
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 fill-current"
                            >
                              <path d={siGithub.path} />
                            </svg>
                          </span>
                          <span>GitHub</span>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="py-6 border-t bg-background">
              <div className="container mx-auto px-4 text-center text-muted-foreground">
                <p className="flex items-center justify-center gap-1">
                  Made with <span className="text-red-500">❤️</span> by{' '}
                  <Link
                    href="https://github.com/ajnart"
                    target="_blank"
                    className="font-medium hover:underline hover:text-primary transition-colors"
                  >
                    ajnart
                  </Link>
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
