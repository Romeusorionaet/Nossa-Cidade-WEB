import { api } from "@/lib/api";

export const getWakeUpApi = async () => {
  try {
    await api.get("/wake-up-api");

    return;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
