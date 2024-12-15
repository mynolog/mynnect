export type Tweet = {
  uid: string
  id: string
  nickName: string
  text: string
  createdAt: number
  updatedAt: number
  photoURL: string | null
  likes: number
  likedBy: string[]
}
