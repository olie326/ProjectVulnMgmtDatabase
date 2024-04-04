import { getData } from "@/api_calls/get_data";
import CrudButtons from "@/components/CrudButtons";
import QueryCreator from "@/components/QueryCreator";
import { definition } from "@/components/dataTable/Types/definition";
import { definitionColumns } from "@/components/dataTable/columns";
import DataTable from "@/components/dataTable/dataTable";
import { useEffect, useState } from "react";

export default function Definitions() {
  const [data, setData] = useState<Database[]>([]);
  const [definitions, setDefinitions] = useState<definition[]>([]);

  useEffect(() => {
    getData("Definition").then((response) => setData(response));
  }, []);

  useEffect(() => {
    // if (data.every((value) => value.fields.type === "Vulnerability")) {
    setDefinitions(data.map((value) => value.fields as definition));
    // }
    console.log(data.length, "data changed!!!!!");
    console.log(definitions);
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

        <DataTable data={definitions} columns={definitionColumns}></DataTable>
      </div>
    </div>
  );
}
