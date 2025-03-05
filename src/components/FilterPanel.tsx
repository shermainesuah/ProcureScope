import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import React from "react";
import { Filter, X } from "lucide-react";
import type { FilterOption, Option } from "../types";

type FilterKey =
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

interface FilterProps {
  types: FilterKey[];
  onSelect: (filters: FilterOption[]) => void;
}

type FilterConfig = {
  [key in FilterKey]: {
    label: string;
    conditions: Option[];
    inputType: string;
    placeholder?: string;
    options?: Option[];
  };
};

type FilterBody = FilterConfig[FilterKey];

const filterConfig: FilterConfig = {
  name: {
    label: "File Name",
    conditions: [
      { label: "Is", value: "is" },
      { label: "Is not", value: "is not" },
      { label: "Contains", value: "contains" },
      { label: "Does not contain", value: "does not contain" },
      { label: "Starts with", value: "starts with" },
      { label: "Ends with", value: "ends with" },
    ],
    inputType: "text",
    placeholder: "File name",
  },
  date: {
    label: "Date",
    conditions: [
      { label: "Before", value: "before" },
      { label: "After", value: "after" },
      { label: "On", value: "on" },
      { label: "Not on", value: "not on" },
      { label: "In between", value: "in between" },
    ],
    inputType: "date",
  },
  records: {
    label: "Total Records",
    conditions: [
      { label: "Equal to", value: "=" },
      { label: "Not equal to", value: "!=" },
      { label: "Greater than", value: ">" },
      { label: "Less than", value: "<" },
      { label: "Greater than or equal to", value: ">=" },
      { label: "Less than or equal to", value: "<=" },
    ],
    inputType: "number",
    placeholder: "Record count",
  },
  owner: {
    label: "File Owner",
    conditions: [
      { label: "Is", value: "is" },
      { label: "Is not", value: "is not" },
      { label: "Contains", value: "contains" },
      { label: "Does not contain", value: "does not contain" },
    ],
    inputType: "text",
    placeholder: "Owner name",
  },
  severity: {
    label: "Severity Level",
    conditions: [{ label: "Is", value: "is" }],
    inputType: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  },
  anomalyType: {
    label: "Anomaly Type",
    conditions: [{ label: "Is", value: "is" }],
    inputType: "select",
    placeholder: "Select anomaly type",
  },
  reviewStatus: {
    label: "Review Status",
    conditions: [{ label: "Is", value: "is" }],
    inputType: "select",
    placeholder: "Select review status",
  },
  supplier: {
    label: "Supplier",
    conditions: [
      { label: "Is", value: "is" },
      { label: "Is not", value: "is not" },
      { label: "Contains", value: "contains" },
      { label: "Does not contain", value: "does not contain" },
    ],
    inputType: "text",
    placeholder: "Supplier name",
  },
  product: {
    label: "Product",
    conditions: [
      { label: "Is", value: "is" },
      { label: "Is not", value: "is not" },
      { label: "Contains", value: "contains" },
      { label: "Does not contain", value: "does not contain" },
    ],
    inputType: "text",
    placeholder: "Product name",
  },
  requiredSupply: {
    label: "Required Supply",
    conditions: [
      { label: "Equal to", value: "=" },
      { label: "Not equal to", value: "!=" },
      { label: "Greater than", value: ">" },
      { label: "Less than", value: "<" },
      { label: "Greater than or equal to", value: ">=" },
      { label: "Less than or equal to", value: "<=" },
    ],
    inputType: "number",
    placeholder: "Number of units",
  },
  availableSupply: {
    label: "Available Supply",
    conditions: [
      { label: "Equal to", value: "=" },
      { label: "Not equal to", value: "!=" },
      { label: "Greater than", value: ">" },
      { label: "Less than", value: "<" },
      { label: "Greater than or equal to", value: ">=" },
      { label: "Less than or equal to", value: "<=" },
    ],
    inputType: "number",
    placeholder: "Number of units",
  },
  supplyShortage: {
    label: "Supply Shortage",
    conditions: [
      { label: "Equal to", value: "=" },
      { label: "Not equal to", value: "!=" },
      { label: "Greater than", value: ">" },
      { label: "Less than", value: "<" },
      { label: "Greater than or equal to", value: ">=" },
      { label: "Less than or equal to", value: "<=" },
    ],
    inputType: "number",
    placeholder: "Percentage",
  },
  riskLevel: {
    label: "Risk Level",
    conditions: [{ label: "Is", value: "is" }],
    inputType: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  },
};

const FilterPanel = ({ types, onSelect }: FilterProps) => {
  const [selectedConditions, setselectedConditions] = useState<
    Partial<Record<FilterKey, Option>>
  >({});
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [inputValues, setInputValues] = useState<
    Partial<Record<FilterKey, string>>
  >({});
  const panelRef = useRef<HTMLDivElement>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterOption[]>([]);

  const renderInputField = (config: FilterBody, type: FilterKey) => {
    if (config.inputType === "select" && config.options) {
      return (
        <Dropdown
          value={inputValues[type] || ""}
          options={config.options}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              [type]: selected.value,
            }))
          }
          dropdownWidth="160px"
        />
      );
    }

    if (selectedConditions[type]?.value === "in between") {
      return (
        <div className="grid gap-2">
          <input
            type="date"
            className="border p-2 rounded-lg"
            value={inputValues["date-start" as FilterKey] || ""}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                ["date-start"]: e.target.value,
              }))
            }
          />
          <input
            type="date"
            className="border p-2 rounded-lg"
            value={inputValues["date-end" as FilterKey] || ""}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                ["date-end"]: e.target.value,
              }))
            }
          />
        </div>
      );
    }

    return (
      <input
        type={config.inputType}
        className="border p-2 rounded-lg w-full"
        placeholder={config.placeholder}
        value={inputValues[type] || ""}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            [type]: e.target.value,
          }))
        }
      />
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setselectedConditions({});
      setInputValues({});
      setFilterDropdownOpen(false);
    }
  };

  const handleApplyFilter = () => {
    const filters = Object.keys(selectedConditions).map((type) => {
      const filterKey = type as FilterKey;
      const filterConfigItem = filterConfig[type as keyof typeof filterConfig];

      if (selectedConditions[filterKey]?.value === "in between") {
        return {
          label: filterConfigItem.label,
          type,
          condition: selectedConditions[filterKey] as Option,
          value: {
            start: inputValues["date-start" as FilterKey] || "",
            end: inputValues["date-end" as FilterKey] || "",
          },
        };
      }

      return {
        label: filterConfigItem.label,
        type,
        condition: selectedConditions[filterKey] as Option,
        value: inputValues[filterKey] || "",
      };
    });
    setAppliedFilters(filters.map((prev) => ({ ...prev, filters })));
    setselectedConditions({});
    setInputValues({});
    onSelect(filters);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={panelRef}>
      <button
        className={`group w-fit text-sm flex items-center  p-2 hover:text-secondary transition ${
          filterDropdownOpen ? "text-secondary" : "text-textColor-primary"
        }`}
      >
        <Filter
          className="w-5 h-5 ml-1"
          onClick={() => {
            setFilterDropdownOpen(!filterDropdownOpen);
          }}
        />
      </button>
      {filterDropdownOpen && (
        <div className="relative">
          <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-6">
            {appliedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {appliedFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex gap-1 items-center rounded-2xl border-2 px-4 py-1 bg-secondary text-white border-secondary w-fit text-sm font-medium"
                  >
                    <span>
                      {filter.label}{" "}
                      {filter.condition.label.toLocaleLowerCase()}{" "}
                      {typeof filter.value === "object"
                        ? `${filter.value.start} - ${filter.value.end}`
                        : filter.value}
                    </span>

                    <X
                      onClick={() => {
                        setAppliedFilters((prevFilters) =>
                          prevFilters.filter((_, i) => i !== index)
                        );
                      }}
                      className="h-4 w-4 ml-2 hover:text-red-500 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm flex flex-col">
              <div className="grid grid-cols-[repeat(3,minmax(min-content,1fr))] gap-4 text-sm items-center">
                {types.map((type, index) => {
                  const { label, conditions } = filterConfig[type];

                  return (
                    <React.Fragment key={index}>
                      {/* Label */}
                      <label className="font-semibold whitespace-nowrap">
                        {label}
                      </label>

                      {/* Condition Dropdown */}
                      {conditions.length === 1 ? (
                        <span className="text-sm text-center">
                          {conditions[0].label}
                        </span>
                      ) : (
                        <div>
                          <Dropdown
                            value={
                              selectedConditions[type as FilterKey]?.value ?? ""
                            }
                            options={conditions}
                            onSelect={(condition) =>
                              setselectedConditions((prev) => ({
                                ...prev,
                                [type]: condition,
                              }))
                            }
                            dropdownWidth="160px"
                          />
                        </div>
                      )}

                      {/* Input Field */}
                      <div className="w-full">
                        {renderInputField(filterConfig[type], type)}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  handleApplyFilter();
                }}
                className="text-sm self-end border-secondary border-2 font-medium text-textColor-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-6"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
