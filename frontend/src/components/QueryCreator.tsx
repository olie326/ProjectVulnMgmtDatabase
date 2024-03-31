import axios from "axios";
import { getData } from "../api_calls/get_data";
import { SetStateAction, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import FilterMenu from "./FilterMenu";

axios.defaults.withCredentials = true;

declare global {
  interface options {
    [cateory: string]: {
      [option: string]: string[];
    };
  }
  interface Database {
    fields: Object;
    model: string;
    pk: Number;
  }
}

export default function QueryCreator({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const onClick = async () => {
    const yass = await getData().then((response) => {
      setData(response);
      console.log(response);
      console.log("logged!");
    });
  };

  const [values, setValues] = useState<string[][]>([[]]);

  const select_options: options = {
    vulnerability_options: {
      Last_Seen: [
        "1 week ago",
        "2 weeks ago",
        "1 month ago",
        "3 months ago",
        "6 months ago",
        "1 year ago",
        "all time",
      ],
      Severity: ["Low", "Medium", "High", "Critical"],
      State: ["New", "Active", "Fixed", "Resurfaced"],
    },
    asset_options: {
      Last_Scanned: [
        "1 week ago",
        "2 weeks ago",
        "1 month ago",
        "3 months ago",
        "6 months ago",
        "1 year ago",
        "all time",
      ],
      Licensed: ["True", "False"],
      Public: ["True", "False"],
    },
  };

  useEffect(() => {
    const initArray: string[][] = [
      ["", "", ""],
      ["", "", ""],
    ];
    setValues(initArray);
  }, []);

  return (
    <>
      <FilterMenu
        setValues={setValues}
        values={values}
        options={select_options}
        setData={setData}
      />
      <div className="flex h-8 w-8/12 min-w-0 max-w-screen-lg justify-between gap-5 rounded-md border border-stone-200 bg-white p-2 text-sm shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <input
          type="text"
          placeholder="Search"
          className="min-w-0 max-w-screen-lg flex-1 flex-auto py-1 focus:outline-none"
        />
        <button
          className="flex flex-initial items-center justify-center rounded-full p-1 hover:text-stone-200 active:text-stone-300"
          onClick={onClick}
        >
          <MagnifyingGlassIcon height={15} width={15} />
        </button>
      </div>
      {/* crud dropdown */}
    </>
  );
}
