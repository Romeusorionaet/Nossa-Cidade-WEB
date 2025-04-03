"use server";

import { KEY_COOKIES } from "@/constants/key-cookies";
import { api } from "@/lib/api";
import { getRefreshTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { setAuthTokenForCookies } from "@/utils/set-auth-token-for-cookies";

interface BooleanResponse {
  success: boolean;
}

export const getDataRefreshToken = async (): Promise<BooleanResponse> => {
  const refreshToken = await getRefreshTokenFromCookies();

  if (!refreshToken) {
    return { success: false };
  }

  try {
    const response = await api.get("/auth/refresh-token", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const accessToken: string = response.data.accessToken;

    setAuthTokenForCookies({
      token: accessToken,
      key: KEY_COOKIES.AT_OC,
    });

    return { success: true };
  } catch (err) {
    return { success: false };
  }
};
