import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("Ascending");
  const [dropdownWidth, setDropdownWidth] = useState("auto");

  const textMeasureRef = useRef<HTMLDivElement>(null);

  // Get the longest option between the options and "Descending"
  const longestOption = [...options, "Descending"].reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );

  useEffect(() => {
    if (textMeasureRef.current) {
      setDropdownWidth(`${textMeasureRef.current.offsetWidth + 32}px`); // +32 for padding
    }
  }, [options]);

  return (
    <div className="relative w-fit">
      {/* Hidden element to measure longest option */}
      <div
        ref={textMeasureRef}
        className="absolute invisible whitespace-nowrap px-3 py-1 border"
      >
        {longestOption}
      </div>

      {/* Option Selection Dropdown */}
      <button
        onClick={() => setIsOptionOpen(!isOptionOpen)}
        className="group mt-4 rounded-lg border-primary border-2 text-sm flex items-center justify-between text-textColor-primary py-1 px-3 transition hover:border-secondary  hover:text-secondary w-full"
        style={{ width: dropdownWidth }}
      >
        {selectedOption || "Select"}
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
                onSelect(option);
                setIsOptionOpen(false);
                setSelectedOption(option);
              }}
              className="block w-full text-left p-2 hover:bg-gray"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Sort Order Dropdown (only shown when an option is selected) */}
      {selectedOption && (
        <div className="mt-2 relative">
          <button
            onClick={() => setIsOrderOpen(!isOrderOpen)}
            className="w-full flex items-center justify-between rounded-lg border-primary border-2 text-sm py-1 px-3 transition hover:border-secondary hover:text-secondary"
            style={{ width: dropdownWidth }}
          >
            {selectedOrder}
            <ChevronDown className="w-4 h-4 ml-3" />
          </button>

          {isOrderOpen && (
            <div
              className="absolute mt-1 bg-white border text-sm shadow-md p-1"
              style={{ width: dropdownWidth }}
            >
              {["Ascending", "Descending"].map((order) => (
                <button
                  key={order}
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOrderOpen(false);
                  }}
                  className="block w-full text-left p-2 hover:bg-gray"
                >
                  {order}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
