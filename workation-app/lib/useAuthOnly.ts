'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, BYPASS_AUTH } from './supabase'

export function useAuthOnly() {
  const router = useRouter()
  useEffect(() => {
    if (BYPASS_AUTH) return
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
    })
  }, [router])
}
