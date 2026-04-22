"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

type Category = {
  slug: string
  label: string
  image: string
}

const categories: Category[] = [
  { slug: "organic", label: "Organic", image: "/categories/organic.jpg" },
  { slug: "honey", label: "Honey", image: "/categories/honey.jpg" },
  { slug: "dates", label: "Dates", image: "/categories/dates.jpg" },
  { slug: "spices", label: "Spices", image: "/categories/spices.jpg" },
  {
    slug: "nuts-seeds",
    label: "Nuts & Seeds",
    image: "/categories/nuts-seeds.jpg",
  },
  { slug: "beverage", label: "Beverage", image: "/categories/beverage.jpg" },
  { slug: "rice", label: "Rice", image: "/categories/rice.jpg" },
  {
    slug: "flours-lentils",
    label: "Flours & Lentils",
    image: "/categories/flours-lentils.jpg",
  },
]

// Duplicate the list so the right-to-left scroll can loop seamlessly.
const loopedCategories = [...categories, ...categories]

// Pixels per animation frame at 60fps — small value keeps the slide subtle.
const AUTO_SCROLL_SPEED = 0.6

export function FeaturedCategories() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Continuous auto-scroll to the right (items visually travel right-to-left).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frameId = 0

    const tick = () => {
      if (!isPaused) {
        // Halfway point = width of the first (non-duplicated) list.
        const half = track.scrollWidth / 2
        if (half > 0) {
          track.scrollLeft += AUTO_SCROLL_SPEED
          // Reset to the start of the second copy for a seamless loop.
          if (track.scrollLeft >= half) {
            track.scrollLeft -= half
          }
        }
      }
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isPaused])

  const nudge = useCallback((direction: "prev" | "next") => {
    const track = trackRef.current
    if (!track) return
    // One card + gap ≈ 160px on desktop, less on mobile.
    const step = Math.max(160, track.clientWidth / 4)
    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    })
  }, [])

  return (
    <section
      aria-labelledby="featured-categories-heading"
      className="bg-[#fdf6ec] py-10 md:py-14"
    >
      <div className="container mx-auto px-4">
        <h2
          id="featured-categories-heading"
          className="mb-6 text-center text-2xl font-bold text-foreground md:mb-8 md:text-3xl"
        >
          Featured Categories
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Manual previous button */}
          <button
            type="button"
            onClick={() => nudge("prev")}
            aria-label="Previous categories"
            className="absolute top-1/2 left-0 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF8033] text-white shadow-md transition hover:bg-[#e6732e] focus:ring-2 focus:ring-[#FF8033]/50 focus:ring-offset-2 focus:outline-none md:h-10 md:w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-6 py-2 md:gap-6 md:px-10"
            style={{ scrollbarWidth: "none" }}
          >
            {loopedCategories.map((category, index) => (
              <Link
                key={`${category.slug}-${index}`}
                href={`/collections/${category.slug}`}
                className="group flex w-[120px] shrink-0 flex-col items-center gap-3 md:w-[150px]"
                aria-label={`Browse ${category.label} products`}
              >
                <div
                  className={cn(
                    "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-300",
                    "group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                  )}
                >
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    sizes="(max-width: 768px) 120px, 150px"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-center text-sm font-medium text-foreground md:text-base">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Manual next button */}
          <button
            type="button"
            onClick={() => nudge("next")}
            aria-label="Next categories"
            className="absolute top-1/2 right-0 z-20 flex h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#FF8033] text-white shadow-md transition hover:bg-[#e6732e] focus:ring-2 focus:ring-[#FF8033]/50 focus:ring-offset-2 focus:outline-none md:h-10 md:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
