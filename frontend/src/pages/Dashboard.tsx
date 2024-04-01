import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import QueryCreator from "../components/QueryCreator";
// import * as Separator from "@radix-ui/react-separator";

import "../index.css";
import CrudButtons from "../components/CrudButtons";
import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/components/dataTable/dataTable";
import { Vulnerability, columns } from "@/components/dataTable/columns";
import { getData } from "@/api_calls/get_data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

axios.defaults.withCredentials = true;

function Dashboard() {
  const [vulnListFile, setVulnListFile] = useState<File | undefined>();
  const [vulnAssetListFile, setVulnAssetListFile] = useState<
    File | undefined
  >();
  const [assetBusinessAttributesFile, setAssetBusinessAttributesFile] =
    useState<File | undefined>();
  const [data, setData] = useState<Database[]>([]);
  const [vuln, setVuln] = useState<Vulnerability[]>([]);

  useEffect(() => {
    setVuln(data.map((item) => item.fields));
  }, [data]);

  const authenticated = true;
  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      setData(data);
    };

    if (authenticated === true) {
      loadData();
    }
  }, [authenticated]);

  var formData = new FormData();

  function handleFileChange(
    e: React.SyntheticEvent,
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  ) {
    e.preventDefault();

    const chosenFiles = e.target as HTMLInputElement & {
      files: File;
    };

    setFile(chosenFiles.files[0]);
    console.log(chosenFiles.files[0]);
  }

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (vulnAssetListFile && vulnListFile && assetBusinessAttributesFile) {
      formData.append("vulnListFile", vulnListFile);
      formData.append("vulnAssetListFile", vulnAssetListFile);
      formData.append(
        "assetBusinessAttributesFile",
        assetBusinessAttributesFile
      );
    } else {
      return console.log("none or not all files uploaded!");
    }

    console.log(formData);

    axios
      .post("http://127.0.0.1:8000/api/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log("yassss");
      });
  }

  return (
    <SideNav>
      <div className="flex max-h-full flex-col">
        <Navbar />

        <Tabs
          defaultValue="vulnerability"
          className="bg-secondary box-border flex min-h-0 min-w-0 flex-col flex-col p-2"
        >
          <TabsList className="grid h-11 max-w-sm grid-cols-2 items-end rounded-b-none">
            <TabsTrigger
              value="vulnerability"
              className="text-md px-6 py-2 shadow-none data-[state=active]:rounded-b-none data-[state=active]:shadow-none"
            >
              Vulnereability
            </TabsTrigger>
            <TabsTrigger
              value="asset"
              className="text-md px-6 py-2 shadow-none data-[state=active]:rounded-b-none data-[state=active]:shadow-none"
            >
              Asset
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vulnerability" className="mt-0">
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
                {/* <div className="min-h-0 w-full min-w-0 flex-1"> */}
                {/* content goes in here!!!! */}

                <DataTable data={vuln} columns={columns}></DataTable>

                {/* <form onSubmit={onSubmit}>
                  <div>
                    <h3>Vulnerability List</h3>
                    <p>SecTeam</p>
                  </div>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => handleFileChange(e, setVulnListFile)}
                    accept=".xlsx"
                  />
                  <div>
                    <h3>Vulnerability Asset List</h3>
                    <p>SecTeam</p>
                  </div>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => handleFileChange(e, setVulnAssetListFile)}
                    accept=".xlsx"
                  />
                  <div>
                    <h3>Asset Buisness Attributes List</h3>
                    <p>ITOpsTeam</p>
                  </div>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) =>
                      handleFileChange(e, setAssetBusinessAttributesFile)
                    }
                    accept=".xlsx"
                  />
                  <button className="btn btn-light" type="submit">
                    Upload
                  </button>
                </form> */}
                {/* </div> */}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="asset" className="mt-0">
            <div className="bg-background m-1 mt-0 flex min-h-0 min-w-0 flex-1 flex-col rounded-b-lg rounded-tr-lg pt-1">
              <h1 className="text-4xl">Some Cool Assets !!!!</h1>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SideNav>
  );
}

export default Dashboard;
