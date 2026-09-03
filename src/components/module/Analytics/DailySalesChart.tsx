"use client";

import {
  Bar,
  ComposedChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IDailySalesStat } from "@/types";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  data: IDailySalesStat[];
}

export function DailySalesChart({ data }: Props) {
  const half = Math.floor(data.length / 2) || 1;
  const firstHalfAvg =
    data.slice(0, half).reduce((sum, d) => sum + d.totalRevenue, 0) / half;
  const secondHalfAvg =
    data.slice(half).reduce((sum, d) => sum + d.totalRevenue, 0) /
    (data.length - half || 1);

  const isTrendingUp = secondHalfAvg >= firstHalfAvg;
  const trendPercent =
    firstHalfAvg === 0
      ? 0
      : Math.abs(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="col-span-full lg:col-span-4"
    >
      <Card className="overflow-hidden shadow-sm h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-bold">Daily Sales Trend</CardTitle>
            <CardDescription>
              Orders &amp; revenue over the last {data.length} days
            </CardDescription>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
              isTrendingUp
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isTrendingUp ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {trendPercent.toFixed(1)}%
          </motion.div>
        </CardHeader>
        <CardContent className="h-[320px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `৳${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number, name: string) =>
                  name === "totalRevenue"
                    ? [`৳${value}`, "Revenue"]
                    : [value, "Orders"]
                }
              />
              <Bar
                yAxisId="left"
                dataKey="totalOrders"
                name="totalOrders"
                fill="#c7d2fe"
                radius={[4, 4, 0, 0]}
                barSize={16}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalRevenue"
                name="totalRevenue"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 3, fill: "#0ea5e9" }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}