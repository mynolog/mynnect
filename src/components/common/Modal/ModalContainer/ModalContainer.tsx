import type { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '@/store/modal/modalSlice'
import { RootState } from '@/store'
import { getModalTitle } from '@/utils/getUtils'
import Logo from '@/components/layout/Logo/Logo'
import BaseButton from '../../Button/BaseButton'
import { FaXmark } from 'react-icons/fa6'

type ModalContainer = {
  children: React.ReactNode
}

export default function ModalContainer({ children }: ModalContainer) {
  const dispatch = useDispatch()
  const { type } = useSelector((state: RootState) => state.modal)

  const handleModalBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    dispatch(closeModal())
  }

  const handleModalContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleModalCloseButtonClick = () => {
    dispatch(closeModal())
  }

  return (
    <div
      className="text-white flex items-center justify-center fixed top-0 h-full right-0 left-0 z-50 bg-gray-800 bg-opacity-40 rounded-lg  backdrop-blur-sm"
      onClick={handleModalBackdropClick}
      role="dialog"
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          className={`text-dim-gray-600 font-bold bg-white rounded-xl shadow-md p-3 max-w-[670px] w-full h-4/6 flex flex-col gap-2`}
          onClick={handleModalContentClick}
        >
          <div className="flex items-center justify-between px-3 w-full h-16 border-4 border-lime-green-900 rounded-xl">
            <Logo type="short" fontSize="text-3xl" textColor="text-lime-green-500" />
            <h2 className="text-xl font-extrabold">{getModalTitle(type)}</h2>
            <BaseButton
              onClick={handleModalCloseButtonClick}
              width="w-10"
              bgColor="bg-off-white-500"
            >
              <FaXmark className="text-red-600 text-xl" />
            </BaseButton>
          </div>
          <div className="flex items-center justify-center px-3 w-full h-full border-4 border-lime-green-900 rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
