import Logo from '../Logo/Logo'
import UserBio from './UserBio'

export default function UserProfile() {
  return (
    <div className="sticky top-[20px] max-h-[96vh] w-1/6 mt-3 flex flex-col items-center gap-8 px-6 py-4 font-bold text-md">
      <div className="w-full h-20">
        <Logo type="short" textColor="text-lime-green-500" fontSize="text-5xl" />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <UserBio />
      </div>
    </div>
  )
}
