import Navigation from '@/components/layout/Navigation/Navigation'
import UserProfile from '@/components/layout/UserProfile/UserProfile'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-around h-screen">
      <UserProfile />
      <main className="w-3/5 mt-3 h-[97%] border-4 border-dashed rounded-2xl border-lime-800">
        <div className="px-7 py-4">{children}</div>
      </main>
      <Navigation />
    </div>
  )
}
