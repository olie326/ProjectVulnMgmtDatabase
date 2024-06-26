import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "./ui/button";
import { CheckIcon, ReloadIcon, UploadIcon } from "@radix-ui/react-icons";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { sendData } from "@/api_calls/APIcalls";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function UploadData() {
  const [loading, setLoading] = useState<boolean | null>(null);

  const form = useForm<z.infer<typeof fileSchema>>({
    mode: "onSubmit",
  });
  //-------- --- work on actually validating these files --- --------
  const fileSchema = z.object({
    vulnListFile: z.instanceof(File),
    vulnAssetListFile: z.instanceof(File),
    assetBusinessAttributesFile: z.instanceof(File),
  });

  function onUpload(fileList: z.infer<typeof fileSchema>) {
    console.log(fileList);
    setLoading(true);
    const formData = new FormData();

    formData.append("vulnListFile", fileList.vulnListFile);
    formData.append("vulnAssetListFile", fileList.vulnAssetListFile);
    formData.append(
      "assetBusinessAttributesFile",
      fileList.assetBusinessAttributesFile
    );

    console.log(formData);
    sendData(formData).then((response) => {
      if (response) {
        console.log(response);
        setLoading(false);
      } else {
        setLoading(null);
      }
    });
  }
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button
            size="lg"
            variant="secondary"
            className="h-10 w-10 px-0 lg:w-full lg:px-8"
          >
            <UploadIcon height={20} width={20} />
            <p className="hidden lg:block">Upload Data</p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Data</DialogTitle>
            <DialogDescription>
              Upload your three excel spreadsheets here.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              action="upload data"
              onSubmit={form.handleSubmit(onUpload)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="vulnListFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="space-y-1">
                        <h3>
                          Vulnerability List -{" "}
                          <span className="text-muted-foreground">SecTeam</span>
                        </h3>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vulnAssetListFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="space-y-1">
                        <h3>
                          Vulnerability Asset List -{" "}
                          <span className="text-muted-foreground">SecTeam</span>
                        </h3>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assetBusinessAttributesFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="space-y-1">
                        <h3>
                          Asset Buisness Attributes List -{" "}
                          <span className="text-muted-foreground">
                            ITOpsTeam
                          </span>
                        </h3>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full flex-row justify-between">
                <div>
                  {loading === false ? (
                    <small className="inline-flex text-green-400">
                      Uploaded
                      <CheckIcon className="ml-2" />{" "}
                    </small>
                  ) : null}
                </div>

                {loading === true ? (
                  <Button type="submit" disabled>
                    <ReloadIcon className="mr-2 animate-spin" />
                    Upload
                  </Button>
                ) : (
                  <Button type="submit">Upload</Button>
                )}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
