import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: string[];
  selectedDropdownOption?: string; // New prop
  onSelect: (option: string) => void;
  placeholder?: string;
  dropdownWidth?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedDropdownOption,
  placeholder = "Select",
  dropdownWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(selectedDropdownOption || ""); // Reset when prop changes
  }, [selectedDropdownOption]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-fit">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group rounded-lg border-primary border-2 text-sm flex items-center justify-between text-textColor-primary py-1 px-3 transition hover:border-secondary hover:text-secondary w-full"
        style={{ width: dropdownWidth }}
      >
        {selectedOption || placeholder}
        <ChevronDown className="w-4 h-4 ml-3" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute mt-1 bg-white border text-sm shadow-md p-1 z-10"
          style={{ width: dropdownWidth }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
                onSelect(option);
              }}
              className="block w-full text-left p-2 hover:bg-gray-200"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
