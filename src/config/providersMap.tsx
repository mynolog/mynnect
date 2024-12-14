import { GithubAuthProvider, GoogleAuthProvider, AuthProvider } from 'firebase/auth'
import { FaGoogle, FaGithub, FaEnvelope } from 'react-icons/fa'

type ProvidersMap = {
  [key: string]: {
    icon: React.ReactNode
    bgColor: 'bg-off-white-500' | 'bg-github-gray'
    textColor: 'text-dim-gray-600' | 'text-off-white-500'
    label: string
    auth: AuthProvider | null
  }
}

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const providersMap: ProvidersMap = {
  google: {
    icon: <FaGoogle />,
    bgColor: 'bg-off-white-500',
    textColor: 'text-dim-gray-600',
    label: '구글 계정으로 로그인',
    auth: googleProvider,
  },
  github: {
    icon: <FaGithub />,
    bgColor: 'bg-github-gray',
    textColor: 'text-off-white-500',
    label: '깃허브 계정으로 로그인',
    auth: githubProvider,
  },
  local: {
    icon: <FaEnvelope />,
    bgColor: 'bg-off-white-500',
    textColor: 'text-dim-gray-600',
    label: '이메일로 로그인',
    auth: null,
  },
}
