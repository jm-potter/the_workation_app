'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleLogin() {
    setError('')
    setLoading(true)
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('이메일 또는 비밀번호가 올바르지 않아요')
    } else {
      const role = data.user?.user_metadata?.role
      if (role === 'emp') router.push('/accommodations')
      else if (role === 'hr') router.push('/dashboard')
      else router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-black text-[#0F172A]">더 워케이션</Link>
          <p className="text-sm text-[#475569] mt-2">계정에 로그인하세요</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4">
          <Input
            label="이메일"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <Button size="lg" className="w-full mt-2" onClick={handleLogin}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </div>

        <p className="text-center text-sm text-[#94A3B8] mt-6">
          계정이 없으신가요?{' '}
          <Link href="/register" className="text-blue-400 hover:underline font-medium">회원가입</Link>
        </p>
      </div>
    </div>
  )
}
