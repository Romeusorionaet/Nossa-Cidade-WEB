import { api } from "@/lib/api";

export const getBusinessPointCategories = async () => {
  try {
    const response = await api.get("/business-point/get-all-categories");
    return response.data;
  } catch (err: any) {
    return [];
  }
};
