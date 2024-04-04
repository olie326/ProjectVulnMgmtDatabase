import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Column,
  ColumnDef,
  ColumnFilter,
  HeaderGroup,
  Table,
  flexRender,
} from "@tanstack/react-table";
import { Badge, badgeVariants } from "@/components/ui/badge";
import FilterBadge from "./filterBadge";

// takes in an array of the filterable columns columnDefs
export default function AddFilter({
  //   column,
  table,
  active,
  setActive,
}: {
  //   column: Column<any, unknown>;
  table: Table<any>;
  active: unknown[];
  setActive: React.Dispatch<any[]>;
}) {
  return (
    <Popover>
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
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) =>
                  header.index !== 0 ? (
                    <CommandItem
                      key={header.id}
                      value={header.column.id}
                      onSelect={() => {
                        console.log(header);
                        setActive([...active, header.id]);
                        // table.setColumnFilters([
                        //   ...table.getState().columnFilters,
                        //   {
                        //     id: header.column.id,
                        //     value: "0",
                        //   } as ColumnFilter,
                        // ]);
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </CommandItem>
                  ) : null
                )
              )}
              <CommandItem>Something else</CommandItem>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
