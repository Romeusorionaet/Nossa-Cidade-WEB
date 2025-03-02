import { api } from "@/lib/api";
import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";

interface Props {
  newPassword: string;
  currentPassword: string;
}

export const changePassword = async ({
  newPassword,
  currentPassword,
}: Props) => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return {
      message: "Usuário não encontrado.",
    };
  }

  try {
    const response = await api.post(
      "/auth/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return { message: response.data.message };
  } catch (err: any) {
    return { message: err.response.data.message };
  }
};
