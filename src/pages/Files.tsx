import { useEffect, useRef, useState } from "react";
import {
  File,
  CirclePlus,
  CircleUserRound,
  Trash2,
  Download,
  Filter,
  ArrowUpDown,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterDropdown, { FilterOption } from "../components/Filter";
import SortDropdown from "../components/SortDropdown";

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

  const options = ["File Name", "Date Uploaded", "Total Records", "File Owner"];

  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("Ascending");
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const closeSortDropdown = (option: string, order: string) => {
    setSelectedOption(option);
    setSelectedOrder(order);
  };

  const closeFilterDropdown = (filters: FilterOption[]) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setSortPanelOpen(false);
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setSortPanelOpen(!sortPanelOpen)}
                  className={`group w-fit text-sm flex items-center p-2 hover:text-secondary transition ${
                    sortPanelOpen ? "text-secondary" : "text-textColor-primary"
                  }`}
                >
                  <ArrowUpDown className="w-5 h-5 ml-1" />
                </button>
                {sortPanelOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-4">
                    <p className="text-sm font-medium">Sort by</p>
                    {selectedOption && selectedOrder && (
                      <div className="flex gap-1 items-center rounded-2xl border-2 px-2 py-1 bg-secondary text-white border-secondary mt-4 w-fit text-sm font-medium ">
                        {selectedOption}
                        {selectedOrder === "Ascending" ? (
                          <ArrowUpNarrowWide className="h-4 w-4" />
                        ) : (
                          <ArrowDownNarrowWide className="h-4 w-4" />
                        )}
                        <X
                          onClick={() => {
                            setSelectedOption("");
                            setSelectedOrder("");
                          }}
                          className="h-4 w-4 ml-2 hover:text-red-500 hover:cursor-pointer"
                        />
                      </div>
                    )}
                    <SortDropdown
                      options={options}
                      onSelect={closeSortDropdown}
                    />
                  </div>
                )}
              </div>

              <div className="relative" ref={filterDropdownRef}>
                <button
                  className={`group w-fit text-sm flex items-center  p-2 hover:text-secondary transition ${
                    filterDropdownOpen
                      ? "text-secondary"
                      : "text-textColor-primary"
                  }`}
                >
                  <Filter
                    className="w-5 h-5 ml-1"
                    onClick={() => {
                      setFilterDropdownOpen(!filterDropdownOpen);
                      setSortPanelOpen(false);
                    }}
                  />
                </button>

                {filterDropdownOpen && (
                  <div className="relative">
                    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-4">
                      {selectedFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-4">
                          {selectedFilters.map((filter, index) => (
                            <div
                              key={index}
                              className="flex gap-1 items-center rounded-2xl border-2 px-2 py-1 bg-secondary text-white border-secondary w-fit text-sm font-medium"
                            >
                              <span>
                                {filter.label} {filter.condition}{" "}
                                {typeof filter.value === "object"
                                  ? `${filter.value.start} - ${filter.value.end}`
                                  : filter.value}
                              </span>

                              <X
                                onClick={() => {
                                  setSelectedFilters((prevFilters) =>
                                    prevFilters.filter((_, i) => i !== index)
                                  );
                                }}
                                className="h-4 w-4 ml-2 hover:text-red-500 hover:cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <FilterDropdown
                        types={["name", "date", "records", "owner"]}
                        onSelect={closeFilterDropdown}
                      />
                    </div>
                  </div>
                )}
              </div>
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
