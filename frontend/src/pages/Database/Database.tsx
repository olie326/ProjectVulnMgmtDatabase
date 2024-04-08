import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";
// import * as Separator from "@radix-ui/react-separator";

import "../../index.css";
import { ExitIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Vulnerabilities from "./Vulnerabilties";
import Assets from "./Assets";
import Definitions from "./Definitions";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { userContext } from "@/App";
import { getUser } from "@/api_calls/APIcalls";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [authenticated, setAuthenticated] = useContext(userContext);
  const nagivate = useNavigate();

  useEffect(() => {
    getUser().catch((error) => {
      console.log(error);
      nagivate("/login");
    });
  }, []);

  return (
    <SideNav>
      <div className="flex max-h-full flex-col">
        <Navbar />

        <Tabs
          defaultValue="vulnerability"
          className="bg-secondary box-border flex min-h-0 min-w-0 flex-col p-2"
        >
          <div className="flex items-center justify-between">
            <TabsList className="grid h-11 grid-cols-3 items-end rounded-b-none">
              <TabsTrigger
                value="vulnerability"
                className="text-md px-6 py-2 shadow-none data-[state=active]:rounded-b-none data-[state=active]:shadow-none"
              >
                Vulnereabilities
              </TabsTrigger>
              <TabsTrigger
                value="asset"
                className="text-md px-6 py-2 shadow-none data-[state=active]:rounded-b-none data-[state=active]:shadow-none"
              >
                Assets
              </TabsTrigger>
              <TabsTrigger
                value="definition"
                className="text-md px-6 py-2 shadow-none data-[state=active]:rounded-b-none data-[state=active]:shadow-none"
              >
                Definitions
              </TabsTrigger>
            </TabsList>
            <Button className="m-1">
              <ExitIcon className="mr-2" />
              Export Data
            </Button>
          </div>
          {authenticated ? (
            <>
              <TabsContent value="vulnerability" className="mt-0">
                <Vulnerabilities />
              </TabsContent>
              <TabsContent value="asset" className="mt-0">
                <Assets />
              </TabsContent>
              <TabsContent value="definition" className="mt-0">
                <Definitions />
              </TabsContent>
            </>
          ) : (
            <h1>Not Authenticated!</h1>
          )}
        </Tabs>
      </div>
    </SideNav>
  );
}

export default Dashboard;