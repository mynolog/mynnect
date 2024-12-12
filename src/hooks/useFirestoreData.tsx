import { db } from '@/config/firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface BaseDocument {
  id: string
}

export const useFirestoreData = <T extends BaseDocument>(collectionName: string): T[] => {
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[],
        )
      },
      (error) => {
        console.error(error)
      },
    )

    return () => unsubscribe()
  }, [collectionName])

  return data
}
