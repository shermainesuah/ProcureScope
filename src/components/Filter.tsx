import { useState } from "react";
import Dropdown from "./Dropdown";

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
    conditions: ["before", "after", "on", "not on", "in between"], // Added "in between"
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
};

const FilterDropdown: React.FC<FilterProps> = ({ types, onSelect }) => {
  const [selectedConditions, setSelectedConditions] = useState<{
    [key: string]: string;
  }>({});

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  return (
    <div className="p-4 text-sm flex flex-col">
      {types.map((type, index) => {
        const { label, conditions, inputType, placeholder } =
          filterConfig[type];
        const selectedCondition = selectedConditions[type];

        return (
          <div
            key={index}
            className="flex items-center justify-between gap-6 mb-2"
          >
            <label className="font-medium capitalize w-1/4">{label}</label>

            {/* Condition Selection */}
            <Dropdown
              selectedDropdownOption={selectedConditions[type]} // Ensure it resets
              options={conditions}
              onSelect={(condition) =>
                setSelectedConditions((prev) => ({
                  ...prev,
                  [type]: condition,
                }))
              }
              dropdownWidth="150px"
            />

            {/* Input Field(s) */}
            {selectedCondition === "in between" ? (
              <div className="flex items-center flex-col gap-2">
                <input
                  type="date"
                  className="border p-2 rounded w-40"
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
                  className="border p-2 rounded w-40"
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
                className="border p-2 rounded min-w-40"
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
        );
      })}

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
        className="text-sm flex self-end border-secondary border-2 font-medium text-textColor-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-4"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterDropdown;
