import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { api } from "@/lib/api";

interface Props {
  businessPointId: string;
  files: File[];
}

export const saveImageBusinessPoint = async ({
  businessPointId,
  files,
}: Props) => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return {
      messageError: "Usuário não encontrado.",
      messageSuccess: null,
    };
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const response = await api.post(
      `/business-point/register-image/${businessPointId}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return { messageSuccess: response.data.message, messageError: null };
  } catch (err: any) {
    return { messageSuccess: null, messageError: err.response.data.message };
  }
};
