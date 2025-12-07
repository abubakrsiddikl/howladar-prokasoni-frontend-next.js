"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IMonthlyStats } from "@/types";

const chartConfig = {
  January:   { label: "January", color: "#10B981" },
  February:  { label: "February", color: "#6366F1" },
  March:     { label: "March", color: "#F59E0B" },
  April:     { label: "April", color: "#EF4444" },
  May:       { label: "May", color: "#06B6D4" },
  June:      { label: "June", color: "#8B5CF6" },
  July:      { label: "July", color: "#EC4899" },
  August:    { label: "August", color: "#F97316" },
  September: { label: "September", color: "#84CC16" },
  October:   { label: "October", color: "#F43F5E" },
  November:  { label: "November", color: "#3B82F6" },
  December:  { label: "December", color: "#14B8A6" },
} satisfies ChartConfig;


export default function MonthlyRevenuePieChart({
  stats,
}: {
  stats: IMonthlyStats[];
}) {
  const fallbackColors = [
    "#10B981",
    "#6366F1",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
  ];

  // FIXED: index added
  const chartData = stats.map((item, index) => ({
    name: `${item.month} ${item.year}`,
    value: item.totalRevenue,
    fill:
      chartConfig[item.month as keyof typeof chartConfig]?.color ||
      fallbackColors[index % fallbackColors.length],
  }));

  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Revenue Analysis</CardTitle>
        <CardDescription>
          Total Revenue : ৳ {totalRevenue.toFixed(2)} Tk.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            {/* Tooltip */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="name"
                  formatter={(value) =>
                    typeof value === "number"
                      ? [`৳ ${value.toLocaleString("en-IN")}`, ""]
                      : [value, ""]
                  }
                />
              }
            />

            {/* Pie */}
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            />

            {/* FIXED: No nested ChartLegend */}
            <ChartLegend className="flex-wrap gap-2 pt-2" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
