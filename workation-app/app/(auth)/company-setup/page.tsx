'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const INDUSTRIES = ['IT·소프트웨어', '제조·엔지니어링', '금융·핀테크', '바이오·헬스케어', '유통·이커머스', '미디어·콘텐츠', '기타']
const PURPOSES   = ['팀 결속력 강화', '집중 업무 환경', '번아웃 회복', '신규 프로젝트 킥오프', '전략 워크숍']

export default function CompanySetupPage() {
  const router = useRouter()
  const [industry, setIndustry] = useState('')
  const [purposes, setPurposes] = useState<string[]>([])

  function togglePurpose(p: string) {
    setPurposes(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-xs text-[#94A3B8] mb-2">가입 완료 · 회사 정보 등록</div>
          <h1 className="text-xl font-bold">회사 정보를 입력해주세요</h1>
          <p className="text-sm text-[#475569] mt-1">AI 매칭 정확도와 예산 관리에 활용됩니다</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4">
          <Input label="회사명" placeholder="(주)더워케이션" />
          <Input label="담당자 이름" placeholder="홍길동" />
          <Input label="직원 수" type="number" placeholder="50" />

          {/* 업종 선택 */}
          <div>
            <label className="text-sm font-medium text-[#475569] mb-1.5 block">업종 <span className="text-xs text-blue-400">(AI 매칭에 활용)</span></label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map(i => (
                <button key={i} onClick={() => setIndustry(i)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    industry === i ? 'bg-blue-500 text-white' : 'bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:border-blue-500/50'
                  }`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* 워케이션 목적 */}
          <div>
            <label className="text-sm font-medium text-[#475569] mb-1.5 block">워케이션 주요 목적 <span className="text-xs">(복수 선택)</span></label>
            <div className="flex flex-wrap gap-2">
              {PURPOSES.map(p => (
                <button key={p} onClick={() => togglePurpose(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    purposes.includes(p) ? 'bg-purple-500/30 text-purple-600 border border-purple-500/40' : 'bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]'
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 연간 예산 */}
          <div>
            <label className="text-sm font-medium text-[#475569] mb-1.5 block">워케이션 연간 예산</label>
            <div className="relative">
              <input type="number" placeholder="5000000"
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-blue-500 pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">원</span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">나중에 변경할 수 있어요</p>
          </div>

          <Button size="lg" className="w-full mt-2" onClick={() => router.push('/accommodations')}>
            시작하기 →
          </Button>
        </div>
      </div>
    </div>
  )
}
