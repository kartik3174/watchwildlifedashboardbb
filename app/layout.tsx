import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ConservationSidebar } from "@/components/conservation-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"
import { LoadingAnimation } from "@/components/loading-animation"
import { Toaster } from "@/components/ui/toaster"
import { LeafDecoration } from "@/components/leaf-decoration"
import { WatchAIAssistant } from "@/components/ai/watch-ai-assistant"
import { LanguageProvider } from "@/contexts/language-context"
import { ViewportProvider } from "@/contexts/viewport-context"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata
export const metadata = {
  title: "W.A.T.C.H | Wildlife AI Tracking and Conservation Hub",
  description: "Track and monitor wildlife with AI-powered insights",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  themeColor: "#10b981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <ViewportProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <SidebarProvider>
                <LoadingAnimation />
                <div className="flex min-h-screen relative">
                  <LeafDecoration position="top-right" size="xl" opacity={0.05} />
                  <LeafDecoration position="bottom-left" size="lg" opacity={0.05} rotation={45} />

                  {/* Desktop Sidebar */}
                  <div className="hidden md:block w-64 flex-shrink-0">
                    <ConservationSidebar />
                  </div>

                  {/* Mobile Navigation */}
                  <MobileNavigation />

                  {/* Main Content */}
                  <main className="flex-1 pt-16 md:pt-6 px-4 pb-6 w-full overflow-x-hidden min-h-screen">
                    <div className="max-w-[1600px] mx-auto w-full">{children}</div>
                  </main>
                </div>
                <Toaster />

                {/* W.A.T.C.H AI Assistant - available globally */}
                <WatchAIAssistant />
              </SidebarProvider>
            </ThemeProvider>
          </ViewportProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
