'use client'
import { useParams } from 'next/navigation'

export default function ProfileDetail() {
  const { uid } = useParams()
  return <div>유저 페이지: {uid}</div>
}
