"use server";

import { KEY_COOKIES } from "@/constants/key-cookies";
import { cookies } from "next/headers";

export async function cleanAuthCookies() {
  const cookiesOC = await cookies();

  cookiesOC.delete(KEY_COOKIES.AT_OC);
  cookiesOC.delete(KEY_COOKIES.RT_OC);

  return;
}
