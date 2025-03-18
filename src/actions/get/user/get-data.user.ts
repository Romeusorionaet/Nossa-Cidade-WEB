import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import type { userProfileType } from "@/@types/user-profile-type";
import { api } from "@/lib/api";

export const getDataUser = async () => {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return {
      notFound: true,

      props: null,
    };
  }

  try {
    const response = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profile: userProfileType = response.data.userProfile;

    return {
      props: {
        profile,
      },
    };
  } catch (err) {
    return {
      notFound: true,
      props: null,
    };
  }
};
