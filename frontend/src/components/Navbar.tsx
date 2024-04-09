import { ReactNode } from "react";
import NavAvatar from "./Avatar";
import SelectData from "./SelectData";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

export default function Navbar() {
  return (
    <>
      <div
        className="border-border flex h-16 items-center justify-between border-y bg-white p-4"
        aria-label="Global"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mx-2 flex flex-row items-center justify-end gap-4">
          <p className="text-sm font-normal leading-none">Oliver Lee</p>
          <Avatar className="shadow">
            <AvatarImage />
            <AvatarFallback>OL</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
