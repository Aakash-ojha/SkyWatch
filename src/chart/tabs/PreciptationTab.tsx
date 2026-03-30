import type { ForecastListItem } from "@/types";
import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RANGES = [
  { label: "24h", count: 8 },
  { label: "48h", count: 16 },
  { label: "5d", count: 40 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-blue-300/25 bg-slate-950/95 px-4 py-3 text-xs shadow-2xl backdrop-blur-md">
      <p className="mb-1 text-white/50">{d.time}</p>
      <p className="font-bold text-blue-300">{d.pop}% chance</p>
      {d.rain > 0 && <p className="text-cyan-400">🌧 {d.rain}mm rain</p>}
      {d.snow > 0 && <p className="text-sky-200">❄️ {d.snow}mm snow</p>}
      {d.rain === 0 && d.snow === 0 && (
        <p className="text-white/30">No precipitation</p>
      )}
    </div>
  );
};

const PrecipitationTab = ({
  data,
}: {
  data: ForecastListItem[] | undefined;
}) => {
  const [range, setRange] = useState(8);

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.slice(0, range).map((item) => {
      const hour = parseInt(item.dt_txt.split(" ")[1].split(":")[0]);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      return {
        time: `${hour12} ${ampm}`,
        pop: Math.round((item.pop ?? 0) * 100), // 0-1 → 0-100%
        rain: item.rain?.["3h"] ?? 0, // mm
        snow: item.snow?.["3h"] ?? 0, // mm
      };
    });
  }, [data, range]);

  const maxPop = Math.max(...chartData.map((d) => d.pop), 0);
  const totalRain = chartData.reduce((acc, d) => acc + d.rain, 0).toFixed(1);
  const totalSnow = chartData.reduce((acc, d) => acc + d.snow, 0).toFixed(1);

  if (!data)
    return (
      <div className="mt-5 h-90 animate-pulse rounded-xl bg-gray-900 p-5" />
    );

  return (
    <div className="w-full rounded-2xl p-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-semibold text-white">Precipitation</h2>
          <div className="flex gap-3 text-xs text-white/40">
            <span>Max {maxPop}% chance</span>
            {Number(totalRain) > 0 && <span>🌧 {totalRain}mm</span>}
            {Number(totalSnow) > 0 && <span>❄️ {totalSnow}mm</span>}
          </div>
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
                className="px-5 py-2 text-sm font-medium text-white/50 transition-all duration-200 data-[state=active]:!bg-blue-500 data-[state=active]:!text-white"
              >
                {r.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 10, bottom: 0 }}
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
            tickFormatter={(v) => `${v}%`}
            width={40}
            domain={[0, 100]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />
          <Legend
            formatter={(value) =>
              value === "pop"
                ? "Chance %"
                : value === "rain"
                  ? "Rain mm"
                  : "Snow mm"
            }
            wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}
          />

          {/* Probability bars */}
          <Bar dataKey="pop" fill="#3b82f6" radius={[4, 4, 0, 0]} name="pop" />
          {/* Rain bars */}
          <Bar
            dataKey="rain"
            fill="#06b6d4"
            radius={[4, 4, 0, 0]}
            name="rain"
          />
          {/* Snow bars */}
          <Bar
            dataKey="snow"
            fill="#bae6fd"
            radius={[4, 4, 0, 0]}
            name="snow"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationTab;
