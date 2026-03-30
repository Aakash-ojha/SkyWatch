import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import type { Tab } from ".";
import { getForecastWeather } from "@/api/weatherService";
import OverviewTab from "./tabs/OverviewTab";

import { useWeather } from "@/hooks/useWeather";
import ForecastChart from "./ForeCasrChart";
import PreciptationTab from "./tabs/PreciptationTab";
import type { ForecastListItem } from "@/types";

const TABS_LIST = [
  {
    title: "Overview",
    value: "overview",
    dataKey: "",
    color: "",
    unit: "",
    chartType: "area",
  },
  {
    title: "Precipitation",
    value: "precipitation",
    dataKey: "pop",
    color: "#06b6d4",
    unit: "%",
    chartType: "bar",
  },
  {
    title: "Wind",
    value: "wind",
    dataKey: "wind_speed",
    color: "#8b5cf6",
    unit: "m/s",
    chartType: "area",
  },
  {
    title: "Humidity",
    value: "humidity",
    dataKey: "humidity",
    color: "#10b981",
    unit: "%",
    chartType: "bar",
  },
  {
    title: "Cloud cover",
    value: "cloudCover",
    dataKey: "all",
    color: "#94a3b8",
    unit: "%",
    chartType: "bar",
  },
  {
    title: "Pressure",
    value: "pressure",
    dataKey: "pressure",
    color: "#f59e0b",
    unit: "hPa",
    chartType: "area",
  },
  {
    title: "Visibility",
    value: "visibility",
    dataKey: "visibility",
    color: "#64748b",
    unit: "m",
    chartType: "area",
  },
  {
    title: "Feels like",
    value: "feelsLike",
    dataKey: "feels_like",
    color: "#ec4899",
    unit: "",
    chartType: "area",
  },
];

const ForecastTabs = () => {
  const { currentWeather, unit } = useWeather();
  const [tabs, setTabs] = useState<Tab>("overview");

  const [hourly, setHourly] = useState<ForecastListItem[]>();

  useEffect(() => {
    if (!currentWeather) return;

    const fetchForcastWeather = async () => {
      const { hourly } = await getForecastWeather(
        currentWeather.lat,
        currentWeather.lon,
        currentWeather.unit,
      );

      setHourly(hourly);
    };
    fetchForcastWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeather?.lat, currentWeather?.lon, currentWeather?.unit]);

  return (
    <Tabs
      value={tabs}
      defaultValue="overview"
      className="mt-2 w-full"
      onValueChange={(value) => setTabs(value as Tab)}
    >
      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
        <TabsList className="bg-background flex w-max gap-3">
          {TABS_LIST.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="bg-secondary data-[state=active]:text-background h-9 rounded-full border-none px-4 data-[state=active]:bg-orange-500!"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="mt-5 bg-slate-900/40">
        <TabsContent value="overview">
          <OverviewTab data={hourly} unit={unit} />
        </TabsContent>

        <TabsContent value="precipitation">
          <PreciptationTab data={hourly} />
        </TabsContent>

        {/* All other tabs use ForecastChart */}
        {TABS_LIST.filter(
          (t) => t.value !== "overview" && t.value !== "precipitation",
        ).map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <ForecastChart
              data={hourly}
              title={tab.title}
              dataKey={tab.dataKey}
              color={tab.color}
              unit={tab.unit}
              chartType={tab.chartType as "area" | "bar"}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default ForecastTabs;
