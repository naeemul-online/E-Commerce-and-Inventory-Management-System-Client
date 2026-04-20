import { ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type AdminDataTableColumn<TData> = {
  key: string
  header: string
  headerClassName?: string
  cellClassName?: string
  render: (row: TData, rowIndex: number) => ReactNode
}

type AdminDataTableProps<TData> = {
  title: string
  totalLabel?: ReactNode
  /** Renders above the title row, inside the same card (aligned padding with table). */
  toolbar?: ReactNode
  columns: AdminDataTableColumn<TData>[]
  rows: TData[]
  emptyStateText?: string
  footer?: ReactNode
  tableClassName?: string
}

function AdminDataTable<TData>({
  title,
  totalLabel,
  toolbar,
  columns,
  rows,
  emptyStateText = "No data found.",
  footer,
  tableClassName,
}: AdminDataTableProps<TData>) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      {toolbar ? (
        <div className="border-b px-4 py-4 md:px-6">{toolbar}</div>
      ) : null}
      <div className="flex items-center justify-between border-b px-4 py-3 md:px-6">
        <h2 className="text-base font-semibold md:text-lg">{title}</h2>
        {totalLabel ? (
          <p className="text-xs text-muted-foreground md:text-sm">{totalLabel}</p>
        ) : null}
      </div>

      <Table className={cn("min-w-[980px]", tableClassName)}>
        <TableHeader className="bg-muted/40">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn("px-4 py-3 md:px-6", column.headerClassName)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-4 py-8 text-center text-muted-foreground md:px-6"
              >
                {emptyStateText}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
                style={{ animationDelay: `${40 + rowIndex * 30}ms` }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${column.key}-${rowIndex}`}
                    className={cn("px-4 py-3 md:px-6", column.cellClassName)}
                  >
                    {column.render(row, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {footer ? (
        <div className="border-t px-4 py-4 md:px-6">{footer}</div>
      ) : null}
    </div>
  )
}

export default AdminDataTable
