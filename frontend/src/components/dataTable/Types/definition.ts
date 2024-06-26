export type definition = {
  type: "Definition";
  definition_id: number;
  cve: string;
  description: string;
  exploitability_ease: string;
  exploited_by_malware: string;
  exploited_by_nessus: string;
  family: string;
  in_the_news: string;
  name: string;
  patch_published: Date;
  plugin_version: string;
  see_also: string;
  solution: string;
  unsupported_by_vendor: string;
  vulnerability_published: Date;
  cvss2_base_score: number;
  cvss2_base_vector: string;
  cvss2_temporal_score: number;
  cvss2_temporal_vector: string;
  cvss3_base_score: number;
  cvss3_base_vector: string;
  cvss3_temporal_score: number;
  cvss3_temporal_vector: string;
  vpr_drivers_cvss3_impact_score: number;
  vpr_drivers_exploit_code_maturity: string;
  vpr_drivers_threat_intensity: string;
  vpr_drivers_threat_recency_high: number;
  vpr_drivers_threat_recency_low: number;
  vpr_drivers_threat_sources: string;
  vpr_score: number;
};

export type DefinitionRaw = Omit<
  definition,
  "patch_published" | "vulnerability_published" | "yasss"
> & {
  patch_published: string;
  vulnerability_published: string;
};

export function isDefinition(fields: any): fields is definition {
  return (
    fields.definition_id != undefined &&
    typeof fields.patch_published === "object"
  );
}

export function isDefinitionRaw(fields: any): fields is DefinitionRaw {
  return (
    fields.definition_id != undefined &&
    (typeof fields.vulnerability_published === "string" ||
      fields.vulnerability_published === null)
  );
}

export class Definition implements definition {
  readonly type: "Definition";
  definition_id: number;
  cve: string;
  description: string;
  exploitability_ease: string;
  exploited_by_malware: string;
  exploited_by_nessus: string;
  family: string;
  in_the_news: string;
  name: string;
  patch_published: Date;
  plugin_version: string;
  see_also: string;
  solution: string;
  unsupported_by_vendor: string;
  vulnerability_published: Date;
  cvss2_base_score: number;
  cvss2_base_vector: string;
  cvss2_temporal_score: number;
  cvss2_temporal_vector: string;
  cvss3_base_score: number;
  cvss3_base_vector: string;
  cvss3_temporal_score: number;
  cvss3_temporal_vector: string;
  vpr_drivers_cvss3_impact_score: number;
  vpr_drivers_exploit_code_maturity: string;
  vpr_drivers_threat_intensity: string;
  vpr_drivers_threat_recency_high: number;
  vpr_drivers_threat_recency_low: number;
  vpr_drivers_threat_sources: string;
  vpr_score: number;

  constructor(props: Partial<definition> = {}) {
    this.type = "Definition";
    this.definition_id = props.definition_id || -1;
    this.cve = props.cve || "";
    this.description = props.description || "";
    this.exploitability_ease = props.exploitability_ease || "";
    this.exploited_by_malware = props.exploited_by_malware || "";
    this.exploited_by_nessus = props.exploited_by_nessus || "";
    this.family = props.family || "";
    this.in_the_news = props.in_the_news || "";
    this.name = props.name || "";
    this.patch_published = props.patch_published || new Date();
    this.plugin_version = props.plugin_version || "";
    this.see_also = props.see_also || "";
    this.solution = props.solution || "";
    this.unsupported_by_vendor = props.unsupported_by_vendor || "";
    this.vulnerability_published = props.vulnerability_published || new Date();
    this.cvss2_base_score = props.cvss2_base_score || -1;
    this.cvss2_base_vector = props.cvss2_base_vector || "";
    this.cvss2_temporal_score = props.cvss2_temporal_score || -1;
    this.cvss2_temporal_vector = props.cvss2_temporal_vector || "";
    this.cvss3_base_score = props.cvss3_base_score || -1;
    this.cvss3_base_vector = props.cvss3_base_vector || "";
    this.cvss3_temporal_score = props.cvss3_temporal_score || -1;
    this.cvss3_temporal_vector = props.cvss3_temporal_vector || "";
    this.vpr_drivers_cvss3_impact_score =
      props.vpr_drivers_cvss3_impact_score || -1;
    this.vpr_drivers_exploit_code_maturity =
      props.vpr_drivers_exploit_code_maturity || "";
    this.vpr_drivers_threat_intensity =
      props.vpr_drivers_threat_intensity || "";
    this.vpr_drivers_threat_recency_high =
      props.vpr_drivers_threat_recency_high || -1;
    this.vpr_drivers_threat_recency_low =
      props.vpr_drivers_threat_recency_low || -1;
    this.vpr_drivers_threat_sources = props.vpr_drivers_threat_sources || "";
    this.vpr_score = props.vpr_score || -1;
  }
}
