import { api } from "@/lib/api";

export const getProducts = async (page: string) => {
  try {
    const response = await api.get(`/products/${page}`);
    return response.data;
  } catch (err: any) {
    return [];
  }
};
