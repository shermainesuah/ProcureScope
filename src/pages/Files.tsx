import { useState } from "react";
import {
  File,
  CirclePlus,
  CircleUserRound,
  Trash2,
  Download,
  ArrowDownWideNarrow,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";

const Files: React.FC = () => {
  const [recentImports] = useState([
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
  ]);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const [sortPanelOpen, setSortPanelOpen] = useState(false);
  // const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  // const [selectedOwner, setSelectedOwner] = useState("");

  const options = ["File Name", "Date Uploaded", "Total Records", "File Owner"];
  const handleSelect = (option: string) => {
    console.log("Selected:", option);
  };

  return (
    <div className="main-container">
      <div className="flex justify-between items-center">
        <h1>Procurement Data Files</h1>
        <button
          onClick={() => navigate("/data-import")}
          className="group w-fit text-sm flex items-center border-secondary border-2 font-medium text-textColor-primary p-2 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition"
        >
          Import New Data
          <CirclePlus className="w-5 h-5 ml-2 text-primary group-hover:text-white" />
        </button>
      </div>

      <div>
        <div className="mt-10">
          <div className="flex gap-2 items-center justify-end">
            <input
              type="text"
              placeholder="Search file name..."
              className="border p-2 rounded-lg w-1/3 focus:outline-none focus:ring-1 focus:border-secondary text-textPrimary"
            />
            <div className="flex gap-2 relative">
              <div className="relative">
                <button
                  onClick={() => setSortPanelOpen(true)}
                  className="group w-fit text-sm flex items-center text-textColor-primary p-2 hover:text-secondary transition"
                >
                  <ArrowDownWideNarrow className="w-5 h-5 ml-1" />
                </button>
                {sortPanelOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-4">
                    <p className="text-sm font-medium">Sort by</p>
                    <Dropdown options={options} onSelect={handleSelect} />
                  </div>
                )}
              </div>

              <button className="group w-fit text-sm flex items-center text-textColor-primary p-2 hover:text-secondary transition">
                <Filter className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray text-left text-sm text-textColor-primary">
                  <th className="p-3">File Name</th>
                  <th className="p-3">Date Uploaded</th>
                  <th className="p-3">Total Records</th>
                  <th className="p-3">File Owner</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentImports.map((importItem) => (
                  <tr
                    key={importItem.id}
                    className="border-b text-textColor-primary text-sm"
                  >
                    <td className="p-3">
                      <File className="w-4 h-4 inline-block mr-2" />
                      {importItem.fileName}
                    </td>
                    <td className="p-3">{formatDate(`${importItem.date}`)}</td>
                    <td className="p-3">{importItem.totalRecords}</td>
                    <td className="p-3">
                      <CircleUserRound className="w-4 h-4 inline-block mr-2" />
                      {importItem.owner}
                    </td>
                    <td className="p-3">
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
    </div>
  );
};
export default Files;
