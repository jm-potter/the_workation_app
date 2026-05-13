'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'

const roles = [
  { value: 'hr',  label: '인사담당자', desc: '기업 예약·예산 관리' },
  { value: 'emp', label: '직원',       desc: '개인 워케이션 예약' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole]         = useState<'hr' | 'emp' | ''>('')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleRegister() {
    if (!role || !name || !email || !password) {
      setError('모든 항목을 입력해주세요')
      return
    }
    setError('')
    setLoading(true)
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } },
      })
      setLoading(false)
      if (authError) {
        setError(authError.message)
      } else if (data.user) {
        router.push('/dashboard')
      } else {
        setError('가입 처리 중 오류가 발생했어요. 다시 시도해주세요.')
      }
    } catch (e: unknown) {
      setLoading(false)
      setError('연결 오류: ' + (e instanceof Error ? e.message : String(e)))
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-black text-[#0F172A]">더 워케이션</Link>
          <p className="text-sm text-[#475569] mt-2">새 계정을 만들어보세요</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-[#475569] mb-2">역할을 선택해주세요</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button key={r.value} onClick={() => setRole(r.value as 'hr' | 'emp')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === r.value ? 'border-blue-500 bg-blue-500/10' : 'border-[#E2E8F0] bg-[#F1F5F9] hover:border-[#94A3B8]'
                  }`}>
                  <div className="font-semibold text-sm">{r.label}</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Input label="이름" type="text" placeholder="홍길동" value={name} onChange={e => setName(e.target.value)} />
          <Input label="이메일" type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="비밀번호" type="password" placeholder="6자 이상" value={password} onChange={e => setPassword(e.target.value)} />

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button
            onClick={handleRegister}
            style={{ background: '#3B82F6', color: 'white', width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 700, fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '4px' }}
          >
            {loading ? '가입 중...' : '가입하기'}
          </button>
        </div>

        <p className="text-center text-sm text-[#94A3B8] mt-6">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-blue-400 hover:underline font-medium">로그인</Link>
        </p>
      </div>
    </div>
  )
}
