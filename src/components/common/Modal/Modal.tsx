'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import ModalContainer from './ModalContainer/ModalContainer'
import { RootState } from '@/store'
import Signup from './ModalBody/Signup/Signup'
import LoginWithEmail from './ModalBody/LoginWithEmail/LoginWithEmail'

export default function Modal() {
  const { isOpen, type } = useSelector((state: RootState) => state.modal)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  const renderModalContent = () => {
    switch (type) {
      case 'signup':
        return <Signup />
      case 'loginWithEmail':
        return <LoginWithEmail />
      default:
        return null
    }
  }

  if (!isOpen || !mounted || !document?.body) return null

  return createPortal(<ModalContainer>{renderModalContent()}</ModalContainer>, document.body)
}
