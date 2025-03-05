import { useState, useRef, useEffect, useMemo } from "react";
import Dropdown from "./Dropdown";
import { ArrowUpDown } from "lucide-react";
import type { Option } from "../types";
import SortBadge from "./SortBadge";

interface SortDropdownProps {
  options: Option[];
  onSelect: (selectedOptions: { option: Option; order: Option }[]) => void;
}

type SortOptionState = {
  selected: { option: Option; order: Option };
  applied: { option: Option; order: Option }[];
};

const initialSortState: SortOptionState = {
  selected: {
    option: { label: "", value: "" },
    order: { label: "", value: "" },
  },
  applied: [],
};

const orderOptions: Option[] = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const SortPanel = ({ options, onSelect }: SortDropdownProps) => {
  const [sortOptions, setSortOptions] = useState(initialSortState);
  const [sortPanelOpen, setSortPanelOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const textMeasureRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const longestOption = useMemo(
    () =>
      [...options.map((option) => option.value), "descending"].reduce((a, b) =>
        a.length > b.length ? a : b
      ),
    [options]
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setSortOptions((prev) => ({
        selected: {
          option: { label: "", value: "" },
          order: { label: "", value: "" },
        },
        applied: prev.applied.length > 0 ? prev.applied : [],
      }));
      setSortPanelOpen(false);
    }
  };

  useEffect(() => {
    if (textMeasureRef.current) {
      setDropdownWidth(`${textMeasureRef.current.offsetWidth + 48}px`);
    }
  }, [options]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplySort = () => {
    const newAppliedSort = {
      option: sortOptions.selected.option,
      order: sortOptions.selected.order,
    };

    setSortOptions((prev) => ({
      selected: {
        option: { label: "", value: "" },
        order: { label: "", value: "" },
      },
      applied: [...prev.applied, newAppliedSort],
    }));

    onSelect(sortOptions.applied);
  };

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
          sortPanelOpen ? "text-secondary" : "text-primary"
        }`}
      >
        <ArrowUpDown className="w-5 h-5 ml-1" />
      </button>
      {sortPanelOpen && (
        <div className="absolute right-0 bg-white border rounded-lg shadow-md p-4">
          <p className="text-sm font-medium mb-4">Sort by</p>
          {sortOptions.applied.length > 0 && (
            <div className="mb-5">
              {sortOptions.applied.map((appliedOption, index) => (
                <SortBadge
                  key={index}
                  option={appliedOption.option}
                  order={appliedOption.order}
                  onRemove={() => {
                    setSortOptions((prev) => ({
                      ...prev,
                      applied: prev.applied.filter((_, i) => i !== index),
                    }));
                  }}
                />
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
                  handleApplySort();
                }}
                className="text-sm flex self-end border-secondary border-2 font-medium text-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-6"
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
