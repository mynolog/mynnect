import { type GoogleAuthProvider, type GithubAuthProvider } from 'firebase/auth'
import { googleProvider, githubProvider } from '@/config/firebaseConfig'
import { FaGoogle, FaGithub } from 'react-icons/fa'

type ProviderMap = {
  [key: string]: {
    icon: React.ReactNode
    bgColor: 'bg-off-white-500' | 'bg-github-gray'
    textColor: 'text-dim-gray-600' | 'text-off-white-500'
    label: '구글' | '깃허브'
    auth: GoogleAuthProvider | GithubAuthProvider
  }
}

export const providerMap: ProviderMap = {
  google: {
    icon: <FaGoogle />,
    bgColor: 'bg-off-white-500',
    textColor: 'text-dim-gray-600',
    label: '구글',
    auth: googleProvider,
  },
  github: {
    icon: <FaGithub />,
    bgColor: 'bg-github-gray',
    textColor: 'text-off-white-500',
    label: '깃허브',
    auth: githubProvider,
  },
}
