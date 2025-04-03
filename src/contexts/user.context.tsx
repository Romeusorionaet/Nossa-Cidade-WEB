"use client";

import type { userProfileType } from "@/@types/user-profile-type";
import { getDataRefreshToken } from "@/actions/auth/refresh-token/get-data-refresh-token";
import { getDataUser } from "@/actions/get/user/get-data.user";
import { KEY_LOCAL_STORAGE } from "@/constants/key-local-storage";
import { useQuery } from "@tanstack/react-query";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

interface UserContextType {
  profile: userProfileType;
  refetchUserProfile: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>;
  isLoadingDataUserProfile: boolean;
}

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProps) {
  const session = useSession();

  const initialDataProfile = {
    publicId: "",
    username: "",
    email: "",
    avatar: "",
    emailVerified: false,
    createdAt: "",
    updatedAt: "",
  };

  const [profile, setProfile] = useState<userProfileType>(
    () => initialDataProfile,
  );

  const {
    data,
    refetch: refetchUserProfile,
    isLoading: isLoadingDataUserProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getDataUser(),
    enabled: !profile.username,
  });

  useEffect(() => {
    const refreshDataUser = async () => {
      const userLogged = localStorage.getItem(KEY_LOCAL_STORAGE.USER_LOGGED);

      const hasSessionData = !data?.props?.profile && session.data;
      const hasUserLogged = !data?.props?.profile && userLogged === "true";

      if (hasSessionData || hasUserLogged) {
        const { success } = await getDataRefreshToken();

        if (!success) {
          localStorage.removeItem(KEY_LOCAL_STORAGE.USER_LOGGED);
          localStorage.removeItem(KEY_LOCAL_STORAGE.PUBLIC_ID);

          await signOut();

          return;
        }

        await refetchUserProfile();

        return;
      }
    };

    refreshDataUser();
  }, [session.data, data, refetchUserProfile]);

  useEffect(() => {
    const setData = async () => {
      if (data?.props?.profile) {
        setProfile(data?.props.profile);
        localStorage.setItem(KEY_LOCAL_STORAGE.USER_LOGGED, "true");
      }

      if (profile.publicId) {
        localStorage.setItem(KEY_LOCAL_STORAGE.PUBLIC_ID, profile.publicId);
      }
    };

    setData();
  }, [data, profile.publicId]);

  return (
    <UserContext.Provider
      value={{
        profile,
        refetchUserProfile,
        isLoadingDataUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
