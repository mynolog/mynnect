import Navigation from '@/components/layout/Navigation/Navigation'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  )
}
