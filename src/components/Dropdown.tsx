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
      setDropdownWidth(`${textMeasureRef.current.offsetWidth + 32}px`);
    }
  }, [options]);

  return (
    <div className="w-fit">
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

      {/* Sort Order Dropdown (only shown when an sort option is selected) */}
      {selectedOption && (
        <div className="mt-2 flex flex-col">
          <button
            onClick={() => setIsOrderOpen(!isOrderOpen)}
            className="w-full flex items-center justify-between rounded-lg border-primary border-2 text-sm py-1 px-3 transition hover:border-secondary hover:text-secondary relative"
            style={{ width: dropdownWidth }}
          >
            {selectedOrder}
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
          <button
            onClick={() => onSelect("")}
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
