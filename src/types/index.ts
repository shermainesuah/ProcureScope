export interface FileData {
  id: number;
  fileName: string;
  date: string;
  owner: string;
  totalRecords: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface FilterOption {
  label: string;
  type: string;
  condition: Option;
  value: string | { start: string; end: string };
}

export type FilterKey =
  | "name"
  | "date"
  | "records"
  | "owner"
  | "severity"
  | "anomalyType"
  | "reviewStatus"
  | "supplier"
  | "product"
  | "requiredSupply"
  | "availableSupply"
  | "supplyShortage"
  | "riskLevel";

export type FileDataList = FileData[];
