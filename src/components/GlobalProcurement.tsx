import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import WorldMap from "react-world-map";

type ContinentCode = "NA" | "SA" | "EU" | "AF" | "AS" | "OC";

type CountriesInRegionData = Record<ContinentCode, CountryData[]>;

type RegionProcurementData = Record<ContinentCode, RegionData>;
interface Product {
  name: string;
  percentage: string;
}

interface Supplier {
  name: string;
  share: string;
}

interface SupplierCountry extends Supplier {
  country: string;
}

interface CountryData {
  country: string;
  procurementVolume: number;
  marketShare: string;
  topProducts: Product[];
  topSuppliers: Supplier[];
  avgCostPerUnit: string;
  totalCost: string;
}

interface RegionData {
  name: string;
  volume: number;
  marketShare: string;
  growthRate: string;
  topProducts: Product[];
  topSuppliers: SupplierCountry[];
  avgCostPerUnit: string;
  totalCost: string;
  logistics: {
    majorHubs: string[];
    avgLeadTime: string;
  };
  risks: string[];
}

const countryProcurementData: CountriesInRegionData = {
  NA: [
    {
      country: "USA",
      procurementVolume: 6000,
      marketShare: "60%",
      topProducts: [
        { name: "Corn", percentage: "50%" },
        { name: "Soybeans", percentage: "30%" },
        { name: "Dairy", percentage: "20%" },
      ],
      topSuppliers: [
        { name: "Supplier A", share: "50%" },
        { name: "Supplier B", share: "30%" },
        { name: "Supplier C", share: "20%" },
      ],
      avgCostPerUnit: "$5.50",
      totalCost: "$33M",
    },
    {
      country: "Canada",
      procurementVolume: 2500,
      marketShare: "25%",
      topProducts: [
        { name: "Wheat", percentage: "40%" },
        { name: "Canola", percentage: "35%" },
        { name: "Pork", percentage: "25%" },
      ],
      topSuppliers: [
        { name: "Supplier D", share: "60%" },
        { name: "Supplier E", share: "25%" },
        { name: "Supplier F", share: "15%" },
      ],
      avgCostPerUnit: "$4.80",
      totalCost: "$12M",
    },
    {
      country: "Mexico",
      procurementVolume: 1500,
      marketShare: "15%",
      topProducts: [
        { name: "Avocados", percentage: "45%" },
        { name: "Tomatoes", percentage: "35%" },
        { name: "Sugar", percentage: "20%" },
      ],
      topSuppliers: [
        { name: "Supplier G", share: "55%" },
        { name: "Supplier H", share: "30%" },
        { name: "Supplier I", share: "15%" },
      ],
      avgCostPerUnit: "$3.90",
      totalCost: "$5.85M",
    },
  ],
  SA: [
    {
      country: "Brazil",
      procurementVolume: 5000,
      marketShare: "50%",
      topProducts: [
        { name: "Soybeans", percentage: "50%" },
        { name: "Beef", percentage: "30%" },
        { name: "Coffee", percentage: "20%" },
      ],
      topSuppliers: [
        { name: "Supplier J", share: "45%" },
        { name: "Supplier K", share: "35%" },
        { name: "Supplier L", share: "20%" },
      ],
      avgCostPerUnit: "$4.30",
      totalCost: "$21.5M",
    },
    {
      country: "Argentina",
      procurementVolume: 3000,
      marketShare: "30%",
      topProducts: [
        { name: "Wheat", percentage: "40%" },
        { name: "Corn", percentage: "35%" },
        { name: "Beef", percentage: "25%" },
      ],
      topSuppliers: [
        { name: "Supplier M", share: "50%" },
        { name: "Supplier N", share: "30%" },
        { name: "Supplier O", share: "20%" },
      ],
      avgCostPerUnit: "$4.00",
      totalCost: "$12M",
    },
  ],
  EU: [
    {
      country: "Germany",
      procurementVolume: 4000,
      marketShare: "40%",
      topProducts: [
        { name: "Dairy", percentage: "50%" },
        { name: "Wheat", percentage: "30%" },
        { name: "Meat", percentage: "20%" },
      ],
      topSuppliers: [
        { name: "Supplier P", share: "40%" },
        { name: "Supplier Q", share: "35%" },
        { name: "Supplier R", share: "25%" },
      ],
      avgCostPerUnit: "$5.20",
      totalCost: "$20.8M",
    },
    {
      country: "France",
      procurementVolume: 3500,
      marketShare: "35%",
      topProducts: [
        { name: "Wine", percentage: "45%" },
        { name: "Dairy", percentage: "35%" },
        { name: "Wheat", percentage: "20%" },
      ],
      topSuppliers: [
        { name: "Supplier S", share: "50%" },
        { name: "Supplier T", share: "30%" },
        { name: "Supplier U", share: "20%" },
      ],
      avgCostPerUnit: "$6.00",
      totalCost: "$21M",
    },
  ],
  AF: [
    {
      country: "Nigeria",
      procurementVolume: 2500,
      marketShare: "35%",
      topProducts: [
        { name: "Cassava", percentage: "50%" },
        { name: "Yams", percentage: "30%" },
        { name: "Cocoa", percentage: "20%" },
      ],
      topSuppliers: [
        { name: "Supplier V", share: "40%" },
        { name: "Supplier W", share: "35%" },
        { name: "Supplier X", share: "25%" },
      ],
      avgCostPerUnit: "$3.00",
      totalCost: "$7.5M",
    },
  ],
  AS: [
    {
      country: "China",
      procurementVolume: 5000,
      marketShare: "50%",
      topProducts: [
        { name: "Rice", percentage: "60%" },
        { name: "Tea", percentage: "25%" },
        { name: "Pork", percentage: "15%" },
      ],
      topSuppliers: [
        { name: "Supplier V", share: "55%" },
        { name: "Supplier W", share: "30%" },
        { name: "Supplier X", share: "15%" },
      ],
      avgCostPerUnit: "$4.50",
      totalCost: "$22.5M",
    },
  ],
  OC: [
    {
      country: "Australia",
      procurementVolume: 3000,
      marketShare: "60%",
      topProducts: [
        { name: "Wheat", percentage: "50%" },
        { name: "Beef", percentage: "30%" },
        { name: "Dairy", percentage: "20%" },
      ],
      topSuppliers: [
        { name: "Supplier AB", share: "50%" },
        { name: "Supplier AC", share: "30%" },
        { name: "Supplier AD", share: "20%" },
      ],
      avgCostPerUnit: "$4.20",
      totalCost: "$12.6M",
    },
  ],
};

const continentProcurementData: RegionProcurementData = {
  NA: {
    name: "North America",
    volume: 5000,
    marketShare: "15%",
    growthRate: "+3% YoY",
    topProducts: [
      { name: "Wheat", percentage: "40%" },
      { name: "Corn", percentage: "30%" },
      { name: "Soybeans", percentage: "20%" },
    ],
    topSuppliers: [
      { name: "Supplier A", country: "USA", share: "60%" },
      { name: "Supplier B", country: "Canada", share: "40%" },
    ],
    avgCostPerUnit: "$5.00",
    totalCost: "$25M",
    logistics: {
      majorHubs: ["New York", "Los Angeles"],
      avgLeadTime: "2 weeks",
    },
    risks: ["Tariffs on imports", "Harsh winters affecting supply"],
  },
  SA: {
    name: "South America",
    volume: 3000,
    marketShare: "7%",
    growthRate: "-2% YoY",
    topProducts: [
      { name: "Coffee", percentage: "50%" },
      { name: "Sugar", percentage: "30%" },
      { name: "Beef", percentage: "20%" },
    ],
    topSuppliers: [
      { name: "Supplier X", country: "Brazil", share: "70%" },
      { name: "Supplier Y", country: "Argentina", share: "30%" },
    ],
    avgCostPerUnit: "$4.20",
    totalCost: "$12.6M",
    logistics: {
      majorHubs: ["São Paulo", "Buenos Aires"],
      avgLeadTime: "3 weeks",
    },
    risks: ["Deforestation policies", "Export restrictions"],
  },
  EU: {
    name: "Europe",
    volume: 7000,
    marketShare: "21%",
    growthRate: "+5% YoY",
    topProducts: [
      { name: "Dairy", percentage: "35%" },
      { name: "Wheat", percentage: "30%" },
      { name: "Olive Oil", percentage: "25%" },
    ],
    topSuppliers: [
      { name: "Supplier C", country: "Germany", share: "50%" },
      { name: "Supplier D", country: "France", share: "50%" },
    ],
    avgCostPerUnit: "$5.50",
    totalCost: "$38.5M",
    logistics: {
      majorHubs: ["Rotterdam", "Hamburg"],
      avgLeadTime: "1.5 weeks",
    },
    risks: ["Energy crisis", "Regulatory changes"],
  },
  AF: {
    name: "Africa",
    volume: 2000,
    marketShare: "5%",
    growthRate: "+8% YoY",
    topProducts: [
      { name: "Cocoa", percentage: "50%" },
      { name: "Palm Oil", percentage: "30%" },
      { name: "Gold", percentage: "20%" },
    ],
    topSuppliers: [
      { name: "Supplier E", country: "Ghana", share: "60%" },
      { name: "Supplier F", country: "Nigeria", share: "40%" },
    ],
    avgCostPerUnit: "$3.80",
    totalCost: "$7.6M",
    logistics: {
      majorHubs: ["Lagos", "Cape Town"],
      avgLeadTime: "4 weeks",
    },
    risks: ["Political instability"],
  },
  AS: {
    name: "Asia",
    volume: 10000,
    marketShare: "50%",
    growthRate: "+10% YoY",
    topProducts: [
      { name: "Rice", percentage: "40%" },
      { name: "Electronics", percentage: "35%" },
      { name: "Textiles", percentage: "25%" },
    ],
    topSuppliers: [
      { name: "Supplier G", country: "China", share: "50%" },
      { name: "Supplier H", country: "India", share: "30%" },
      { name: "Supplier I", country: "Vietnam", share: "20%" },
    ],
    avgCostPerUnit: "$4.00",
    totalCost: "$40M",
    logistics: {
      majorHubs: ["Shanghai", "Tokyo"],
      avgLeadTime: "1 week",
    },
    risks: ["Trade wars"],
  },
  OC: {
    name: "Oceania",
    volume: 1500,
    marketShare: "2%",
    growthRate: "+2% YoY",
    topProducts: [
      { name: "Beef", percentage: "60%" },
      { name: "Wine", percentage: "30%" },
      { name: "Dairy", percentage: "10%" },
    ],
    topSuppliers: [
      { name: "Supplier J", country: "Australia", share: "80%" },
      { name: "Supplier K", country: "New Zealand", share: "20%" },
    ],
    avgCostPerUnit: "$5.50",
    totalCost: "$8.25M",
    logistics: {
      majorHubs: ["Sydney", "Auckland"],
      avgLeadTime: "2.5 weeks",
    },
    risks: ["Droughts", "High export costs"],
  },
};

const GlobalProcurement = () => {
  const [selectedContinent, setSelectedContinent] =
    useState<ContinentCode | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const getMapColorByVolume = (volume: number) => {
    switch (true) {
      case volume > 8000:
        return "#0A2540";
      case volume > 5000:
        return "#154B83";
      case volume > 3000:
        return "#388BE0";
      case volume > 1000:
        return "#90BEEE";
      default:
        return "#A7CCF1";
    }
  };

  useEffect(() => {
    (Object.keys(continentProcurementData) as ContinentCode[]).forEach(
      (continent) => {
        const continentElement = document.getElementById(
          continent
        ) as SVGGElement | null;
        if (continentElement) {
          const volume = continentProcurementData[continent].volume;
          const color = getMapColorByVolume(volume);
          continentElement.style.fill = color;
        }
      }
    );
  }, []);

  const selectContinent = (continentCode: string) => {
    setSelectedContinent(continentCode.toUpperCase() as ContinentCode);
    setIsPanelOpen(true);
  };

  return (
    <div>
      <div>
        <h2>Global Procurement View</h2>
        <p className="text-xs text-tertiary mt-1">
          Click on continent for more detailed information
        </p>
        <div className="flex relative mt-5 max-h-[556.79px]">
          <div className={`${isPanelOpen ? "max-w-[700px]" : "w-full"}`}>
            <div className="bg-gray p-6 flex items-center justify-center world-map">
              <WorldMap
                selected={selectedContinent}
                onSelect={selectContinent}
              />
            </div>
            <div className="flex flex-row border p-6 gap-8">
              <div className="space-y-3 font-semibold text-primary text-sm">
                <p>
                  Highest Procurement Region:
                  <span className="font-normal ml-1">Asia (153,029 units)</span>
                </p>
                <p>
                  Lowest Procurement Region:
                  <span className="font-normal ml-1">
                    Oceania (2,178 units)
                  </span>
                </p>
                <p>
                  Total Global Procurement Volume:
                  <span className="font-normal ml-1"> 582,281 units</span>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-primary font-semibold">
                  Procurement Volume Distribution:
                </p>
                <ul className="grid grid-cols-3 gap-x-10 list-disc list-inside text-sm text-primary">
                  <li>
                    Asia: <span className="font-normal ml-1">50%</span>
                  </li>
                  <li>
                    Europe: <span className="font-normal ml-1">21%</span>
                  </li>
                  <li>
                    Africa: <span className="font-normal ml-1">5%</span>
                  </li>
                  <li>
                    North America: <span className="font-normal ml-1">15%</span>
                  </li>
                  <li>
                    South America: <span className="font-normal ml-1">7%</span>
                  </li>

                  <li>
                    Oceania: <span className="font-normal ml-1">2%</span>
                  </li>
                  <li>
                    Antarctica: <span className="font-normal ml-1">0.5%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {selectedContinent && (
            <div
              className={` flex flex-grow flex-col transform transition-all overflow-y-scroll duration-300 p-6 ${
                isPanelOpen
                  ? "translate-x-0 w-full border"
                  : "-translate-x-full w-0 border-0 overflow-hidden hidden"
              }`}
            >
              <div className="flex justify-end gap-3">
                <ExternalLink className="h-5 w-5 hover:cursor-pointer hover:text-secondary text-primary " />
                <X
                  onClick={() => setIsPanelOpen(false)}
                  className="h-5 w-5 hover:cursor-pointer hover:text-error text-primary "
                />
              </div>
              <h3>{continentProcurementData[selectedContinent].name}</h3>
              <ul className="list-disc list-inside text-xs font-semibold text-primary space-y-1 mt-4">
                <li>
                  Total Procurement Volume:
                  <span className="font-normal ml-1">
                    {continentProcurementData[selectedContinent].volume} units
                  </span>
                </li>
                <li>
                  Market Share:
                  <span className="font-normal ml-1">
                    {continentProcurementData[selectedContinent].marketShare}
                  </span>
                </li>
                <li>
                  Growth Rate:
                  <span className="font-normal ml-1">
                    {continentProcurementData[selectedContinent].growthRate}
                  </span>
                </li>
                <li>
                  Top Products:
                  <ul className="list-disc list-inside ml-4 font-normal">
                    {continentProcurementData[
                      selectedContinent
                    ].topProducts.map((product) => (
                      <li key={product.name}>
                        {product.name}: {product.percentage}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  Top Suppliers:
                  <ul className="list-disc list-inside ml-4 font-normal">
                    {continentProcurementData[
                      selectedContinent
                    ].topSuppliers.map((supplier) => (
                      <li key={supplier.name}>
                        {supplier.name} ({supplier.country}) - {supplier.share}{" "}
                        share
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  Avg Cost Per Unit:
                  <span className="font-normal ml-1">
                    {continentProcurementData[selectedContinent].avgCostPerUnit}
                  </span>
                </li>
                <li>
                  Total Cost:
                  <span className="font-normal ml-1">
                    {continentProcurementData[selectedContinent].totalCost}
                  </span>
                </li>
                <li>
                  Logistics:
                  <ul className="list-disc list-inside ml-4 font-normal">
                    <li>
                      Major Hubs:{" "}
                      {continentProcurementData[
                        selectedContinent
                      ].logistics.majorHubs.join(", ")}
                    </li>
                    <li>
                      Avg Lead Time:{" "}
                      {
                        continentProcurementData[selectedContinent].logistics
                          .avgLeadTime
                      }
                    </li>
                  </ul>
                </li>
                <li>
                  Risks:
                  <span className="font-normal ml-1">
                    {continentProcurementData[selectedContinent].risks.join(
                      ", "
                    )}
                  </span>
                </li>
              </ul>
              {countryProcurementData[selectedContinent].map((country) => (
                <div
                  key={country.country}
                  className="border rounded-lg p-4 mt-6"
                >
                  <h3>{country.country}</h3>
                  <ul className="list-none list-inside text-xs text-primary space-y-1 mt-2">
                    <li>
                      Procurement Volume: {country.procurementVolume} units
                    </li>
                    <li>Market Share: {country.marketShare}</li>
                    <li>
                      Top Products:
                      <ul className="list-disc list-inside ml-4">
                        {country.topProducts.map((product) => (
                          <li key={product.name}>
                            {product.name}: {product.percentage}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      Top Suppliers:
                      <ul className="list-disc list-inside ml-4">
                        {country.topSuppliers.map((supplier) => (
                          <li key={supplier.name}>
                            {supplier.name} - {supplier.share} share
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>Avg Cost Per Unit: {country.avgCostPerUnit}</li>
                    <li>Total Cost: {country.totalCost}</li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalProcurement;
