import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Vulnerability } from "./Types/vulnerability";
import { Asset } from "./Types/asset";
import { Definition } from "./Types/definition";

const vulnerabilityProps = [
  "vulnerability_id",
  "definition",
  "asset",
  "first_observed",
  "last_seen",
  "output",
  "risk_modified",
  "severity",
  "state",
];

const assetProps = [
  "name",
  "display_ipv4_address",
  "asset_id",
  "tags",
  "acr_override_processing",
  "acr_score",
  "aes_score",
  "display_mac_address",
  "operating_system_asset_list",
  "first_observed",
  "is_licensed",
  "is_public",
  "last_authenticated_scan_time",
  "last_licensed_scan_time",
  "last_observed",
  "last_scan_time",
  "mac_addresses",
  "mitigations",
  "table_id",
  "types",
  "subscription",
  "OS_Name",
  "owner_group",
  "system_model",
  "environment",
  "device_owner",
  "date_record_added",
];

const definitionProps = [
  "definition_id",
  "cve",
  "description",
  "exploitability_ease",
  "exploited_by_malware",
  "exploited_by_nessus",
  "family",
  "in_the_news",
  "name",
  "patch_published",
  "plugin_version",
  "see_also",
  "solution",
  "unsupported_by_vendor",
  "vulnerability_published",
  "cvss2_base_score",
  "cvss2_base_vector",
  "cvss2_temporal_score",
  "cvss2_temporal_vector",
  "cvss3_base_score",
  "cvss3_base_vector",
  "cvss3_temporal_score",
  "cvss3_temporal_vector",
  "vpr_drivers_cvss3_impact_score",
  "vpr_drivers_exploit_code_maturity",
  "vpr_drivers_threat_intensity",
  "vpr_drivers_threat_recency_high",
  "vpr_drivers_threat_recency_low",
  "vpr_drivers_threat_sources",
  "vpr_score",
];
//init default objects for filters
const defaultVulnerability = new Vulnerability();
const defaultAsset = new Asset();
const defaultDefinition = new Definition();

const isAssetKey = (key: any): key is keyof Asset => key in defaultAsset;

function filterFnSpecifier(key: string) {
  if (isAssetKey(key)) {
    const keyType = typeof defaultAsset[key];
    if (keyType === "string") {
      return "includesString";
    } else if (keyType === "number") {
      return "inNumberRange";
    }
  }
}

const columnHelper = createColumnHelper<any>();

const selectColumn = columnHelper.display({
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
});

export const assetColumns = [
  selectColumn,
  ...Object.keys(defaultAsset).map((key) =>
    columnHelper.accessor(key, {
      header: key.replace("_", " ").toString(),
      cell: (info) => info.getValue(),
      filterFn: filterFnSpecifier(key),
    })
  ),
];

export const definitionColumns = [
  selectColumn,
  ...definitionProps.map((prop) =>
    columnHelper.accessor(prop, {
      header: prop.replace("_", " "),
      cell: (info) => info.getValue(),
    })
  ),
];

export const vulnColumns = [
  selectColumn,
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
];
