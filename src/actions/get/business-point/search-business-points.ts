import { api } from "@/lib/api";

export const searchBusinessPoints = async (query: string) => {
  try {
    const response = await api.get(`/business-point/search/${query}`);
    return response.data;
  } catch (err: any) {
    return [];
  }
};
