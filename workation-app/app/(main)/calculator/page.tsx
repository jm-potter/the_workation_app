'use client'
import { useState } from 'react'
import Header from '@/components/ui/Header'

const ACCOMMODATIONS = [
  { name: '강릉 씨사이드 워크스테이션', price: 85000 },
  { name: '제주 한달살기 스튜디오',     price: 95000 },
  { name: '양양 서퍼스 하우스',          price: 70000 },
  { name: '여수 오션뷰 코워킹',          price: 75000 },
  { name: '속초 설악 리트릿',            price: 65000 },
  { name: '전주 한옥 스테이',            price: 80000 },
]

export default function CalculatorPage() {
  const [nights, setNights]   = useState(3)
  const [people, setPeople]   = useState(4)
  const [accIdx, setAccIdx]   = useState(0)
  const [extra, setExtra]     = useState(50000)

  const acc         = ACCOMMODATIONS[accIdx]
  const roomCost    = acc.price * nights
  const totalPeople = people
  const transport   = totalPeople * 30000
  const meal        = totalPeople * nights * 15000
  const extraCost   = extra
  const total       = roomCost + transport + meal + extraCost
  const perPerson   = Math.round(total / totalPeople)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">워케이션 비용 계산기</h1>
          <p className="text-sm text-[#475569]">예상 비용을 미리 계산해보세요</p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* 입력 카드 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide">조건 입력</h2>

            {/* 숙소 선택 */}
            <div>
              <label className="text-xs text-[#475569] mb-1.5 block">숙소</label>
              <select
                value={accIdx}
                onChange={e => setAccIdx(Number(e.target.value))}
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500"
              >
                {ACCOMMODATIONS.map((a, i) => (
                  <option key={i} value={i}>{a.name} ({a.price.toLocaleString()}원/박)</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 숙박 일수 */}
              <div>
                <label className="text-xs text-[#475569] mb-1.5 block">숙박 일수</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNights(Math.max(1, nights - 1))}
                    className="w-8 h-8 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:border-blue-500 transition-colors"
                  >-</button>
                  <span className="font-bold text-lg w-8 text-center">{nights}</span>
                  <button
                    onClick={() => setNights(Math.min(30, nights + 1))}
                    className="w-8 h-8 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:border-blue-500 transition-colors"
                  >+</button>
                  <span className="text-xs text-[#94A3B8]">박</span>
                </div>
              </div>

              {/* 인원 */}
              <div>
                <label className="text-xs text-[#475569] mb-1.5 block">참여 인원</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPeople(Math.max(1, people - 1))}
                    className="w-8 h-8 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:border-blue-500 transition-colors"
                  >-</button>
                  <span className="font-bold text-lg w-8 text-center">{people}</span>
                  <button
                    onClick={() => setPeople(Math.min(20, people + 1))}
                    className="w-8 h-8 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:border-blue-500 transition-colors"
                  >+</button>
                  <span className="text-xs text-[#94A3B8]">명</span>
                </div>
              </div>
            </div>

            {/* 기타 비용 */}
            <div>
              <label className="text-xs text-[#475569] mb-1.5 block">기타 비용 (팀빌딩, 액티비티 등)</label>
              <div className="relative">
                <input
                  type="number"
                  value={extra}
                  onChange={e => setExtra(Number(e.target.value))}
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">원</span>
              </div>
            </div>
          </div>

          {/* 결과 카드 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-4">예상 비용 내역</h2>

            <div className="flex flex-col gap-3 text-sm">
              {[
                ['숙박비', `${acc.price.toLocaleString()}원 × ${nights}박`, roomCost],
                ['교통비 (1인 3만원)', `${totalPeople}명`, transport],
                ['식비 (1인 1박 1.5만원)', `${totalPeople}명 × ${nights}박`, meal],
                ['기타', '', extraCost],
              ].map(([label, desc, val]) => (
                <div key={label as string} className="flex justify-between items-center">
                  <div>
                    <span className="text-[#475569]">{label}</span>
                    {desc && <span className="text-xs text-[#94A3B8] ml-2">{desc}</span>}
                  </div>
                  <span>{(val as number).toLocaleString()}원</span>
                </div>
              ))}

              <div className="border-t border-[#E2E8F0] pt-4 mt-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-base">총 예상 비용</span>
                  <span className="font-black text-xl text-blue-400">{total.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                  <span>1인당 비용</span>
                  <span className="text-emerald-400 font-semibold">{perPerson.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </div>

          {/* 예산 비교 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-4">회사 예산 현황</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#475569]">연간 예산</span>
              <span>5,000,000원</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#475569]">이미 사용</span>
              <span className="text-amber-400">1,850,000원</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-[#475569]">이번 워케이션 예상</span>
              <span className="text-blue-400 font-bold">{total.toLocaleString()}원</span>
            </div>
            <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full flex">
                <div className="bg-amber-400 h-full transition-all" style={{ width: '37%' }} />
                <div className="bg-blue-500 h-full transition-all" style={{ width: `${Math.min(((total / 5000000) * 100), 63)}%` }} />
              </div>
            </div>
            <div className="flex gap-4 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full inline-block" />사용됨</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />이번 예산</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#F1F5F9] rounded-full inline-block" />잔여</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
