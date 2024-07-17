import { getData } from "@/api_calls/get_data";
import CrudButtons from "@/components/CrudButtons";
import QueryCreator from "@/components/QueryCreator";
import { vulnColumns } from "@/components/dataTable/columns";
import DataTable from "@/components/dataTable/dataTable";
import { vulnerability } from "@/components/dataTable/Types/vulnerability";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "@/App";
import { tableContext } from "../HomePage";

export default function Vulnerabilities() {
  const [data, setData] = useContext(dataContext);
  const VulnerabilityData = useContext(tableContext).Vulnerabilities;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="m-3">
        <div className="mb-3 flex h-10 items-center justify-between">
          <div>
            <CrudButtons variant="Vulnerability" />
          </div>
          <div className="flex min-h-0 items-center justify-end gap-2">
            <QueryCreator setData={setData} />
          </div>
        </div>

        <DataTable
          data={data.vulnerability}
          columns={vulnColumns}
          tableContextProps={VulnerabilityData.tableContextProps}
          setTableContextProps={VulnerabilityData.setTableContextProps}
        ></DataTable>
      </div>
    </div>
  );
}
