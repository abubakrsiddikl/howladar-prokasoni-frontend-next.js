/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusStat } from "@/types"

interface Props {
  data: StatusStat[];
}

const COLORS: Record<string, string> = {
  Delivered: "#10b981",
  Processing: "#0ea5e9",
  Approved: "#6366f1",
  Shipped: "#8b5cf6",
  Cancelled: "#f43f5e",
  Returned: "#f59e0b",
};

// 🔹 Custom label (outside line + count)
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  payload,
}: any) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 18;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={COLORS[payload.status] || "#cbd5e1"}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={COLORS[payload.status]} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={4}
        textAnchor={textAnchor}
        fill={COLORS[payload.status]}
        className="text-sm font-semibold"
      >
        {payload.count}
      </text>
    </g>
  );
};

export function OrderStatusChart({ data }: Props) {
  const filteredData = data?.filter(item => item.count > 0);

  return (
    <Card className="col-span-3 flex flex-col bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          Order Status Distribution
        </CardTitle>
        <CardDescription>
          Visual analysis of current orders
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        {/* Chart */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value: number, name: string) => [
                  value,
                  name,
                ]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Pie
                data={filteredData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={105}
                stroke="#fff"
                strokeWidth={2}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {filteredData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[entry.status] || "#cbd5e1"}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
          {filteredData.map((item) => (
            <div
              key={item.status}
              className="flex items-center gap-2"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[item.status] }}
              />
              <span className="font-medium text-gray-700">
                {item.status}
              </span>
              <span className="text-gray-500">
                ({item.count})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
