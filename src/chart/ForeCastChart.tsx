import type { ForecastListItem } from "@/types";
import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RANGES = [
  { label: "24h", count: 8 },
  { label: "48h", count: 16 },
  { label: "5d", count: 40 },
];

type ForecastChartProps = {
  data: ForecastListItem[] | undefined;
  title: string;
  dataKey: string;
  color: string;
  unit: string;
  chartType: "area" | "bar";
};

// -------------------- Custom Tooltip --------------------
interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { time: string; value: number }; value: number }[];
  unit: string;
  title: string;
}

const CustomTooltip = ({
  active,
  payload,
  unit,
  title,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  const time = payload[0].payload.time;

  return (
    <div className="rounded-xl border border-blue-300/25 bg-slate-950/95 px-4 py-3 text-xs shadow-2xl backdrop-blur-md">
      <p className="text-white/50">{time}</p>
      <p className="text-sm font-bold text-blue-300">
        {value}
        {unit}
      </p>
      <p className="text-xs text-white/40">{title}</p>
    </div>
  );
};

// -------------------- ForecastChart Component --------------------
const ForecastChart = ({
  data,
  title,
  dataKey,
  color,
  unit,
  chartType,
}: ForecastChartProps) => {
  const [range, setRange] = useState(8);

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.slice(0, range).map((item) => {
      const hour = parseInt(item.dt_txt.split(" ")[1].split(":")[0]);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;

      const value =
        (item.main && dataKey in item.main
          ? (item.main as Record<string, number>)[dataKey]
          : (item as unknown as Record<string, number>)[dataKey]) ?? 0;

      return { time: `${hour12} ${ampm}`, value: Math.round(value) };
    });
  }, [data, range, dataKey]);

  const values = chartData.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  if (!data)
    return (
      <div className="mt-5 h-90 animate-pulse rounded-xl bg-gray-900 p-5" />
    );

  return (
    <div className="w-full rounded-2xl p-4">
      {/* Header + Range Tabs */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-semibold text-white">{title}</h2>
          <p className="text-xs text-white/40">
            {minVal}
            {unit} low · {maxVal}
            {unit} high
          </p>
        </div>

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
                className="px-5 py-2 text-sm font-medium text-white/50 transition-all duration-200 data-[state=active]:bg-blue-500! data-[state=active]:text-white!"
              >
                {r.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "bar" ? (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.09)"
              vertical={false}
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
              width={45}
              tickFormatter={(v) => `${v}${unit}`}
            />
            <Tooltip
              content={<CustomTooltip unit={unit} title={title} />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`grad-${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.09)"
              vertical={false}
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
              width={45}
              tickFormatter={(v) => `${v}${unit}`}
            />
            <Tooltip
              content={<CustomTooltip unit={unit} title={title} />}
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#grad-${dataKey})`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
