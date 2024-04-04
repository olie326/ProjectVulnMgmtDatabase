import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import TablePagination from "./pagnation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Filters from "./Filters/filters";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

export default function DataTable<TData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    enableColumnResizing: false,
    state: {
      rowSelection,
      pagination,
      columnFilters,
    },
  });

  return (
    <>
      <Filters table={table} />
      <ScrollArea className="rounded-lg border">
        <Table className="relative">
          <TableHeader className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup ? (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-nowrap">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ) : null
            )}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="max-h-40">
                    <HoverCard>
                      <HoverCardTrigger className="line-clamp-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </HoverCardTrigger>
                      <HoverCardContent>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="m-2">
        <TablePagination table={table} />
      </div>
    </>
  );
}
