import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import Dropdown from "../Dropdown";
import type { Option } from "../../types";
import { getISOWeek, getQuarter } from "date-fns";
import { CallbackDataParams } from "echarts/types/dist/shared";

const yAxisMetricOptions: Option[] = [
  { label: "Total Spend", value: "totalSpend" },
  { label: "Order Count", value: "orderCount" },
  { label: "Avg Order Value", value: "avgOrderValue" },
];

const xAxisViewOptions: Option[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
];

const rawData = [
  { date: "2024-01-01", spend: 800, orders: 12 },
  { date: "2024-02-01", spend: 1200, orders: 18 },
  { date: "2024-03-01", spend: 950, orders: 15 },
  { date: "2024-04-01", spend: 1350, orders: 22 },
  { date: "2024-05-01", spend: 1600, orders: 28 },
  { date: "2024-06-01", spend: 1550, orders: 25 },
  { date: "2024-07-01", spend: 1800, orders: 30 },
  { date: "2024-08-01", spend: 1400, orders: 24 },
  { date: "2024-09-01", spend: 1900, orders: 32 },
  { date: "2024-10-01", spend: 1750, orders: 29 },
  { date: "2024-11-01", spend: 2400, orders: 40 },
  { date: "2024-12-01", spend: 2600, orders: 45 },

  { date: "2025-01-01", spend: 1300, orders: 20 },
  { date: "2025-02-01", spend: 1700, orders: 27 },
  { date: "2025-03-01", spend: 1450, orders: 23 },
  { date: "2025-04-01", spend: 2100, orders: 35 },
  { date: "2025-05-01", spend: 1850, orders: 30 },
  { date: "2025-06-01", spend: 2200, orders: 38 },
  { date: "2025-07-01", spend: 2000, orders: 34 },
  { date: "2025-08-01", spend: 2400, orders: 42 },
  { date: "2025-09-01", spend: 2100, orders: 37 },
  { date: "2025-10-01", spend: 2700, orders: 50 },
  { date: "2025-11-01", spend: 3300, orders: 65 },
  { date: "2025-12-01", spend: 3100, orders: 60 },
];

const TrendsOverTime = () => {
  const [selectedXAxis, setSelectedXAxis] = useState<Option>(
    xAxisViewOptions[0]
  );
  const [selectedYAxis, setSelectedYAxis] = useState<Option>(
    yAxisMetricOptions[0]
  );

  const processedData = useMemo(() => {
    const grouped: Record<string, { totalSpend: number; orderCount: number }> =
      {};

    rawData.forEach(({ date, spend, orders }) => {
      const parsedDate = new Date(date);
      let key = "";

      switch (selectedXAxis.value) {
        case "weekly":
          key = `Week ${getISOWeek(parsedDate)}-${parsedDate.getFullYear()}`;
          break;
        case "monthly":
          key = parsedDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          break;
        case "quarterly":
          key = `Q${getQuarter(parsedDate)}-${parsedDate.getFullYear()}`;
          break;
      }

      if (!grouped[key]) grouped[key] = { totalSpend: 0, orderCount: 0 };
      grouped[key].totalSpend += spend;
      grouped[key].orderCount += orders;
    });

    return Object.entries(grouped).map(([key, { totalSpend, orderCount }]) => ({
      key,
      totalSpend,
      orderCount,
      avgOrderValue: totalSpend / orderCount,
    }));
  }, [selectedXAxis]);

  const chartOptions = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        formatter: (params: CallbackDataParams[]) => {
          return params
            .map((p) => {
              let value = p.value;
              let desc = "";
              if (selectedYAxis.value === "avgOrderValue") {
                value = (Number(value) || 0).toFixed(2);
                desc = "AOV measures the average amount spent per order.";
              }
              return `<strong>${p.marker} ${p.seriesName}</strong>: ${value}${
                desc && `<br/></br>${desc}`
              }`;
            })
            .join("<br/>");
        },
      },
      xAxis: { type: "category", data: processedData.map((d) => d.key) },
      yAxis: {
        type: "value",
        name: (() => {
          if (selectedYAxis.value === "totalSpend") return "Total Spend ($)";
          if (selectedYAxis.value === "avgOrderValue")
            return "Avg Order Value ($)";
          return "Order Count (Units)";
        })(),
      },
      series: [
        {
          name: selectedYAxis.label,
          type: "bar",
          itemStyle: { color: "#0077B6" },
          data: processedData.map(
            (d) => d[selectedYAxis.value as keyof typeof d]
          ),
        },
      ],
    }),
    [processedData, selectedYAxis]
  );

  return (
    <div>
      <div className="mb-4 flex gap-4 justify-end">
        <Dropdown
          options={yAxisMetricOptions}
          value={selectedYAxis.value}
          onSelect={setSelectedYAxis}
          dropdownWidth="160px"
        />
        <Dropdown
          options={xAxisViewOptions}
          value={selectedXAxis.value}
          onSelect={setSelectedXAxis}
          dropdownWidth="160px"
        />
      </div>
      <ReactECharts option={chartOptions} style={{ height: 400 }} />
    </div>
  );
};

export default TrendsOverTime;
