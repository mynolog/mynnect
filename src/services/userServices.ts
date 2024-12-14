import { auth, db } from '@/config/firebaseConfig'
import { User } from '@/types/userTypes'
import { getDoc, doc } from 'firebase/firestore'

export const fetchUser = async () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    return JSON.parse(storedUser)
  }

  const { currentUser } = auth
  if (!currentUser) {
    return null
  }

  let user: User | null = null
  const userRef = doc(db, 'users', currentUser.uid)
  const userDoc = await getDoc(userRef)
  if (userDoc.exists()) {
    const existedUser = userDoc.data() as User
    user = {
      ...existedUser,
    }
  }

  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return user
}
