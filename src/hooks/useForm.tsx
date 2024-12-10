import type { ChangeEvent } from 'react'
import { useState } from 'react'

export const useForm = <T extends Record<string, string | number | boolean>>(initialValues: T) => {
  const [form, setForm] = useState<T>(initialValues)

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value.trim() === '') {
      setForm((prevState) => ({
        ...prevState,
        [name]: '',
      }))
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const resetForm = () => {
    setForm(initialValues)
  }
  return { form, setForm, handleFormChange, resetForm }
}
