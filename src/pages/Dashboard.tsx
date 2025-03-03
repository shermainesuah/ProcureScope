import AnomaliesAlert from "../components/AnomaliesAlert";
import GlobalProcurement from "../components/GlobalProcurement";
import ProcurementTrendsForecasting from "../components/ProcurementTrendsForecasting";

const Dashboard: React.FC = () => {
  return (
    <div className="main-container flex space-y-8 flex-col">
      <h1>Dashboard</h1>
      <div className="p-6 border rounded-lg max-w-6xl">
        <AnomaliesAlert />
      </div>
      <div className="p-6 border rounded-lg max-w-6xl">
        <GlobalProcurement />
      </div>
      <div className="p-6 border rounded-lg max-w-6xl">
        <ProcurementTrendsForecasting />
      </div>
    </div>
  );
};

export default Dashboard;
