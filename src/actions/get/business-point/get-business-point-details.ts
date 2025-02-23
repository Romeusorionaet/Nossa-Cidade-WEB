import { api } from "@/lib/api";

export const getBusinessPointDetails = async (id: string) => {
  try {
    const response = await api.get(`/business-point/details/${id}`);
    return response.data;
  } catch (err: any) {
    return [];
  }
};
