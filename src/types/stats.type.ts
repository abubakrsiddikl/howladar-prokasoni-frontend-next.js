export interface StatusStat {
  status: string;
  count: number;
}

export interface IStats {
  totalOrders: number;
  totalUsers: number;
  totalBook: number;
  statusStats: StatusStat[];
  revenue: Revenue[];
}

export interface Revenue {
  status: string;
  count: number;
  totalAmount: number;
}

export interface IMonthlyStats {
  year: number;
  month: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface IOrderStatusCount {
  status:
    | "Processing"
    | "Approved"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Returned";
  count: number;
}

export interface ILastOrder {
  orderId: string;
  status: string;
  amount: number;
  date: string;
}

export interface ICustomerDashboardStats {
  totalOrders: number;
  orderStatusStats: IOrderStatusCount[];
  lastOrder: ILastOrder | null;
  totalLifetimeSpend: number;
}
