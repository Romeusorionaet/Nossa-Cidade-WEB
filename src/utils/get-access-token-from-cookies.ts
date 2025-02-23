"use server";

import { KeyCookies } from "@/constants/key-cookies";
import { cookies } from "next/headers";

export async function getAccessTokenFromCookies() {
  const cookiesOC = await cookies();
  const accessToken = cookiesOC.get(KeyCookies.AT_OC);

  if (!accessToken) {
    return;
  }

  return accessToken.value;
}

export async function getRefreshTokenFromCookies() {
  const cookiesOC = await cookies();
  const refreshToken = cookiesOC.get(KeyCookies.RT_OC);

  if (!refreshToken) {
    return null;
  }

  return refreshToken.value;
}
