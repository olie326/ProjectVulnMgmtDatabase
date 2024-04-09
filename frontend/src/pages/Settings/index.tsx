import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Profile from "./profile";

export default function Settings() {
  return (
    <>
      <div className="m-6 flex flex-col">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Settings
        </h2>
        <p className="text-muted-foreground text-sm">
          These are all currently available settings.
        </p>
        <Tabs
          className="mt-6 flex flex-row justify-between gap-3"
          orientation="vertical"
          defaultValue="general"
        >
          <TabsList className="w-2/12">
            <div className="flex flex-col items-start gap-1">
              <TabsTrigger value="general" asChild>
                <Button
                  variant="ghost"
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground w-full justify-start"
                >
                  General
                </Button>
              </TabsTrigger>
              <TabsTrigger value="user" asChild>
                <Button
                  variant="ghost"
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground w-full justify-start"
                >
                  User
                </Button>
              </TabsTrigger>
            </div>
          </TabsList>
          <div className="flex-1">
            <TabsContent value="general">
              <Card className="h-96 p-4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  General
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  App configurations
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="user">
              <Card className="min-h-96 p-4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  User Settings
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Change your user details here.
                </p>
                <Profile />
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
