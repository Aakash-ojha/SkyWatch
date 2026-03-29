import type { ForecastListItem } from "@/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OverviewTab = ({ data }: { data: ForecastListItem[] | undefined }) => {
  if (!data) return <div>Loading....</div>;
  console.log(data);
  const chartData = data.slice(0, 8).map((item) => {
    console.log(item);

    const timePart = item.dt_txt.split(" ")[1];
    console.log(timePart);

    const hour = parseInt(timePart.split(":")[0]);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    return {
      time: `${hour12} ${ampm}`,
      temp: Math.round(item.main.temp - 273.15),
    };
  });

  return (
    <div className="w-full rounded-xl p-4">
      <h2 className="mb-4 text-lg font-semibold">Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.6)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="rgba(255,255,255,0.4)"
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.6)" }}
            tickFormatter={(value) => `${value}°`}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.2)" }}
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value) => [`${value}°C`, "Temp"]}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            fill="url(#tempGradient)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewTab;
