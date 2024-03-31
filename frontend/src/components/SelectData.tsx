import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export default function SelectData() {
  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex w-56 items-center justify-between rounded-md px-3 py-2 text-2xl font-semibold text-stone-950 hover:bg-stone-100 focus:outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder="Database" />
        <Select.Icon className="text-stone-300">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade w-56 rounded-xl bg-white shadow-md will-change-[opacity,transform]"
          sideOffset={5}
          position="popper"
        >
          <Select.ScrollUpButton className="flex cursor-default items-center justify-center bg-stone-100 text-stone-300">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="items-center p-3">
            <Select.Item
              className="inline-flex w-full rounded-md px-2 py-1 outline-none hover:bg-stone-300 hover:text-white  active:bg-stone-500"
              value="Assets"
            >
              <Select.ItemText> Assets </Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon className="text-black" />
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Item
              className="items-center rounded-md px-2 py-1 outline-none hover:bg-stone-300 hover:text-white active:bg-stone-500"
              value="Vulnerabilities"
            >
              <Select.ItemText> Vulnerabilities </Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon className="text-black" />
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow className="fill-stone-100" />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
