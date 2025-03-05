import React, { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import Dropdown from "../Dropdown";
import { CallbackDataParams } from "echarts/types/dist/shared";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

type YAxisMetric =
  | "totalSpend"
  | "orderCount"
  | "avgOrderValue"
  | "carbonEmissions"
  | "carbonIntensity";

const rawData = [
  { date: "2023-01-03", spend: 1200, orders: 5, carbonEmissions: 500 },
  { date: "2023-02-05", spend: 2500, orders: 10, carbonEmissions: 800 },
  { date: "2023-03-08", spend: 3200, orders: 12, carbonEmissions: 950 },
  { date: "2023-04-12", spend: 4100, orders: 15, carbonEmissions: 1100 },
  { date: "2023-05-15", spend: 5000, orders: 18, carbonEmissions: 1250 },
  { date: "2023-06-18", spend: 6200, orders: 22, carbonEmissions: 1400 },
  { date: "2023-07-20", spend: 7000, orders: 25, carbonEmissions: 1550 },
  { date: "2023-08-22", spend: 7500, orders: 28, carbonEmissions: 1650 },
  { date: "2023-09-25", spend: 8000, orders: 30, carbonEmissions: 1750 },
  { date: "2023-10-28", spend: 9500, orders: 35, carbonEmissions: 2000 },
  { date: "2023-11-30", spend: 11000, orders: 40, carbonEmissions: 2200 },
  { date: "2023-12-26", spend: 12000, orders: 45, carbonEmissions: 2400 },

  { date: "2024-01-02", spend: 1400, orders: 6, carbonEmissions: 480 },
  { date: "2024-02-07", spend: 2800, orders: 11, carbonEmissions: 750 },
  { date: "2024-03-10", spend: 3600, orders: 14, carbonEmissions: 900 },
  { date: "2024-04-14", spend: 4600, orders: 16, carbonEmissions: 1050 },
  { date: "2024-05-17", spend: 5500, orders: 20, carbonEmissions: 1200 },
  { date: "2024-06-19", spend: 7000, orders: 25, carbonEmissions: 1350 },
  { date: "2024-07-21", spend: 7800, orders: 27, carbonEmissions: 1500 },
  { date: "2024-08-24", spend: 8500, orders: 30, carbonEmissions: 1600 },
  { date: "2024-09-26", spend: 9000, orders: 32, carbonEmissions: 1700 },
  { date: "2024-10-29", spend: 10500, orders: 38, carbonEmissions: 1900 },
  { date: "2024-11-27", spend: 12000, orders: 42, carbonEmissions: 2100 },
  { date: "2024-12-31", spend: 13000, orders: 48, carbonEmissions: 2300 },
];

const aggregateYoYData = (metric: YAxisMetric) => {
  const grouped: Record<string, Record<number, number>> = {};

  rawData.forEach((entry) => {
    const parsedDate = new Date(entry.date);
    const month = parsedDate.toLocaleString("default", { month: "short" });
    const year = parsedDate.getFullYear();

    if (!grouped[month]) {
      grouped[month] = {};
    }

    let value = 0;
    if (metric === "totalSpend") value = entry.spend;
    if (metric === "orderCount") value = entry.orders;
    if (metric === "avgOrderValue") value = entry.spend / entry.orders || 0;
    if (metric === "carbonEmissions") value = entry.carbonEmissions;
    if (metric === "carbonIntensity")
      value = (entry.carbonEmissions / entry.spend) * 100;

    grouped[month][year] = value;
  });

  return grouped;
};

const yAxisMetricOptions = [
  { label: "Total Spend", value: "totalSpend" },
  { label: "Order Count", value: "orderCount" },
  { label: "Avg Order Value", value: "avgOrderValue" },
  { label: "Carbon Emissions", value: "carbonEmissions" },
  { label: "Carbon Intensity", value: "carbonIntensity" },
];

const YoyComparison: React.FC = () => {
  const [isChartCardOpen, setIsChartCardOpen] = useState(false);
  const [yAxisMetric, setYAxisMetric] = useState<YAxisMetric>("totalSpend");

  const processedData = useMemo(
    () => aggregateYoYData(yAxisMetric),
    [yAxisMetric]
  );

  const years = useMemo(
    () => [...new Set(rawData.map((d) => new Date(d.date).getFullYear()))],
    []
  );

  const getLineColor = (year: number) => {
    switch (year) {
      case 2023:
        return "#91bbdc";
      case 2024:
        return "#0077B6";
      default:
        return "#000000";
    }
  };

  const xAxisLabels = useMemo(
    () =>
      Object.keys(processedData).sort(
        (a, b) =>
          new Date(`2000-${a}`).getTime() - new Date(`2000-${b}`).getTime()
      ),
    [processedData]
  );

  const generateTooltip = (yAxisMetric: string) => {
    return (params: CallbackDataParams[]) => {
      if (!params.length) return "";

      let content = `<strong>${params[0].name}</strong><br/>`;

      params.forEach((item) => {
        content += `<strong>${item.seriesName}</strong>: ${item.value}`;

        if (yAxisMetric === "carbonEmissions") {
          content += ` kg CO₂<br/>`;
        } else if (yAxisMetric === "carbonIntensity") {
          content += ` kg CO₂ per unit<br/>`;
        } else {
          content += `<br/>`;
        }
      });

      if (yAxisMetric === "carbonEmissions") {
        content += `<br/>This shows the total amount of CO₂ released.<br/>`;
      } else if (yAxisMetric === "carbonIntensity") {
        content += `<br/>This measures how much emission is produced per unit of output.<br/>`;
      }

      return content;
    };
  };

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        formatter: generateTooltip(yAxisMetric),
      },
      legend: { data: years.map((y) => y.toString()) },
      xAxis: { type: "category", data: xAxisLabels },
      yAxis: {
        type: "value",
        name:
          yAxisMetric === "totalSpend"
            ? "Total Spend ($)"
            : yAxisMetric === "orderCount"
            ? "Number of Orders"
            : yAxisMetric === "avgOrderValue"
            ? "Avg Order Value ($)"
            : yAxisMetric === "carbonEmissions"
            ? "Carbon Emissions (kg)"
            : "Carbon Intensity (%)",
      },
      series: years.map((year) => ({
        name: year.toString(),
        type: "line",
        data: xAxisLabels.map((key) => processedData[key]?.[year] || 0),
        itemStyle: {
          color: getLineColor(year),
        },
      })),
    }),
    [processedData, years, xAxisLabels, yAxisMetric]
  );

  const handleYAxisMetricChange = (metric: string) => {
    setYAxisMetric(
      yAxisMetricOptions.find((o) => o.label === metric)!.value as YAxisMetric
    );
  };

  const getChartDescription = (yAxisMetric: string) => {
    switch (yAxisMetric) {
      case "carbonEmissions":
        return (
          <ul className="list-disc list-inside text-sm text-textColor-secondary px-4">
            <li className="font-medium text-textColor-primary">
              Carbon Emissions:{" "}
              <span className="font-normal">
                Total CO₂ emissions from procurement, transport, and production.
                Lower values mean a more sustainable supply chain.
              </span>
            </li>
            <li className="font-medium text-textColor-primary">
              Why it matters:{" "}
              <span className="font-normal">
                Helps track sustainability goals, optimize logistics, and reduce
                environmental impact in food production.
              </span>
            </li>
          </ul>
        );

      case "carbonIntensity":
        return (
          <ul className="list-disc list-inside text-sm text-textColor-secondary px-4">
            <li className="font-medium text-textColor-primary">
              Carbon Intensity:{" "}
              <span className="font-normal">
                Measures CO₂ emissions per unit of food or agricultural product
                sourced. Lower values indicate higher efficiency.
              </span>
            </li>
            <li className="font-medium text-textColor-primary">
              Why it matters:{" "}
              <span className="font-normal">
                Helps identify more sustainable sourcing strategies, optimize
                logistics, and reduce overall environmental impact.
              </span>
            </li>
          </ul>
        );

      case "totalSpend":
        return (
          <ul className="list-disc list-inside text-sm text-textColor-secondary px-4">
            <li className="font-medium text-textColor-primary">
              Total Spend:{" "}
              <span className="font-normal">
                The total cost of procurement, including raw materials,
                transportation, and storage.
              </span>
            </li>
            <li className="font-medium text-textColor-primary">
              Why it matters:{" "}
              <span className="font-normal">
                Helps track budget efficiency, identify cost-saving
                opportunities, and negotiate better supplier contracts.
              </span>
            </li>
          </ul>
        );

      case "orderCount":
        return (
          <ul className="list-disc list-inside text-sm text-textColor-secondary px-4">
            <li className="font-medium text-textColor-primary">
              Order Count:{" "}
              <span className="font-normal">
                Number of procurement orders placed over a given period.
              </span>
            </li>
            <li className="font-medium text-textColor-primary">
              Why it matters:{" "}
              <span className="font-normal">
                Helps track supplier reliability, demand fluctuations, and
                procurement efficiency in food supply chains.
              </span>
            </li>
          </ul>
        );

      case "avgOrderValue":
        return (
          <ul className="list-disc list-inside text-sm text-textColor-secondary px-4">
            <li className="font-medium text-textColor-primary">
              Average Order Value (AOV):{" "}
              <span className="font-normal">
                The average cost per procurement order.
              </span>
            </li>
            <li className="font-medium text-textColor-primary">
              Why it matters:{" "}
              <span className="font-normal">
                Helps optimize bulk purchasing decisions, supplier negotiations,
                and cost efficiency in food and agriculture procurement.
              </span>
            </li>
          </ul>
        );

      default:
        return (
          <p className="text-sm text-textColor-secondary px-4">
            No data available.
          </p>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Dropdown
          options={yAxisMetricOptions.map((o) => o.label)}
          selectedDropdownOption={
            yAxisMetricOptions.find((o) => o.value === yAxisMetric)?.label ||
            "Total Spend"
          }
          onSelect={handleYAxisMetricChange}
        />
      </div>
      <ReactECharts className="mt-6" option={option} style={{ height: 400 }} />
      <div className="relative">
        <div
          className={`group flex items-center bg-gray border-gray rounded-lg gap-2 p-3 hover:cursor-pointer relative z-10 ${
            isChartCardOpen ? "rounded-b-none" : ""
          }`}
          onClick={() => setIsChartCardOpen(!isChartCardOpen)}
        >
          <BookOpen className="h-4 w-4 text-primary group-hover:text-secondary" />
          <p className="text-sm font-semibold text-textColor-primary">
            How to read this chart?
          </p>
        </div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={
            isChartCardOpen ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`absolute w-full bg-white shadow-md top-8 px-4 pt-6 pb-4 border border-gray ${
            isChartCardOpen ? "block" : "hidden"
          }`}
        >
          {getChartDescription(yAxisMetric)}
        </motion.div>
      </div>
    </div>
  );
};

export default YoyComparison;
