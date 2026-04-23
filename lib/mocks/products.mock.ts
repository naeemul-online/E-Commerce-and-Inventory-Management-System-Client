import type { ProductListItem } from "@/types/product"
import type { MockContext, MockRoute } from "./types"

/**
 * Fixture data modelled after the real `GET /api/v1/products` response.
 * Keep this in sync with docs/backend/modules/product.md.
 */
const productFixtures: ProductListItem[] = [
  {
    id: "cmob4hd8u0000iu8o5t4qbbrm",
    title: "MacBook Pro M3",
    slug: "macbook-pro-m3",
    description: "High performance laptop with excellent battery life.",
    regularPrice: 2500,
    discountedPrice: 2300,
    stock: 15,
    images: [
      "https://res.cloudinary.com/dsieyc8m2/image/upload/v1776927042/ecommerce/products/product1.webp-1776927039555.webp",
    ],
    isNew: true,
    isOffered: true,
    categoryId: "cmo39zb8x0002v18oyk7a63r1",
    brandId: "cmo2uh6gk0000mk8oxu9ihz6j",
    createdAt: "2026-04-23T06:50:42.894Z",
    updatedAt: "2026-04-23T06:50:42.894Z",
    category: {
      id: "cmo39zb8x0002v18oyk7a63r1",
      name: "Barishal Honey",
      slug: "barishal-honey",
    },
    brand: {
      id: "cmo2uh6gk0000mk8oxu9ihz6j",
      name: "sundarban honey",
      slug: "sundarban-honey",
    },
  },
  {
    id: "cmo49bfdo0002hi8onbmxz8hc",
    title: "MacBook Air M2",
    slug: "macbook-air-m2",
    description: "Ultra-light laptop ideal for everyday work.",
    regularPrice: 1800,
    discountedPrice: 1650,
    stock: 22,
    images: [
      "https://res.cloudinary.com/dsieyc8m2/image/upload/v1776511899/ecommerce/products/product1.webp-1776511897256.webp",
    ],
    isNew: true,
    isOffered: false,
    categoryId: "cmo39zb8x0002v18oyk7a63r1",
    brandId: "cmo2uh6gk0000mk8oxu9ihz6j",
    createdAt: "2026-04-18T11:31:40.572Z",
    updatedAt: "2026-04-18T11:31:40.572Z",
    category: {
      id: "cmo39zb8x0002v18oyk7a63r1",
      name: "Barishal Honey",
      slug: "barishal-honey",
    },
    brand: {
      id: "cmo2uh6gk0000mk8oxu9ihz6j",
      name: "sundarban honey",
      slug: "sundarban-honey",
    },
  },
]

// Pad the fixture list to 15 items so pagination can be exercised.
const synthetic: ProductListItem[] = Array.from({ length: 13 }).map(
  (_, index) => {
    const n = index + 3
    return {
      id: `mock-product-${n}`,
      title: `Mock Product ${n}`,
      slug: `mock-product-${n}`,
      description: `Generated mock product #${n} for local development.`,
      regularPrice: 1000 + n * 50,
      discountedPrice: 900 + n * 50,
      stock: 5 + n,
      images: [
        "https://res.cloudinary.com/dsieyc8m2/image/upload/v1776360259/g1b6li1pzvf73qu59dn5.webp",
      ],
      isNew: n % 2 === 0,
      isOffered: n % 3 === 0,
      categoryId: "cmo39zb8x0002v18oyk7a63r1",
      brandId: "cmo2uh6gk0000mk8oxu9ihz6j",
      createdAt: new Date(2026, 3, n).toISOString(),
      updatedAt: new Date(2026, 3, n).toISOString(),
      category: {
        id: "cmo39zb8x0002v18oyk7a63r1",
        name: "Barishal Honey",
        slug: "barishal-honey",
      },
      brand: {
        id: "cmo2uh6gk0000mk8oxu9ihz6j",
        name: "sundarban honey",
        slug: "sundarban-honey",
      },
    }
  }
)

const allProducts: ProductListItem[] = [...productFixtures, ...synthetic]

function getPrice(p: ProductListItem): number {
  return p.discountedPrice ?? p.regularPrice
}

function applyFilters(items: ProductListItem[], query: URLSearchParams) {
  let filtered = items.slice()

  const searchTerm = query.get("searchTerm")?.trim().toLowerCase()
  if (searchTerm) {
    filtered = filtered.filter((p) =>
      [p.title, p.description, p.category?.name, p.brand?.name]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(searchTerm))
    )
  }

  const category = query.get("category")?.trim()
  if (category) {
    filtered = filtered.filter(
      (p) => p.categoryId === category || p.category?.slug === category
    )
  }

  const brand = query.get("brand")?.trim()
  if (brand) {
    filtered = filtered.filter(
      (p) => p.brandId === brand || p.brand?.slug === brand
    )
  }

  const minPrice = Number(query.get("minPrice"))
  if (query.get("minPrice") && !Number.isNaN(minPrice)) {
    filtered = filtered.filter((p) => getPrice(p) >= minPrice)
  }

  const maxPrice = Number(query.get("maxPrice"))
  if (query.get("maxPrice") && !Number.isNaN(maxPrice)) {
    filtered = filtered.filter((p) => getPrice(p) <= maxPrice)
  }

  const isNew = query.get("isNew")
  if (isNew === "true" || isNew === "false") {
    filtered = filtered.filter((p) => Boolean(p.isNew) === (isNew === "true"))
  }

  const isOffered = query.get("isOffered")
  if (isOffered === "true" || isOffered === "false") {
    filtered = filtered.filter(
      (p) => Boolean(p.isOffered) === (isOffered === "true")
    )
  }

  const sort = query.get("sort")
  switch (sort) {
    case "price_high_low":
      filtered.sort((a, b) => getPrice(b) - getPrice(a))
      break
    case "price_low_high":
      filtered.sort((a, b) => getPrice(a) - getPrice(b))
      break
    case "oldest":
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime()
      )
      break
    case "latest":
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      )
      break
  }

  return filtered
}

function paginate(items: ProductListItem[], ctx: MockContext) {
  const page = Math.max(1, Number(ctx.query.get("page") ?? 1) || 1)
  const limit = Math.max(1, Number(ctx.query.get("limit") ?? 5) || 5)
  const totalData = items.length
  const totalPages = Math.max(1, Math.ceil(totalData / limit))
  const start = (page - 1) * limit
  const data = items.slice(start, start + limit)

  return {
    success: true,
    message: "Products retrieved successfully!",
    meta: { totalData, totalPages, currentPage: page, limit },
    data,
  }
}

export const productMocks: MockRoute[] = [
  {
    method: "GET",
    pattern: "/products",
    handler: (ctx) => paginate(applyFilters(allProducts, ctx.query), ctx),
  },
  // The backend exposes both `/products` and `/product` — mirror both here.
  {
    method: "GET",
    pattern: "/product",
    handler: (ctx) => paginate(applyFilters(allProducts, ctx.query), ctx),
  },
  {
    method: "GET",
    pattern: "/products/:slug",
    handler: (_ctx, params) => {
      const product = allProducts.find((p) => p.slug === params.slug)
      if (!product) {
        return {
          success: false,
          message: "Product not found",
          data: null,
        }
      }
      return {
        success: true,
        message: "Product retrieved successfully!",
        data: product,
      }
    },
  },
  {
    method: "GET",
    pattern: "/product/:slug",
    handler: (_ctx, params) => {
      const product = allProducts.find((p) => p.slug === params.slug)
      if (!product) {
        return {
          success: false,
          message: "Product not found",
          data: null,
        }
      }
      return {
        success: true,
        message: "Product retrieved successfully!",
        data: product,
      }
    },
  },
]
