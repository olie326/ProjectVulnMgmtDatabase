import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import AddFilter from "./dataTable/Filters/addFilter";

export default function CrudButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">Update Remediation Status</Button>
      <Button variant="destructive">
        <TrashIcon className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
