import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import TrendsOverTime from "./forecasting/TrendsOverTime";
import YoyComparison from "./forecasting/YoyComparison";

const ProcurementTrendsForecasting: React.FC = () => {
  const trendsForecastingPanels = [
    {
      title: "Procurement Trends Over Time",
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
            <AccordionTrigger className="text-md font-semibold text-textColor-primary">
              {panel.title}
            </AccordionTrigger>
            <AccordionContent>
              {index === 0 ? (
                <TrendsOverTime />
              ) : index === 1 ? (
                <YoyComparison />
              ) : (
                panel.title
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProcurementTrendsForecasting;
