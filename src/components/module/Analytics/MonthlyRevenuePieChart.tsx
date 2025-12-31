
"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IMonthlyStats } from "@/types"

interface Props {
  data: IMonthlyStats[]
}

export function MonthlyRevenueChart({ data }: Props) {
  return (
    <Card className="col-span-4 overflow-hidden">
      <CardHeader>
        <CardTitle>Monthly Revenue Analysis</CardTitle>
        <CardDescription>
          Showing total revenue for the current year
        </CardDescription>
      </CardHeader>
      {/* এখানে bg-muted/30 বা bg-slate-50 ব্যবহার করে ব্যাকগ্রাউন্ড কালার দেওয়া হয়েছে */}
      <CardContent className="h-[300px] w-full pt-6 bg-slate-50/50"> 
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* vertical={true} করে দিলে লম্বালম্বি দাগগুলোও আসবে, ব্যাকগ্রাউন্ডের সাথে যা সুন্দর লাগে */}
            <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={true} 
                stroke="#e2e8f0" // হালকা গ্রে কালার দাগের জন্য
            />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `৳${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                backgroundColor: '#ffffff'
              }}
              formatter={(value: number) => [`৳${value}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="#0ea5e9"
              strokeWidth={3} // দাগটা একটু মোটা করা হয়েছে ফোকাস পাওয়ার জন্য
              fillOpacity={1}
              fill="url(#colorRevenue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}