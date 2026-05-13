'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabase'

export function useAuthOnly() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
    })
  }, [])
}
