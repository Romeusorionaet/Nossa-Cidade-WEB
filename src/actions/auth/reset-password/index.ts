import { api } from "@/lib/api";

interface Props {
  newPassword: string;
  token: string;
}

export const resetPassword = async ({ newPassword, token }: Props) => {
  try {
    const response = await api.post(
      "/auth/reset-password/",
      {
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { message: response.data.message };
  } catch (err: any) {
    return { message: err.response.data.message };
  }
};
