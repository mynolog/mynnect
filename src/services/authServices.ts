import { auth, db } from '@/config/firebaseConfig'
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { providerMap } from '@/config/ProviderMap'

export const loginWithProvider = async (provider: 'google' | 'github') => {
  if (providerMap[provider].auth === null) {
    return
  }
  try {
    const result = await signInWithPopup(auth, providerMap[provider].auth)

    const { uid, email, displayName, photoURL } = result.user
    const newUser = {
      uid,
      email,
      displayName,
      photoURL,
    }
    await setDoc(doc(db, 'users', uid), newUser)
    return newUser
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const signupWithEmailAndPassword = async (
  userEmail: string,
  password: string,
  name: string,
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, userEmail, password)

    const { user } = result
    await updateProfile(user, { displayName: name })

    console.log(user.displayName)

    const { uid, email, displayName, photoURL } = result.user
    const newUser = {
      uid,
      email,
      displayName,
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
