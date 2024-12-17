import { type ChangeEvent } from 'react'

type BaseInputProps = {
  type: 'email' | 'password' | 'text'
  placeholder: string
  value: string
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function BaseInput({
  type,
  placeholder,
  value,
  name,
  onChange,
  className,
}: BaseInputProps) {
  return (
    <input
      className={`px-3 py-2 border-2  border-dim-gray-600 focus:border-2 focus:border-steel-blue-600 focus:outline-none rounded-xl transition-colors duration-3 00 ease-linear ${className}`}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
