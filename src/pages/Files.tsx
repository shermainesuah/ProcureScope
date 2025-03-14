import {
  File,
  CirclePlus,
  CircleUserRound,
  Trash2,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import FilterPanel from "../components/FilterPanel";
import SortPanel from "../components/SortPanel";
import { FileDataList } from "../types";
import { formatDate } from "../utils";
import type { FilterKey, FilterOption, Option } from "../types";

const filesData: FileDataList = [
  {
    id: 1,
    fileName: "procurement_jan.xlsx",
    date: "2025-02-25",
    owner: "Maria Gondalez",
    totalRecords: 1500,
  },
  {
    id: 2,
    fileName: "procurement_feb.csv",
    date: "2025-02-20",
    owner: "Maria Gondalez",
    totalRecords: 2000,
  },
  {
    id: 3,
    fileName: "procurement_mar.xlsx",
    date: "2025-02-15",
    owner: "Jones Brooke",
    totalRecords: 1800,
  },
  {
    id: 4,
    fileName: "procurement_apr.xlsx",
    date: "2025-02-10",
    owner: "Maria Gondalez",
    totalRecords: 2200,
  },
  {
    id: 5,
    fileName: "procurement_may.csv",
    date: "2025-02-05",
    owner: "James Young",
    totalRecords: 1700,
  },
  {
    id: 6,
    fileName: "procurement_jun.xlsx",
    date: "2025-01-30",
    owner: "Alice Brown",
    totalRecords: 1900,
  },
  {
    id: 7,
    fileName: "procurement_jul.csv",
    date: "2025-01-25",
    owner: "Michael Smith",
    totalRecords: 2100,
  },
  {
    id: 8,
    fileName: "procurement_aug.xlsx",
    date: "2025-01-20",
    owner: "David Clark",
    totalRecords: 1600,
  },
  {
    id: 9,
    fileName: "procurement_sep.xlsx",
    date: "2025-01-15",
    owner: "Emma Wilson",
    totalRecords: 2300,
  },
  {
    id: 10,
    fileName: "procurement_oct.csv",
    date: "2025-01-10",
    owner: "Sophia Lee",
    totalRecords: 2000,
  },
  {
    id: 11,
    fileName: "procurement_nov.xlsx",
    date: "2025-01-05",
    owner: "Olivia Martinez",
    totalRecords: 2400,
  },
  {
    id: 12,
    fileName: "procurement_dec.csv",
    date: "2024-12-30",
    owner: "Liam Taylor",
    totalRecords: 2200,
  },
  {
    id: 13,
    fileName: "procurement_jan_2024.xlsx",
    date: "2024-12-25",
    owner: "William Johnson",
    totalRecords: 2500,
  },
  {
    id: 14,
    fileName: "procurement_feb_2024.csv",
    date: "2024-12-20",
    owner: "James Young",
    totalRecords: 1800,
  },
  {
    id: 15,
    fileName: "procurement_mar_2024.xlsx",
    date: "2024-12-15",
    owner: "Ethan White",
    totalRecords: 2600,
  },
];

const sortOptions = [
  {
    label: "File Name",
    value: "name",
  },
  {
    label: "Date Uploaded",
    value: "date",
  },
  {
    label: "Total Records",
    value: "records",
  },
  {
    label: "File Owner",
    value: "owner",
  },
];

const FilterOptions: FilterKey[] = ["name", "date", "records", "owner"];

const Files: React.FC = () => {
  const updateSortOptions = (
    selectedOptions: { option: Option; order: Option }[]
  ) => {
    // These data can be used to sort the files records
    console.log(selectedOptions);
  };

  const updateFilterOptions = (filters: FilterOption[]) => {
    // These data can be used to filter the files records
    console.log(filters);
  };

  return (
    <div className="main-container">
      <div className="flex justify-between items-center">
        <h1>Procurement Data Files</h1>
        <Link to="/data-import">
          <button className="group w-fit text-sm flex items-center border-secondary border-2 font-medium text-primary p-2 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition">
            Import New Data
            <CirclePlus className="w-5 h-5 ml-2 text-primary group-hover:text-white" />
          </button>
        </Link>
      </div>
      <div className="mt-10">
        <div className="flex gap-2 items-center justify-end">
          <input
            type="text"
            placeholder="Search file name..."
            className="border p-2 rounded-lg w-1/3 focus:outline-none focus:ring-1 focus:border-secondary text-primary text-sm"
          />
          <div className="flex gap-2 relative items-center">
            <SortPanel options={sortOptions} onSelect={updateSortOptions} />
            <FilterPanel types={FilterOptions} onSelect={updateFilterOptions} />
          </div>
        </div>
        <div className="mt-4">
          <table className="w-full text-primary text-sm">
            <thead>
              <tr className="bg-gray text-left [&>th]:p-3">
                <th>File Name</th>
                <th>Date Uploaded</th>
                <th>Total Records</th>
                <th>File Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filesData.map((data) => (
                <tr key={data.id} className="border-b [&>td]:p-3">
                  <td>
                    <File className="w-4 h-4 inline-block mr-2" />
                    {data.fileName}
                  </td>
                  <td>{formatDate(`${data.date}`)}</td>
                  <td>{data.totalRecords}</td>
                  <td>
                    <CircleUserRound className="w-4 h-4 inline-block mr-2" />
                    {data.owner}
                  </td>
                  <td>
                    <Download className="w-4 h-4 inline-block mr-5 hover:text-secondary cursor-pointer" />
                    <Trash2 className="w-4 h-4 inline-block hover:text-error cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Files;
