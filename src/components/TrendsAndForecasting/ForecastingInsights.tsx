import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import ReactECharts from "echarts-for-react";
import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";
import Dropdown from "../Dropdown";
import { CallbackDataParams } from "echarts/types/dist/shared";
import type { FilterKey, FilterOption, Option } from "../../types";
import SortPanel from "../SortPanel";
import FilterPanel from "../FilterPanel";

const tabData: Option[] = [
  { value: "projectedDemands", label: "Projected Demands" },
  { value: "supplyShortage", label: "Potential Supply Shortage" },
  { value: "expectedPriceFluctuation", label: "Expected Price Fluctuation" },
];

const supplyShortageSortOptions: Option[] = [
  { label: "Product", value: "product" },
  { label: "Required Supply", value: "requiredSupply" },
  { label: "Available Supply", value: "availableSupply" },
  { label: "Supply Shortage", value: "supplyShortage" },
  { label: "Risk Level", value: "riskLevel" },
];

const supplyShortageFilterOptions: FilterKey[] = [
  "product",
  "requiredSupply",
  "availableSupply",
  "supplyShortage",
  "riskLevel",
];

const supplyShortagesData = [
  { product: "Wheat", required: 10000, available: 7000 },
  { product: "Corn", required: 8000, available: 7800 },
  { product: "Rice", required: 12000, available: 9000 },
  { product: "Soybeans", required: 15000, available: 12000 },
  { product: "Barley", required: 7000, available: 5000 },
  { product: "Oats", required: 6000, available: 5700 },
  { product: "Sugarcane", required: 20000, available: 16000 },
  { product: "Coffee Beans", required: 5000, available: 3000 },
  { product: "Cocoa", required: 4000, available: 3500 },
  { product: "Palm Oil", required: 11000, available: 8000 },
];

const productOptions: Option[] = [
  { label: "Wheat", value: "wheat" },
  { label: "Corn", value: "corn" },
  { label: "Rice", value: "rice" },
  { label: "Soybeans", value: "soybeans" },
];

const projectedDemandData = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  demand: [500, 700, 800, 1200, 1500, 1300, 1400, 1600, 1800, 2000, 1900, 2100],
};

const riskLevels = [
  {
    label: "High",
    color: "text-error",
    action: "Expedite restocking, negotiate with existing suppliers",
  },
  {
    label: "Medium",
    color: "text-warning",
    action: "Monitor supplier lead times, adjust procurement schedules",
  },
  {
    label: "Low",
    color: "text-success",
    action: "Maintain normal restocking levels",
  },
];

const expectedPriceFluctuationData = [
  100, 120, 110, 140, 130, 150, 160, 155, 165, 170, 175, 180,
];

const upperBound = expectedPriceFluctuationData.map(
  (price) => price * (1 + 5 / 100) // 5% margin for confidence range
);
const lowerBound = expectedPriceFluctuationData.map(
  (price) => price * (1 - 5 / 100) // 5% margin for confidence range
);

const ForecastingInsights = () => {
  const [
    selectedPriceFluctuationProductOption,
    setSelectedPriceFluctuationProductOption,
  ] = useState<Option>(productOptions[0]);

  const updateSupplyShortageSortOptions = (
    selectedOptions: { option: Option; order: Option }[]
  ) => {
    // These data can be used to sort the potential supply shortage table
    console.log(selectedOptions);
  };

  const updateSupplyShortageFilterOptions = (filters: FilterOption[]) => {
    // These data can be used to filter the potential supply shortage table
    console.log(filters);
  };

  const priceFluctuationChartOptions = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        formatter: (params: CallbackDataParams[]) => {
          const forecastedPrice = params.find(
            (p) => p.seriesName === "Forecasted Price"
          )?.value;
          const upper = params.find(
            (p) =>
              p.seriesName === "Confidence Range" &&
              p.data === upperBound[params[0].dataIndex]
          )?.value;
          const lower = params.find(
            (p) =>
              p.seriesName === "Confidence Range" &&
              p.data === lowerBound[params[0].dataIndex]
          )?.value;

          return `
        <strong>${params[0].name}</strong><br/>
        Forecasted Price: <strong>$${forecastedPrice}</strong><br/>
        Confidence Range: <strong>$${lower} - $${upper}</strong><br/><br/>
        Expected price may fluctuate within this range.
      `;
        },
      },
      legend: {
        data: ["Forecasted Price", "Confidence Range"],
        bottom: 0,
      },
      xAxis: {
        type: "category",
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        type: "value",
        name: "Price ($)",
      },
      series: [
        {
          name: "Forecasted Price",
          type: "line",
          data: expectedPriceFluctuationData,
          smooth: true,
          lineStyle: {
            color: "#0077B6",
          },
          itemStyle: {
            color: "#0077B6",
          },
        },
        {
          name: "Confidence Range",
          type: "line",
          data: upperBound,
          smooth: true,
          lineStyle: {
            opacity: 0,
          },
          itemStyle: {
            color: "#91bbdc",
          },
        },
        {
          name: "Confidence Range",
          type: "line",
          data: lowerBound,
          smooth: true,
          lineStyle: {
            opacity: 0,
          },
          itemStyle: {
            color: "#91bbdc",
          },
        },
      ],
    }),
    []
  );

  const getShortagePercentage = (required: number, available: number) => {
    return ((required - available) / required) * 100;
  };

  const getSupplyShortageRiskLevel = (percentage: number) => {
    if (percentage >= 30) return riskLevels[0];
    if (percentage >= 10) return riskLevels[1];
    return riskLevels[2];
  };

  const projectedDemandChart = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: projectedDemandData.months },
    yAxis: { type: "value", name: "Demand (units)" },
    series: [
      {
        name: "Projected Demand",
        type: "line",
        data: projectedDemandData.demand,
        smooth: true,
        lineStyle: { color: "#0077B6" },
        itemStyle: { color: "#0077B6" },
      },
    ],
  };

  return (
    <div>
      <Tabs className="w-full" defaultValue="projectedDemands">
        <TabsList className="flex border-b mt-4">
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-secondary focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-secondary data-[state=active]:text-secondary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-4 mx-2">
          <TabsContent value="projectedDemands">
            <p className="text-xs text-tertiary mb-4">
              Projected Demand estimates future procurement needs based on
              historical data, market trends, and seasonal variations.
            </p>
            <div className="flex flex-col md:flex-row w-full items-center">
              <div className="w-full md:w-2/3">
                <ReactECharts
                  option={projectedDemandChart}
                  style={{ height: 300 }}
                />
              </div>
              <div className="w-full md:w-1/3 bg-gray p-6 rounded-lg h-fit">
                <p className="text-sm font-semibold text-primary">
                  Key Summary
                </p>
                <ul className="text-xs font-semibold space-y-3 mt-4 text-primary">
                  <li>
                    Highest Projected Demand:
                    <span className="font-normal ml-1">May (1,500 units)</span>
                  </li>
                  <li>
                    Lowest Projected Demand:
                    <span className="font-normal ml-1">
                      January (500 units)
                    </span>
                  </li>
                  <li>
                    Trend Predictions:
                    <span className="font-normal ml-1">
                      Rising demand until May, slight dip in June
                    </span>
                  </li>
                  <li>
                    Insights:
                    <span className="font-normal ml-1">
                      Consider increasing inventory for Q2
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="supplyShortage">
            <p className="text-xs text-tertiary mb-4">
              Potential Supply Shortage reveals gaps supply gaps, helping you
              identify high-risk products and take proactive measures.
            </p>
            <div className="flex gap-4 relative justify-end mt-6 mb-3">
              <SortPanel
                options={supplyShortageSortOptions}
                onSelect={updateSupplyShortageSortOptions}
              />
              <FilterPanel
                types={supplyShortageFilterOptions}
                onSelect={updateSupplyShortageFilterOptions}
              />
            </div>
            <table className="w-full border-collapse text-sm text-primary mb-6 border">
              <thead className="bg-gray">
                <tr className="[&>th]:px-4 [&>th]:py-2 [&>th]:text-left">
                  <th>Product</th>
                  <th>Required Supply</th>
                  <th>Available Supply</th>
                  <th>Shortage</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {supplyShortagesData.map(({ product, required, available }) => {
                  const shortagePercentage = getShortagePercentage(
                    required,
                    available
                  );
                  return (
                    <tr
                      key={product}
                      className="border-b border-l border-r text-primary [&>td]:px-4 [&>td]:py-2"
                    >
                      <td>{product}</td>
                      <td>{required.toLocaleString()}</td>
                      <td>{available.toLocaleString()}</td>
                      <td>{shortagePercentage.toFixed(1)}%</td>
                      <td className="flex justify-center">
                        <CircleAlert
                          className={`h-5 w-5 ${
                            getSupplyShortageRiskLevel(shortagePercentage).color
                          }`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="bg-gray rounded-lg font-semibold p-4">
              <div className="flex flex-row gap-2">
                {riskLevels.map(({ label, color, action }) => (
                  <div className="flex gap-2 text-sm text-primary">
                    <CircleAlert className={`h-6 w-6 ${color}`} />
                    <p className="ml-2">
                      {label}:<span className="font-normal ml-1">{action}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expectedPriceFluctuation">
            <p className="text-xs text-tertiary mb-4">
              Expected price fluctuation visualizes projected price trends over
              time, with a confidence range indicating the potential
              variability.
            </p>
            <div className="flex flex-col md:flex-row w-full items-center">
              <div className="w-full md:w-2/3 mt-2">
                <Dropdown
                  value={selectedPriceFluctuationProductOption.value}
                  options={productOptions}
                  onSelect={setSelectedPriceFluctuationProductOption}
                  dropdownWidth="120px"
                />
                <ReactECharts
                  option={priceFluctuationChartOptions}
                  style={{ height: "300px" }}
                />
              </div>
              <div className="w-full md:w-1/3 bg-gray p-6 rounded-lg h-fit">
                <p className="text-sm font-semibold text-primary">
                  Key Summary
                </p>
                <ul className="text-xs text-primary font-semibold space-y-3 mt-4">
                  <li>
                    Highest Expected Price:
                    <span className="font-normal ml-1">
                      May ($120 per unit)
                    </span>
                  </li>
                  <li>
                    Lowest Expected Price:
                    <span className="font-normal ml-1">
                      January ($85 per unit)
                    </span>
                  </li>
                  <li>
                    Price Trend:
                    <span className="font-normal ml-1">
                      Gradual increase until May, followed by moderate
                      fluctuation
                    </span>
                  </li>
                  <li>
                    Insights:
                    <span className="font-normal ml-1">
                      Plan purchases ahead to avoid peak price periods
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ForecastingInsights;
