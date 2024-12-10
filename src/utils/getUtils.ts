import { type ModalType } from '@/store/modal/modalSlice'

export const getModalTitle = (type: ModalType) => {
  switch (type) {
    case 'signup':
      return '회원가입'
    case 'loginWithEmail':
      return '이메일 로그인'
    default:
      return ''
  }
}
