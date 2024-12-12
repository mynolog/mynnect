import { type Tweet } from '@/types/tweetTypes'
import { db } from '@/config/firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'

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

export const getAllTweets = async () => {}
