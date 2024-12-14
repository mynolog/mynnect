import { db } from '@/config/firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { User } from '@/types/userTypes'

export const useCurrentUser = (uid: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!uid) return

    const userRef = doc(db, 'users', uid)

    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setUser(doc.data() as User)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [uid])
  return { user, isLoading }
}
