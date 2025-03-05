import { api } from "@/lib/api";

export async function confirmationEmail({ token }: { token: string }) {
  try {
    const response = await api.post(
      "/auth/confirm-email",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { messageSuccess: response.data.message, messageError: null };
  } catch (err: any) {
    const errorMessage =
      err.status === 401
        ? "Token expirado, por favor, clique em Reenviar token de confirmação."
        : err.message || "Ocorreu um erro ao confirmar o e-mail.";

    return { messageSuccess: null, messageError: errorMessage };
  }
}
