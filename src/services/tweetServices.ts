import type { Tweet } from '@/types/tweetTypes'
import { db } from '@/config/firebaseConfig'
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore'

export const createTweet = async (tweet: Tweet) => {
  try {
    const collectionRef = collection(db, 'tweets')
    const newDocRef = doc(collectionRef)
    await setDoc(newDocRef, {
      ...tweet,
      id: newDocRef.id,
    })
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}

export const fetchTweets = async (): Promise<Tweet[]> => {
  const collectionRef = collection(db, 'tweets')
  const snapshot = await getDocs(collectionRef)
  const tweets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Tweet[]

  return tweets
}

export const updateTweet = async (docId: string, newTweet: Tweet) => {
  try {
    const docRef = doc(db, 'tweets', docId)
    await setDoc(docRef, {
      ...newTweet,
    })
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}

export const deleteTweet = async (docId: string) => {
  try {
    const docRef = doc(db, 'tweets', docId)
    await deleteDoc(docRef)
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
