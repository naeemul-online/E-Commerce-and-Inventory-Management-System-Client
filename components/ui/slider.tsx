"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

interface SliderProps {
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onValueChange, min = 0, max = 100, step = 1, className }, ref) => {
    const [localMin, localMax] = value

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), localMax - step)
      onValueChange([newMin, localMax])
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), localMin + step)
      onValueChange([localMin, newMax])
    }

    const minPercent = ((localMin - min) / (max - min)) * 100
    const maxPercent = ((localMax - min) / (max - min)) * 100

    return (
      <div ref={ref} className={cn("relative w-full", className)}>
        <div className="relative h-2 w-full">
          {/* Track background */}
          <div className="absolute h-full w-full rounded-full bg-secondary" />
          
          {/* Active range */}
          <div
            className="absolute h-full rounded-full bg-primary"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Min slider */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localMin}
            onChange={handleMinChange}
            className="slider-thumb absolute h-2 w-full cursor-pointer appearance-none bg-transparent"
            style={{ zIndex: localMin > max - 100 ? 5 : 3 }}
          />

          {/* Max slider */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localMax}
            onChange={handleMaxChange}
            className="slider-thumb absolute h-2 w-full cursor-pointer appearance-none bg-transparent"
            style={{ zIndex: 4 }}
          />
        </div>

        <style jsx>{`
          .slider-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid hsl(var(--primary));
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .slider-thumb::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid hsl(var(--primary));
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
