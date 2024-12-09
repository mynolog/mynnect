import { auth } from '@/config/firebaseConfig'

export const fetchUser = async () => {
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
