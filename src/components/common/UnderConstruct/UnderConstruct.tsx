import { LuConstruction } from 'react-icons/lu'

export default function UnderConstruct() {
  return (
    <div className="w-full h-screen flex flex-col items-center mt-20 gap-10">
      <LuConstruction className="text-8xl text-lime-green-700" />
      <h2 className="text-4xl">
        페이지 <b>준비중</b>입니다.
      </h2>
    </div>
  )
}
