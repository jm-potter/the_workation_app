'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabase'

export function useHrOnly() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const role = data.user?.user_metadata?.role
      if (!role) router.push('/login')
      else if (role !== 'hr') router.push('/accommodations')
    })
  }, [])
}
