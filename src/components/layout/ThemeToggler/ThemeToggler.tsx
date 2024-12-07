'use client'

import { useState, useEffect } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

type Theme = 'light' | 'dark'

interface ThemeTogglerProps {
  initialTheme: Theme
}

export default function ThemeToggler({ initialTheme }: ThemeTogglerProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    const themeCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
    const storedTheme = themeCookie ? themeCookie.split('=')[1] : null

    if (storedTheme) {
      setTheme(storedTheme as Theme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme: Theme = isDark ? 'dark' : 'light'
      setTheme(initialTheme)
      document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </div>
  )
}
