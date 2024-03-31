import { SetStateAction, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import QueryCreator from "../components/QueryCreator";
import Table from "../components/Table";
// import * as Separator from "@radix-ui/react-separator";
import * as Tabs from "@radix-ui/react-tabs";
import "../index.css";
import CrudButtons from "../components/CrudButtons";
import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";

axios.defaults.withCredentials = true;

function Dashboard() {
  const [vulnListFile, setVulnListFile] = useState<File | undefined>();
  const [vulnAssetListFile, setVulnAssetListFile] = useState<
    File | undefined
  >();
  const [assetBusinessAttributesFile, setAssetBusinessAttributesFile] =
    useState<File | undefined>();
  const [data, setData] = useState<Database[]>([]);

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
    <>
      <div className="flex h-lvh">
        <SideNav />
        <div className="h-screen-minus-custom">
          <Navbar />
          <div className="h-screen-minus-custom2">
            <div className="mx-3 mb-4 flex items-center justify-between gap-3 border-b border-stone-200">
              <Tabs.Root>
                <Tabs.List className="inline-flex">
                  <Tabs.Trigger
                    className="text-mauve11 hover:text-violet11 data-[state=active]:text-violet11 flex h-10 flex-1 cursor-default select-none items-center justify-center px-5 text-sm font-medium leading-none outline-none first:rounded-tl-md last:rounded-tr-md focus:outline-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative"
                    value="tab1"
                  >
                    Database
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="text-mauve11 hover:text-violet11 data-[state=active]:text-violet11 flex h-10 flex-1 cursor-default select-none items-center justify-center px-5 text-sm font-medium leading-none outline-none first:rounded-tl-md last:rounded-tr-md focus:outline-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative"
                    value="tab2"
                  >
                    Vulnerabilities
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="text-mauve11 hover:text-violet11 data-[state=active]:text-violet11 flex h-10 flex-1 cursor-default select-none items-center justify-center px-5 text-sm font-medium leading-none outline-none first:rounded-tl-md last:rounded-tr-md focus:outline-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative"
                    value="tab3"
                  >
                    Assets
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
              <button className="mb-1 flex h-8 items-center justify-center gap-2 rounded-md bg-green-500 p-3 text-sm text-green-50 shadow-sm hover:bg-green-400 active:bg-green-600">
                Export
                <DownloadIcon />
              </button>
            </div>
            <div className="mb-1.5 me-4 ms-4 flex h-10 items-center justify-between">
              <div>
                <CrudButtons />
              </div>
              <div className="flex h-full items-center justify-end gap-2">
                <QueryCreator setData={setData} />
              </div>
            </div>
            <div className="min-h-0 flex-1">
              <div className="flex h-full flex-col p-4 pt-0">
                {/* content goes in here!!!! */}

                <Table data={data} setData={setData}></Table>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
