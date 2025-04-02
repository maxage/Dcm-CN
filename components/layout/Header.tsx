import { ContainerSubmissionForm } from "@/components/container-submission-form"
import { GradientButton } from "@/components/ui/gradient-button"
import { Heart } from "lucide-react"
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
              Select the tools you want to include in your docker-compose.yaml
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ContainerSubmissionForm />

            <GradientButton
              href="https://ko-fi.com/ajnart"
              external
              gradientFrom="from-amber-500/20"
              gradientTo="to-orange-400/20"
            >
              <Heart fill="currentColor" />
              <span>Support me</span>
            </GradientButton>

            <GradientButton
              href="https://github.com/ajnart/dcm"
              external
            >
              <svg
                aria-label="GitHub"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current"
              >
                <path d={siGithub.path} />
              </svg>
              <span>GitHub</span>
            </GradientButton>
          </div>
        </div>
      </div>
    </header>
  )
}
