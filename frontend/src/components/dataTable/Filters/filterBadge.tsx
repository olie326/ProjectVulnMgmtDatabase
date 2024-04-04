import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  Cross1Icon,
  Cross2Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { ReactNode, useState } from "react";

export default function FilterBadge({
  table,
  id,
}: {
  table: Table<any>;
  id: string;
}) {
  const [filterVal, setFilterVal] = useState("");

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterVal(e.target.value);
    const isActive = table.getState().columnFilters.find((columnFilter) => {
      return columnFilter.id === id;
    });
    isActive
      ? table.getColumn(isActive.id)?.setFilterValue(filterVal)
      : table.setColumnFilters([
          ...table.getState().columnFilters,
          { id: id, value: filterVal },
        ]);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={badgeVariants({ variant: "default" })}>
          {id}
          <ChevronDownIcon className="ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2 object-cover p-2 pt-0">
        <div className="inline-flex items-center justify-between">
          <small className="text-sm font-medium leading-none">
            {id} <span className="text-muted-foreground">contains...</span>
          </small>

          {/* dropdown for a close menu to remove the filter !!!! */}
        </div>

        <Input
          value={filterVal}
          onChange={handleFilterChange}
          className="focus-visible:ring-muted h-7"
        />
      </PopoverContent>
    </Popover>
  );
}
