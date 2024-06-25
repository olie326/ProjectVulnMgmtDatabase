import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDownIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { filterContext } from "./filters";
import { Calendar } from "@/components/ui/calendar";
import { endOfDay, isAfter, isBefore, subMonths } from "date-fns";
import {
  ActiveModifiers,
  DateRange,
  SelectRangeEventHandler,
} from "react-day-picker";
import { dateProps } from "../columns";

export default function FilterBadge<T>({
  table,
  id,
  filters,
  setFilters,
}: {
  table: Table<T>;
  id: string;
  filters: filterContext;
  setFilters: React.Dispatch<filterContext>;
}) {
  const today = endOfDay(new Date());

  const defaultRange: DateRange = {
    from: subMonths(today, 1),
    to: today,
  };

  const [filterVal, setFilterVal] = useState<unknown>();
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterVal(e.target.value);
    updateFilterValue(e.target.value, setFilterVal, id, table);
  }

  return (
    <Popover key={id}>
      <PopoverTrigger asChild>
        <button className={badgeVariants({ variant: "default" })}>
          {id}
          <ChevronDownIcon className="ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto space-y-2 object-contain p-2 pt-0">
        {dateProps.includes(id) ? (
          <DateOptions
            range={range}
            setRange={setRange}
            setFilterVal={setFilterVal}
            updateFilterVal={updateFilterValue}
            id={id}
            table={table}
          />
        ) : (
          <>
            <div className="inline-flex w-full items-center justify-between">
              <small className="text-sm font-medium leading-none">
                {id} <span className="text-muted-foreground">contains...</span>
              </small>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-2 min-w-fit p-1">
                    <DotsHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                  {/* not optimized for mobile!!! */}
                  <DropdownMenuItem
                    className="w-48 text-red-500"
                    onSelect={() => {
                      const newFilters = [...filters.filters];
                      const newActive = [...filters.active];
                      const filterIndex = newFilters.findIndex(
                        (filter) => filter.id == id
                      );
                      const activeIndex = newActive.findIndex(
                        (filter) => filter.id == id
                      );
                      if (filterIndex > -1) {
                        newFilters[filterIndex].active = false;
                      }
                      if (activeIndex > -1) {
                        newActive.splice(activeIndex, 1);
                      }
                      setFilters({ filters: newFilters, active: newActive });
                      table.getColumn(id)?.setFilterValue("");
                    }}
                  >
                    <TrashIcon className="mr-2" />
                    Delete Filter
                  </DropdownMenuItem>
                  <DropdownMenuItem>Another action!</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Input
              value={typeof filterVal === "string" ? filterVal : ""}
              onChange={handleFilterChange}
              className="focus-visible:ring-muted h-7"
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

function updateFilterValue(
  value: unknown,
  setFilterVal: React.Dispatch<unknown>,
  id: string,
  table: Table<any>
) {
  setFilterVal(value);
  const isActive = table.getState().columnFilters.find((columnFilter) => {
    return columnFilter.id === id;
  });
  isActive
    ? table.getColumn(isActive.id)?.setFilterValue(value)
    : table.setColumnFilters([
        ...table.getState().columnFilters,
        { id: id, value: value },
      ]);
}

function DateOptions({
  range,
  setRange,
  setFilterVal,
  updateFilterVal,
  id,
  table,
}: {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setFilterVal: React.Dispatch<unknown>;
  updateFilterVal: (
    value: unknown,
    setFilterVal: React.Dispatch<unknown>,
    id: string,
    table: Table<any>
  ) => void;
  id: string;
  table: Table<any>;
}) {
  const handleSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => {
    setRange(range);
    updateFilterValue(range, setFilterVal, id, table);
  };
  useEffect(() => {
    console.log("after: ", range);
  }, [range]);

  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={range?.from}
      selected={range}
      onSelect={handleSelect}
      numberOfMonths={2}
    />
  );
}
