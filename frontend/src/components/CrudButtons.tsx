import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import AddFilter from "./dataTable/Filters/addFilter";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { useContext } from "react";
import { TableContext } from "@/pages/Database/Database";
import { deleteRows, updateRemediation } from "@/api_calls/APIcalls";
export const selectSchema = z
  .object({
    status: z.string(),
  })
  .required();
export default function CrudButtons({
  variant,
}: {
  variant: "Vulnerability" | "Asset" | "Definition";
}) {
  const [rowSelection, setRowSelection] = useContext(TableContext);

  const form = useForm<z.infer<typeof selectSchema>>({
    resolver: zodResolver(selectSchema),
  });

  const onSubmit = (data: z.infer<typeof selectSchema>) => {
    console.log(data);
    console.log(rowSelection);
    updateRemediation(data, rowSelection).then((response) =>
      console.log(response)
    );
  };

  return (
    <div className="flex gap-2">
      <Form {...form}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Update Remediation Status</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-1">
              <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
                Update Remediation Status
              </h3>
              <p className="text-muted-foreground pb-4 text-sm">
                of x selected items.
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-end gap-2"
            >
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">NEW</SelectItem>
                      <SelectItem value="RESURFACED">RESURFACED</SelectItem>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="FIXED">FIXED</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Update status</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will change your data
                      from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild type="submit">
                      <Button
                        type="submit"
                        onClick={() => {
                          form.trigger();
                          form.handleSubmit(onSubmit)();
                        }}
                      >
                        Update status
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </form>
          </PopoverContent>
        </Popover>
      </Form>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              asChild
              variant="destructive"
              onClick={() => {
                deleteRows(variant, rowSelection).then((response) =>
                  console.log(response)
                );
              }}
            >
              <AlertDialogAction>Delete</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
