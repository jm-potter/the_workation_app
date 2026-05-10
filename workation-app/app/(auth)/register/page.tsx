'use client'
import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const roles = [
  { value: 'hr',  label: '인사담당자', desc: '기업 예약·예산 관리' },
  { value: 'emp', label: '직원',       desc: '개인 워케이션 예약' },
]

export default function RegisterPage() {
  const [role, setRole] = useState<'hr' | 'emp' | ''>('')

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-black text-white">더 워케이션</Link>
          <p className="text-sm text-[#94A3B8] mt-2">새 계정을 만들어보세요</p>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">

          {/* 역할 선택 */}
          <div>
            <p className="text-sm font-medium text-[#94A3B8] mb-2">역할을 선택해주세요</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value as 'hr' | 'emp')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === r.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#334155] bg-[#263548] hover:border-[#475569]'
                  }`}
                >
                  <div className="font-semibold text-sm">{r.label}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Input label="이름" type="text" placeholder="홍길동" />
          <Input label="이메일" type="email" placeholder="name@company.com" />
          <Input label="비밀번호" type="password" placeholder="8자 이상" />
          <Button size="lg" className="w-full mt-1" disabled={!role}>가입하기</Button>
        </div>

        <p className="text-center text-sm text-[#64748B] mt-6">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-blue-400 hover:underline font-medium">로그인</Link>
        </p>
      </div>
    </div>
  )
}
