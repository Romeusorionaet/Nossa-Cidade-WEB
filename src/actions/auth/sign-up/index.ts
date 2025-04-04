"use server";

import { api } from "@/lib/api";

interface Props {
  username: string;
  email: string;
  password: string;
  file?: File | null;
}

interface ResponseProps {
  success: boolean;
  message: string;
}

export const signUp = async ({
  username,
  email,
  password,
  file,
}: Props): Promise<ResponseProps> => {
  const formData = new FormData();
  if (file) formData.append("file", file);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  try {
    const response = await api.post("/auth/register/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (err: any) {
    console.log(err.response.data, "==");
    const errorMessage =
      err.response?.data?.message ||
      "Aconteceu um erro inesperado, tente novamente mais tarde.";

    return { success: false, message: errorMessage };
  }
};
