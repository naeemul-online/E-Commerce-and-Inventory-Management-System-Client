"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSlider } from "@/components/ui/HeroSlider"
import { useCart } from "@/contexts/cart-context"

import { RotateCcw, Shield, ShoppingCart, Star, Truck } from "lucide-react"
import Image from "next/image"

const featuredProducts = [
  {
    id: "4",
    name: "Wireless Headphones",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    badge: "Best Seller",
  },
  {
    id: "5",
    name: "Minimalist Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 189,
    badge: "New",
  },
  {
    id: "6",
    name: "Leather Backpack",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "7",
    name: "Sunglasses Pro",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 98,
  },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
]

export default function HomePage() {
  const { addItem, setIsOpen } = useCart()

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setIsOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />
      {/* 
      Features Bar
      <section className="border-y bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex items-center justify-center gap-4 md:justify-start"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {feature.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Featured Products
              </h2>
              <p className="mt-1 text-muted-foreground">
                Handpicked favorites just for you
              </p>
            </div>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-primary text-white">
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    className="absolute right-2 bottom-2 bg-white text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-primary hover:text-white"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="truncate font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a2744] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Join Our Newsletter
          </h2>
          <p className="mx-auto mb-8 max-w-md text-white/80">
            Subscribe to get special offers, free giveaways, and exclusive
            deals.
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <Button className="bg-primary px-8 text-white hover:bg-primary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
