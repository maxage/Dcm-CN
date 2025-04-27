// app/layout.tsx

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SettingsProvider } from "@/lib/settings-context"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PostHogProvider } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Docker Compose 生成器",
  description: "选择工具生成您的 docker-compose.yaml 文件",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SettingsProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </SettingsProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
