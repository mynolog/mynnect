import { auth, db } from '@/config/firebaseConfig'
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { providersMap } from '@/config/providersMap'
import { SignupUserCredential, User } from '@/types/userTypes'

export const loginWithProvider = async (provider: 'google' | 'github') => {
  if (providersMap[provider].auth === null) {
    return
  }
  try {
    const userCredential = await signInWithPopup(auth, providersMap[provider].auth)
    const idToken = await userCredential.user.getIdToken()
    document.cookie = `token=${idToken}; path=/; max-age=3600; secure`

    const { uid, email, displayName, photoURL } = userCredential.user
    const userRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userRef)

    let newUser: User | null = null
    if (userDoc.exists()) {
      const existedUser = userDoc.data() as User
      console.log(existedUser)
      if (!existedUser.nickName) {
        window.location.href = '/signup/social'
      }
      newUser = {
        ...existedUser,
      }
      await setDoc(doc(db, 'users', uid), newUser)
      return newUser
    }

    newUser = {
      uid,
      email,
      displayName,
      photoURL,
      nickName: null,
    }
    await setDoc(doc(db, 'users', uid), newUser)
    window.location.href = '/signup/social'
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const socialSignupComplete = async (nickName: string, uid: string) => {
  try {
    const userRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userRef)

    let newUser: User | null = null
    if (userDoc.exists()) {
      const existedUser = userDoc.data() as User
      newUser = {
        ...existedUser,
        nickName,
      }
      await setDoc(userRef, newUser, { merge: true })
      return newUser
    }
  } catch (e) {
    console.error(e)
  }
  return null
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
    const userCredential = await createUserWithEmailAndPassword(auth, email!, password)

    const { user } = userCredential
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

export const updateUserProfile = async (uid: string, displayName: string) => {
  try {
    const userRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userRef)
    if (userDoc.exists()) {
      const existedUser = userDoc.data()
      await setDoc(
        userRef,
        {
          ...existedUser,
          displayName,
        },
        {
          merge: true,
        },
      )
    }
  } catch (e) {
    console.error(e)
  }
}
