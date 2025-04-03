"use server";

import { KEY_COOKIES } from "@/constants/key-cookies";
import { cookies } from "next/headers";

export async function getAccessTokenFromCookies() {
  const cookiesOC = await cookies();
  const accessToken = cookiesOC.get(KEY_COOKIES.AT_OC);

  if (!accessToken) {
    return;
  }

  return accessToken.value;
}

export async function getRefreshTokenFromCookies() {
  const cookiesOC = await cookies();
  const refreshToken = cookiesOC.get(KEY_COOKIES.RT_OC);

  if (!refreshToken) {
    return null;
  }

  return refreshToken.value;
}
