export const getTimeDifference = (createdAt: number): string => {
  const now = new Date()
  const timestamp = new Date(createdAt)
  const diffInMs = now.getTime() - timestamp.getTime()

  const seconds = Math.floor(diffInMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return '방금 전'
  } else if (minutes < 60) {
    return `${minutes}분 전`
  } else if (hours < 24) {
    return `${hours}시간 전`
  } else if (days < 30) {
    return `${days}일 전`
  } else {
    const year = timestamp.getFullYear()
    const month = timestamp.getMonth() + 1
    const formattedMonth = month < 10 ? String(month) : String(month).padStart(2, '0')
    const date = String(timestamp.getDate()).padStart(2, '0')
    return `${year}년 ${formattedMonth}월 ${date}일`
  }
}
