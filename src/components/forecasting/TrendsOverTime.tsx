import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import Dropdown from "../Dropdown";

type xAxisView = "weekly" | "monthly" | "quarterly";
type yAxisMetric = "totalSpend" | "orderCount" | "avgOrderValue";

const TrendsOverTime: React.FC = () => {
  const [xAxisView, setXAxisView] = useState<xAxisView>("monthly");
  const [yAxisMetric, setYAxisMetric] = useState<yAxisMetric>("totalSpend");

  const yAxisMetricOptions = [
    { label: "Total Spend", value: "totalSpend" },
    { label: "Order Count", value: "orderCount" },
    { label: "Avg Order Value", value: "avgOrderValue" },
  ];

  const xAxisViewOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
  ];

  const rawData = [
    // Q1 - Steady Growth
    { date: "2024-01-01", spend: 120, orders: 3 },
    { date: "2024-01-08", spend: 180, orders: 4 },
    { date: "2024-01-15", spend: 250, orders: 6 },
    { date: "2024-01-22", spend: 300, orders: 7 },
    { date: "2024-02-01", spend: 350, orders: 8 },
    { date: "2024-02-08", spend: 400, orders: 9 },
    { date: "2024-02-15", spend: 420, orders: 10 },
    { date: "2024-02-22", spend: 480, orders: 12 },
    { date: "2024-03-01", spend: 500, orders: 14 },
    { date: "2024-03-08", spend: 550, orders: 15 },

    // Q2 - High procurement season (spike in spending and orders)
    { date: "2024-04-01", spend: 900, orders: 25 },
    { date: "2024-04-08", spend: 950, orders: 27 },
    { date: "2024-04-15", spend: 1000, orders: 30 },
    { date: "2024-04-22", spend: 1100, orders: 33 },
    { date: "2024-05-01", spend: 1200, orders: 36 },
    { date: "2024-05-08", spend: 1250, orders: 38 },
    { date: "2024-05-15", spend: 1300, orders: 40 },
    { date: "2024-05-22", spend: 1350, orders: 42 },

    // Q3 - Slowdown (spending dips)
    { date: "2024-06-01", spend: 1000, orders: 32 },
    { date: "2024-06-08", spend: 900, orders: 30 },
    { date: "2024-06-15", spend: 850, orders: 28 },
    { date: "2024-06-22", spend: 800, orders: 26 },
    { date: "2024-07-01", spend: 750, orders: 24 },
    { date: "2024-07-08", spend: 700, orders: 22 },
    { date: "2024-07-15", spend: 680, orders: 21 },
    { date: "2024-07-22", spend: 650, orders: 20 },

    // Q4 - End-of-year spike (spending and orders rise again)
    { date: "2024-10-01", spend: 1100, orders: 35 },
    { date: "2024-10-08", spend: 1200, orders: 38 },
    { date: "2024-10-15", spend: 1250, orders: 40 },
    { date: "2024-10-22", spend: 1300, orders: 42 },
    { date: "2024-11-01", spend: 1400, orders: 45 },
    { date: "2024-11-08", spend: 1450, orders: 47 },
    { date: "2024-11-15", spend: 1500, orders: 50 },
    { date: "2024-11-22", spend: 1600, orders: 55 },
  ];

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const getQuarter = (date: Date) => {
    return Math.ceil((date.getMonth() + 1) / 3);
  };

  const aggregateData = () => {
    const grouped: Record<string, { totalSpend: number; orderCount: number }> =
      {};

    rawData.forEach((entry) => {
      const date = new Date(entry.date);
      let key = "";
      if (xAxisView === "weekly") {
        key = `Week ${getWeekNumber(date)}-${date.getFullYear()}`;
      } else if (xAxisView === "monthly") {
        key = `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
      } else if (xAxisView === "quarterly") {
        key = `Q${getQuarter(date)}-${date.getFullYear()}`;
      }

      if (!grouped[key]) {
        grouped[key] = { totalSpend: 0, orderCount: 0 };
      }

      grouped[key].totalSpend += entry.spend;
      grouped[key].orderCount += entry.orders;
    });

    return Object.entries(grouped).map(([key, value]) => ({
      key,
      totalSpend: value.totalSpend,
      orderCount: value.orderCount,
      avgOrderValue:
        value.orderCount > 0 ? value.totalSpend / value.orderCount : 0,
    }));
  };

  const processedData = aggregateData();

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: processedData.map((d) => d.key),
    },
    yAxis: {
      type: "value",
      name:
        yAxisMetric === "totalSpend"
          ? "Total Spend ($)"
          : yAxisMetric === "orderCount"
          ? "Number of Orders"
          : "Avg Order Value ($)",
    },
    series: [
      {
        name:
          yAxisMetric === "totalSpend"
            ? "Total Spend"
            : yAxisMetric === "orderCount"
            ? "Order Count"
            : "Avg Order Value",
        type: "bar",
        itemStyle: { color: "#0077B6" },
        data: processedData.map((d) => d[yAxisMetric]),
      },
    ],
  };

  const handleYAxisMetricChange = (metric: string) => {
    setYAxisMetric(
      yAxisMetricOptions.find((o) => o.label === metric)!.value as yAxisMetric
    );
  };

  const handleXAxisMetricChange = (metric: string) => {
    setXAxisView(
      xAxisViewOptions.find((o) => o.label === metric)!.value as xAxisView
    );
  };

  return (
    <div>
      <div className="mb-4 flex gap-4 justify-end">
        <Dropdown
          options={["Total Spend", "Order Count", "Avg Order Value"]}
          selectedDropdownOption="Total Spend"
          onSelect={handleYAxisMetricChange}
        />
        <Dropdown
          options={["Weekly", "Monthly", "Quarterly"]}
          selectedDropdownOption="Monthly"
          onSelect={handleXAxisMetricChange}
        />
      </div>
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
};

export default TrendsOverTime;
