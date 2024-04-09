import {
  isVulnerabilityRaw,
  vulnerability,
  vulnerabilityRaw,
} from "@/components/dataTable/Types/vulnerability";
import { parse, parseJSON } from "date-fns";
import axios from "axios";
import {
  DefinitionRaw,
  definition,
  isDefinitionRaw,
} from "@/components/dataTable/Types/definition";
import {
  AssetRaw,
  asset,
  isAssetRaw,
} from "@/components/dataTable/Types/asset";

axios.defaults.withCredentials = true;

declare global {
  interface options {
    [cateory: string]: {
      [option: string]: string[];
    };
  }
  interface Data {
    vulnerability: vulnerability[];
    asset: asset[];
    definition: definition[];
  }
  interface DataRaw {
    vulnerability: vulnerabilityRaw[];
    asset: AssetRaw[];
    definition: DefinitionRaw[];
  }
}

const getData = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/getData");
  console.log(response);
  const rawData: DataRaw = response.data;

  const vulnerabilities = rawData.vulnerability.map((raw) => toDatabase(raw));
  const assets = rawData.asset.map((raw) => toDatabase(raw));
  const definitions = rawData.definition.map((raw) => toDatabase(raw));

  return {
    vulnerability: vulnerabilities,
    asset: assets,
    definition: definitions,
  } as Data;
};

function toDatabase(
  data: vulnerabilityRaw | AssetRaw | DefinitionRaw
): vulnerability | asset | definition {
  let fields;

  if (isVulnerabilityRaw(data)) {
    const dateFields = ["first_observed", "last_seen"];
    fields = parseDateFields(data, dateFields) as vulnerability;
  } else if (isAssetRaw(data)) {
    const dateFields = [
      "first_observed",
      "last_authenticated_scan_time",
      "last_licensed_scan_time",
      "last_observed",
      "last_scan_time",
      "date_record_added",
    ];
    fields = parseDateFields(data, dateFields) as asset;
  } else if (isDefinitionRaw(data)) {
    const dateFields = ["patch_published", "vulnerability_published"];
    fields = parseDateFields(data, dateFields);
    fields = fields as definition;
  } else {
    throw new Error("unrecognized data model type");
  }
  return {
    ...fields,
  };
}

interface fields {
  [key: string]: unknown;
}

function parseDateFields(data: fields, dateFields: (keyof fields)[]): fields {
  return Object.keys(data).reduce((arr, key) => {
    if (dateFields.includes(key)) {
      arr[key] = data[key] ? parseJSON(data[key] as string) : null;
    } else {
      arr[key] = data[key];
    }
    return arr;
  }, {} as fields);
}

export { getData };

// const somethinig = {
//   ...data.fields,
//   first_observed: parseJSON(data.fields.first_observed),
//   last_seen: parseJSON(data.fields.last_seen),
// }

// {
//   ...data.fields,
//   first_observed: parseJSON(data.fields.first_observed),
//   last_authenticated_scan_time: parseJSON(data.fields.last_authenticated_scan_time),
//   last_licensed_scan_time: parseJSON(data.fields.last_licensed_scan_time),
//   last_observed: parseJSON(data.fields.last_observed),
//   last_scan_time: parseJSON(data.fields.last_scan_time),
//   date_record_added: parseJSON(data.fields.date_record_added)
// }
