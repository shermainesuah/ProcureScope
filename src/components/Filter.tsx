import { useState } from "react";
import Dropdown from "./Dropdown";
import React from "react";

export interface FilterOption {
  label: string;
  type: string;
  condition: string;
  value: string | { start: string; end: string };
}

interface FilterProps {
  types: (keyof typeof filterConfig)[];
  onSelect: (filters: FilterOption[]) => void;
}

const filterConfig: Record<
  string,
  {
    label: string;
    conditions: string[];
    inputType: string;
    placeholder?: string;
    options?: string[];
  }
> = {
  name: {
    conditions: [
      "is",
      "is not",
      "contains",
      "does not contain",
      "starts with",
      "ends with",
    ],
    label: "File Name",
    inputType: "text",
    placeholder: "File name",
  },
  date: {
    label: "Date",
    conditions: ["before", "after", "on", "not on", "in between"],
    inputType: "date",
  },
  records: {
    label: "Total Records",
    conditions: ["=", "!=", ">", "<", ">=", "<="],
    inputType: "number",
    placeholder: "Record count",
  },
  owner: {
    label: "File Owner",
    conditions: ["is", "is not", "contains", "does not contain"],
    inputType: "text",
    placeholder: "Owner name",
  },
  severity: {
    label: "Severity Level",
    conditions: ["is"],
    inputType: "select",
    options: ["Low", "Medium", "High", "Critical"],
  },
  anomalyType: {
    label: "Anomaly Type",
    conditions: ["is"],
    inputType: "select",
    placeholder: "Select anomaly type",
  },
  reviewStatus: {
    label: "Review Status",
    conditions: ["is"],
    inputType: "select",
    placeholder: "Select review status",
  },
  supplier: {
    label: "Supplier",
    conditions: ["is", "is not", "contains", "does not contain"],
    inputType: "text",
    placeholder: "Supplier name",
  },
};

const FilterDropdown: React.FC<FilterProps> = ({ types, onSelect }) => {
  const [selectedConditions, setSelectedConditions] = useState<{
    [key: string]: string;
  }>({});

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  return (
    <div className="p-4 text-sm flex flex-col">
      <div className="grid grid-cols-[repeat(3,minmax(min-content,1fr))] gap-4 text-sm items-center">
        {types.map((type, index) => {
          const { label, conditions, inputType, placeholder, options } =
            filterConfig[type];
          const selectedCondition = selectedConditions[type] || conditions[0];

          return (
            <React.Fragment key={index}>
              {/* Column 1: Label */}
              <label className="font-medium capitalize whitespace-nowrap">
                {label}
              </label>

              {/* Column 2: Condition Dropdown */}
              {conditions.length === 1 ? (
                <span className="text-sm font-medium text-center">
                  {conditions[0]}
                </span>
              ) : (
                <Dropdown
                  selectedDropdownOption={selectedConditions[type]}
                  options={conditions}
                  onSelect={(condition) =>
                    setSelectedConditions((prev) => ({
                      ...prev,
                      [type]: condition,
                    }))
                  }
                  dropdownWidth="160px"
                />
              )}

              {/* Column 3: Input Field */}
              <div className="w-full">
                {inputType === "select" && options ? (
                  <Dropdown
                    selectedDropdownOption={inputValues[type] || ""}
                    options={options}
                    onSelect={(value) =>
                      setInputValues((prev) => ({
                        ...prev,
                        [type]: value,
                      }))
                    }
                    dropdownWidth="160px"
                  />
                ) : selectedCondition === "in between" ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="border p-2 rounded"
                      value={inputValues[`${type}-start`] || ""}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          [`${type}-start`]: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="date"
                      className="border p-2 rounded"
                      value={inputValues[`${type}-end`] || ""}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          [`${type}-end`]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <input
                    type={inputType}
                    className="border p-2 rounded w-full"
                    placeholder={placeholder}
                    value={inputValues[type] || ""}
                    onChange={(e) =>
                      setInputValues((prev) => ({
                        ...prev,
                        [type]: e.target.value,
                      }))
                    }
                  />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <button
        onClick={() => {
          const filters = Object.keys(selectedConditions).map((type) => {
            if (selectedConditions[type] === "in between") {
              return {
                label: filterConfig[type].label,
                type,
                condition: selectedConditions[type],
                value: {
                  start: inputValues[`${type}-start`] || "",
                  end: inputValues[`${type}-end`] || "",
                },
              };
            }

            return {
              label: filterConfig[type].label,
              type,
              condition: selectedConditions[type],
              value: inputValues[type] || "",
            };
          });

          onSelect(filters);
          setSelectedConditions({});
          setInputValues({});
        }}
        className="text-sm self-end border-secondary border-2 font-medium text-textColor-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-4"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterDropdown;
