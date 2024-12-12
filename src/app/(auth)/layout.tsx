import Background from '@/components/layout/Background/Background'
import Logo from '@/components/layout/Logo/Logo'
import PublicRoute from '@/components/common/Route/PublicRoute'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicRoute>
      <Background>
        <div
          className={`text-dim-gray-600 font-bold bg-white rounded-xl shadow-md p-3 max-w-[670px] w-full h-4/6 flex flex-col items-center gap-10`}
        >
          <div>
            <Logo type="full" textColor="text-lime-green-900" />
          </div>
          {children}
        </div>
      </Background>
    </PublicRoute>
  )
}
