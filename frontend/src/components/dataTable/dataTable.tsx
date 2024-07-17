import {
  ColumnDef,
  ColumnFiltersState,
  Row,
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
import { useContext, useState } from "react";
import TablePagination from "./pagnation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Filters from "./Filters/filters";
import { isVulnerability } from "./Types/vulnerability";
import { isAsset } from "./Types/asset";
import { isDefinition } from "./Types/definition";
import { TableContext } from "@/pages/Database/Database";
import { setTableContextProps, tableContextProps } from "@/pages/HomePage";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  tableContextProps: tableContextProps;
  setTableContextProps: setTableContextProps;
}

export default function DataTable<TData>({
  columns,
  data,
  tableContextProps,
  setTableContextProps,
}: DataTableProps<TData>) {
  // const [rowSelection, setRowSelection] = useContext(TableContext);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const myGetRowId = (
    originalRow: TData,
    index: number,
    parent?: Row<TData>
  ) => {
    if (isVulnerability(originalRow)) {
      return originalRow.vulnerability_id;
    } else if (isAsset(originalRow)) {
      return originalRow.asset_id;
    } else if (isDefinition(originalRow)) {
      return originalRow.definition_id.toString();
    } else {
      return index.toString();
    }
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 30, //default page size
  });
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setTableContextProps.setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setTableContextProps.setPagination,
    onColumnFiltersChange: setTableContextProps.setColumnFilters,
    getRowId: myGetRowId,
    enableColumnResizing: false,
    state: {
      ...tableContextProps,
    },
  });

  return (
    <>
      <Filters
        table={table}
        filterContext={tableContextProps.filterContext}
        setFilterContext={setTableContextProps.setFilterContext}
      />
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
                {row.getVisibleCells().map((cell) =>
                  cell.column.columnDef.id == "select" ? (
                    <TableCell key={cell.id} className="max-h-40">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ) : (
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
                  )
                )}
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
