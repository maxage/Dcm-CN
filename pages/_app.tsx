import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { AppProps } from "next/app"
import { Inter as FontSans } from "next/font/google"
import posthog from 'posthog-js'
import { useEffect } from "react"
import { Toaster } from "sonner"
import { Analytics } from './analytics'

// Configure Monaco workers globally
import { loader } from '@monaco-editor/react';

// Configure the Monaco loader with CDN paths for easier loading
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs',
  },
});

// Set up Monaco environment for workers
if (typeof window !== 'undefined') {
  window.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'yaml') {
        // Load the YAML worker from CDN
        return new Worker('https://cdn.jsdelivr.net/npm/monaco-yaml@5.3.1/lib/esm/yaml.worker.js', {
          type: 'module'
        });
      }
      // Load editor worker from CDN
      return new Worker('https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/editor/editor.worker.js');
    }
  };
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialization code
    posthog.init('phc_1VIAnPZDYxJLGQu0WDOv4jJRVJvh1MrjIcbFJ6mqHtQ', {
      api_host: 'https://app.posthog.com',
    });

    return () => {
      // Cleanup code (if necessary)
    };
  }, []);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      <main
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Component {...pageProps} />
        <Toaster />
        <Analytics />
      </main>
    </ThemeProvider>
  )
} 