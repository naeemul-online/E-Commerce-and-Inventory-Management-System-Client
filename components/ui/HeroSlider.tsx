"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const sliderItems = [
  {
    id: 1,
    title: "Up to 50% Off",
    subtitle: "Premium Organic Honey",
    description:
      "Pure, natural honey sourced directly from the finest apiaries",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&h=600&fit=crop",
    cta: "Shop Now",
    href: "/category/honey",
    bgColor: "from-amber-50 to-orange-100",
  },
  {
    id: 2,
    title: "Fresh Arrivals",
    subtitle: "Exotic Dates Collection",
    description: "Handpicked dates from the finest farms of Middle East",
    image:
      "https://images.unsplash.com/photo-1593233874143-8c3e2a1c1f1a?w=1200&h=600&fit=crop",
    cta: "Explore",
    href: "/category/dates",
    bgColor: "from-amber-100 to-yellow-50",
  },
  {
    id: 3,
    title: "Special Bundle",
    subtitle: "Nuts & Seeds Combo",
    description: "Get 30% off on our premium mixed nuts collection",
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1200&h=600&fit=crop",
    cta: "Get Offer",
    href: "/category/nuts-seeds",
    bgColor: "from-green-50 to-emerald-100",
  },
]

const specialOffer = {
  title: "Weekend Special",
  subtitle: "Buy 2 Get 1 Free",
  description: "On all spices",
  image:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=600&fit=crop",
  href: "/category/spices",
  bgColor: "bg-gradient-to-br from-red-500 to-orange-500",
}

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderItems.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderItems.length) % sliderItems.length
    )
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="w-full">
      <div className="container mx-auto px-2 py-1 md:px-4 md:py-4">
        <div className="flex flex-col gap-2 md:gap-4 lg:flex-row">
          {/* Main Slider - 3/4 on desktop, full width on mobile */}
          <div className="relative w-full lg:flex-[3]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg md:aspect-[2/1] md:rounded-xl lg:aspect-[2.2/1]">
              {sliderItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out",
                    index === currentSlide
                      ? "z-10 translate-x-0 opacity-100"
                      : index < currentSlide
                        ? "z-0 -translate-x-full opacity-0"
                        : "z-0 translate-x-full opacity-0"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r",
                      item.bgColor
                    )}
                  />
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 mix-blend-overlay"
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 75vw"
                  />
                  <div className="absolute inset-0 flex items-center">
                    <div className="container px-6 md:px-12">
                      <div className="max-w-lg">
                        <span className="mb-3 inline-block rounded-full bg-[#FF8033] px-3 py-1 text-xs font-semibold text-white md:text-sm">
                          {item.title}
                        </span>
                        <h2 className="mb-2 text-2xl font-bold text-balance text-gray-900 md:mb-4 md:text-4xl lg:text-5xl">
                          {item.subtitle}
                        </h2>
                        <p className="mb-4 line-clamp-2 text-sm text-gray-700 md:mb-6 md:text-base">
                          {item.description}
                        </p>
                        <Button
                          asChild
                          className="bg-[#FF8033] text-white hover:bg-[#e6732e]"
                        >
                          <Link href={item.href}>{item.cta}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  prevSlide()
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-gray-800" />
              </button>
              <button
                onClick={() => {
                  nextSlide()
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-gray-800" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {sliderItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all duration-300",
                      index === currentSlide
                        ? "w-6 bg-[#FF8033]"
                        : "bg-white/60 hover:bg-white/80"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Special Offer Poster - 1/4 on desktop, hidden on mobile/tablet */}
          <div className="hidden lg:flex lg:flex-[1]">
            <Link
              href={specialOffer.href}
              className="group relative block w-full overflow-hidden rounded-xl"
            >
              <div className={cn("absolute inset-0", specialOffer.bgColor)} />
              <Image
                src={specialOffer.image}
                alt={specialOffer.title}
                fill
                className="object-cover opacity-40 mix-blend-overlay transition-transform duration-500 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="mb-1 text-sm font-medium text-white/90">
                  {specialOffer.title}
                </span>
                <h3 className="mb-2 text-xl font-bold text-balance text-white xl:text-2xl">
                  {specialOffer.subtitle}
                </h3>
                <p className="mb-4 text-sm text-white/90">
                  {specialOffer.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:underline">
                  Shop Now
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
