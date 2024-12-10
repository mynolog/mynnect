import { RiHomeLine, RiNotification4Line, RiArrowRightUpLine, RiEarthFill } from 'react-icons/ri'

type NavigationItem = {
  id: string
  icon: React.ReactNode
  label: string
  href: string
}

export const navigationList: NavigationItem[] = [
  {
    id: '1',
    icon: <RiHomeLine />,
    label: '홈',
    href: '/home',
  },
  {
    id: '2',
    icon: <RiEarthFill />,
    label: '탐색',
    href: '/explore',
  },
  {
    id: '3',
    icon: <RiArrowRightUpLine />,
    label: '트렌드',
    href: '/trend',
  },
  {
    id: '4',
    icon: <RiNotification4Line />,
    label: '알림',
    href: '/notification',
  },
]
