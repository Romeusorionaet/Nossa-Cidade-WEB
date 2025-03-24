import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { api } from "@/lib/api";

export const deleteBusinessPointImage = async (id: string) => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return {
      messageError: "Usuário não encontrado.",
      messageSuccess: null,
    };
  }

  try {
    const response = await api.delete(`/business-point/delete-image/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { messageSuccess: response.data.message, messageError: null };
  } catch (err: any) {
    return { messageSuccess: null, messageError: err.response.data.message };
  }
};
