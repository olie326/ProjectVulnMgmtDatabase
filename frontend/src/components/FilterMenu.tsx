import {
  MixerHorizontalIcon,
  Cross2Icon,
  CheckIcon,
} from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import SelectDropdown from "./Dropdown";
import { PostFilters } from "../api_calls/APIcalls";
import axios from "axios";
import { Button } from "./ui/button";

axios.defaults.withCredentials = true;

const mapSelect = (
  values: string[][],
  setOneValue: React.Dispatch<React.SetStateAction<any>>,
  select_options: options
) => {
  const setNewValues = (
    value: string,
    column_index: number,
    option_index: number
  ) => {
    const updatedOuterValues = [...values];

    const updatedInnerValues = [
      ...values[column_index].slice(0, option_index),
      value,
      ...values[column_index].slice(option_index + 1),
    ];

    updatedOuterValues[column_index] = updatedInnerValues;

    setOneValue(updatedOuterValues);
  };

  return Object.entries(select_options).map(
    ([category, options], category_index) => (
      <>
        <h2 className="p-4 ps-2 text-lg font-semibold">
          {category
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h2>
        {Object.entries(options).map(([key, valueArray], option_index) => (
          <SelectDropdown
            category_index={category_index}
            option_index={option_index}
            setValues={setNewValues}
            value={values[category_index]?.[option_index] ?? ""}
            // value={values[category_index][option_index]} this doesn't work?????
            args={key}
          >
            <SelectDropdown.Content>
              {valueArray.map((value: string) => (
                <SelectItem value={value}>{value}</SelectItem>
              ))}
            </SelectDropdown.Content>
          </SelectDropdown>
        ))}
      </>
    )
  );
};

const FilterMenu = ({
  values,
  setValues,
  options,
  setData,
}: {
  values: string[][];
  setValues: React.Dispatch<React.SetStateAction<any>>;
  options: options;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={async () => {
          setData(await PostFilters(values));
          setOpen(!open);
        }}
      >
        <Dialog.Trigger>
          <Button variant="outline">
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-20 bg-black opacity-20" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-20 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="mb-1 text-xl font-bold text-black">
              Filters
            </Dialog.Title>
            <Dialog.Description>
              Something interesting that describes these filters.
            </Dialog.Description>
            {mapSelect(values, setValues, options)}

            <Dialog.Close asChild>
              <button
                onClick={async () => setData(await PostFilters(values))}
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
            <div className="mt-3 flex items-center justify-end">
              <Dialog.Close asChild>
                <button
                  onClick={async () => setData(await PostFilters(values))}
                  className="mb-1 flex h-8 items-center justify-center gap-2 rounded-md bg-green-500 p-3 text-sm text-green-50 shadow-sm hover:bg-green-400 active:bg-green-600"
                >
                  Apply Filters
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

const SelectItem = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; value: string }
>(({ children, value, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className="w-full rounded-sm px-2 py-0.5 outline-none hover:bg-stone-300 hover:text-white  active:bg-stone-500"
      value={value}
      ref={forwardedRef}
      {...props}
    >
      <Select.ItemText className="hover:bg-stone-300">
        {children}
      </Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default FilterMenu;
