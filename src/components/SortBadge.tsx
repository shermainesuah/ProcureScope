import { ArrowUpNarrowWide, ArrowDownNarrowWide, X } from "lucide-react";
import type { Option } from "../types";

interface SortBadgeProps {
  option: Option;
  order: Option;
  onRemove: () => void;
}

const SortBadge = ({ option, order, onRemove }: SortBadgeProps) => (
  <div className="flex gap-1 items-center rounded-2xl border-2 px-2 py-1 bg-secondary text-white border-secondary w-fit text-sm font-medium mb-2">
    {option.label}
    {order.value === "ascending" ? (
      <ArrowUpNarrowWide className="h-4 w-4" />
    ) : (
      <ArrowDownNarrowWide className="h-4 w-4" />
    )}
    <X
      onClick={onRemove}
      className="h-4 w-4 ml-2 hover:text-red-500 hover:cursor-pointer"
    />
  </div>
);

export default SortBadge;
