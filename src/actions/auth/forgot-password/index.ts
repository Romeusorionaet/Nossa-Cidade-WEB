import { api } from "@/lib/api";
import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";

export const forgotPassword = async () => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return {
      message: "Usuário não encontrado.",
    };
  }

  try {
    const response = await api.post(
      "/auth/forgot-password",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return { message: response.data.message };
  } catch (err: any) {
    return { message: err.message };
  }
};
