import { userAuthenticatedContext } from "@/App";
import { getUser } from "@/api_calls/APIcalls";
import SideNav from "@/components/SideNav";
import { filterContext } from "@/components/dataTable/Filters/filters";
import {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Vulnerabilities from "./Database/Vulnerabilties";
export type userData = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};
type userDataContext<userData> = {
  currentUser: userData;
  setCurrentUser: React.Dispatch<React.SetStateAction<userData>>;
};

//CREATE A DATATYPE HERE SO YOU CAN LIFT STATE!!!! IT NEEDS TO BE REUSABLE!!!

export type tableContextProps = {
  rowSelection: RowSelectionState;
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  filterContext: filterContext;
};

export type setTableContextProps = {
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setFilterContext: React.Dispatch<React.SetStateAction<filterContext>>;
};

type tableNames = "Vulnerabilities" | "Assets" | "Definitions";

export type tableStateProps = {
  [key in tableNames]: {
    tableContextProps: tableContextProps;
    setTableContextProps: setTableContextProps;
  };
};

export const tableContext = createContext<tableStateProps>({
  Vulnerabilities: {
    tableContextProps: {
      rowSelection: {},
      pagination: {
        pageIndex: 0,
        pageSize: 30,
      },
      columnFilters: [],
      filterContext: {
        filters: [],
        active: [],
      },
    },
    setTableContextProps: {
      setRowSelection: () => {},
      setPagination: () => {},
      setColumnFilters: () => {},
      setFilterContext: () => {},
    },
  },
  Assets: {
    tableContextProps: {
      rowSelection: {},
      pagination: {
        pageIndex: 0,
        pageSize: 30,
      },
      columnFilters: [],
      filterContext: {
        filters: [],
        active: [],
      },
    },
    setTableContextProps: {
      setRowSelection: () => {},
      setPagination: () => {},
      setColumnFilters: () => {},
      setFilterContext: () => {},
    },
  },
  Definitions: {
    tableContextProps: {
      rowSelection: {},
      pagination: {
        pageIndex: 0,
        pageSize: 30,
      },
      columnFilters: [],
      filterContext: {
        filters: [],
        active: [],
      },
    },
    setTableContextProps: {
      setRowSelection: () => {},
      setPagination: () => {},
      setColumnFilters: () => {},
      setFilterContext: () => {},
    },
  },
});

export const UserContext = createContext<userDataContext<userData>>({
  currentUser: {
    pk: -1,
    username: "JohnDoe",
    email: "johndoe@gmail.com",
    first_name: "John",
    last_name: "Doe",
  },
  setCurrentUser: () => {},
});

export default function HomePage() {
  const [authenticated, setAuthenticated] = useContext(
    userAuthenticatedContext
  );
  const [currentUser, setCurrentUser] = useState<userData>({
    pk: -1,
    username: "JohnDoe",
    email: "johndoe@gmail.com",
    first_name: "John",
    last_name: "Doe",
  });
  const nagivate = useNavigate();

  const [Vulnerabilities, setVulnerabilities] = useTableState();
  const [Assets, setAssets] = useTableState();
  const [Definitions, setDefinitions] = useTableState();

  const tableProps: tableStateProps = {
    Vulnerabilities: {
      tableContextProps: Vulnerabilities,
      setTableContextProps: setVulnerabilities,
    },
    Assets: {
      tableContextProps: Assets,
      setTableContextProps: setAssets,
    },
    Definitions: {
      tableContextProps: Definitions,
      setTableContextProps: setDefinitions,
    },
  };

  useEffect(() => {
    getUser()
      .catch((error) => {
        console.log(error);
        nagivate("/login");
      })
      .then((response) => {
        console.log(response);
        console.log("rerender!");
        if (response && response.data) {
          console.log(response.data);
          setCurrentUser({ ...response.data });
          console.log("after update!");
          setAuthenticated(true);
        }
      });
  }, []);

  return (
    <>
      <tableContext.Provider value={tableProps}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <SideNav />
        </UserContext.Provider>
      </tableContext.Provider>
      <button
        className="rounded-full bg-slate-500 p-3"
        onClick={() => console.log(currentUser)}
      >
        click to print current user!
      </button>
    </>
  );
}

function useTableState(): [tableContextProps, setTableContextProps] {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterContext, setFilterContext] = useState<filterContext>({
    filters: [],
    active: [],
  });

  const tableStateProps: tableContextProps = {
    rowSelection: rowSelection,
    pagination: pagination,
    columnFilters: columnFilters,
    filterContext: filterContext,
  };

  const setTableStateProps: setTableContextProps = {
    setRowSelection: setRowSelection,
    setPagination: setPagination,
    setColumnFilters: setColumnFilters,
    setFilterContext: setFilterContext,
  };

  return [tableStateProps, setTableStateProps];
}
