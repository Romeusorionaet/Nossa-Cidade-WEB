import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { api } from "@/lib/api";

export const getBusinessPointsPreviewUser = async () => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return [];
  }

  try {
    const response = await api.get("/business-point/preview/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err: any) {
    return [];
  }
};
