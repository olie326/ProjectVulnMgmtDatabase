import {
  Column,
  ColumnFilter,
  HeaderGroup,
  Table,
  flexRender,
} from "@tanstack/react-table";
import AddFilter from "./addFilter";
import FilterBadge from "./filterBadge";
import { useEffect, useState } from "react";

interface columnFilterDisplayProps extends ColumnFilter {}

export default function Filters({
  // column,
  table,
}: {
  // column: Column<any, unknown>;
  table: Table<any>;
}) {
  useEffect(() => {
    console.log(table.getState().columnFilters);
    console.log(activeFilters);
  }, [table.getState().columnFilters]);

  const [activeFilters, setActiveFilters] = useState<any[]>([]);

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {activeFilters.map((id) => (
        <FilterBadge id={id} table={table} />
      ))}
      <AddFilter
        table={table}
        active={activeFilters}
        setActive={setActiveFilters}
      />
    </div>
  );
}
