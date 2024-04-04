import { getData } from "@/api_calls/get_data";
import CrudButtons from "@/components/CrudButtons";
import QueryCreator from "@/components/QueryCreator";
import { vulnColumns } from "@/components/dataTable/columns";
import DataTable from "@/components/dataTable/dataTable";
import { vulnerability } from "@/components/dataTable/Types/vulnerability";
import { useEffect, useState } from "react";

export default function Vulnerabilities() {
  const [data, setData] = useState<Database[]>([]);
  const [vuln, setVuln] = useState<vulnerability[]>([]);

  useEffect(() => {
    getData("Vulnerability").then((response) => setData(response));
  }, []);

  useEffect(() => {
    // if (data.every((value) => value.fields.type === "Vulnerability")) {
    setVuln(data.map((value) => value.fields as vulnerability));
    // }
    console.log(data.length, "data changed!!!!!");
    console.log(vuln);
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

        <DataTable data={vuln} columns={vulnColumns}></DataTable>
      </div>
    </div>
  );
}
