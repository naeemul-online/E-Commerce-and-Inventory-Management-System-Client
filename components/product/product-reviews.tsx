"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import type { ProductDetails, RatingBreakdown } from "@/types/product"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductReviewsProps {
  product: ProductDetails
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const [reviewText, setReviewText] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  // Calculate rating breakdown
  const calculateRatingBreakdown = (): RatingBreakdown[] => {
    const breakdown: RatingBreakdown[] = []
    for (let stars = 5; stars >= 1; stars--) {
      const count = product.reviews.filter((r) => r.rating === stars).length
      const percentage =
        product.totalReviews > 0 ? (count / product.totalReviews) * 100 : 0
      breakdown.push({ stars, count, percentage })
    }
    return breakdown
  }

  const ratingBreakdown = calculateRatingBreakdown()
  const recommendedPercentage =
    product.totalReviews > 0
      ? (
          (product.reviews.filter((r) => r.rating >= 4).length /
            product.totalReviews) *
          100
        ).toFixed(2)
      : "0.00"

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    console.log("Review submitted:", { rating: selectedRating, text: reviewText })
    setReviewText("")
    setSelectedRating(0)
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    }
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Rating Summary */}
      <div className="space-y-4">
        {/* Average Rating */}
        <div className="flex items-start gap-4">
          <div>
            <span className="text-4xl font-bold text-foreground md:text-5xl">
              {product.averageRating.toFixed(1)}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">
              Average Rating
            </span>
            <div className="flex items-center gap-2">
              {renderStars(Math.round(product.averageRating), "md")}
              <span className="text-xs text-muted-foreground">
                ({product.totalReviews} Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Recommended */}
        <div className="text-sm text-muted-foreground">
          <span className="text-lg font-bold text-foreground">
            {recommendedPercentage}%
          </span>{" "}
          <span>Recommended</span>
          <span className="ml-1 text-xs">
            ({product.reviews.filter((r) => r.rating >= 4).length} of{" "}
            {product.totalReviews})
          </span>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              {renderStars(item.stars, "sm")}
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs text-muted-foreground">
                {item.percentage.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Review Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Submit Your Review
        </h3>
        <p className="text-sm text-muted-foreground">
          Your email address will not be published. Required fields are marked *
        </p>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          {/* Star Rating Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Your Rating *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-6 w-6",
                      star <= (hoveredRating || selectedRating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <label
              htmlFor="review"
              className="text-sm font-medium text-foreground"
            >
              Write your opinion about the product
            </label>
            <textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="min-h-[120px] w-full resize-none rounded-sm border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            className="bg-primary text-white hover:bg-primary/90"
            disabled={selectedRating === 0 || !reviewText.trim()}
          >
            Submit Review
          </Button>
        </form>
      </div>

      {/* Existing Reviews */}
      {product.reviews.length > 0 && (
        <div className="col-span-full space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-foreground">
            Customer Reviews
          </h3>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-sm border border-border p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {review.author}
                    </span>
                    {renderStars(review.rating, "sm")}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
