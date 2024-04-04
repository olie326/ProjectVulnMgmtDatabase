import { getData } from "@/api_calls/get_data";
import CrudButtons from "@/components/CrudButtons";
import QueryCreator from "@/components/QueryCreator";

import DataTable from "@/components/dataTable/dataTable";
import Filters from "@/components/dataTable/Filters/filters";
import { useEffect, useState } from "react";
import { asset } from "@/components/dataTable/Types/asset";
import { assetColumns } from "@/components/dataTable/columns";

export default function Assets() {
  const [data, setData] = useState<Database[]>([]);
  const [assets, setAssets] = useState<asset[]>([]);

  useEffect(() => {
    getData("Asset").then((response) => setData(response));
  }, []);

  useEffect(() => {
    // if (data.every((value) => value.fields.type === "Vulnerability")) {
    setAssets(data.map((value) => value.fields as asset));
    // }
    console.log(data.length, "data changed!!!!!");
    console.log(assets);
  }, [data]);

  return (
    <div className="bg-background m-1 mt-0 flex min-h-0 min-w-0 flex-1 flex-col rounded-b-lg rounded-tr-lg pt-1">
      <div className="m-3">
        <div className="mb-3 flex h-10 items-center justify-between">
          <div>
            <CrudButtons />
          </div>
          <div className="flex min-h-0 items-center justify-end gap-2">
            <QueryCreator setData={setData} />
          </div>
        </div>

        <DataTable data={assets} columns={assetColumns}></DataTable>
      </div>
    </div>
  );
}
