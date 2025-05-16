"use server";

import { cookies } from "next/headers";
import { extractDataFromJwtToken } from "./extract-data-from-jwt-token";

interface Props {
  token: string;
  key: string;
}

export const setAuthTokenForCookies = async ({ token, key }: Props) => {
  const { tokenExpires, errorMessage } = extractDataFromJwtToken(token);

  if (errorMessage || !tokenExpires) {
    return;
  }

  const currentUnixTimestamp = Math.floor(Date.now() / 1000);

  const cookiesOC = await cookies();

  cookiesOC.set({
    name: key,
    value: token,
    maxAge: tokenExpires - currentUnixTimestamp,
    sameSite: "lax",
    httpOnly: true,
    secure: true,
  });
};
