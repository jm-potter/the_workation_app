'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'

const STEPS = ['날짜·인원 선택', '내용 확인', '예약 완료']

export default function BookingPage() {
  const [step, setStep] = useState(0)

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />

      <div className="max-w-xl mx-auto px-6 py-10">
        {/* 단계 표시 */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm font-medium transition-all ${i === step ? 'text-blue-400' : i < step ? 'text-[#94A3B8]' : 'text-[#334155]'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  i === step ? 'bg-blue-500 border-blue-500 text-white'
                  : i < step ? 'bg-[#334155] border-[#334155] text-[#94A3B8]'
                  : 'bg-transparent border-[#334155] text-[#334155]'
                }`}>{i + 1}</span>
                {s}
              </div>
              {i < STEPS.length - 1 && <span className="text-[#334155]">—</span>}
            </div>
          ))}
        </div>

        {/* STEP 0 */}
        {step === 0 && (
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">날짜와 인원을 선택해주세요</h2>

            {/* 숙소 정보 (미리보기) */}
            <div className="bg-[#263548] rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl">🏨</span>
              <div>
                <div className="font-medium text-sm">강릉 씨사이드 워크스테이션</div>
                <div className="text-xs text-[#64748B]">강원도 강릉 · 85,000원/박</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#94A3B8] mb-1 block">체크인</label>
                <input type="date" className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1 block">체크아웃</label>
                <input type="date" className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#94A3B8] mb-1 block">인원</label>
              <select className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500">
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}명</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-[#94A3B8] mb-1 block">특이사항 (선택)</label>
              <textarea rows={2} placeholder="알레르기, 요청사항 등" className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500 resize-none" />
            </div>

            <Button size="lg" className="w-full mt-2" onClick={() => setStep(1)}>다음 → 내용 확인</Button>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">예약 내용을 확인해주세요</h2>

            <div className="bg-[#263548] rounded-xl p-4 flex flex-col gap-3 text-sm">
              {[
                ['숙소', '강릉 씨사이드 워크스테이션'],
                ['체크인', '2026년 6월 10일 (수)'],
                ['체크아웃', '2026년 6월 13일 (토)'],
                ['숙박 기간', '3박'],
                ['인원', '4명'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#64748B]">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <div className="border-t border-[#334155] pt-3 flex justify-between font-bold">
                <span>총 금액</span>
                <span className="text-blue-400 text-lg">1,020,000원</span>
              </div>
              <p className="text-xs text-[#64748B] text-right">회사 예산에서 차감됩니다</p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep(0)}>← 수정</Button>
              <Link href="/booking/confirm" className="flex-1">
                <Button size="lg" className="w-full">예약 완료</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
