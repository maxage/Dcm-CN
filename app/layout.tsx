// app/layout.tsx

import { ContainerSubmissionForm } from "@/components/container-submission-form"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Heart, HeartIcon } from "lucide-react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react"
import { siGithub } from "simple-icons"
import './globals.css'
import { PostHogProvider } from './providers'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Docker Compose Generator",
  description: "Select tools to generate your docker-compose.yaml file",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <header className="relative z-10 bg-primary/80 bg-stripes py-8 text-primary-foreground shadow-md dark:bg-stripes-dark">
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="mb-2 font-bold text-3xl motion-safe:animate-slide-in-left">
                        Docker Compose Generator
                      </h1>
                      <p className="text-lg opacity-90 [animation-delay:150ms] motion-safe:animate-slide-in-left">
                        Select the tools you want to include in your
                        docker-compose.yaml
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <ContainerSubmissionForm />
                      <Link href="https://ko-fi.com/ajnart" target="_blank">
                        <Button
                          variant="outline"
                          className="group relative overflow-hidden border-primary-foreground/30 bg-primary-foreground/15 px-4 py-2 font-medium text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary-foreground/25 hover:shadow-lg motion-safe:animate-slide-in-right"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <span>
                              <Heart fill="currentColor" />
                            </span>
                            <span>Support this project</span>
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Button>
                      </Link>
                      <Link
                        href="https://github.com/ajnart/docker-compose-selector"
                        target="_blank"
                      >
                        <Button
                          variant="outline"
                          className="group relative overflow-hidden border-primary-foreground/30 bg-primary-foreground/15 px-4 py-2 font-medium text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary-foreground/25 hover:shadow-lg motion-safe:animate-slide-in-right"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <span>
                              <svg
                                aria-label="GitHub"
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
                          <span className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </header>

              <main className="flex-1">{children}</main>

              <footer className="mt-8 border-t bg-background py-6">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                  <p className="flex items-center justify-center gap-1">
                    Made with{" "}
                    <span className="text-red-500 motion-safe:animate-pulse">
                      <HeartIcon size={16} fill="currentColor" />
                    </span>{" "}
                    by{" "}
                    <Link
                      href="https://github.com/ajnart"
                      target="_blank"
                      className="font-medium transition-colors hover:text-primary hover:underline"
                    >
                      ajnart
                    </Link>
                  </p>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
