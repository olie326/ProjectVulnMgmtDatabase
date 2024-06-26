// import * as Separator from "@radix-ui/react-separator";

import "../../index.css";
import { ExitIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Vulnerabilities from "./Vulnerabilties";
import Assets from "./Assets";
import Definitions from "./Definitions";
import { Button } from "@/components/ui/button";
import { SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { userAuthenticatedContext } from "@/App";
import { getUser } from "@/api_calls/APIcalls";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SideTabsContent } from "../SideTab";

type tableStateContext = [{}, React.Dispatch<React.SetStateAction<{}>>];
export type userData = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export const TableContext = createContext<tableStateContext>([{}, () => {}]);

function Dashboard() {
  
  const [table, setTable] = useState({});
  const [authenticated, setAuthenticated] = useContext(userAuthenticatedContext);

  useEffect(() => {
    console.log("table seleced updated!");
  }, [table]);

  return (
    <div className="m-6 flex max-h-full flex-col">
      <Tabs
        defaultValue="vulnerability"
      >
        <div className="mb-4 flex justify-between">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Database
          </h2>
          <Button>
            <ExitIcon className="mr-2" />
            Export Data
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="vulnerability">Vulnereabilities</TabsTrigger>
            <TabsTrigger value="asset">Assets</TabsTrigger>
            <TabsTrigger value="definition">Definitions</TabsTrigger>
          </TabsList>
        </div>
        <Card className="mt-2">
          {authenticated ? (
            <TableContext.Provider value={[table, setTable]}>
              <TabsContent value="vulnerability" className="mt-0">
                <Vulnerabilities />
              </TabsContent>
              <TabsContent value="asset" className="mt-0">
                <Assets />
              </TabsContent>
              <TabsContent value="definition" className="mt-0">
                <Definitions />
              </TabsContent>
            </TableContext.Provider>
          ) : (
            <h1>Not Authenticated!</h1>
          )}
        </Card>
      </Tabs>
    </div>
  );
}

export default Dashboard;
