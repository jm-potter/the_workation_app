'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function CompanySetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-xs text-[#64748B] mb-2">가입 완료 · 회사 정보 등록</div>
          <h1 className="text-xl font-bold">회사 정보를 입력해주세요</h1>
          <p className="text-sm text-[#94A3B8] mt-1">예산 관리와 직원 초대에 필요해요</p>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
          <Input label="회사명" placeholder="(주)더워케이션" />
          <Input label="담당자 이름" placeholder="홍길동" />
          <Input label="직원 수" type="number" placeholder="50" />
          <div>
            <label className="text-sm font-medium text-[#94A3B8] mb-1.5 block">워케이션 연간 예산</label>
            <div className="relative">
              <input
                type="number"
                placeholder="5000000"
                className="w-full bg-[#263548] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-blue-500 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">원</span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">나중에 변경할 수 있어요</p>
          </div>
          <Button size="lg" className="w-full mt-2" onClick={() => router.push('/accommodations')}>
            시작하기 →
          </Button>
        </div>
      </div>
    </div>
  )
}
