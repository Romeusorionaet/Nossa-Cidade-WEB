"use server";

import { KeyCookies } from "@/constants/key-cookies";
import { cookies } from "next/headers";

export async function cleanAuthCookies() {
  const cookiesOC = await cookies();

  cookiesOC.delete(KeyCookies.AT_OC);
  cookiesOC.delete(KeyCookies.RT_OC);

  return;
}
