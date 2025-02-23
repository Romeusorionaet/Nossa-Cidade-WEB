import { KeyCookies } from "@/constants/key-cookies";
import { api } from "@/lib/api";
import { setAuthTokenForCookies } from "@/utils/set-auth-token-for-cookies";

interface Props {
  email: string;
  password: string;
}

interface ResponseProps {
  success: boolean;
  message: string;
}

export const signInWithEmailAndPassword = async ({
  email,
  password,
}: Props): Promise<ResponseProps> => {
  try {
    const response = await api.post("/auth/authenticate", {
      email,
      password,
    });

    await setAuthTokenForCookies({
      token: response.data.accessToken,
      key: KeyCookies.AT_OC,
    });

    await setAuthTokenForCookies({
      token: response.data.refreshToken,
      key: KeyCookies.RT_OC,
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message ||
      "Aconteceu um erro inesperado, tente novamente mais tarde.";

    return { success: false, message: errorMessage };
  }
};
