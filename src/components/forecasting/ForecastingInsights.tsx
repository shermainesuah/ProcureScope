import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpNarrowWide,
  CircleAlert,
  Filter,
  X,
} from "lucide-react";
import FilterDropdown, { FilterOption } from "../Filter";
import SortDropdown from "../SortDropdown";
import Dropdown from "../Dropdown";
import { CallbackDataParams } from "echarts/types/dist/shared";

const ForecastingInsights: React.FC = () => {
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

  const productOptions = [
    "Wheat",
    "Rice",
    "Corn",
    "Soybeans",
    "Barley",
    "Oats",
    "Sugarcane",
    "Coffee Beans",
  ];

  const sortOptions = [
    "Product",
    "Required Supply",
    "Available Supply",
    "Shortage",
    "Risk Level",
    "Actions",
  ];
  const filterOptions = [
    "product",
    "requiredSupply",
    "availableSupply",
    "supplyShortage",
    "riskLevel",
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

  // Mock data for the chart
  const data = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    demand: [500, 700, 800, 1200, 1500, 1300], // Sample demand data
  };

  const forecastedPrices = [
    100, 120, 110, 140, 130, 150, 160, 155, 165, 170, 175, 180,
  ];
  const margin = 5; // 5% margin

  const upperBound = forecastedPrices.map(
    (price) => price * (1 + margin / 100)
  );
  const lowerBound = forecastedPrices.map(
    (price) => price * (1 - margin / 100)
  );

  const option = {
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
      axisLabel: {
        formatter: "$ {value}",
      },
    },
    series: [
      {
        name: "Forecasted Price",
        type: "line",
        data: forecastedPrices,
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
  };

  const supplyShortages = [
    { product: "Wheat", required: 10000, available: 7000 }, // High shortage
    { product: "Corn", required: 8000, available: 7800 }, // Low shortage
    { product: "Rice", required: 12000, available: 9000 }, // Medium shortage
    { product: "Soybeans", required: 15000, available: 12000 }, // Medium shortage
    { product: "Barley", required: 7000, available: 5000 }, // High shortage
    { product: "Oats", required: 6000, available: 5700 }, // Low shortage
    { product: "Sugarcane", required: 20000, available: 16000 }, // Medium shortage
    { product: "Coffee Beans", required: 5000, available: 3000 }, // High shortage
    { product: "Cocoa", required: 4000, available: 3500 }, // Low shortage
    { product: "Palm Oil", required: 11000, available: 8000 }, // Medium shortage
  ];

  const getShortagePercentage = (required: number, available: number) => {
    return ((required - available) / required) * 100;
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

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 30) return riskLevels[0];
    if (percentage >= 10) return riskLevels[1];
    return riskLevels[2];
  };

  // ECharts option configuration
  const chartOptions = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: data.months },
    yAxis: { type: "value", name: "Demand (units)" },
    series: [
      {
        name: "Projected Demand",
        type: "line",
        data: data.demand,
        smooth: true,
        lineStyle: { color: "#0077B6", width: 2 },
        itemStyle: { color: "#0077B6" },
      },
    ],
  };

  return (
    <div>
      <Tabs className="w-full" defaultValue="projectedDemands">
        <TabsList className="flex border-b mt-4">
          <TabsTrigger
            value="projectedDemands"
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-secondary focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-secondary data-[state=active]:text-secondary"
          >
            Projected Demands
          </TabsTrigger>
          <TabsTrigger
            value="supplyShortage"
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-secondary  focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-secondary data-[state=active]:text-secondary"
          >
            Potential Supply Shortage
          </TabsTrigger>
          <TabsTrigger
            value="expectedPriceFluctuation"
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-secondary  focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-secondary data-[state=active]:text-secondary"
          >
            Expected Price Fluctuation
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 mx-2">
          <TabsContent value="projectedDemands">
            <p className="text-xs text-gray-500 mb-4">
              Projected Demand estimates future procurement needs based on
              historical data, market trends, and seasonal variations.
            </p>
            <div className="flex flex-col md:flex-row w-full items-center">
              <div className="w-full md:w-2/3">
                <ReactECharts option={chartOptions} style={{ height: 300 }} />
              </div>

              {/* Summary Section */}
              <div className="w-full md:w-1/3 bg-gray p-6 rounded-lg h-fit">
                <p className="text-sm font-semibold text-primary">
                  Key Summary
                </p>
                <ul className="text-xs text-gray-600 font-semibold space-y-3 mt-4">
                  <li className="text-primary">
                    Highest Projected Demand:{" "}
                    <span className="font-normal">May (1,500 units)</span>
                  </li>
                  <li className="text-primary">
                    Lowest Projected Demand:{" "}
                    <span className="font-normal">January (500 units)</span>
                  </li>
                  <li className="text-primary">
                    Trend Predictions:{" "}
                    <span className="font-normal">
                      Rising demand until May, slight dip in June
                    </span>
                  </li>
                  <li className="text-primary">
                    Insights:{" "}
                    <span className="font-normal">
                      Consider increasing inventory for Q2
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="supplyShortage">
            <p className="text-xs text-gray-500 mb-4">
              Potential Supply Shortage reveals gaps supply gaps, helping you
              identify high-risk products and take proactive measures.
            </p>
            <div className="flex gap-4 relative justify-end mb-4">
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
            </div>
            <table className="w-full border-collapse text-sm text-textColor-primary mb-6 border">
              <thead className="bg-gray">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Required Supply</th>
                  <th className="px-4 py-2 text-left">Available Supply</th>
                  <th className="px-4 py-2 text-left">Shortage (%)</th>
                  <th className="px-4 py-2 text-left">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {supplyShortages.map(({ product, required, available }) => {
                  const shortagePercentage = getShortagePercentage(
                    required,
                    available
                  );
                  const { color } = getRiskLevel(shortagePercentage);

                  return (
                    <tr
                      key={product}
                      className="border-b border-l border-r text-textColor-primary"
                    >
                      <td className="px-4 py-2">{product}</td>
                      <td className="px-4 py-2">{required.toLocaleString()}</td>
                      <td className="px-4 py-2">
                        {available.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        {shortagePercentage.toFixed(1)}%
                      </td>
                      <td className="px-4 py-2 flex justify-center">
                        <CircleAlert className={`h-5 w-5 ${color}`} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="bg-gray rounded-lg text-sm font-semibold p-4">
              <div className="flex flex-row gap-2">
                {riskLevels.map(({ label, color, action }) => (
                  <div className="flex gap-2 text-sm">
                    <CircleAlert className={`h-6 w-6 ${color}`} />
                    <p className="ml-2">
                      {label}: <span className="font-normal">{action}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expectedPriceFluctuation">
            <p className="text-xs text-gray-500 mb-4">
              Expected price fluctuation visualizes projected price trends over
              time, with a confidence range indicating the potential
              variability.
            </p>

            <div className="flex flex-col md:flex-row w-full items-center">
              <div className="w-full md:w-2/3 mt-2">
                <Dropdown
                  selectedDropdownOption="Wheat"
                  options={productOptions}
                  onSelect={(option) => console.log(option)}
                />
                <ReactECharts option={option} style={{ height: "300px" }} />
              </div>

              <div className="w-full md:w-1/3 bg-gray p-6 rounded-lg h-fit">
                <p className="text-sm font-semibold text-primary">
                  Key Summary
                </p>
                <ul className="text-xs text-gray-600 font-semibold space-y-3 mt-4">
                  <li className="text-primary">
                    Highest Expected Price:{" "}
                    <span className="font-normal">May ($120 per unit)</span>
                  </li>
                  <li className="text-primary">
                    Lowest Expected Price:{" "}
                    <span className="font-normal">January ($85 per unit)</span>
                  </li>
                  <li className="text-primary">
                    Price Trend:{" "}
                    <span className="font-normal">
                      Gradual increase until May, followed by moderate
                      fluctuation
                    </span>
                  </li>
                  <li className="text-primary">
                    Insights:{" "}
                    <span className="font-normal">
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
