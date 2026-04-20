import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type AdminDataTableSkeletonProps = {
  columns: number
  rows?: number
}

const AdminDataTableSkeleton = ({
  columns,
  rows = 8,
}: AdminDataTableSkeletonProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3 md:px-6">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>

      <Table className="min-w-[980px]">
        <TableHeader className="bg-muted/40">
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index} className="px-4 py-3 md:px-6">
                <Skeleton className="h-4 w-16" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex} className="px-4 py-3 md:px-6">
                  {colIndex === 0 ? (
                    <Skeleton className="h-10 w-10 rounded-full" />
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-4 md:px-6">
        <Skeleton className="h-4 w-40" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-14" />
          <Skeleton className="h-8 w-14" />
        </div>
      </div>
    </div>
  )
}

export default AdminDataTableSkeleton
