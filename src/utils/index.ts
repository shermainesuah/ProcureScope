// Format date to "month dd, yyyy"
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Get the label for the y-axis in charts
export const getYAxisLabel = (metric: string) => {
  switch (metric) {
    case "totalSpend":
      return "Total Spend ($)";
    case "orderCount":
      return "Order Count (Units)";
    case "avgOrderValue":
      return "Average Order Value ($)";
    case "carbonEmissions":
      return "Carbon Emissions (kg CO₂)";
    case "carbonIntensity":
      return "Carbon Intensity (%)";
    default:
      return "";
  }
};
