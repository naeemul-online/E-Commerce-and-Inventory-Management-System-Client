/**
 * Centralised image-upload constraints. Update these values to match the
 * backend's multer / cloud-storage limits — every feature that uploads
 * images (category, brand, product) imports from here so client and server
 * stay in lockstep.
 */

/** Hard cap on a single category image in bytes (2 MB). */
export const MAX_CATEGORY_IMAGE_BYTES = 2 * 1024 * 1024

/** Hard cap on a single brand image in bytes (2 MB). */
export const MAX_BRAND_IMAGE_BYTES = 2 * 1024 * 1024

/** Hard cap on a single product image in bytes (5 MB). */
export const MAX_PRODUCT_IMAGE_BYTES = 5 * 1024 * 1024

/** MIME types accepted across the admin uploads. */
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
] as const

/** `accept` attribute string for `<input type="file">`. */
export const ACCEPTED_IMAGE_INPUT_ACCEPT = ACCEPTED_IMAGE_MIME_TYPES.join(",")

/** Human-readable file size, e.g. `1.4 MB`. */
export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
