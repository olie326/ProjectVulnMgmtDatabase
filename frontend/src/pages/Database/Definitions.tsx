import { dataContext } from "@/App";
import { getData } from "@/api_calls/get_data";
import CrudButtons from "@/components/CrudButtons";
import QueryCreator from "@/components/QueryCreator";
import { definition } from "@/components/dataTable/Types/definition";
import { definitionColumns } from "@/components/dataTable/columns";
import DataTable from "@/components/dataTable/dataTable";
import { useContext, useEffect, useState } from "react";
import { tableContext } from "../HomePage";

export default function Definitions() {
  const [data, setData] = useContext(dataContext);
  const DefinitionData = useContext(tableContext).Definitions;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="m-3">
        <div className="mb-3 flex h-10 items-center justify-between">
          <div>
            <CrudButtons variant="Definition" />
          </div>
          <div className="flex min-h-0 items-center justify-end gap-2">
            <QueryCreator setData={setData} />
          </div>
        </div>

        <DataTable
          data={data.definition}
          columns={definitionColumns}
          tableContextProps={DefinitionData.tableContextProps}
          setTableContextProps={DefinitionData.setTableContextProps}
        ></DataTable>
      </div>
    </div>
  );
}
