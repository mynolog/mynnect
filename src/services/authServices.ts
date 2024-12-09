import { auth, db } from '@/config/firebaseConfig'
import { signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { providerMap } from '@/config/ProviderMap'

export const loginWithProvider = async (provider: 'google' | 'github') => {
  try {
    const result = await signInWithPopup(auth, providerMap[provider].auth)

    const { uid, email, displayName: name, photoURL } = result.user
    const newUser = {
      uid,
      email,
      name,
      photoURL,
    }
    await setDoc(doc(db, 'users', uid), newUser)
    return newUser
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return !auth.currentUser
  } catch (e) {
    console.error(e)
    throw e
  }
}
