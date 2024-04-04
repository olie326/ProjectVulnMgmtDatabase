import {
  HomeIcon,
  GearIcon,
  BarChartIcon,
  FileTextIcon,
  NotionLogoIcon,
  ExitIcon,
  UploadIcon,
} from "@radix-ui/react-icons";

import * as Tabs from "@radix-ui/react-tabs";

import { Button } from "./ui/button";
import { ReactNode } from "react";
import UploadData from "./UploadData";

export default function SideNav({ children }: { children: ReactNode }) {
  return (
    <>
      <Tabs.Root className="flex w-screen" orientation="vertical">
        <div className="sticky top-0 flex h-svh flex-col justify-between p-2 lg:min-w-48">
          <div>
            <div className="my-3 mb-12 flex items-center justify-center lg:mx-3 lg:justify-between lg:gap-3">
              <NotionLogoIcon height={32} width={32} />
              <h1 className="text-2xl font-extrabold tracking-tight lg:text-2xl">
                <p className="hidden lg:block">Internal Tool</p>
              </h1>
            </div>
            <Tabs.List className="flex flex-col gap-1">
              <Tabs.Trigger value="home" asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="min-w-full gap-3 px-3 lg:justify-start lg:ps-3"
                >
                  <HomeIcon height={20} width={20} />

                  <p className="hidden lg:block">Home</p>
                </Button>
              </Tabs.Trigger>
              <Tabs.Trigger value="database" asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="min-w-full gap-3 px-3 lg:justify-start lg:ps-3"
                >
                  <FileTextIcon height={20} width={20} />
                  <p className="hidden lg:block">Database</p>
                </Button>
              </Tabs.Trigger>
              <Tabs.Trigger value="graphs" asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="min-w-full gap-3 px-3 lg:justify-start lg:ps-3"
                >
                  <BarChartIcon height={20} width={20} />
                  <p className="hidden lg:block">Graphs</p>
                </Button>
              </Tabs.Trigger>
              <Tabs.Trigger value="settings" asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="min-w-full gap-3 px-3 lg:justify-start lg:ps-3"
                >
                  <GearIcon height={20} width={20} />
                  <p className="hidden lg:block">Settings</p>
                </Button>
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <UploadData />
            <Button size="lg" className="h-10 w-10 px-0 lg:w-full lg:px-8">
              <ExitIcon height={20} width={20} />
              <p className="hidden lg:block">Log out</p>
            </Button>
          </div>
        </div>

        <Tabs.Content value="database" className="min-h-0 min-w-0 flex-1">
          {children}
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
