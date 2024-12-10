import type { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/store/modal/modalSlice'

type ModalContainer = {
  children: React.ReactNode
}

export default function ModalContainer({ children }: ModalContainer) {
  const dispatch = useDispatch()
  const handleModalBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    dispatch(closeModal())
  }

  const handleModalContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  return (
    <div
      className="text-white flex items-center justify-center fixed top-0 h-full right-0 left-0 z-50 bg-gray-800 bg-opacity-40 rounded-lg  backdrop-blur-sm"
      onClick={handleModalBackdropClick}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          className={`text-dim-gray-600 font-bold bg-white rounded-xl shadow-md p-3 max-w-[670px] w-full h-4/6 flex flex-col justify-center`}
          onClick={handleModalContentClick}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
