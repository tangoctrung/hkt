import { getDataSummary } from ".";

export const getDataSummaryService = async (params: {
  fromDate: string;
  toDate: string;
}) => {
  try {
    const res = await getDataSummary(params);
    if (res.status === 200 || res.status === 201) {
      return { success: true, message: "Thành công", data: res.data };
    }
    return { success: false, message: "Lấy data thất bại", data: null };
  } catch (error) {
    console.log({ error });

    return { success: false, message: "Lấy data thất bại", data: null };
  }
};
