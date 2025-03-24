import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { api } from "@/lib/api";

export const getImageBusinessPoint = async (id: string) => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return [];
  }

  try {
    const response = await api.get(`/business-point/images/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err: any) {
    return {};
  }
};
