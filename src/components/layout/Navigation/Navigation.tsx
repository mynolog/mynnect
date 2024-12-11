import NavigationList from './NavigationList'

export default function Navigation() {
  return (
    <nav className="fixed top-3 right-3 h-[97%] w-1/6 flex flex-col items-center gap-20 px-3 py-4 rounded-xl border-4 border-lime-green-500 hover:border-lime-green-900 transition-colors ease-in-out duration-300 font-bold text-md">
      <NavigationList />
    </nav>
  )
}
