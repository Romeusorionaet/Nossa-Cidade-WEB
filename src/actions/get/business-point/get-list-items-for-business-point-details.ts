import { api } from "@/lib/api";
import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";

export const getListItemsForBusinessPointDetails = async () => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return [];
  }

  try {
    const response = await api.get("/pick-list/shared-items", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err: any) {
    return [];
  }
};
