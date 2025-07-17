import AxiosInstance from "../api";

export const getDataSummary = (params: {
  fromDate: string; // 2025-05-10
  toDate: string;
}) => {
  return AxiosInstance.get(
    `/api/analytics/summary?from=${params.fromDate}&to=${params.toDate}`
  );
};
