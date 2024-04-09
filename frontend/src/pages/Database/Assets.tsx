import { getData } from "@/api_calls/get_data";
import CrudButtons from "@/components/CrudButtons";
import QueryCreator from "@/components/QueryCreator";

import DataTable from "@/components/dataTable/dataTable";

import { useContext, useEffect, useState } from "react";
import { asset } from "@/components/dataTable/Types/asset";
import { assetColumns } from "@/components/dataTable/columns";
import { dataContext } from "@/App";

export default function Assets() {
  const [data, setData] = useContext(dataContext);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="m-3">
        <div className="mb-3 flex h-10 items-center justify-between">
          <div>
            <CrudButtons variant="Asset" />
          </div>
          <div className="flex min-h-0 items-center justify-end gap-2">
            <QueryCreator setData={setData} />
          </div>
        </div>

        <DataTable data={data.asset} columns={assetColumns}></DataTable>
      </div>
    </div>
  );
}
