import NavigationList from './NavigationList'

export default function Navigation() {
  return (
    <nav className="fixed bottom-0  bg-white md:bg-transparent w-full md:sticky md:top-[20px] md:max-h-[96vh] md:w-1/6 mt-3 flex flex-col items-center gap-20 px-3 py-4 font-bold text-md">
      <NavigationList />
    </nav>
  )
}
