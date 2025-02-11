import { api } from '@/lib/api'

export const getBusinessPointForMapping = async () => {
  try {
    const response = await api.get('/business-point/get-all-for-mapping')
    return response.data
  } catch (err: any) {
    return []
  }
}
