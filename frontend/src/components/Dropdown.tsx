import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

function SelectDropdown({
  args,
  value,
  setValues, //sets a whole String[] need to specify index
  category_index,
  option_index,
  children,
}: {
  args: String;
  value: string;
  setValues: (
    value: string,
    column_index: number,
    option_index: number
  ) => void;
  category_index: number;
  option_index: number;
  children: ReactNode;
}) {
  return (
    <Select.Root
      value={value}
      onValueChange={(value) => {
        setValues(value, category_index, option_index);
      }}
    >
      <Select.Trigger
        className="text-md inline-flex w-40 items-center justify-between rounded-md px-3 py-1.5 text-stone-950 hover:bg-stone-100 focus:outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder={args}></Select.Value>
        <Select.Icon className="text-stone-300">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>{children}</Select.Portal>
    </Select.Root>
  );
}

function DropdownContent({ children }: { children: ReactNode }) {
  return (
    <Select.Content
      className="z-30 rounded-md bg-stone-50 p-2 shadow-lg"
      position="popper"
    >
      <Select.ScrollUpButton className="flex cursor-default items-center justify-center bg-stone-100 text-stone-300">
        <ChevronUpIcon />
      </Select.ScrollUpButton>
      <Select.Viewport className="flex flex-col items-center gap-1">
        {children}
      </Select.Viewport>
      <Select.ScrollDownButton />
      <Select.Arrow className="fill-stone-100" />
    </Select.Content>
  );
}
SelectDropdown.Content = DropdownContent;

export default SelectDropdown;
