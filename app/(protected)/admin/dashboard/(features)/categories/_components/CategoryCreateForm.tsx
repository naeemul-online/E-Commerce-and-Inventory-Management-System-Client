"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import TextField from "@/components/forms/TextField"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import {
  ACCEPTED_IMAGE_INPUT_ACCEPT,
  ACCEPTED_IMAGE_MIME_TYPES,
  MAX_CATEGORY_IMAGE_BYTES,
  formatBytes,
} from "@/lib/constants/upload"
import {
  type CreateCategoryInput,
  type CreateCategoryOutput,
  createCategorySchema,
} from "@/lib/validators/category"
import { cn } from "@/lib/utils"
import { createCategory } from "@/services/category/create-category"
import { updateCategory } from "@/services/category/update-category"

type CategoryFormMode = "create" | "edit"

type CategoryCreateFormProps = {
  mode?: CategoryFormMode
  categoryId?: string
  /** Prefilled values for edit mode. `image` is the existing remote URL. */
  initial?: { name: string; image?: string | null }
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Reusable Create + Edit form. Image is managed outside Zod because zod's
 * file validation is awkward in browser-vs-node and FormData is what the
 * backend ultimately wants anyway.
 */
const CategoryCreateForm = ({
  mode = "create",
  categoryId,
  initial,
  onSuccess,
  onCancel,
}: CategoryCreateFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  // Existing remote image (only meaningful in edit mode and only until the
  // admin picks a new file).
  const remoteImage = initial?.image ?? null

  // Build / tear down a local object URL when a new file is picked.
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(imageFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const visibleImage = previewUrl ?? remoteImage

  const form = useForm<CreateCategoryInput, unknown, CreateCategoryOutput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: initial?.name ?? "" },
  })

  const isEditMode = mode === "edit" && Boolean(categoryId)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null)
    const file = event.target.files?.[0] ?? null
    if (!file) {
      setImageFile(null)
      return
    }
    if (
      !(ACCEPTED_IMAGE_MIME_TYPES as readonly string[]).includes(file.type)
    ) {
      setImageError("Only JPG, PNG, WebP, or AVIF images are allowed.")
      event.target.value = ""
      return
    }
    if (file.size > MAX_CATEGORY_IMAGE_BYTES) {
      setImageError(
        `Image must be ${formatBytes(MAX_CATEGORY_IMAGE_BYTES)} or smaller.`
      )
      event.target.value = ""
      return
    }
    setImageFile(file)
  }

  const clearSelectedFile = () => {
    setImageFile(null)
    setImageError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function onSubmit(values: CreateCategoryOutput) {
    // For create flow, require an image up-front. For edit flow we keep the
    // existing one when no new file is chosen.
    if (!isEditMode && !imageFile) {
      setImageError("Please choose a category image.")
      return
    }

    const fd = new FormData()
    fd.append("name", values.name)
    if (imageFile) fd.append("image", imageFile)

    const result = isEditMode
      ? await updateCategory(categoryId!, fd)
      : await createCategory(fd)

    if (!result.success) {
      toast.error(
        result.message ||
          (isEditMode ? "Category update failed." : "Category creation failed.")
      )
      return
    }

    toast.success(
      result.message ||
        (isEditMode
          ? "Category updated successfully."
          : "Category created successfully.")
    )

    if (!isEditMode) {
      form.reset({ name: "" })
      clearSelectedFile()
    }
    onSuccess?.()
  }

  const isSubmitting = form.formState.isSubmitting
  const submitLabel = useMemo(() => {
    if (isSubmitting) return isEditMode ? "Saving..." : "Creating..."
    return isEditMode ? "Save changes" : "Create category"
  }, [isEditMode, isSubmitting])

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-6"
    >
      <FieldGroup className="gap-4">
        <TextField
          control={form.control}
          name="name"
          label="Category name"
          placeholder="e.g. Laptops"
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Slug is generated automatically from the name on the server.
        </p>

        <div className="space-y-2">
          <span className="text-sm font-medium">Image</span>

          <div
            className={cn(
              "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-muted/40 transition-colors",
              imageError ? "border-destructive" : "border-input"
            )}
          >
            {visibleImage ? (
              previewUrl ? (
                // Local object URL (blob:) — next/image rejects unknown
                // protocols, so render a plain <img> for the picker preview.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt={
                    initial?.name
                      ? `${initial.name} preview`
                      : "Category preview"
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={visibleImage}
                  alt={
                    initial?.name
                      ? `${initial.name} preview`
                      : "Category preview"
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
              )
            ) : (
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <ImagePlus className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs">No image selected</span>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_INPUT_ACCEPT}
            className="sr-only"
            onChange={handleFileChange}
            disabled={isSubmitting}
            aria-label="Category image"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
            >
              {imageFile || remoteImage ? "Replace image" : "Choose image"}
            </Button>
            {imageFile ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSelectedFile}
                disabled={isSubmitting}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Remove selected file
              </Button>
            ) : null}
            {imageFile ? (
              <span className="truncate text-xs text-muted-foreground">
                {imageFile.name}
              </span>
            ) : null}
          </div>

          {imageError ? (
            <p className="text-xs text-destructive" role="alert">
              {imageError}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WebP, or AVIF up to{" "}
              {formatBytes(MAX_CATEGORY_IMAGE_BYTES)}.
              {isEditMode
                ? " Leave empty to keep the current image — replacing it removes the old one automatically."
                : ""}
            </p>
          )}
        </div>
      </FieldGroup>

      <div className="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        {onCancel ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        ) : null}
        <Button
          type="submit"
          className="text-background"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default CategoryCreateForm
