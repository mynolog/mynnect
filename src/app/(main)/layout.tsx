import Navigation from '@/components/layout/Navigation/Navigation'
import UserProfile from '@/components/layout/UserProfile/UserProfile'

export const metadata = {
  title: 'mynnect.',
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex justify-around min-h-[96vh] mx-auto my-2 max-w-6xl">
      <UserProfile />
      <main className="w-3/5 mt-3 border-r-4 border-l-4 border-opacity-50 border-lime-green-300 hover:border-lime-green-500 transition-colors ease-in-out duration-300">
        <div className="px-7 py-4">{children}</div>
      </main>
      <Navigation />
    </div>
  )
}
