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

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
  dropdownWidth?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export interface Option {
  label: string;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select",
  dropdownWidth,
}) => {
  return (
    <Select
      onValueChange={(val) => {
        const selectedOption = options.find((opt) => opt.value === val);
        if (selectedOption) {
          onSelect(selectedOption);
        }
      }}
    >
      <SelectTrigger
        className="group rounded-lg border-primary border-2 text-sm flex items-center justify-between text-textColor-primary py-1 px-3 transition hover:border-secondary hover:text-secondary w-full"
        style={{ width: dropdownWidth }}
      >
        <SelectValue placeholder={placeholder} />
        <ChevronDown className="w-4 h-4 ml-3" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          className="bg-white border text-sm shadow-md p-1 mt-10"
          onMouseDown={(e) => e.stopPropagation()} // Prevents closing on select
        >
          <SelectViewport>
            {options.map(({ label, value }) => (
              <SelectItem
                key={value}
                value={value}
                className="block w-full text-left p-2 hover:bg-gray-200 cursor-pointer"
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
