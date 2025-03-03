import React, { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import Dropdown from "../Dropdown";

type YAxisMetric = "totalSpend" | "orderCount" | "avgOrderValue";

const rawData = [
  { date: "2023-01-03", spend: 1200, orders: 5 },
  { date: "2023-02-05", spend: 2500, orders: 10 },
  { date: "2023-03-08", spend: 3200, orders: 12 },
  { date: "2023-04-12", spend: 4100, orders: 15 },
  { date: "2023-05-15", spend: 5000, orders: 18 },
  { date: "2023-06-18", spend: 6200, orders: 22 },
  { date: "2023-07-20", spend: 7000, orders: 25 },
  { date: "2023-08-22", spend: 7500, orders: 28 },
  { date: "2023-09-25", spend: 8000, orders: 30 },
  { date: "2023-10-28", spend: 9500, orders: 35 },
  { date: "2023-11-30", spend: 11000, orders: 40 },
  { date: "2023-12-26", spend: 12000, orders: 45 },

  { date: "2024-01-02", spend: 1400, orders: 6 },
  { date: "2024-02-07", spend: 2800, orders: 11 },
  { date: "2024-03-10", spend: 3600, orders: 14 },
  { date: "2024-04-14", spend: 4600, orders: 16 },
  { date: "2024-05-17", spend: 5500, orders: 20 },
  { date: "2024-06-19", spend: 7000, orders: 25 },
  { date: "2024-07-21", spend: 7800, orders: 27 },
  { date: "2024-08-24", spend: 8500, orders: 30 },
  { date: "2024-09-26", spend: 9000, orders: 32 },
  { date: "2024-10-29", spend: 10500, orders: 38 },
  { date: "2024-11-27", spend: 12000, orders: 42 },
  { date: "2024-12-31", spend: 13000, orders: 48 },
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

    grouped[month][year] = value;
  });

  return grouped;
};

const yAxisMetricOptions = [
  { label: "Total Spend", value: "totalSpend" },
  { label: "Order Count", value: "orderCount" },
  { label: "Avg Order Value", value: "avgOrderValue" },
];

const YoyComparison: React.FC = () => {
  const [yAxisMetric, setYAxisMetric] = useState<YAxisMetric>("totalSpend");

  const processedData = useMemo(
    () => aggregateYoYData(yAxisMetric),
    [yAxisMetric]
  );

  const years = useMemo(
    () => [...new Set(rawData.map((d) => new Date(d.date).getFullYear()))],
    []
  );

  const xAxisLabels = useMemo(
    () =>
      Object.keys(processedData).sort(
        (a, b) =>
          new Date(`2000-${a}`).getTime() - new Date(`2000-${b}`).getTime()
      ),
    [processedData]
  );

  const option = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      legend: { data: years.map((y) => y.toString()) },
      xAxis: { type: "category", data: xAxisLabels },
      yAxis: {
        type: "value",
        name: yAxisMetric.replace(/([A-Z])/g, " $1").trim(),
      },
      series: years.map((year) => ({
        name: year.toString(),
        type: "line",
        data: xAxisLabels.map((key) => processedData[key]?.[year] || 0),
      })),
    }),
    [processedData, years, xAxisLabels, yAxisMetric]
  );

  const handleYAxisMetricChange = (metric: string) => {
    setYAxisMetric(
      yAxisMetricOptions.find((o) => o.label === metric)!.value as YAxisMetric
    );
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
    </div>
  );
};

export default YoyComparison;
