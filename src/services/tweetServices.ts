import { type Tweet } from '@/types/tweetTypes'
import { db } from '@/config/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

export const createTweet = async (tweet: Tweet) => {
  try {
    const tweetRef = collection(db, 'tweets')
    await addDoc(tweetRef, tweet)
  } catch (e) {
    console.error(e)
    throw e
  }
}
