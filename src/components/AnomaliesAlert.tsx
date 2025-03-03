import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  TrendingUp,
  DollarSign,
  CircleAlert,
  ShieldOff,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  ArrowUpDown,
  X,
  Filter,
  EllipsisVertical,
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import SortDropdown from "./SortDropdown";
import { useEffect, useRef, useState } from "react";
import FilterDropdown, { FilterOption } from "./Filter";

const AnomaliesAlert: React.FC = () => {
  type SeverityLevel = "High" | "Moderate" | "Low";
  type AnomalyType =
    | "Unusual Purchase Volume"
    | "Price Spike"
    | "Potential Fraud";

  const anomalyIcons = {
    "Unusual Purchase Volume": (
      <TrendingUp className="h-4 w-4 text-secondary" />
    ),
    "Price Spike": <DollarSign className="h-4 w-4 text-secondary" />,
    "Potential Fraud": <ShieldOff className="h-4 w-4 text-secondary" />,
  };

  const anomalies: {
    type: AnomalyType;
    supplier: string;
    orderSummary: string;
    severity: SeverityLevel;
    detectedAt: string;
    procurementFile: string;
    chartData?: { categories: string[]; values: number[] };
  }[] = [
    {
      type: "Unusual Purchase Volume",
      supplier: "ABC Farms Ltd.",
      orderSummary: "5000 units ordered (avg: 500) – 900% increase",
      severity: "High",
      detectedAt: "Feb 28, 2025 - 14:05 UTC",
      procurementFile: "Q1_Procurement_Records.csv",
      chartData: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        values: [500, 700, 550, 900, 5000],
      },
    },
    {
      type: "Price Spike",
      supplier: "XYZ Traders",
      orderSummary: "Price per unit increased from $1.80 to $2.50",
      severity: "Moderate",
      detectedAt: "Feb 27, 2025 - 10:20 UTC",
      procurementFile: "Feb_Price_Changes.xlsx",
      chartData: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [1.8, 1.85, 1.9, 2.5],
      },
    },
    {
      type: "Potential Fraud",
      supplier: "Jay Enterprises",
      orderSummary: "Invoice #12345 was submitted twice for payment",
      severity: "Low",
      detectedAt: "Feb 26, 2025 - 18:45 UTC",
      procurementFile: "Invoice_Submissions_Feb.pdf",
    },
  ];

  const severityColors = {
    High: "text-error bg-red-100 rounded-full",
    Moderate: "text-warning bg-orange-100 rounded-full",
    Low: "text-success bg-green-100 rounded-full",
  };
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("Ascending");
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortPanelOpen, setSortPanelOpen] = useState(false);

  const closeSortDropdown = (option: string, order: string) => {
    setSelectedOption(option);
    setSelectedOrder(order);
  };

  const closeFilterDropdown = (filters: FilterOption[]) => {
    setSelectedFilters(filters);
  };

  const sortOptions = ["Anomaly Type", "Supplier", "Severity", "Date Detected"];
  const filterOptions = [
    "severity",
    "anomalyType",
    "supplier",
    "reviewStatus",
    "date",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setSortPanelOpen(false);
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="flex items-end justify-between mb-3">
        <h2>Anomalies Alert</h2>
        <div>
          <div className="flex gap-4 relative">
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setSortPanelOpen(!sortPanelOpen)}
                className={`group w-fit text-sm flex items-center hover:text-secondary transition ${
                  sortPanelOpen ? "text-secondary" : "text-textColor-primary"
                }`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
              {sortPanelOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-4">
                  <p className="text-sm font-medium">Sort by</p>
                  {selectedOption && selectedOrder && (
                    <div className="flex gap-1 items-center rounded-2xl border-2 px-2 py-1 bg-secondary text-white border-secondary mt-4 w-fit text-sm font-medium ">
                      {selectedOption}
                      {selectedOrder === "Ascending" ? (
                        <ArrowUpNarrowWide className="h-4 w-4" />
                      ) : (
                        <ArrowDownNarrowWide className="h-4 w-4" />
                      )}
                      <X
                        onClick={() => {
                          setSelectedOption("");
                          setSelectedOrder("");
                        }}
                        className="h-4 w-4 ml-2 hover:text-red-500 hover:cursor-pointer"
                      />
                    </div>
                  )}
                  <SortDropdown
                    options={sortOptions}
                    onSelect={closeSortDropdown}
                  />
                </div>
              )}
            </div>
            <div className="relative" ref={filterDropdownRef}>
              <button
                className={`group w-fit text-sm flex items-center hover:text-secondary transition ${
                  filterDropdownOpen
                    ? "text-secondary"
                    : "text-textColor-primary"
                }`}
              >
                <Filter
                  className="w-4 h-4"
                  onClick={() => {
                    setFilterDropdownOpen(!filterDropdownOpen);
                    setSortPanelOpen(false);
                  }}
                />
              </button>

              {filterDropdownOpen && (
                <div className="relative">
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-4">
                    {selectedFilters.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-4">
                        {selectedFilters.map((filter, index) => (
                          <div
                            key={index}
                            className="flex gap-1 items-center rounded-2xl border-2 px-2 py-1 bg-secondary text-white border-secondary w-fit text-sm font-medium"
                          >
                            <span>
                              {filter.label} {filter.condition}{" "}
                              {typeof filter.value === "object"
                                ? `${filter.value.start} - ${filter.value.end}`
                                : filter.value}
                            </span>

                            <X
                              onClick={() => {
                                setSelectedFilters((prevFilters) =>
                                  prevFilters.filter((_, i) => i !== index)
                                );
                              }}
                              className="h-4 w-4 ml-2 hover:text-red-500 hover:cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <FilterDropdown
                      types={filterOptions}
                      onSelect={closeFilterDropdown}
                    />
                  </div>
                </div>
              )}
            </div>
            <EllipsisVertical className="w-4 h-4 text-textColor-primary hover:text-secondary hover:cursor-pointer" />
          </div>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full mt-2 last:border-b"
      >
        {anomalies.map((anomaly, index) => (
          <AccordionItem key={index} value={`anomaly-${index}`}>
            <AccordionTrigger className="w-full flex items-center justify-between space-x-2 p-2 border-x border-t hover:bg-gray">
              <div className="flex gap-3 items-center">
                {anomalyIcons[anomaly.type]}
                <div className="flex flex-col items-start">
                  <p className="text-sm font-semibold text-textColor-primary">
                    {anomaly.type}{" "}
                    <span className="text-textColor-secondary">
                      ({anomaly.supplier})
                    </span>
                  </p>
                  <p className="text-xs text-textColor-secondary mt-1">
                    {anomaly.orderSummary}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-textColor-secondary">
                  {anomaly.detectedAt}
                </p>
                <CircleAlert
                  className={`h-5 w-5 ${severityColors[anomaly.severity]}`}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-x p-4 border-t">
              <div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-textColor-primary">
                    <span className="font-semibold">Supplier:</span>{" "}
                    {anomaly.supplier}
                  </p>
                  <p className="text-sm text-textColor-primary">
                    <span className="font-semibold">Order Summary:</span>{" "}
                    {anomaly.orderSummary}
                  </p>
                  <p className="text-sm text-textColor-primary">
                    <span className="font-semibold">Detected:</span>{" "}
                    {anomaly.detectedAt}
                  </p>
                  {/* Procurement Data File */}
                  {anomaly.procurementFile && (
                    <p className="text-sm text-textColor-primary">
                      <span className="font-semibold">Source File:</span>{" "}
                      {anomaly.procurementFile}
                    </p>
                  )}
                </div>

                {/* Explanation */}
                <div className="mt-4 text-sm text-textColor-primary">
                  <p>
                    <span className="font-semibold">Why was this flagged?</span>
                  </p>
                  <p>
                    This anomaly was detected due to{" "}
                    {anomaly.type.toLowerCase()} in recent procurement
                    transactions.
                  </p>
                </div>

                <div className="flex flex-row">
                  {/* Bar Chart for Each Anomaly */}
                  {anomaly.chartData && (
                    <div className="max-w-sm w-full">
                      <ReactECharts
                        option={{
                          xAxis: {
                            type: "category",
                            data: anomaly.chartData.categories,
                          },
                          yAxis: { type: "value" },
                          series: [
                            {
                              data: anomaly.chartData.values,
                              type: "bar",
                              itemStyle: { color: "#0077B6" },
                            },
                          ],
                          tooltip: { trigger: "axis" },
                          grid: { left: "10%", right: "10%", bottom: "15%" },
                        }}
                        style={{ height: 200 }}
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col gap-2
                    ${anomaly.chartData ? "m-6 w-full" : "mt-4 w-1/2"}`}
                  >
                    <p className="font-semibold text-sm text-textColor-primary">
                      Comment
                    </p>
                    <textarea
                      className="border border-primary p-2 rounded-lg text-sm focus:border-secondary focus:outline-none"
                      placeholder="Add a review comment..."
                    ></textarea>
                    <p className="text-xs mt-1 font-semibold text-textColor-primary">
                      Reviewed by: Maria Gondalez
                    </p>
                    <button className="text-xs flex self-start border-secondary border-2 font-medium text-textColor-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-4">
                      Mark as Reviewed
                    </button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AnomaliesAlert;
