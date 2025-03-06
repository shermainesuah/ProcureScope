import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import TrendsOverTime from "./TrendsAndForecasting/TrendsOverTime";
import YoyComparison from "./TrendsAndForecasting/YoyComparison";
import ForecastingInsights from "./TrendsAndForecasting/ForecastingInsights";

const ProcurementTrendsForecasting: React.FC = () => {
  const trendsForecastingPanels = [
    {
      title: "Procurement Activities Over Time",
    },
    {
      title: "Year-over-Year Comparison (Y-o-Y)",
    },
    {
      title: "Forecasting & Predictive Insights",
    },
  ];
  return (
    <div>
      <h2 className="mb-4">Procurement Trends & Forecasting</h2>
      <Accordion type="multiple" defaultValue={["trend-0"]}>
        {trendsForecastingPanels.map((panel, index) => (
          <AccordionItem
            className="border-t border-l border-r last:border-b p-4"
            key={index}
            value={`trend-${index}`}
          >
            <AccordionTrigger>
              <h3>{panel.title}</h3>
            </AccordionTrigger>
            <AccordionContent>
              {index === 0 ? (
                <TrendsOverTime />
              ) : index === 1 ? (
                <YoyComparison />
              ) : (
                <ForecastingInsights />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProcurementTrendsForecasting;
