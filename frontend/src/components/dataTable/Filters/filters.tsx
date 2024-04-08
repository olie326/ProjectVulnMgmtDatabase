import { Table } from "@tanstack/react-table";
import AddFilter from "./addFilter";
import FilterBadge from "./filterBadge";
import { useEffect, useState } from "react";

export interface filter {
  id: string;
  value: unknown;
  active: boolean;
}

export interface filterContext {
  filters: filter[];
  active: filter[];
}

export default function Filters({
  // column,
  table,
}: {
  // column: Column<any, unknown>;
  table: Table<any>;
}) {
  useEffect(() => {
    // console.log(table.getState().columnFilters);
    // console.log(Filters);
  }, [table.getState().columnFilters]);

  const defaultFilters = table.getAllColumns().map((column) => {
    return { id: column.id, value: "", active: false } as filter;
  });

  //first is for active states. second array is for filter order (basically a stack)
  const [Filters, setFilters] = useState<filterContext>({
    filters: defaultFilters,
    active: [],
  });

  // useEffect(() => {
  //   console.log("filters updated!", Filters);
  // }, [Filters]);

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {Filters.active.map((filter) =>
        filter.active ? (
          <FilterBadge
            id={filter.id}
            table={table}
            filters={Filters}
            setFilters={setFilters}
          />
        ) : null
      )}
      <AddFilter filters={Filters} setFilters={setFilters} />
    </div>
  );
}
