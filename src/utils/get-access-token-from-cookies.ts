'use server'

import { cookies } from 'next/headers'
import { KeyCookies } from '@/constants/key-cookies'

export async function getAccessTokenFromCookies() {
  if (process.env.NEXT_ENV === 'test') {
    return 'fakeToken'
  }

  const cookiesOC = await cookies()
  const accessToken = cookiesOC.get(KeyCookies.AT_OC)

  if (!accessToken) {
    return
  }

  return accessToken.value
}

export async function getRefreshTokenFromCookies() {
  const cookiesOC = await cookies()
  const refreshToken = cookiesOC.get(KeyCookies.RT_OC)

  if (!refreshToken) {
    return null
  }

  return refreshToken.value
}
