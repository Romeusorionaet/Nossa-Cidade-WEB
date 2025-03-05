import { api } from "@/lib/api";

export async function sendNewTokenConfirmation({ email }: { email: string }) {
  try {
    const response = await api.post("/auth/resend-confirmation-email", {
      email,
    });

    return { messageSuccess: response.data.message, messageError: null };
  } catch (err: any) {
    const errorMessage = err.message;

    return { messageSuccess: null, messageError: errorMessage };
  }
}
