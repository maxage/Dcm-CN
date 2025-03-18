import { ContainerSubmissionForm } from "@/components/container-submission-form"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { siGithub } from "simple-icons"

export function Header() {
  return (
    <header className="relative z-10 bg-primary/80 bg-stripes py-8 text-primary-foreground shadow-md dark:bg-stripes-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 font-bold text-xl motion-safe:animate-slide-in-left md:text-2xl lg:text-3xl">
              Docker Compose Generator
            </h1>
            <p className="text-sm opacity-90 [animation-delay:150ms] motion-safe:animate-slide-in-left md:text-lg lg:text-xl">
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
                  <span>Support me</span>
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
  )
} 