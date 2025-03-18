import { api } from "@/lib/api";
import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";

export const getSharedItemsAssociatedBusinessPoint = async (id: string) => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return [];
  }

  try {
    const response = await api.get(
      `/pick-list/shared-items/associated/business-point/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (err: any) {
    return {};
  }
};
