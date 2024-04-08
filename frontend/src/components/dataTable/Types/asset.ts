export type asset = {
  type: "Asset";
  name: string;
  display_ipv4_address: string;
  asset_id: string;
  tags: string;
  acr_override_processing: string;
  acr_score: number;
  aes_score: number;
  display_mac_address: string;
  operating_system_asset_list: string;
  first_observed: Date;
  is_licensed: string;
  is_public: string;
  last_authenticated_scan_time: Date;
  last_licensed_scan_time: Date;
  last_observed: Date;
  last_scan_time: Date;
  mac_addresses: string;
  mitigations: string;
  table_id: string;
  types: string;
  subscription: string;
  OS_Name: string;
  owner_group: string;
  system_model: string;
  environment: string;
  date_record_added: Date;
  device_owner: string;
};

export type AssetRaw = Omit<
  asset,
  | "first_observed"
  | "last_authenticated_scan_time"
  | "last_licensed_scan_time"
  | "last_observed"
  | "last_scan_time"
  | "date_record_added"
> & {
  first_observed: string;
  last_authenticated_scan_time: string;
  last_licensed_scan_time: string;
  last_observed: string;
  last_scan_time: string;
  date_record_added: string;
};

export function isAsset(fields: any): fields is asset {
  return (
    fields.asset_id != undefined && typeof fields.first_observed === "object"
  );
}

export function isAssetRaw(fields: any): fields is AssetRaw {
  return (
    fields.asset_id != undefined &&
    (typeof fields.first_observed === "string" || fields.first_observed == null)
  );
}

export class Asset implements asset {
  readonly type: "Asset";
  name: string;
  display_ipv4_address: string;
  asset_id: string;
  tags: string;
  acr_override_processing: string;
  acr_score: number;
  aes_score: number;
  display_mac_address: string;
  operating_system_asset_list: string;
  first_observed: Date;
  is_licensed: string;
  is_public: string;
  last_authenticated_scan_time: Date;
  last_licensed_scan_time: Date;
  last_observed: Date;
  last_scan_time: Date;
  mac_addresses: string;
  mitigations: string;
  table_id: string;
  types: string;
  subscription: string;
  OS_Name: string;
  owner_group: string;
  system_model: string;
  environment: string;
  date_record_added: Date;
  device_owner: string;

  constructor(props: Partial<asset> = {}) {
    this.type = "Asset";
    this.name = props.name || "";
    this.display_ipv4_address = props.display_ipv4_address || "";
    this.asset_id = props.asset_id || "";
    this.tags = props.tags || "";
    this.acr_override_processing = props.acr_override_processing || "";
    this.acr_score = props.acr_score || -1;
    this.aes_score = props.aes_score || -1;
    this.display_mac_address = props.display_mac_address || "";
    this.operating_system_asset_list = props.operating_system_asset_list || "";
    this.first_observed = props.first_observed || new Date();
    this.is_licensed = props.is_licensed || "";
    this.is_public = props.is_public || "";
    this.last_authenticated_scan_time =
      props.last_authenticated_scan_time || new Date();
    this.last_licensed_scan_time = props.last_licensed_scan_time || new Date();
    this.last_observed = props.last_observed || new Date();
    this.last_scan_time = props.last_scan_time || new Date();
    this.mac_addresses = props.mac_addresses || "";
    this.mitigations = props.mitigations || "";
    this.table_id = props.table_id || "";
    this.types = props.types || "";
    this.subscription = props.subscription || "";
    this.OS_Name = props.OS_Name || "";
    this.owner_group = props.owner_group || "";
    this.system_model = props.system_model || "";
    this.environment = props.environment || "";
    this.date_record_added = props.date_record_added || new Date();
    this.device_owner = props.device_owner || "";
  }
}
