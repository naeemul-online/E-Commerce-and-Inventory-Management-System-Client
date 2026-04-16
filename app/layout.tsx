import {
  Geist,
  Geist_Mono,
  Merriweather,
  Source_Sans_3,
} from "next/font/google"

import { ThemeProvider } from "@/components/modules/layout/theme-provider"
import { cn } from "@/lib/utils"

import { Navbar } from "@/components/navigation"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/contexts/cart-context"
import { Metadata, Viewport } from "next"
import "./globals.css"

const sourceSans3Heading = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-heading",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
})

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Nafiya Mart - Your One-Stop eCommerce Destination",
  description:
    "Discover amazing products at Nafiya Mart. Shop clothing, footwear, accessories, and more.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#FF8033",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        "font-serif",
        merriweather.variable,
        sourceSans3Heading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ThemeProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
