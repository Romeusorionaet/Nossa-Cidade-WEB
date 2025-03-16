import { api } from "@/lib/api";

export const getBusinessPointOverview = async (id: string) => {
  try {
    const response = await api.get(`/business-point/overview/${id}`);

    return response.data;
  } catch (err: any) {
    return {};
  }
};
