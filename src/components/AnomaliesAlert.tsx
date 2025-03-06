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
  EllipsisVertical,
} from "lucide-react";
import SortPanel from "./SortPanel";
import type { FilterKey, FilterOption, Option } from "../types";
import FilterPanel from "./FilterPanel";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const LazyReactECharts = lazy(() => import("echarts-for-react"));

type SeverityLevel = "High" | "Moderate" | "Low";

type AnomalyType =
  | "Unusual Purchase Volume"
  | "Price Spike"
  | "Potential Fraud";

interface anomalyData {
  type: AnomalyType;
  supplier: string;
  orderSummary: string;
  severity: SeverityLevel;
  detectedAt: string;
  procurementFile: string;
  chartData?: { categories: string[]; values: number[] };
}

const anomalyIcons = {
  "Unusual Purchase Volume": <TrendingUp className="h-4 w-4 text-secondary" />,
  "Price Spike": <DollarSign className="h-4 w-4 text-secondary" />,
  "Potential Fraud": <ShieldOff className="h-4 w-4 text-secondary" />,
};

const severityColors = {
  High: "text-error",
  Moderate: "text-warning",
  Low: "text-success",
};

const anomaliesData: anomalyData[] = [
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

const sortOptions = [
  { label: "Anomaly Type", value: "anomalyType" },
  { label: "Supplier", value: "supplier" },
  { label: "Severity", value: "severity" },
  { label: "Date", value: "date" },
];
const filterOptions: FilterKey[] = [
  "severity",
  "anomalyType",
  "supplier",
  "reviewStatus",
  "date",
];

const AnomaliesAlert = () => {
  const updateSortOptions = (
    selectedOptions: { option: Option; order: Option }[]
  ) => {
    // These data can be used to sort anomalies records
    console.log(selectedOptions);
  };

  const updateFilterOptions = (filters: FilterOption[]) => {
    // These data can be used to filter the anomalies records
    console.log(filters);
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-end justify-between mb-3">
        <h2>Anomalies Alert</h2>
        <div>
          <div className="flex gap-3 items-center">
            <SortPanel options={sortOptions} onSelect={updateSortOptions} />
            <FilterPanel types={filterOptions} onSelect={updateFilterOptions} />
            <EllipsisVertical className="w-5 h-5 text-primary hover:text-tertiary hover:cursor-pointer" />
          </div>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full mt-2 last:border-b"
      >
        {anomaliesData.map((anomaly, index) => (
          <AccordionItem key={index} value={`anomaly-${index}`}>
            <AccordionTrigger className="w-full flex items-center justify-between space-x-2 p-3 border-x border-t hover:bg-gray">
              <div className="flex gap-3 items-center">
                {anomalyIcons[anomaly.type]}
                <div className="flex flex-col items-start">
                  <p className="text-sm font-semibold text-primary">
                    {anomaly.type}
                    <span className="ml-1 text-tertiary">
                      ({anomaly.supplier})
                    </span>
                  </p>
                  <p className="text-xs text-tertiary mt-1">
                    {anomaly.orderSummary}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-tertiary">{anomaly.detectedAt}</p>
                <CircleAlert
                  className={`h-5 w-5 ${severityColors[anomaly.severity]}`}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-x p-3 border-t">
              <div>
                <div className="flex flex-col gap-1 text-sm text-primary">
                  <p>
                    <span className="font-semibold mr-1">Supplier:</span>
                    {anomaly.supplier}
                  </p>
                  <p>
                    <span className="font-semibold mr-1">Order Summary:</span>
                    {anomaly.orderSummary}
                  </p>
                  <p>
                    <span className="font-semibold mr-1">Detected:</span>
                    {anomaly.detectedAt}
                  </p>
                  {anomaly.procurementFile && (
                    <span className="font-semibold">
                      Source File:
                      <Link
                        className="hover:underline font-normal ml-1"
                        to={`/files/${anomaly.procurementFile}`}
                      >
                        {anomaly.procurementFile}
                      </Link>
                    </span>
                  )}
                </div>
                <div className="mt-4 text-sm text-primary">
                  <p>
                    <span className="font-semibold">Why was this flagged?</span>
                  </p>
                  <p>
                    {`This anomaly was detected due to
                    ${anomaly.type.toLowerCase()} in recent procurement
                    transactions.`}
                  </p>
                </div>
                <div className="flex flex-row">
                  {anomaly.chartData && (
                    <div className="max-w-sm w-full">
                      <Suspense fallback={<div>Loading chart...</div>}>
                        <LazyReactECharts
                          option={{
                            xAxis: {
                              type: "category",
                              data: anomaly.chartData.categories,
                            },
                            yAxis: {
                              type: "value",
                              name:
                                anomaly.type === "Price Spike" ? "$" : "Units",
                            },
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
                      </Suspense>
                    </div>
                  )}
                  <div
                    className={`flex flex-col gap-2
                    ${anomaly.chartData ? "m-6 w-full" : "mt-4 w-1/2"}`}
                  >
                    <p className="font-semibold text-sm text-primary">
                      Comment
                    </p>
                    <textarea
                      className="border border-primary p-2 rounded-lg text-sm focus:border-secondary focus:outline-none"
                      placeholder="Add a review comment..."
                    ></textarea>
                    <p className="text-xs mt-1 font-semibold text-primary">
                      Reviewed by: Maria Gondalez
                    </p>
                    <button className="text-xs flex self-start border-secondary border-2 font-medium text-primary px-2 py-1 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mt-4">
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
