import { IMonthlyStats, IStats } from "@/types";
import { apiRequest } from "../apiClient";

// get all stats
export const getAllStats = async () => {
  const result = await apiRequest<IStats>("/stats");
  return result;
};

// get monthly stats
export const getMonthlyStats = async () => {
  const result = await apiRequest<IMonthlyStats[]>("/stats/monthly-sales");
  return result;
};
