import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "@radix-ui/react-select";
import type { Option } from "../types";

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
  dropdownWidth?: string;
  value: string;
  onMouseDown?: (e: React.MouseEvent) => void;
  className?: string;
}

const Dropdown = ({
  options,
  onSelect,
  value,
  placeholder = "Select",
  dropdownWidth,
  className,
}: DropdownProps) => {
  const handleValueChange = (value: string) => {
    const selectedOption = options.find((opt) => opt.value === value);
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        aria-label="Select an option"
        className={`group data-[state=open]:border-secondary data-[state=open]:text-secondary rounded-lg border-primary border-2 text-sm flex items-center justify-between text-primary py-1 px-3 transition hover:border-secondary hover:text-secondary w-full ${className}`}
        style={{ width: dropdownWidth }}
      >
        <SelectValue placeholder={placeholder} />
        <ChevronDown className="w-4 h-4 ml-3" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          position="popper"
          className="bg-white border text-sm shadow-md p-1 mt-1 z-20"
          onMouseDown={(e) => e.stopPropagation()}
          style={{ width: dropdownWidth }}
        >
          <SelectViewport>
            {options.map(({ label, value }) => (
              <SelectItem
                key={value}
                value={value}
                className="block w-full text-left p-2 hover:bg-gray-200 focus:ring-0 outline-none cursor-pointer"
              >
                <SelectItemText>{label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default Dropdown;
