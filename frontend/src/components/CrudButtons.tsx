import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function CrudButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline"> Update State</Button>
      <Button variant="outline"> Update Risk Modified</Button>
      <Button variant="destructive">
        <TrashIcon className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
