type LogoProps = {
  type: 'full' | 'short'
}

export default function Logo({ type }: LogoProps) {
  return (
    <div className="w-64 h-16 flex justify-center items-center">
      <span className="text-5xl text-off-white-500 font-righteous">
        {type === 'full' ? 'mynnect.' : 'my.'}
      </span>
    </div>
  )
}
