import useSWR from 'swr'
import { fetchUser } from '@/services/userServices'
import { User } from '@/types/userTypes'

export const useUser = () => {
  const { data, error, isLoading } = useSWR<User | null>('user', fetchUser)

  return {
    user: data ?? null,
    isLoading: isLoading,
    isError: error,
  }
}
