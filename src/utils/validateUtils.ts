export const validateNickName = (nickName: string) => {
  const regex = /^[a-z0-9_-]{3,20}$/
  return regex.test(nickName)
}
