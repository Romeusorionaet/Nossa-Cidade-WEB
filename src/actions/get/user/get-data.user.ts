import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-access-token-from-cookies'

export const getDataUser = async () => {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return {
      notFound: true,

      props: null,
    }
  }

  try {
    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const profile: any = response.data.profile

    return {
      props: {
        profile,
      },
    }
  } catch (err) {
    return {
      notFound: true,
      props: null,
    }
  }
}
