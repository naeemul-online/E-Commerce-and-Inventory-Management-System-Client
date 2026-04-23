import type { ProductListItem } from "@/types/product"
import type { MockContext, MockRoute } from "./types"

/**
 * Fixture data modelled after the real `GET /api/v1/product` response
 * provided in the project brief. Shape must stay in sync with
 * `types/product.ts::ProductListItem`.
 *
 * This array is mutable on purpose so the mock layer can service the full
 * admin CRUD (create/update/delete) against the same dataset used by
 * listing and detail queries.
 */

const baseCategory = {
  id: "cmo39zb8x0002v18oyk7a63r1",
  name: "Barishal Honey",
  slug: "barishal-honey",
  createdAt: "2026-04-17T19:02:28.785Z",
  updatedAt: "2026-04-17T19:02:28.785Z",
}

const altCategory = {
  id: "cmo39zb8x0002v18oyk7a63r2",
  name: "Sundarban Honey",
  slug: "sundarban-honey",
  createdAt: "2026-04-17T19:02:28.785Z",
  updatedAt: "2026-04-17T19:02:28.785Z",
}

const baseBrand = {
  id: "cmo2uh6gk0000mk8oxu9ihz6j",
  name: "sundarban honey",
  slug: "sundarban-honey",
  createdAt: "2026-04-17T11:48:28.531Z",
  updatedAt: "2026-04-17T11:48:28.531Z",
}

const altBrand = {
  id: "cmo2uh6gk0000mk8oxu9ihz6k",
  name: "barishal farms",
  slug: "barishal-farms",
  createdAt: "2026-04-17T11:48:28.531Z",
  updatedAt: "2026-04-17T11:48:28.531Z",
}

const seedImage =
  "https://res.cloudinary.com/dsieyc8m2/image/upload/v1776927042/ecommerce/products/product1.webp-1776927039555.webp"

type SeedProduct = Pick<
  ProductListItem,
  | "id"
  | "title"
  | "slug"
  | "description"
  | "regularPrice"
  | "discountedPrice"
  | "stock"
  | "isNew"
  | "isOffered"
  | "tags"
> & { categoryIndex?: 0 | 1; brandIndex?: 0 | 1 }

const seed: SeedProduct[] = [
  {
    id: "cmob4hd8u0000iu8o5t4qbbrm",
    title: "MacBook Pro M3 2",
    slug: "macbook-pro-m3-2-2",
    description: "High performance laptop with excellent battery life.",
    regularPrice: 2500,
    discountedPrice: 2300,
    stock: 15,
    isNew: true,
    isOffered: true,
    tags: ["apple", "laptop"],
  },
  {
    id: "cmob4hd8u0001iu8o5t4qbbrn",
    title: "Sundarban Raw Honey 500g",
    slug: "sundarban-raw-honey-500g",
    description: "Unfiltered wild honey harvested from the Sundarbans.",
    regularPrice: 950,
    discountedPrice: 820,
    stock: 42,
    isNew: true,
    isOffered: true,
    tags: ["honey", "raw", "sundarban"],
  },
  {
    id: "cmob4hd8u0002iu8o5t4qbbro",
    title: "Barishal Litchi Honey 1kg",
    slug: "barishal-litchi-honey-1kg",
    description: "Mild and floral litchi-blossom honey from Barishal.",
    regularPrice: 1600,
    discountedPrice: 1450,
    stock: 30,
    isNew: false,
    isOffered: true,
    tags: ["honey", "litchi"],
    categoryIndex: 1,
  },
  {
    id: "cmob4hd8u0003iu8o5t4qbbrp",
    title: "Mustard Flower Honey 500g",
    slug: "mustard-flower-honey-500g",
    description: "Thick, granulating honey pressed during mustard season.",
    regularPrice: 700,
    discountedPrice: 620,
    stock: 58,
    isNew: false,
    isOffered: false,
    tags: ["honey", "mustard"],
  },
  {
    id: "cmob4hd8u0004iu8o5t4qbbrq",
    title: "Black Seed Honey 250g",
    slug: "black-seed-honey-250g",
    description: "Premium black seed honey blend with herbal finish.",
    regularPrice: 1200,
    discountedPrice: null,
    stock: 18,
    isNew: true,
    isOffered: false,
    tags: ["honey", "black-seed", "premium"],
    brandIndex: 1,
  },
  {
    id: "cmob4hd8u0005iu8o5t4qbbrr",
    title: "Forest Mixed Honey 1kg",
    slug: "forest-mixed-honey-1kg",
    description: "Rich multi-flora honey sourced from mangrove beekeepers.",
    regularPrice: 1800,
    discountedPrice: 1690,
    stock: 24,
    isNew: false,
    isOffered: true,
    tags: ["honey", "forest"],
  },
  {
    id: "cmob4hd8u0006iu8o5t4qbbrs",
    title: "Organic Ghee 500ml",
    slug: "organic-ghee-500ml",
    description: "Slow-churned cow ghee from grass-fed livestock.",
    regularPrice: 1450,
    discountedPrice: 1299,
    stock: 40,
    isNew: true,
    isOffered: true,
    tags: ["ghee", "organic"],
    categoryIndex: 1,
    brandIndex: 1,
  },
  {
    id: "cmob4hd8u0007iu8o5t4qbbrt",
    title: "Organic Mustard Oil 1L",
    slug: "organic-mustard-oil-1l",
    description: "Cold-pressed mustard oil with high pungency.",
    regularPrice: 650,
    discountedPrice: 595,
    stock: 65,
    isNew: false,
    isOffered: true,
    tags: ["oil", "mustard", "organic"],
    brandIndex: 1,
  },
  {
    id: "cmob4hd8u0008iu8o5t4qbbru",
    title: "Dates Chutney Jar 300g",
    slug: "dates-chutney-jar-300g",
    description: "Sweet-and-tangy chutney handmade in small batches.",
    regularPrice: 420,
    discountedPrice: null,
    stock: 75,
    isNew: false,
    isOffered: false,
    tags: ["chutney", "snack"],
    categoryIndex: 1,
  },
  {
    id: "cmob4hd8u0009iu8o5t4qbbrv",
    title: "Coconut Jaggery 500g",
    slug: "coconut-jaggery-500g",
    description: "Traditional coconut palm jaggery with caramel notes.",
    regularPrice: 380,
    discountedPrice: 340,
    stock: 90,
    isNew: true,
    isOffered: false,
    tags: ["jaggery", "coconut"],
  },
  {
    id: "cmob4hd8u000aiu8o5t4qbbrw",
    title: "Ginger-Garlic Paste 250g",
    slug: "ginger-garlic-paste-250g",
    description: "Fresh ginger-garlic paste with no preservatives.",
    regularPrice: 220,
    discountedPrice: 199,
    stock: 120,
    isNew: false,
    isOffered: true,
    tags: ["condiment", "fresh"],
    categoryIndex: 1,
    brandIndex: 1,
  },
  {
    id: "cmob4hd8u000biu8o5t4qbbrx",
    title: "Basmati Rice 5kg",
    slug: "basmati-rice-5kg",
    description: "Long-grain aged basmati rice, premium export quality.",
    regularPrice: 1200,
    discountedPrice: 1099,
    stock: 35,
    isNew: false,
    isOffered: true,
    tags: ["rice", "grocery"],
    brandIndex: 1,
  },
  {
    id: "cmob4hd8u000ciu8o5t4qbbry",
    title: "Premium Red Lentils 2kg",
    slug: "premium-red-lentils-2kg",
    description: "Hand-sorted red lentils, perfect for daily dal.",
    regularPrice: 480,
    discountedPrice: 440,
    stock: 88,
    isNew: false,
    isOffered: false,
    tags: ["lentils", "grocery"],
  },
  {
    id: "cmob4hd8u000diu8o5t4qbbrz",
    title: "Saffron 1g Tin",
    slug: "saffron-1g-tin",
    description: "All-red Category I saffron, vacuum sealed.",
    regularPrice: 950,
    discountedPrice: null,
    stock: 22,
    isNew: true,
    isOffered: false,
    tags: ["spice", "premium"],
    categoryIndex: 1,
  },
  {
    id: "cmob4hd8u000eiu8o5t4qbbs0",
    title: "Cardamom Whole 100g",
    slug: "cardamom-whole-100g",
    description: "Aromatic green cardamom pods from the hills.",
    regularPrice: 720,
    discountedPrice: 660,
    stock: 50,
    isNew: false,
    isOffered: true,
    tags: ["spice", "cardamom"],
    brandIndex: 1,
  },
]

const baseDate = new Date("2026-04-23T06:50:42.894Z")

let allProducts: ProductListItem[] = seed.map((item, index) => {
  const created = new Date(baseDate.getTime() - index * 36 * 60 * 60 * 1000)
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    regularPrice: item.regularPrice,
    discountedPrice: item.discountedPrice ?? null,
    stock: item.stock,
    images: [seedImage],
    isNew: item.isNew,
    isOffered: item.isOffered,
    categoryId: (item.categoryIndex === 1 ? altCategory : baseCategory).id,
    brandId: (item.brandIndex === 1 ? altBrand : baseBrand).id,
    tags: item.tags ?? [],
    createdAt: created.toISOString(),
    updatedAt: created.toISOString(),
    category: item.categoryIndex === 1 ? altCategory : baseCategory,
    brand: item.brandIndex === 1 ? altBrand : baseBrand,
  }
})

function getPrice(p: ProductListItem): number {
  return p.discountedPrice ?? p.regularPrice
}

function applyFilters(items: ProductListItem[], query: URLSearchParams) {
  let filtered = items.slice()

  const searchTerm = query.get("searchTerm")?.trim().toLowerCase()
  if (searchTerm) {
    filtered = filtered.filter((p) =>
      [p.title, p.description, p.category?.name, p.brand?.name, ...(p.tags ?? [])]
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

function findById(id: string) {
  return allProducts.find((p) => p.id === id) ?? null
}

function findBySlug(slug: string) {
  return allProducts.find((p) => p.slug === slug) ?? null
}

function notFound(what = "Product") {
  return {
    success: false,
    message: `${what} not found`,
    data: null,
  }
}

type MutableBody = Partial<
  Omit<ProductListItem, "id" | "createdAt" | "updatedAt" | "category" | "brand">
>

function applyMutableBody(
  target: ProductListItem,
  body: MutableBody
): ProductListItem {
  const next: ProductListItem = { ...target }
  if (typeof body.title === "string") next.title = body.title
  if (typeof body.slug === "string") next.slug = body.slug
  if (typeof body.description === "string") next.description = body.description
  if (typeof body.regularPrice === "number") next.regularPrice = body.regularPrice
  if (body.discountedPrice === null || typeof body.discountedPrice === "number") {
    next.discountedPrice = body.discountedPrice
  }
  if (typeof body.stock === "number") next.stock = body.stock
  if (Array.isArray(body.images)) next.images = body.images
  if (typeof body.isNew === "boolean") next.isNew = body.isNew
  if (typeof body.isOffered === "boolean") next.isOffered = body.isOffered
  if (typeof body.categoryId === "string") next.categoryId = body.categoryId
  if (typeof body.brandId === "string") next.brandId = body.brandId
  if (Array.isArray(body.tags)) next.tags = body.tags
  next.updatedAt = new Date().toISOString()
  return next
}

export const productMocks: MockRoute[] = [
  {
    method: "GET",
    pattern: "/products",
    handler: (ctx) => paginate(applyFilters(allProducts, ctx.query), ctx),
  },
  {
    method: "GET",
    pattern: "/product",
    handler: (ctx) => paginate(applyFilters(allProducts, ctx.query), ctx),
  },
  {
    method: "GET",
    pattern: "/products/:slugOrId",
    handler: (_ctx, params) => {
      const key = params.slugOrId
      const product = findBySlug(key) ?? findById(key)
      if (!product) return notFound()
      return {
        success: true,
        message: "Product retrieved successfully!",
        data: product,
      }
    },
  },
  {
    method: "GET",
    pattern: "/product/:slugOrId",
    handler: (_ctx, params) => {
      const key = params.slugOrId
      const product = findBySlug(key) ?? findById(key)
      if (!product) return notFound()
      return {
        success: true,
        message: "Product retrieved successfully!",
        data: product,
      }
    },
  },
  {
    method: "POST",
    pattern: "/product",
    handler: (ctx) => {
      const body = (ctx.body ?? {}) as MutableBody & { title?: string }
      if (!body.title) {
        return { success: false, message: "title is required", data: null }
      }
      const id = `mock-${Date.now()}`
      const now = new Date().toISOString()
      const created: ProductListItem = applyMutableBody(
        {
          id,
          title: body.title,
          slug: body.slug ?? `${body.title.toLowerCase().replace(/\s+/g, "-")}-${id.slice(-4)}`,
          regularPrice: body.regularPrice ?? 0,
          discountedPrice: body.discountedPrice ?? null,
          stock: body.stock ?? 0,
          images: body.images ?? [seedImage],
          isNew: body.isNew ?? true,
          isOffered: body.isOffered ?? false,
          categoryId: body.categoryId ?? baseCategory.id,
          brandId: body.brandId ?? baseBrand.id,
          tags: body.tags ?? [],
          createdAt: now,
          updatedAt: now,
          category:
            body.categoryId === altCategory.id ? altCategory : baseCategory,
          brand: body.brandId === altBrand.id ? altBrand : baseBrand,
        },
        body
      )
      allProducts = [created, ...allProducts]
      return {
        success: true,
        message: "Product created successfully!",
        data: created,
      }
    },
  },
  {
    method: "PATCH",
    pattern: "/product/:id",
    handler: (ctx, params) => {
      const target = findById(params.id) ?? findBySlug(params.id)
      if (!target) return notFound()
      const next = applyMutableBody(target, (ctx.body ?? {}) as MutableBody)
      allProducts = allProducts.map((p) => (p.id === target.id ? next : p))
      return {
        success: true,
        message: "Product updated successfully!",
        data: next,
      }
    },
  },
  {
    method: "DELETE",
    pattern: "/product/:id",
    handler: (_ctx, params) => {
      const target = findById(params.id) ?? findBySlug(params.id)
      if (!target) return notFound()
      allProducts = allProducts.filter((p) => p.id !== target.id)
      return {
        success: true,
        message: "Product deleted successfully!",
        data: { id: target.id },
      }
    },
  },
]
