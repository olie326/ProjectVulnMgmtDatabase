import Navbar from "@/components/Navbar";
import { SideTabsContent } from "../SideTab";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getAge } from "@/api_calls/APIcalls";

export default function Home() {
  return (
    <ScrollArea className="m-3 h-full justify-start">
      <div className="">
        <h1 className="scroll-m-20 p-6 ps-0 text-6xl font-extrabold tracking-tight lg:text-5xl">
          Welcome Name!
        </h1>
        <div className=" grid h-full grid-cols-12 grid-rows-12 gap-4">
          <Card className=" col-span-4 row-span-3 p-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Average Vulnerability Age
            </h3>
            <p className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              23.4 days
            </p>
          </Card>
          <Card className=" col-span-8 row-span-6 p-3">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Open Vulnerabilities
            </h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Critical risk:{" "}
              <span className="text-4xl font-semibold tracking-tight">
                2.3%
              </span>
            </h3>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Exploitable:{" "}
              <span className="text-4xl font-semibold tracking-tight">
                6.7%
              </span>
            </h3>
          </Card>
          <Card className=" col-span-4 row-span-3 p-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Total Unique Assets
            </h3>
            <p className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              3967
            </p>
          </Card>
          <Card className=" col-span-8 row-span-6 p-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Vulnerabilities Discovered in the Last Month
            </h3>
            <p className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              5
            </p>
          </Card>
          <Card className=" col-span-4 row-span-6 p-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Total Remediation Count
            </h3>
            <p className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              628
            </p>
          </Card>
          <Button onClick={() => getAge()}>testing!</Button>
        </div>
      </div>
    </ScrollArea>
  );
}
