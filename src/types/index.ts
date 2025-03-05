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

export type FileDataList = FileData[];
