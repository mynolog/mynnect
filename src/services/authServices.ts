import { auth, db } from '@/config/firebaseConfig'
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { providersMap } from '@/config/providersMap'
import { SignupUserCredential } from '@/types/userTypes'

export const loginWithProvider = async (provider: 'google' | 'github') => {
  if (providersMap[provider].auth === null) {
    return
  }
  try {
    const userCredential = await signInWithPopup(auth, providersMap[provider].auth)
    const idToken = await userCredential.user.getIdToken()
    document.cookie = `token=${idToken}; path=/; max-age=3600; secure`

    const { uid, email, displayName, photoURL } = userCredential.user
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

//TODO: 로컬 로그인 로직 완료하기
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await userCredential.user.getIdToken()
    document.cookie = `token=${idToken}; path=/; max-age=3600; secure`
    return userCredential
  } catch (e) {
    console.error(e)
    throw e
  }
}

//TODO: 로컬 회원가입 로직 완료하기
export const signupWithEmailAndPassword = async ({
  email,
  password,
  displayName,
  nickName,
}: SignupUserCredential) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)

    const { user } = result
    await updateProfile(user, { displayName })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      nickName,
    }
    await setDoc(doc(db, 'users', user.uid), newUser)
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
