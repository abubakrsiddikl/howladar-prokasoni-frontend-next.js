// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { paymentStatus } from "@/constant/paymentStatus";
// import { IStats } from "@/types";

// import {
//   Users,
//   Book,
//   CheckCircle,
//   Package,
//   Truck,
//   CalendarCheck,
//   XCircle,
//   Clock,
//   DollarSign,
// } from "lucide-react";

// export default function AdminAnalytics({ stats }: { stats: IStats }) {
//   // Icon mapping for order status
//   const statusIconMap: Record<string, React.ReactNode> = {
//     Processing: <Clock className="w-6 h-6 text-yellow-500" />,
//     Approved: <CheckCircle className="w-6 h-6 text-blue-500" />,
//     Shipped: <Truck className="w-6 h-6 text-purple-500" />,
//     Delivered: <CalendarCheck className="w-6 h-6 text-green-500" />,
//     Cancelled: <XCircle className="w-6 h-6 text-red-500" />,
//     Returned: <XCircle className="w-6 h-6 text-orange-500" />,
//   };

//   // Icon mapping for payment
//   const paymentIconMap: Record<string, React.ReactNode> = {
//     Paid: <DollarSign className="w-6 h-6 text-green-500" />,
//     Pending: <DollarSign className="w-6 h-6 text-yellow-500" />,
//     Cancelled: <DollarSign className="w-6 h-6 text-red-500" />,
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {/* Total Orders */}
//       <Card>
//         <CardHeader className="flex items-center gap-2">
//           <CheckCircle className="w-6 h-6 text-blue-500" />
//           <CardTitle>Total Orders</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
//         </CardContent>
//       </Card>

//       {/* Total Users */}
//       <Card>
//         <CardHeader className="flex items-center gap-2">
//           <Users className="w-6 h-6 text-green-500" />
//           <CardTitle>Total Users</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
//         </CardContent>
//       </Card>

//       {/* Total Books */}
//       <Card>
//         <CardHeader className="flex items-center gap-2">
//           <Book className="w-6 h-6 text-purple-500" />
//           <CardTitle>Total Books</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-2xl font-bold">{stats?.totalBook || 0}</p>
//         </CardContent>
//       </Card>

//       {/* Revenue by Payment Status */}
//       {stats?.revenue?.map((rev) => (
//         <Card key={rev.status}>
//           <CardHeader className="flex items-center gap-2">
//             {paymentIconMap[rev.status] || (
//               <DollarSign className="w-6 h-6 text-gray-500" />
//             )}
//             <CardTitle>{rev.status} Payment</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-base">
//               <span className="mr-2">
//                 {rev.status === paymentStatus.paid
//                   ? "Total Revenue"
//                   : "Total Amount"}{" "}
//                 :
//               </span>
//               {rev.totalAmount} Tk.
//             </p>
//             <p className="text-2xl font-bold">Orders: {rev.count}</p>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Status Stats */}
//       {stats?.statusStats?.map((status) => (
//         <Card key={status.status}>
//           <CardHeader className="flex items-center gap-2">
//             {statusIconMap[status.status] || (
//               <Package className="w-6 h-6 text-gray-500" />
//             )}
//             <CardTitle>{status.status}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{status.count}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paymentStatus } from "@/constant/paymentStatus";
import { IStats } from "@/types";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { staggerContainer, fadeUpItem, cardHover } from "@/components/shared/motion-variants";
import { motion } from "framer-motion";
import {
  Users,
  Book,
  CheckCircle,
  Package,
  Truck,
  CalendarCheck,
  XCircle,
  Clock,
} from "lucide-react";
import { TakaIcon } from "@/components/shared/TakaIcon";

export default function AdminAnalytics({ stats }: { stats: IStats }) {
  const statusIconMap: Record<string, React.ReactNode> = {
    Processing: <Clock className="w-5 h-5" />,
    Approved: <CheckCircle className="w-5 h-5" />,
    Shipped: <Truck className="w-5 h-5" />,
    Delivered: <CalendarCheck className="w-5 h-5" />,
    Cancelled: <XCircle className="w-5 h-5" />,
    Returned: <XCircle className="w-5 h-5" />,
  };

  const statusColorMap: Record<string, string> = {
    Processing: "bg-yellow-50 text-yellow-600",
    Approved: "bg-blue-50 text-blue-600",
    Shipped: "bg-purple-50 text-purple-600",
    Delivered: "bg-green-50 text-green-600",
    Cancelled: "bg-red-50 text-red-600",
    Returned: "bg-orange-50 text-orange-600",
  };

  const totalRevenue =
    stats?.revenue?.find((r) => r.status === paymentStatus.paid)
      ?.totalAmount || 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <StatCard
        title="Total Orders"
        value={stats?.totalOrders || 0}
        icon={<CheckCircle className="w-5 h-5" />}
        color="bg-blue-50 text-blue-600"
      />
      <StatCard
        title="Total Users"
        value={stats?.totalUsers || 0}
        icon={<Users className="w-5 h-5" />}
        color="bg-green-50 text-green-600"
      />
      <StatCard
        title="Total Books"
        value={stats?.totalBook || 0}
        icon={<Book className="w-5 h-5" />}
        color="bg-purple-50 text-purple-600"
      />
      <StatCard
        title="Total Revenue"
        value={totalRevenue}
        prefix="৳"
        icon={<TakaIcon className="w-5 h-5" />}
        color="bg-sky-50 text-sky-600"
        highlight
      />

      {stats?.revenue?.map((rev) => (
        <motion.div key={rev.status} variants={fadeUpItem} {...cardHover}>
          <Card className="shadow-sm h-full">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="rounded-lg bg-slate-50 p-2 text-slate-600">
                <TakaIcon className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">{rev.status} Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {rev.status === paymentStatus.paid
                  ? "Total Revenue"
                  : "Total Amount"}
                : ৳<AnimatedCounter value={rev.totalAmount} />
              </p>
              <p className="text-2xl font-bold">
                <AnimatedCounter value={rev.count} /> Orders
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {stats?.statusStats?.map((status) => (
        <motion.div key={status.status} variants={fadeUpItem} {...cardHover}>
          <Card className="shadow-sm h-full">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div
                className={`rounded-lg p-2 ${
                  statusColorMap[status.status] || "bg-slate-50 text-slate-600"
                }`}
              >
                {statusIconMap[status.status] || <Package className="w-5 h-5" />}
              </div>
              <CardTitle className="text-base">{status.status}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                <AnimatedCounter value={status.count} />
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  prefix = "",
  highlight = false,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  prefix?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div variants={fadeUpItem} {...cardHover}>
      <Card className={`shadow-sm h-full ${highlight ? "ring-1 ring-sky-200" : ""}`}>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            <AnimatedCounter value={value} prefix={prefix} />
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}