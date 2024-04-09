import * as React from "react";

import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative ml-auto flex-1 md:grow-0">
        <MagnifyingGlassIcon className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
        <Input
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:ring-ring bg-background flex h-9 w-full rounded-lg border px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[250px]",
            className
          )}
          type="search"
          {...props}
          ref={ref}
          placeholder="Search..."
        />
      </div>
    );
  }
);

export { Input, Search };
