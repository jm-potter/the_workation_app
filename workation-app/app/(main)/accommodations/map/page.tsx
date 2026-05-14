'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'

const SUBSIDY_BY_REGION: Record<string, number> = {
  '강원도 속초': 500000,
  '강원도':      100000,
  '제주도':      300000,
  '전라남도':    300000,
  '경상남도':     80000,
  '부산':        500000,
}

const PINS = [
  { id: '1', name: '강릉 씨사이드',    location: '강원도 강릉',  price: 85000, x: 72, y: 28 },
  { id: '2', name: '제주 한달살기',    location: '제주도 서귀포', price: 95000, x: 28, y: 82 },
  { id: '3', name: '양양 서퍼스하우스', location: '강원도 양양', price: 70000, x: 68, y: 22 },
  { id: '4', name: '여수 오션뷰',      location: '전라남도 여수', price: 75000, x: 35, y: 70 },
  { id: '5', name: '속초 설악 리트릿', location: '강원도 속초',  price: 65000, x: 66, y: 18 },
  { id: '6', name: '전주 한옥',        location: '전라북도 전주', price: 80000, x: 40, y: 55 },
]

function getSubsidy(location: string) {
  for (const [region, amount] of Object.entries(SUBSIDY_BY_REGION)) {
    if (location.includes(region)) return amount
  }
  return 0
}

export default function MapPage() {
  const [selected, setSelected] = useState<typeof PINS[0] | null>(null)

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 65px)' }}>
        {/* 지도 영역 */}
        <div className="flex-1 bg-[#EEF2FF] relative overflow-hidden">

          {/* 지도 격자 배경 */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* 지도 안내 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-[#94A3B8]">
              <div className="text-5xl mb-3 opacity-30">🗺️</div>
              <div className="text-sm opacity-50">카카오맵 API 연동 예정</div>
            </div>
          </div>

          {/* 핀 */}
          {PINS.map((pin) => {
            const subsidy = getSubsidy(pin.location)
            const isSelected = selected?.id === pin.id
            return (
              <button
                key={pin.id}
                onClick={() => setSelected(pin)}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full group"
              >
                <div className="flex flex-col items-center">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-md transition-all ${
                    isSelected
                      ? 'bg-blue-500 text-white scale-110'
                      : 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-blue-500'
                  }`}>
                    {pin.price.toLocaleString()}원
                  </div>
                  {subsidy > 0 && (
                    <div className="mt-0.5 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-md shadow-sm">
                      -{subsidy.toLocaleString()}
                    </div>
                  )}
                  <div className={`w-2 h-2 rounded-full mt-0.5 ${isSelected ? 'bg-blue-500' : 'bg-[#64748B]'}`} />
                </div>
              </button>
            )
          })}
        </div>

        {/* 오른쪽 패널 */}
        <div className="w-72 bg-white border-l border-[#E2E8F0] flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-[#E2E8F0]">
            <div className="text-sm font-bold mb-1">숙소 {PINS.length}개</div>
            <div className="text-xs text-[#94A3B8]">핀을 클릭하면 상세 정보가 보여요</div>
          </div>

          {selected ? (
            <div className="p-4">
              <div className="h-28 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-4xl mb-3">🏨</div>
              <div className="font-bold text-sm mb-1">{selected.name}</div>
              <div className="text-xs text-[#94A3B8] mb-2">📍 {selected.location}</div>
              <div className="text-blue-400 font-bold mb-2">{selected.price.toLocaleString()}원<span className="text-[#94A3B8] font-normal text-xs">/박</span></div>
              {getSubsidy(selected.location) > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mb-4">
                  <div className="text-xs text-emerald-700 font-semibold">💰 지원금 적용 가능</div>
                  <div className="text-xs text-emerald-600 mt-0.5">{getSubsidy(selected.location).toLocaleString()}원/인 지원</div>
                </div>
              )}
              <Link href={`/accommodations/${selected.id}`} className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                상세 보기 →
              </Link>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-2 p-4">
              {PINS.map((pin) => {
                const subsidy = getSubsidy(pin.location)
                return (
                  <button key={pin.id} onClick={() => setSelected(pin)}
                    className="text-left p-3 bg-[#F1F5F9] rounded-xl hover:bg-[#E2E8F0] transition-colors border border-transparent hover:border-blue-500/30">
                    <div className="font-medium text-sm">{pin.name}</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-[#94A3B8]">{pin.price.toLocaleString()}원/박</span>
                      {subsidy > 0 && (
                        <span className="text-[10px] text-emerald-600 font-semibold">💰 {subsidy.toLocaleString()}원/인</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
