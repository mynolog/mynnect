export type User = {
  email: string
  displayName: string
  photoURL: string | null
  uid: string
  nickName: string | null
}

export type SignupUserCredential = {
  password: string
} & Pick<User, 'email' | 'displayName' | 'nickName'>
