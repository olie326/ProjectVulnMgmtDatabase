import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { getData } from "../api_calls/get_data";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

function depreciatedTable({
  data,
  setData,
}: {
  data: Database[];
  setData: React.Dispatch<React.SetStateAction<Database[]>>;
}) {
  const authenticated = true;

  const initCheckboxState = new Map(data.map((item) => [item.pk, false]));

  const [checked, setChecked] =
    useState<Map<Number, boolean>>(initCheckboxState);
  const [masterCheck, setMasterCheck] = useState(false);

  useEffect(() => {
    if (masterCheck === true) {
      setChecked(new Map(data.map((item) => [item.pk, true])));
    } else if (masterCheck === false) {
      setChecked(new Map(data.map((item) => [item.pk, false])));
    }
  }, [masterCheck]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      setData(data);
    };

    if (authenticated === true) {
      loadData();
    }
  }, [authenticated]);

  const table_headers = () => {
    if (data.length === 0) {
      return null; // This is explicitly allowed as a React child
    }
    return (
      <>
        <th className="sticky left-0 z-10 flex items-center justify-center border-e border-gray-200 bg-gray-50 px-2.5 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
          <div className="inline-flex h-full items-center justify-start gap-3">
            <Checkbox.Root
              checked={masterCheck}
              onCheckedChange={() => {
                setMasterCheck(!masterCheck);
              }}
              className="flex h-5 w-5 items-center justify-center rounded-lg border border-stone-200 bg-white p-2 data-[state=checked]:bg-violet-500"
            >
              <Checkbox.Indicator className="text-white">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
        </th>
        {Object.keys(data[0].fields).map((key, index) => (
          <th className="px-6 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            {key}
          </th>
        ))}
      </>
    );
  };

  const table_data = (checkMap: Map<Number, boolean>) => {
    if (data.length === 0) {
      return null; // This is explicitly allowed as a React child
    }
    return (
      <>
        {data.map((item) => (
          <>
            <tr key={item.pk.toString()} className="">
              <th className="sticky left-0 z-0 flex items-center border-e border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div className="inline-flex h-full items-center justify-start gap-3">
                  <Checkbox.Root
                    checked={checkMap.get(item.pk)}
                    onCheckedChange={(checked) => {
                      const newMap = new Map(checkMap);
                      if (typeof checked == "boolean") {
                        newMap.set(item.pk, checked);
                        setChecked(newMap);
                      }
                    }}
                    className="flex h-5 w-5 items-center justify-center rounded-lg border border-stone-200 bg-white p-2 data-[state=checked]:bg-violet-500"
                  >
                    <Checkbox.Indicator className="text-white">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </div>
              </th>

              {Object.values(item.fields).map((value, index) => (
                <td className="max-w-32 overflow-hidden truncate whitespace-nowrap px-6 py-1 text-sm font-medium text-gray-900">
                  {value}
                </td>
              ))}
            </tr>
          </>
        ))}
      </>
    );
  };

  return (
    <ScrollArea.Root className="min-h-0 flex-1 overflow-hidden rounded-xl border border-stone-200">
      <ScrollArea.Viewport className="">
        <div className="max-h-svh">
          <table className="divide-y divide-gray-200">
            <thead className=" sticky top-0 z-10 bg-gray-50">
              <tr>{data.length > 0 ? table_headers() : <th>no data</th>}</tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.length > 0 ? (
                table_data(checked)
              ) : (
                <tr>
                  <td>no data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="bg-blackA3 hover:bg-blackA5 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="bg-blackA3 hover:bg-blackA5 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-blackA5" />
    </ScrollArea.Root>
  );
}
