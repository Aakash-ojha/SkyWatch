import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import type { Tab } from ".";
import { getForecastWeather } from "@/api/weatherService";
import OverviewTab from "./tabs/OverviewTab";
import type { DailyForecast } from "@/types";

const TABS_LIST = [
  {
    title: "Overview",
    value: "overview",
  },
  {
    title: "Precipitation",
    value: "precipitation",
  },
  {
    title: "Wind",
    value: "wind",
  },
  {
    title: "Humidity",
    value: "humidity",
  },
  {
    title: "Cloud cover",
    value: "cloudCover",
  },
  {
    title: "Pressure",
    value: "pressure",
  },
  {
    title: "UV",
    value: "uv",
  },
  {
    title: "Visibility",
    value: "visibility",
  },
  {
    title: "Feels like",
    value: "feelsLike",
  },
];

const ForecastTabs = () => {
  const [tabs, setTabs] = useState<Tab>("overview");
  const [daily, setDaily] = useState<DailyForecast[]>();
  const [hourly, setHourly] = useState<ForecastListItem[]>();

  useEffect(() => {
    const fetchForcastWeather = async () => {
      const { daily, hourly } = await getForecastWeather(51.5074, -0.1278);
      setDaily(daily);
      setHourly(hourly);
    };
    fetchForcastWeather();
  }, []);

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

      <TabsContent value="overview">
        <OverviewTab data={hourly} />
      </TabsContent>
    </Tabs>
  );
};

export default ForecastTabs;
