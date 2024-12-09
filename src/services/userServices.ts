import { auth } from '@/config/firebaseConfig'

export const fetchUser = async () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    return JSON.parse(storedUser)
  }

  const { currentUser } = auth
  if (!currentUser) {
    return null
  }

  const user = {
    name: currentUser.displayName,
    email: currentUser.email,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
  }

  localStorage.setItem('user', JSON.stringify(user))

  return user
}
