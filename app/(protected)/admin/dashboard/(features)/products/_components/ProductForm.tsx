"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  productFormSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "@/lib/validators/product"
import type { Brand } from "@/types/brand"
import type { Category } from "@/types/category"
import type { ProductListItem } from "@/types/product"
import { createProduct } from "@/services/product/create-product"
import { updateProduct } from "@/services/product/update-product"

type ProductFormMode = "create" | "edit"

type ProductFormProps = {
  mode: ProductFormMode
  categories: Category[]
  brands: Brand[]
  initialProduct?: ProductListItem | null
  onSuccess?: () => void
  onCancel?: () => void
  /** When true, wraps submit/cancel in a sticky footer (used inside the sheet). */
  stickyFooter?: boolean
  className?: string
}

const selectClassName = cn(
  "h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-xs transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 md:text-sm"
)

const textareaClassName = cn(
  "w-full min-h-[6rem] rounded-2xl border border-transparent bg-input/50 px-3 py-2 text-xs transition-[color,box-shadow,background-color] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 md:text-sm"
)

const checkboxRowClassName = cn(
  "flex items-center gap-2 rounded-full border border-input/60 bg-input/30 px-3 py-2"
)

const buildDefaults = (
  initial?: ProductListItem | null
): ProductFormInput => ({
  title: initial?.title ?? "",
  slug: initial?.slug ?? "",
  description: initial?.description ?? "",
  regularPrice: initial?.regularPrice ?? ("" as unknown as number),
  discountedPrice:
    initial?.discountedPrice === null || initial?.discountedPrice === undefined
      ? ("" as unknown as number)
      : initial.discountedPrice,
  stock: initial?.stock ?? ("" as unknown as number),
  categoryId: initial?.categoryId ?? "",
  brandId: initial?.brandId ?? "",
  tags: initial?.tags ?? [],
  isNew: initial?.isNew ?? false,
  isOffered: initial?.isOffered ?? false,
  isPublished: false,
})

const ProductForm = ({
  mode,
  categories,
  brands,
  initialProduct,
  onSuccess,
  onCancel,
  stickyFooter = false,
  className,
}: ProductFormProps) => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaults = useMemo(() => buildDefaults(initialProduct), [initialProduct])

  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaults,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
  } = form

  const tags = watch("tags") ?? []
  const [tagDraft, setTagDraft] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const existingImages = initialProduct?.images ?? []

  const addTagFromDraft = () => {
    const next = tagDraft.trim().toLowerCase()
    if (!next) return
    if (tags.includes(next)) {
      setTagDraft("")
      return
    }
    setValue("tags", [...tags, next], { shouldDirty: true })
    setTagDraft("")
  }

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
      { shouldDirty: true }
    )
  }

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return
    const incoming = Array.from(list).filter((file) =>
      file.type.startsWith("image/")
    )
    if (incoming.length !== list.length) {
      toast.warning("Only image files are allowed.")
    }
    setFiles((prev) => [...prev, ...incoming])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = handleSubmit(async (values) => {
    const payload = {
      title: values.title,
      slug: values.slug?.trim() ? values.slug.trim() : undefined,
      description: values.description,
      regularPrice: values.regularPrice,
      discountedPrice:
        values.discountedPrice === undefined ? null : values.discountedPrice,
      stock: values.stock,
      categoryId: values.categoryId,
      brandId: values.brandId,
      tags: values.tags ?? [],
      isNew: values.isNew,
      isOffered: values.isOffered,
      isPublished: values.isPublished,
    }

    const fd = new FormData()
    fd.append("data", JSON.stringify(payload))
    for (const file of files) {
      fd.append("images", file, file.name)
    }

    const result =
      mode === "create"
        ? await createProduct(fd)
        : await updateProduct(initialProduct!.id, fd)

    if (!result.success) {
      toast.error(result.message || "Something went wrong.")
      return
    }

    toast.success(
      result.message ||
        (mode === "create" ? "Product created." : "Product updated.")
    )

    router.refresh()
    onSuccess?.()
    if (mode === "create") {
      form.reset(buildDefaults(null))
      setFiles([])
    }
  })

  const handleCancel = () => {
    onCancel?.()
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      noValidate
    >
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
        {/* Basic info */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-foreground">
            Basic info
          </legend>

          <div className="space-y-2">
            <Label htmlFor="product-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="product-title"
              placeholder="e.g. MacBook Pro M3"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-slug">
              Slug <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="product-slug"
              placeholder="Auto-generated from title if left blank"
              aria-invalid={!!errors.slug}
              {...register("slug")}
            />
            {errors.slug && (
              <p className="text-xs text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">
              Description <span className="text-destructive">*</span>
            </Label>
            <textarea
              id="product-description"
              rows={4}
              placeholder="Short description of the product..."
              className={textareaClassName}
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>
        </fieldset>

        {/* Pricing & stock */}
        <fieldset className="grid gap-4 sm:grid-cols-3">
          <legend className="col-span-full text-sm font-medium text-foreground">
            Pricing &amp; stock
          </legend>

          <div className="space-y-2">
            <Label htmlFor="product-regular-price">
              Regular price <span className="text-destructive">*</span>
            </Label>
            <Input
              id="product-regular-price"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              aria-invalid={!!errors.regularPrice}
              {...register("regularPrice")}
            />
            {errors.regularPrice && (
              <p className="text-xs text-destructive">
                {errors.regularPrice.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-discounted-price">Discounted price</Label>
            <Input
              id="product-discounted-price"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              placeholder="—"
              aria-invalid={!!errors.discountedPrice}
              {...register("discountedPrice")}
            />
            {errors.discountedPrice && (
              <p className="text-xs text-destructive">
                {errors.discountedPrice.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-stock">
              Stock <span className="text-destructive">*</span>
            </Label>
            <Input
              id="product-stock"
              type="number"
              inputMode="numeric"
              min={0}
              step="1"
              aria-invalid={!!errors.stock}
              {...register("stock")}
            />
            {errors.stock && (
              <p className="text-xs text-destructive">{errors.stock.message}</p>
            )}
          </div>
        </fieldset>

        {/* Classification */}
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="col-span-full text-sm font-medium text-foreground">
            Classification
          </legend>

          <div className="space-y-2">
            <Label htmlFor="product-category">
              Category <span className="text-destructive">*</span>
            </Label>
            <select
              id="product-category"
              className={selectClassName}
              aria-invalid={!!errors.categoryId}
              {...register("categoryId")}
              defaultValue={getValues("categoryId")}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-xs text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-brand">
              Brand <span className="text-destructive">*</span>
            </Label>
            <select
              id="product-brand"
              className={selectClassName}
              aria-invalid={!!errors.brandId}
              {...register("brandId")}
              defaultValue={getValues("brandId")}
            >
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            {errors.brandId && (
              <p className="text-xs text-destructive">
                {errors.brandId.message}
              </p>
            )}
          </div>
        </fieldset>

        {/* Tags */}
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-foreground">Tags</legend>
          <div className="flex gap-2">
            <Input
              id="product-tags"
              placeholder="Type a tag and press Enter"
              value={tagDraft}
              onChange={(e) => setTagDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault()
                  addTagFromDraft()
                }
                if (e.key === "Backspace" && !tagDraft && tags.length > 0) {
                  removeTag(tags[tags.length - 1])
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={addTagFromDraft}
              disabled={!tagDraft.trim()}
            >
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    aria-label={`Remove tag ${tag}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        {/* Flags */}
        <fieldset className="grid gap-2 sm:grid-cols-3">
          <legend className="col-span-full text-sm font-medium text-foreground">
            Status flags
          </legend>

          <label className={checkboxRowClassName}>
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              {...register("isNew")}
            />
            <span className="text-sm">New arrival</span>
          </label>

          <label className={checkboxRowClassName}>
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              {...register("isOffered")}
            />
            <span className="text-sm">On offer</span>
          </label>

          <label className={checkboxRowClassName}>
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              {...register("isPublished")}
            />
            <span className="text-sm">Publish</span>
          </label>
        </fieldset>

        {/* Images */}
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">
            Images
          </legend>

          {mode === "edit" && existingImages.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Existing images (keep as-is or upload new ones to replace)
              </p>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {existingImages.map((url, idx) => (
                  <li
                    key={`${url}-${idx}`}
                    className="relative aspect-square overflow-hidden rounded-xl border bg-muted"
                  >
                    <Image
                      src={url}
                      alt={`Existing image ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <input
              ref={fileInputRef}
              id="product-images"
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => {
                handleFiles(e.target.files)
                e.target.value = ""
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload images
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG, or WebP. Multiple files supported.
            </p>
          </div>

          {files.length > 0 && (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {files.map((file, index) => {
                const url = URL.createObjectURL(file)
                return (
                  <li
                    key={`${file.name}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border bg-muted"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={file.name}
                      className="h-full w-full object-cover"
                      onLoad={() => URL.revokeObjectURL(url)}
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground shadow transition-opacity hover:bg-background"
                      aria-label={`Remove ${file.name}`}
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </fieldset>
      </div>

      <div
        className={cn(
          "flex items-center justify-end gap-2 border-t bg-background/80 px-6 py-4 backdrop-blur",
          stickyFooter && "sticky bottom-0"
        )}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
            ? "Create product"
            : "Save changes"}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
