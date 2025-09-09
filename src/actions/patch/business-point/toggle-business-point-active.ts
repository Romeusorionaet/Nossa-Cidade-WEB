import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { api } from "@/lib/api";

interface ToggleBusinessPointActiveProps {
  businessPointId: string;
}

export async function toggleBusinessPointActive({
  businessPointId,
}: ToggleBusinessPointActiveProps) {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return {
      messageError: "Usuário não encontrado.",
      messageSuccess: null,
    };
  }

  try {
    const response = await api.patch(
      `/toggle-business-point/active/${businessPointId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return { messageSuccess: response.data.message, messageError: null };
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 401) {
        const errorTokenMessage =
          "Token expirado, por favor, clique em Reenviar token de confirmação.";
        return { messageSuccess: null, messageError: errorTokenMessage };
      }

      if (err.response.status === 400) {
        return {
          messageSuccess: null,
          messageError:
            err.response.data.message || "Erro de validação, tente novamente.",
        };
      }

      return {
        messageSuccess: null,
        messageError:
          err.response.data.message ||
          "Ocorreu um erro inesperado no servidor. Tente novamente.",
      };
    }

    if (err.request) {
      return {
        messageSuccess: null,
        messageError:
          "Erro de conexão. Verifique sua internet e tente novamente.",
      };
    }

    return {
      messageSuccess: null,
      messageError: "Ocorreu um erro desconhecido. Tente novamente.",
    };
  }
}
