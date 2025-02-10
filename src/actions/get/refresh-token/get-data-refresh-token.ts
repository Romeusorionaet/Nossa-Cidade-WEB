'use server'

import { setAuthTokenForCookies } from '@/utils/set-auth-token-for-cookies'
import { KeyCookies } from '@/constants/key-cookies'
import { api } from '@/lib/api'
import { getRefreshTokenFromCookies } from '@/utils/get-access-token-from-cookies'

interface BooleanResponse {
  success: boolean
}

export const getDataRefreshToken = async (): Promise<BooleanResponse> => {
  const refreshToken = await getRefreshTokenFromCookies()

  if (!refreshToken) {
    return { success: false }
  }

  try {
    const response = await api.get('/auth/user/refresh-token', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    const accessToken: string = response.data.accessToken

    setAuthTokenForCookies({
      token: accessToken,
      key: KeyCookies.AT_OC,
    })

    return { success: true }
  } catch (err) {
    return { success: false }
  }
}
