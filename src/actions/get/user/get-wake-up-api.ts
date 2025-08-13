import { api } from "@/lib/api";

export const getWakeUpApi = async () => {
  try {
    const response = await api.get("/wake-up-api");

    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
