import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export type Vulnerability = {
  vulnerability_id: string;
  definition: number;
  asset: number;
  first_observed: string;
  last_seen: string;
  output: string;
  risk_modified: string;
  severity: string;
  state: string;
};

const columnHelper = createColumnHelper<Vulnerability>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      );
    },
  }),

  columnHelper.accessor("vulnerability_id", {
    header: "Vulnerability Id",
    cell: (info) => info.getValue(),
    size: 400,
    minSize: 400,
  }),
  columnHelper.accessor("definition", {
    header: "Definition",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("asset", {
    header: "Asset",
    cell: (info) => info.getValue(),
  }),
  columnHelper.group({
    header: "info",
    columns: [
      columnHelper.accessor("first_observed", {
        header: "First Observed",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("last_seen", {
        header: "Last Seen",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("output", {
        header: "Output",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("risk_modified", {
        header: "Risk Modified",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("severity", {
        header: "Severity",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("state", {
        header: "State",
        cell: (info) => info.getValue(),
      }),
    ],
  }),
];
