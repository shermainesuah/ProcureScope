import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: string[];
  onSelect: (option: string, order: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOptionOpen(false);
        setIsOrderOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-fit">
      {/* Hidden element to measure longest option */}
      <div
        ref={textMeasureRef}
        className="absolute invisible whitespace-nowrap px-3 py-1 border"
      >
        {longestOption}
      </div>

      {/* Option Selection Dropdown */}
      <button
        onClick={() => setIsOptionOpen((prev) => !prev)}
        className="group mt-4 rounded-lg border-primary border-2 text-sm flex items-center justify-between text-textColor-primary py-1 px-3 transition hover:border-secondary hover:text-secondary w-full"
        style={{ width: dropdownWidth }}
      >
        {selectedSortOption ? selectedSortOption : "Select"}
        <ChevronDown className="w-4 h-4 ml-3" />
      </button>

      {isOptionOpen && (
        <div
          className="absolute mt-1 bg-white border text-sm shadow-md p-1 z-10"
          style={{ width: dropdownWidth }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedSortOption(option);
                setIsOptionOpen(false);
              }}
              className="block w-full text-left p-2 hover:bg-gray"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Sort Order Dropdown (only shown when an option is selected) */}
      {selectedSortOption && (
        <div className="mt-2 flex flex-col">
          <button
            onClick={() => setIsOrderOpen((prev) => !prev)}
            className="w-full flex items-center justify-between rounded-lg border-primary border-2 text-sm py-1 px-3 transition hover:border-secondary hover:text-secondary relative"
            style={{ width: dropdownWidth }}
          >
            {selectedSortOrder}
            <ChevronDown className="w-4 h-4 ml-3" />
          </button>

          {isOrderOpen && (
            <div
              className="absolute mt-9 bg-white border text-sm shadow-md p-1"
              style={{ width: dropdownWidth }}
            >
              {["Ascending", "Descending"].map((order) => (
                <button
                  key={order}
                  onClick={() => {
                    setSelectedSortOrder(order);
                    setIsOrderOpen(false);
                  }}
                  className="block w-full text-left p-2 hover:bg-gray"
                >
                  {order}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              onSelect(selectedSortOption, selectedSortOrder);
              setSelectedSortOption("");
            }}
            className="text-xs flex self-end border-secondary border-2 font-medium text-textColor-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-4"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
