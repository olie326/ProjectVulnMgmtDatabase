import { PlusIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { badgeVariants } from "@/components/ui/badge";
import { useState } from "react";
import { filterContext } from "./filters";

// takes in an array of the filterable columns columnDefs
export default function AddFilter({
  //   column,
  filters,
  setFilters,
}: {
  //   column: Column<any, unknown>;
  filters: filterContext;
  setFilters: React.Dispatch<filterContext>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={badgeVariants({ variant: "secondary" })}>
          Add Filter
          <PlusIcon className="ml-2 h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <Command>
          <CommandInput placeholder="Filter by..." />
          <CommandGroup>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {filters.filters.map((filter) =>
                !filter.active ? (
                  <CommandItem
                    key={filter.id}
                    value={filter.id}
                    onSelect={() => {
                      const newFilters = [...filters.filters];
                      const newActive = [...filters.active];
                      const filterIndex = newFilters.findIndex(
                        (item) => item.id == filter.id
                      );
                      if (filterIndex > -1) {
                        newFilters[filterIndex].active = true;
                      }
                      newActive.push(filters.filters[filterIndex]);

                      setFilters({ filters: newFilters, active: newActive });
                      setOpen(false);
                    }}
                  >
                    {filter.id}
                  </CommandItem>
                ) : null
              )}
              <CommandItem>Something else</CommandItem>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
