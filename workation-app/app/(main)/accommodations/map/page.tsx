'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'

const PINS = [
  { id: '1', name: '강릉 씨사이드',   location: '강원도 강릉',  price: 85000, x: 72, y: 28 },
  { id: '2', name: '제주 한달살기',   location: '제주도 서귀포', price: 95000, x: 28, y: 82 },
  { id: '3', name: '양양 서퍼스하우스', location: '강원도 양양', price: 70000, x: 68, y: 22 },
  { id: '4', name: '여수 오션뷰',     location: '전라남도 여수', price: 75000, x: 35, y: 70 },
  { id: '5', name: '속초 설악 리트릿', location: '강원도 속초', price: 65000, x: 66, y: 18 },
  { id: '6', name: '전주 한옥',       location: '전라북도 전주', price: 80000, x: 40, y: 55 },
]

export default function MapPage() {
  const [selected, setSelected] = useState<typeof PINS[0] | null>(null)

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 65px)' }}>
        {/* 지도 영역 */}
        <div className="flex-1 bg-[#1a2540] relative overflow-hidden">

          {/* 지도 배경 (실제 카카오맵 연동 전 임시) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-[#334155]">
              <div className="text-6xl mb-3">🗺️</div>
              <div className="text-sm">카카오맵 API 연동 예정</div>
              <div className="text-xs mt-1 text-[#475569]">핀 위치는 실제 좌표로 교체됩니다</div>
            </div>
          </div>

          {/* 핀 */}
          {PINS.map((pin) => (
            <button
              key={pin.id}
              onClick={() => setSelected(pin)}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-full group"
            >
              <div className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg transition-all ${
                selected?.id === pin.id
                  ? 'bg-blue-500 text-white scale-110'
                  : 'bg-[#1E293B] text-[#F1F5F9] border border-[#334155] hover:border-blue-500'
              }`}>
                {pin.price.toLocaleString()}원
              </div>
              <div className={`w-2 h-2 rounded-full mx-auto mt-0.5 ${selected?.id === pin.id ? 'bg-blue-500' : 'bg-[#64748B]'}`} />
            </button>
          ))}
        </div>

        {/* 오른쪽 패널 */}
        <div className="w-72 bg-[#1E293B] border-l border-[#334155] flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-[#334155]">
            <div className="text-sm font-bold mb-1">숙소 {PINS.length}개</div>
            <div className="text-xs text-[#64748B]">핀을 클릭하면 상세 정보가 보여요</div>
          </div>

          {selected ? (
            <div className="p-4">
              <div className="h-28 bg-[#263548] rounded-xl flex items-center justify-center text-4xl mb-3">🏨</div>
              <div className="font-bold text-sm mb-1">{selected.name}</div>
              <div className="text-xs text-[#64748B] mb-3">📍 {selected.location}</div>
              <div className="text-blue-400 font-bold mb-4">{selected.price.toLocaleString()}원<span className="text-[#64748B] font-normal text-xs">/박</span></div>
              <Link href={`/accommodations/${selected.id}`} className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                상세 보기 →
              </Link>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-2 p-4">
              {PINS.map((pin) => (
                <button key={pin.id} onClick={() => setSelected(pin)}
                  className="text-left p-3 bg-[#263548] rounded-xl hover:bg-[#2e3f56] transition-colors border border-transparent hover:border-blue-500/30">
                  <div className="font-medium text-sm">{pin.name}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">{pin.price.toLocaleString()}원/박</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
