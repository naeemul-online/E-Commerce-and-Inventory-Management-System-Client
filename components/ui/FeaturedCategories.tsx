"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

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

// Render the list three times so the track can slide smoothly in either
// direction. We keep the active index inside the middle copy and snap back
// to it (without animation) whenever we cross into an outer copy.
const LOOP = [...categories, ...categories, ...categories]
const LEN = categories.length

// Auto-advance interval in ms (one card at a time).
const SLIDE_INTERVAL = 2500

export function FeaturedCategories() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(LEN) // start at first item of the middle copy
  const [withTransition, setWithTransition] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [step, setStep] = useState(0)

  // Measure the distance between two consecutive cards (card width + gap)
  // so the translate stays pixel-perfect regardless of breakpoint.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined
      const second = track.children[1] as HTMLElement | undefined
      if (first && second) {
        setStep(second.offsetLeft - first.offsetLeft)
      }
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  // Auto-slide one card to the left every SLIDE_INTERVAL ms.
  useEffect(() => {
    if (isPaused) return
    const id = window.setInterval(() => {
      setWithTransition(true)
      setIndex((i) => i + 1)
    }, SLIDE_INTERVAL)
    return () => window.clearInterval(id)
  }, [isPaused])

  // When we walk off either edge of the middle copy, snap back to the
  // mirrored position inside the middle copy without animating.
  const handleTransitionEnd = () => {
    if (index >= 2 * LEN) {
      setWithTransition(false)
      setIndex(LEN)
    } else if (index < LEN) {
      setWithTransition(false)
      setIndex((i) => i + LEN)
    }
  }

  // Re-enable the transition on the next frame after a silent snap.
  useEffect(() => {
    if (withTransition) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setWithTransition(true))
    })
    return () => cancelAnimationFrame(id)
  }, [withTransition])

  const nudge = useCallback((dir: "prev" | "next") => {
    setWithTransition(true)
    setIndex((i) => (dir === "next" ? i + 1 : i - 1))
  }, [])

  return (
    <section
      aria-labelledby="featured-categories-heading"
      className="py-10 md:py-14"
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
          {/* Previous */}
          <button
            type="button"
            onClick={() => nudge("prev")}
            aria-label="Previous categories"
            className="absolute top-1/2 left-0 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:h-10 md:w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Viewport clips the track, track translates by whole-card steps */}
          <div className="overflow-hidden px-6 md:px-10">
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className={cn(
                "flex gap-4 py-2 md:gap-6",
                withTransition &&
                  "transition-transform duration-700 ease-in-out"
              )}
              style={{ transform: `translate3d(-${index * step}px, 0, 0)` }}
            >
              {LOOP.map((category, i) => (
                <Link
                  key={`${category.slug}-${i}`}
                  href={`/collections/${category.slug}`}
                  className="group flex w-[120px] shrink-0 flex-col items-center gap-3 md:w-[150px]"
                  aria-label={`Browse ${category.label} products`}
                >
                  <div
                    className={cn(
                      "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300",
                      "group-hover:-translate-y-1 group-hover:shadow-md"
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
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => nudge("next")}
            aria-label="Next categories"
            className="absolute top-1/2 right-0 z-20 flex h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:h-10 md:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
