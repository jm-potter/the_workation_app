'use client'
import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-black text-white">더 워케이션</Link>
          <p className="text-sm text-[#94A3B8] mt-2">계정에 로그인하세요</p>
        </div>

        {/* 폼 */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
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
          <Button size="lg" className="w-full mt-2">로그인</Button>
        </div>

        {/* 하단 링크 */}
        <p className="text-center text-sm text-[#64748B] mt-6">
          계정이 없으신가요?{' '}
          <Link href="/register" className="text-blue-400 hover:underline font-medium">
            회원가입
          </Link>
        </p>

      </div>
    </div>
  )
}
