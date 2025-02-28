import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";

interface DropdownProps {
  options: string[];
  onSelect: (option: string, order: string) => void;
}

const SortDropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("Ascending");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const textMeasureRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState("auto");

  const longestOption = [...options, "Descending"].reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );

  useEffect(() => {
    if (textMeasureRef.current) {
      setDropdownWidth(`${textMeasureRef.current.offsetWidth + 32}px`);
    }
  }, [options]);

  return (
    <div ref={dropdownRef} className="relative w-fit mt-4">
      {/* Hidden element to measure longest option */}
      <div
        ref={textMeasureRef}
        className="absolute invisible whitespace-nowrap px-3 py-1 border"
      >
        {longestOption}
      </div>

      {/* Option Selection Dropdown */}
      <Dropdown
        key={selectedSortOption}
        options={options}
        onSelect={(option) => setSelectedSortOption(option)}
        dropdownWidth={dropdownWidth}
        placeholder={selectedSortOption ? selectedSortOption : "Select"}
      />

      {/* Sort Order Dropdown (only shown when an option is selected) */}
      {selectedSortOption && (
        <div className="mt-2 flex flex-col">
          <Dropdown
            options={["Ascending", "Descending"]}
            onSelect={(order) => {
              setSelectedSortOrder(order);
            }}
            dropdownWidth={dropdownWidth}
          />

          <button
            onClick={() => {
              onSelect(selectedSortOption, selectedSortOrder);
              setSelectedSortOption("");
            }}
            className="text-sm flex self-end border-secondary border-2 font-medium text-textColor-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-4"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
