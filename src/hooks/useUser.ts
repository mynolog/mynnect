import useSWR from 'swr'
import { fetchUser } from '@/services/userServices'

export const useUser = () => {
  const { data, error, isLoading } = useSWR('user', fetchUser)

  return {
    user: data,
    isLoading: isLoading,
    isError: error,
  }
}
