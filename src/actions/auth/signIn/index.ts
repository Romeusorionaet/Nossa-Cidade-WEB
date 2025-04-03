import { KEY_COOKIES } from "@/constants/key-cookies";
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
      key: KEY_COOKIES.AT_OC,
    });

    await setAuthTokenForCookies({
      token: response.data.refreshToken,
      key: KEY_COOKIES.RT_OC,
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
