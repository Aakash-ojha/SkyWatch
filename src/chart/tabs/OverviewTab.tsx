import type { ForecastListItem, Unit } from "@/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";

const RANGES = [
  { label: "24h", count: 8 },
  { label: "48h", count: 16 },
  { label: "5d", count: 40 },
];

const getTempSymbol = (unit: Unit) => {
  if (unit === "metric") return "°C";
  if (unit === "imperial") return "°F";
  return "K"; // standard = Kelvin
};
interface ChartData {
  time: string;
  pop: number;
  rain: number;
  snow: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartData; value: number; dataKey: string }[];
  unit: Unit;
}

const CustomTooltip = ({ active, payload, unit }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const temp = payload[0].value;
  const time = payload[0].payload.time;
  return (
    <div className="rounded-xl border border-blue-300/25 bg-slate-950/95 px-4 py-3 text-xs shadow-2xl backdrop-blur-md">
      <p className="text-white/50">{time}</p>
      <p className="text-sm font-bold text-blue-300">
        {temp}
        {getTempSymbol(unit)}
      </p>
    </div>
  );
};

const OverviewTab = ({
  data,
  unit,
}: {
  data: ForecastListItem[] | undefined;
  unit: Unit;
}) => {
  const [range, setRange] = useState(8);

  // console.log(data);
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.slice(0, range).map((item) => {
      const timePart = item.dt_txt.split(" ")[1];
      const hour = parseInt(timePart.split(":")[0]);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      return {
        time: `${hour12} ${ampm}`,
        temp: Math.round(item.main.temp),
      };
    });
  }, [data, range]);

  const temps = chartData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  if (!data)
    return (
      <div className="mt-5 h-90 animate-pulse rounded-xl bg-gray-900 p-5"></div>
    );

  return (
    <div className="w-full rounded-2xl p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-white">Temperature</h2>
          <p className="text-xs text-white/40">
            {minTemp}
            {getTempSymbol(unit)} low · {maxTemp}
            {getTempSymbol(unit)} high
          </p>
        </div>

        {/* Range Toggle */}
        <Tabs
          defaultValue="24h"
          className="w-auto"
          onValueChange={(value) => {
            const found = RANGES.find((r) => r.label === value);
            if (found) setRange(found.count);
          }}
        >
          <TabsList>
            {RANGES.map((r) => (
              <TabsTrigger
                key={r.label}
                value={r.label}
                className="px-5 py-2 text-sm font-medium text-white/50 transition-all duration-200 data-[state=active]:bg-blue-700!"
              >
                {r.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 0,
            left: -25,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,0.09)"
            vertical={false}
          />
          <Area
            dataKey="temp"
            type="monotone"
            stroke="#3b82f6"
            fill="url(#temp)"
            strokeWidth={2}
            dot={false}
          />
          <XAxis
            stroke="transparent"
            dataKey="time"
            tickLine={false}
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
          />
          <YAxis
            stroke="transparent"
            tickLine={false}
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
            tickFormatter={(value) => `${value}${getTempSymbol(unit)}`}
          />
          <Tooltip
            content={<CustomTooltip unit={unit} />}
            cursor={{ stroke: "rgba(147,197,253,0.2)", strokeWidth: 1 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewTab;
