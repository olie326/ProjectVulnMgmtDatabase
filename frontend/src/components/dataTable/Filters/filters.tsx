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
  table,
  filterContext,
  setFilterContext,
}: {
  table: Table<any>;
  filterContext: filterContext;
  setFilterContext: React.Dispatch<React.SetStateAction<filterContext>>;
}) {
  useEffect(() => {
    console.log(table.getState().columnFilters);
  }, [table.getState().columnFilters]);

  //do i need these defaults???
  const defaultFilters = table.getAllColumns().map((column) => {
    return { id: column.id, value: "", active: false } as filter;
  });

  //first is for active states. second array is for filter order (basically a stack)
  // const [Filters, setFilters] = useState<filterContext>({
  //   filters: defaultFilters,
  //   active: [],
  // });

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {filterContext.active.map((filter) =>
        filter.active ? (
          <FilterBadge
            id={filter.id}
            table={table}
            filters={filterContext}
            setFilters={setFilterContext}
          />
        ) : null
      )}
      <AddFilter filters={filterContext} setFilters={setFilterContext} />
    </div>
  );
}
