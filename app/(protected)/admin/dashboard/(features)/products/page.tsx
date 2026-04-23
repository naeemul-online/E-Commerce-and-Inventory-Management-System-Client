import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AddProductButton from "./_components/AddProductButton"
import DeleteProductButton from "./_components/DeleteProductButton"
import EditProductButton from "./_components/EditProductButton"
import AdminDataTable, {
  AdminDataTableColumn,
} from "@/components/dashboard/AdminDataTable"
import { getBrands } from "@/services/brand/get-brands"
import { getCategories } from "@/services/category/get-categories"
import { getProducts } from "@/services/product/get-products"
import { ProductListItem } from "@/types/product"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

type ProductsPageProps = {
  searchParams?: Promise<{
    page?: string
    limit?: string
    searchTerm?: string
    sort?: string
    category?: string
    brand?: string
    minPrice?: string
    maxPrice?: string
    isNew?: string
    isOffered?: string
  }>
}

const LIMIT_OPTIONS = [5, 10, 15, 20] as const

const LIST_SORT = [
  "",
  "latest",
  "oldest",
  "price_high_low",
  "price_low_high",
] as const

const buildProductsListQuery = (args: {
  page: number
  limit: number
  searchTerm?: string
  sort?: string
  category?: string
  brand?: string
  minPrice?: string
  maxPrice?: string
  isNew?: string
  isOffered?: string
}) => {
  const params = new URLSearchParams()
  params.set("page", String(args.page))
  params.set("limit", String(args.limit))
  if (args.searchTerm?.trim()) params.set("searchTerm", args.searchTerm.trim())
  const sort = args.sort?.trim()
  if (
    sort &&
    LIST_SORT.includes(sort as (typeof LIST_SORT)[number]) &&
    sort !== ""
  ) {
    params.set("sort", sort)
  }
  if (args.category?.trim()) params.set("category", args.category.trim())
  if (args.brand?.trim()) params.set("brand", args.brand.trim())
  if (args.minPrice?.trim()) params.set("minPrice", args.minPrice.trim())
  if (args.maxPrice?.trim()) params.set("maxPrice", args.maxPrice.trim())
  if (args.isNew === "true" || args.isNew === "false")
    params.set("isNew", args.isNew)
  if (args.isOffered === "true" || args.isOffered === "false") {
    params.set("isOffered", args.isOffered)
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

const formatPrice = (price: number) => `$${price.toFixed(2)}`

const filterSelectClassName = cn(
  "h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-xs transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 md:text-sm"
)

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const resolvedSearchParams = await searchParams
  const page = Math.max(1, Number(resolvedSearchParams?.page || 1))
  const rawLimit = Number(resolvedSearchParams?.limit || 5)
  const limit = LIMIT_OPTIONS.includes(
    rawLimit as (typeof LIMIT_OPTIONS)[number]
  )
    ? rawLimit
    : 5
  const rawSort = resolvedSearchParams?.sort?.trim()
  const sort =
    rawSort &&
    LIST_SORT.includes(rawSort as (typeof LIST_SORT)[number]) &&
    rawSort !== ""
      ? rawSort
      : undefined
  const searchTerm = resolvedSearchParams?.searchTerm?.trim() || undefined
  const category = resolvedSearchParams?.category?.trim() || undefined
  const brand = resolvedSearchParams?.brand?.trim() || undefined
  const minPrice = resolvedSearchParams?.minPrice?.trim() || undefined
  const maxPrice = resolvedSearchParams?.maxPrice?.trim() || undefined
  const isNewRaw = resolvedSearchParams?.isNew
  const isNew =
    isNewRaw === "true" || isNewRaw === "false" ? isNewRaw : undefined
  const isOfferedRaw = resolvedSearchParams?.isOffered
  const isOffered =
    isOfferedRaw === "true" || isOfferedRaw === "false"
      ? isOfferedRaw
      : undefined

  const [categoriesResult, brandsResult, productsResponse] = await Promise.all([
    getCategories(),
    getBrands(),
    getProducts(page, limit, {
      searchTerm,
      sort,
      category,
      brand,
      minPrice,
      maxPrice,
      isNew,
      isOffered,
    }),
  ])

  const categories = categoriesResult.data
  const brands = brandsResult.data
  const { data: products, meta } = productsResponse

  const previousPage = Math.max(1, meta.currentPage - 1)
  const nextPage = Math.min(meta.totalPages, meta.currentPage + 1)
  const columns: AdminDataTableColumn<ProductListItem>[] = [
    {
      key: "image",
      header: "Image",
      render: (product) =>
        product.images?.[0] ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-muted">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-xs font-medium text-muted-foreground">
            N/A
          </div>
        ),
    },
    {
      key: "title",
      header: "Title",
      render: (product) => (
        <div>
          <p className="font-medium text-foreground">{product.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{product.slug}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (product) => product.category?.name || product.categoryId,
    },
    {
      key: "brand",
      header: "Brand",
      render: (product) => product.brand?.name || product.brandId,
    },
    {
      key: "price",
      header: "Price",
      render: (product) => (
        <div>
          <p>{formatPrice(product.regularPrice)}</p>
          {product.discountedPrice ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              Offer: {formatPrice(product.discountedPrice)}
            </p>
          ) : null}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (product) => product.stock,
    },
    {
      key: "status",
      header: "Status",
      render: (product) => (
        <div className="flex flex-col gap-1 text-xs">
          <span>{product.isNew ? "New" : "Standard"}</span>
          <span>{product.isOffered ? "Offered" : "No offer"}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (product) => (
        <div className="flex justify-end gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/inventory/products/${product.id}`}>View</Link>
          </Button>
          <EditProductButton
            productId={product.id}
            fallback={product}
            categories={categories}
            brands={brands}
          />
          <DeleteProductButton productId={product.id} />
        </div>
      ),
    },
  ]

  return (
    <section>
      <AdminDataTable
        toolbar={
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between xl:gap-4">
            <form
              method="get"
              action="/admin/dashboard/products"
              className="min-w-0 flex-1"
            >
              <input type="hidden" name="page" value="1" />
              <div className="flex flex-wrap items-end gap-3">
                <div className="max-w-md min-w-[min(100%,14rem)] flex-1 space-y-2">
                  <Label htmlFor="products-search">Search</Label>
                  <Input
                    id="products-search"
                    name="searchTerm"
                    placeholder="Search by title or description..."
                    defaultValue={searchTerm ?? ""}
                    autoComplete="off"
                  />
                </div>
                <div className="min-w-44 shrink-0 space-y-2">
                  <Label htmlFor="products-category">Category</Label>
                  <select
                    id="products-category"
                    name="category"
                    defaultValue={category ?? ""}
                    className={filterSelectClassName}
                  >
                    <option value="">All categories</option>
                    {category &&
                    !categories.some((c) => c.slug === category) ? (
                      <option value={category}>{category}</option>
                    ) : null}
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-44 shrink-0 space-y-2">
                  <Label htmlFor="products-brand">Brand</Label>
                  <select
                    id="products-brand"
                    name="brand"
                    defaultValue={brand ?? ""}
                    className={filterSelectClassName}
                  >
                    <option value="">All brands</option>
                    {brand && !brands.some((b) => b.slug === brand) ? (
                      <option value={brand}>{brand}</option>
                    ) : null}
                    {brands.map((b) => (
                      <option key={b.id} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-44 shrink-0 space-y-2">
                  <Label htmlFor="products-sort">Sort</Label>
                  <select
                    id="products-sort"
                    name="sort"
                    defaultValue={sort ?? ""}
                    className={filterSelectClassName}
                  >
                    <option value="">Default</option>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price_high_low">Price: high → low</option>
                    <option value="price_low_high">Price: low → high</option>
                  </select>
                </div>
                <div className="w-28 shrink-0 space-y-2">
                  <Label htmlFor="products-min-price">Min price</Label>
                  <Input
                    id="products-min-price"
                    name="minPrice"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    placeholder="0"
                    defaultValue={minPrice ?? ""}
                  />
                </div>
                <div className="w-28 shrink-0 space-y-2">
                  <Label htmlFor="products-max-price">Max price</Label>
                  <Input
                    id="products-max-price"
                    name="maxPrice"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    placeholder="∞"
                    defaultValue={maxPrice ?? ""}
                  />
                </div>
                <div className="w-28 shrink-0 space-y-2">
                  <Label htmlFor="products-is-new">New</Label>
                  <select
                    id="products-is-new"
                    name="isNew"
                    defaultValue={isNew ?? ""}
                    className={filterSelectClassName}
                  >
                    <option value="">Any</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="w-30 shrink-0 space-y-2">
                  <Label htmlFor="products-is-offered">Offered</Label>
                  <select
                    id="products-is-offered"
                    name="isOffered"
                    defaultValue={isOffered ?? ""}
                    className={filterSelectClassName}
                  >
                    <option value="">Any</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="w-[150px] shrink-0 space-y-2">
                  <Label htmlFor="products-limit">Per page</Label>
                  <select
                    id="products-limit"
                    name="limit"
                    defaultValue={String(limit)}
                    className={filterSelectClassName}
                  >
                    {LIMIT_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n} per page
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button type="submit">Apply</Button>
                  <Button variant="outline" asChild>
                    <Link href="/admin/dashboard/products">Clear</Link>
                  </Button>
                </div>
              </div>
            </form>
            <AddProductButton
              categories={categories}
              brands={brands}
              className="w-full shrink-0 xl:w-auto xl:self-end"
            />
          </div>
        }
        title="All Products"
        totalLabel={`Total: ${meta.totalData}`}
        columns={columns}
        rows={products}
        emptyStateText="No products found."
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground md:text-sm">
              Page {meta.currentPage} of {meta.totalPages} (limit: {meta.limit})
            </p>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" disabled={page <= 1}>
                <Link
                  href={buildProductsListQuery({
                    page: previousPage,
                    limit: meta.limit,
                    searchTerm,
                    sort,
                    category,
                    brand,
                    minPrice,
                    maxPrice,
                    isNew,
                    isOffered,
                  })}
                >
                  Prev
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                disabled={page >= meta.totalPages}
              >
                <Link
                  href={buildProductsListQuery({
                    page: nextPage,
                    limit: meta.limit,
                    searchTerm,
                    sort,
                    category,
                    brand,
                    minPrice,
                    maxPrice,
                    isNew,
                    isOffered,
                  })}
                >
                  Next
                </Link>
              </Button>
            </div>
          </div>
        }
      />
    </section>
  )
}

export default ProductsPage
