import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { api } from "@/lib/api";
import { UpdateBusinessPointFormDataMerged } from "@/schemas/update-business-point.schema";

interface BusinessPointRegisterProps {
  businessPoint: Partial<UpdateBusinessPointFormDataMerged>;
  businessPointId: string;
}

export async function updateBusinessPointOverview({
  businessPoint,
  businessPointId,
}: BusinessPointRegisterProps) {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return {
      messageError: "Usuário não encontrado.",
      messageSuccess: null,
    };
  }

  try {
    const response = await api.put(
      `/business-point/update/${businessPointId}`,
      businessPoint,
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
          messageError: err.response.data.message,
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
