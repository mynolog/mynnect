import { useEffect, useState } from 'react'
import { mutate } from 'swr'
import { db } from '@/config/firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

interface BaseDocument {
  id: string
}

export const useFirestoreData = <T extends BaseDocument>(
  collectionName: string,
): { data: T[]; isLoading: boolean } => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[]
        setData(newData)
        mutate(collectionName, newData, false)
        setIsLoading(false)
      },
      (error) => {
        console.error(error)
        setIsLoading(false)
      },
    )

    return () => unsubscribe()
  }, [collectionName])

  return { data, isLoading }
}
