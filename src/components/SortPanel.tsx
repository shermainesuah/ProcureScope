import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpNarrowWide,
  X,
} from "lucide-react";
import type { Option } from "../types";

interface SortDropdownProps {
  options: Option[];
  onSelect: (option: string, order: string) => void;
}

const orderOptions: Option[] = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const SortPanel: React.FC<SortDropdownProps> = ({ options, onSelect }) => {
  const [sortOptions, setSortOptions] = useState<{
    selected: { option: Option; order: Option };
    applied: { option: Option; order: Option }[];
  }>({
    selected: {
      option: { label: "", value: "" },
      order: { label: "", value: "" },
    },
    applied: [],
  });
  const [sortPanelOpen, setSortPanelOpen] = useState(false);

  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const textMeasureRef = useRef<HTMLDivElement>(null);

  const longestOption = [
    ...options.map((o) => o.value || ""),
    "descending",
  ].reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    if (textMeasureRef.current) {
      setDropdownWidth(`${textMeasureRef.current.offsetWidth + 48}px`);
    }
  }, [options]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSortOptions({
          selected: {
            option: { label: "", value: "" },
            order: { label: "", value: "" },
          },
          applied: [],
        });
        setSortPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      {/* Hidden element to measure longest option */}
      <div
        ref={textMeasureRef}
        className="absolute invisible whitespace-nowrap px-3 py-1 border"
      >
        {longestOption}
      </div>

      <button
        onClick={() => setSortPanelOpen(!sortPanelOpen)}
        className={`group w-fit text-sm flex items-center p-2 hover:text-secondary transition ${
          sortPanelOpen ? "text-secondary" : "text-textColor-primary"
        }`}
      >
        <ArrowUpDown className="w-5 h-5 ml-1" />
      </button>
      {sortPanelOpen && (
        <div className="absolute right-0 bg-white border rounded-lg shadow-md p-4">
          <p className="text-sm font-medium mb-4">Sort by</p>
          {sortOptions.applied.length > 0 && (
            <div>
              {sortOptions.applied.map((appliedOption, index) => (
                <div className="flex gap-1 items-center rounded-2xl border-2 px-2 py-1 bg-secondary text-white border-secondary w-fit text-sm font-medium mb-6">
                  {appliedOption.option.label}
                  {appliedOption.order.value === "ascending" ? (
                    <ArrowUpNarrowWide className="h-4 w-4" />
                  ) : (
                    <ArrowDownNarrowWide className="h-4 w-4" />
                  )}
                  <X
                    onClick={() => {
                      setSortOptions((prev) => ({
                        ...prev,
                        applied: prev.applied.filter((_, i) => i !== index),
                      }));
                    }}
                    className="h-4 w-4 ml-2 hover:text-red-500 hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
          <Dropdown
            value={sortOptions.selected.option.value}
            options={options}
            onSelect={(selectedOption) =>
              setSortOptions((prev) => ({
                ...prev,
                selected: {
                  ...prev.selected,
                  option: selectedOption,
                },
              }))
            }
            dropdownWidth={dropdownWidth}
            onMouseDown={(e) => e.stopPropagation()}
          />

          {sortOptions.selected.option.value && (
            <div className="mt-2 flex flex-col">
              <Dropdown
                value={sortOptions.selected.order.value}
                options={orderOptions}
                onSelect={(selectedOrder) =>
                  setSortOptions((prev) => ({
                    ...prev,
                    selected: {
                      ...prev.selected,
                      order: selectedOrder,
                    },
                  }))
                }
                dropdownWidth={dropdownWidth}
              />

              <button
                onClick={() => {
                  setSortOptions((prev) => ({
                    selected: {
                      option: { label: "", value: "" },
                      order: { label: "", value: "" },
                    },
                    applied: [
                      ...prev.applied,
                      {
                        option: prev.selected.option,
                        order: prev.selected.order,
                      },
                    ],
                  }));

                  onSelect(
                    sortOptions.selected.option.value,
                    sortOptions.selected.order.value
                  );
                }}
                className="text-sm flex self-end border-secondary border-2 font-medium text-textColor-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-6"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SortPanel;
