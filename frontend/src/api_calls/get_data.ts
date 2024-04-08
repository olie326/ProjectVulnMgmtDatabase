import {
  isVulnerabilityRaw,
  vulnerability,
} from "@/components/dataTable/Types/vulnerability";
import { parse, parseJSON } from "date-fns";
import axios from "axios";
import {
  definition,
  isDefinitionRaw,
} from "@/components/dataTable/Types/definition";
import { asset, isAssetRaw } from "@/components/dataTable/Types/asset";

axios.defaults.withCredentials = true;

const getData = async (variant: "Vulnerability" | "Asset" | "Definition") => {
  var data: Database[] = [];
  await axios
    .post<string>("http://127.0.0.1:8000/api/getDatabase", {
      headers: {
        "Content-Type": "application/json",
      },
      variant: variant,
    })
    .then((response) => {
      const temp: DatabaseRaw[] = JSON.parse(response.data);

      data = temp.map((raw) => toDatabase(raw));
    });

  return data;
};

function toDatabase(data: DatabaseRaw): Database {
  let fields;

  if (isVulnerabilityRaw(data.fields)) {
    const dateFields = ["first_observed", "last_seen"];
    fields = parseDateFields(data.fields, dateFields) as vulnerability;
  } else if (isAssetRaw(data.fields)) {
    const dateFields = [
      "first_observed",
      "last_authenticated_scan_time",
      "last_licensed_scan_time",
      "last_observed",
      "last_scan_time",
      "date_record_added",
    ];
    fields = parseDateFields(data.fields, dateFields) as asset;
  } else if (isDefinitionRaw(data.fields)) {
    const dateFields = ["patch_published", "vulnerability_published"];
    fields = parseDateFields(data.fields, dateFields);
    fields = fields as definition;
  } else {
    throw new Error("unrecognized data model type");
  }
  return {
    ...data,
    fields: fields,
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
