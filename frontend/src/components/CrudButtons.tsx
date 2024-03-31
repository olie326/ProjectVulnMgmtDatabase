import { TrashIcon } from "@radix-ui/react-icons";

export default function CrudButtons() {
  return (
    <div className="flex gap-2">
      <button className="flex h-8 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white p-3 text-sm shadow-sm hover:bg-stone-200 active:bg-stone-300">
        Update State
      </button>
      <button className="flex h-8 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white p-3 text-sm shadow-sm hover:bg-stone-200 active:bg-stone-300">
        Update Risk Modified
      </button>
      <button className="flex h-8 items-center justify-center gap-2 rounded-md bg-red-500 p-3 text-sm text-red-50 shadow-sm hover:bg-red-400 active:bg-red-600">
        Delete
        <TrashIcon />
      </button>
    </div>
  );
}
