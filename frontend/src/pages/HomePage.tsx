import { userAuthenticatedContext } from "@/App";
import { getUser } from "@/api_calls/APIcalls";
import SideNav from "@/components/SideNav";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

type tableContextProps = {
  rowSelection: any;
  pagination: any;
  columnFilters: any;
};

type tttableContextProps = {
  VulnerabilityState: {
    rowSelection: {};
    pagination: {};
    columnFilters: {};
  };

  AssetState: {
    rowSelection: {};
    pagination: {};
    columnFilters: {};
  };

  DefinitionState: {
    rowSelection: {};
    pagination: {};
    columnFilters: {};
  };

  onVulnerabilityStateChange: {
    rowSelection: {};
    pagination: {};
    columnFilters: {};
  };

  onAssetStateChange: {
    rowSelection: {};
    pagination: {};
    columnFilters: {};
  };

  onDefinitionStateChange: {
    rowSelection: {};
    pagination: {};
    columnFilters: {};
  };
};

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
      {" "}
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <SideNav />
      </UserContext.Provider>
      <button
        className="rounded-full bg-slate-500 p-3"
        onClick={() => console.log(currentUser)}
      >
        click to print current user!
      </button>
    </>
  );
}
