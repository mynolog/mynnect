'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import ModalContainer from './ModalContainer/ModalContainer'
import { RootState } from '@/store'

export default function Modal() {
  const [isMounted, setIsMounted] = useState(false)
  const { isOpen } = useSelector((state: RootState) => state.modal)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !isOpen) return null

  return createPortal(<ModalContainer />, document.body)
}
