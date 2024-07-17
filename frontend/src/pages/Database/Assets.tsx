import { getData } from "@/api_calls/get_data";
import CrudButtons from "@/components/CrudButtons";
import QueryCreator from "@/components/QueryCreator";

import DataTable from "@/components/dataTable/dataTable";

import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Asset, asset } from "@/components/dataTable/Types/asset";
import { assetColumns } from "@/components/dataTable/columns";
import { dataContext } from "@/App";
import { filterContext } from "@/components/dataTable/Filters/filters";
import {
  RowSelectionState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { tableContext } from "../HomePage";

export const FilterContext = createContext<
  [filterContext, React.Dispatch<React.SetStateAction<filterContext>>]
>([{ filters: [], active: [] }, () => {}]);

export default function Assets() {
  const [data, setData] = useContext(dataContext);
  const [filters, setFilters] = useContext(FilterContext);
  const AssetData = useContext(tableContext).Assets;

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
        <FilterContext.Provider value={[filters, setFilters]}>
          <DataTable
            data={data.asset}
            columns={assetColumns}
            tableContextProps={AssetData.tableContextProps}
            setTableContextProps={AssetData.setTableContextProps}
          ></DataTable>
        </FilterContext.Provider>
      </div>
    </div>
  );
}
