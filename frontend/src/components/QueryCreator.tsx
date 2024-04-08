import axios from "axios";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import FilterMenu from "./FilterMenu";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  vulnerability,
  vulnerabilityRaw,
} from "./dataTable/Types/vulnerability";
import { asset, AssetRaw } from "./dataTable/Types/asset";
import { DefinitionRaw, definition } from "./dataTable/Types/definition";

axios.defaults.withCredentials = true;

declare global {
  interface options {
    [cateory: string]: {
      [option: string]: string[];
    };
  }
  interface Database {
    fields: vulnerability | asset | definition;
    model: "database.vulnerability" | "database.asset" | "database.definition";
    pk: Number;
  }
  interface DatabaseRaw {
    fields: vulnerabilityRaw | AssetRaw | DefinitionRaw;
    model: "database.vulnerability" | "database.asset" | "database.definition";
    pk: Number;
  }
}

export default function QueryCreator({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<any>>;
}) {
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
      {/* <FilterMenu
        setValues={setValues}
        values={values}
        options={select_options}
        setData={setData}
      /> */}

      <Input type="text" placeholder="Search" />
      <Button variant="default" size="icon" className="absolute end-7 h-7 w-7">
        <MagnifyingGlassIcon height={15} width={15} />
      </Button>

      {/* crud dropdown */}
    </>
  );
}
