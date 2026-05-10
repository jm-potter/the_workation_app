'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'

const MOCK = [
  { id: '1', name: '강릉 씨사이드 워크스테이션', location: '강원도 강릉', price_per_night: 85000, wifi: true, workspace: true, images: ['/mock/room1.jpg'], amenities: ['와이파이', '모니터', '주차'], description: '바다가 보이는 업무 공간' },
  { id: '2', name: '제주 한달살기 스튜디오',     location: '제주도 서귀포', price_per_night: 95000, wifi: true, workspace: true, images: ['/mock/room2.jpg'], amenities: ['와이파이', '주방', '세탁기'], description: '제주 자연 속 집중 업무' },
  { id: '3', name: '양양 서퍼스 하우스',          location: '강원도 양양', price_per_night: 70000, wifi: true, workspace: false, images: ['/mock/room3.jpg'], amenities: ['와이파이', '서핑 장비'], description: '서핑과 일의 완벽한 균형' },
  { id: '4', name: '여수 오션뷰 코워킹',          location: '전라남도 여수', price_per_night: 75000, wifi: true, workspace: true, images: ['/mock/room4.jpg'], amenities: ['와이파이', '코워킹존', '카페'], description: '한려해상이 보이는 작업 공간' },
  { id: '5', name: '속초 설악 리트릿',            location: '강원도 속초', price_per_night: 65000, wifi: true, workspace: true, images: ['/mock/room5.jpg'], amenities: ['와이파이', '모니터', '산책로'], description: '설악산 아래 조용한 집중 환경' },
  { id: '6', name: '전주 한옥 워크스테이션',      location: '전라북도 전주', price_per_night: 80000, wifi: true, workspace: true, images: ['/mock/room6.jpg'], amenities: ['와이파이', '한옥 정원', '자전거'], description: '한옥 감성의 특별한 워케이션' },
]

const LOCATIONS = ['전체', '강원도', '제주도', '전라남도', '전라북도']

export default function AccommodationsPage() {
  const [location, setLocation] = useState('전체')
  const [workspaceOnly, setWorkspaceOnly] = useState(false)

  const filtered = MOCK.filter((a) => {
    if (location !== '전체' && !a.location.includes(location)) return false
    if (workspaceOnly && !a.workspace) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 타이틀 + 지도 링크 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">숙소 찾기</h1>
            <p className="text-sm text-[#94A3B8]">전국 {MOCK.length}개 제휴 숙소</p>
          </div>
          <Link href="/accommodations/map"
            className="flex items-center gap-2 bg-[#1E293B] border border-[#334155] rounded-xl px-4 py-2 text-sm hover:border-blue-500/50 transition-all">
            🗺️ 지도로 보기
          </Link>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex gap-2">
            {LOCATIONS.map((loc) => (
              <button key={loc}
                onClick={() => setLocation(loc)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  location === loc
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:border-[#475569]'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
          <button
            onClick={() => setWorkspaceOnly(!workspaceOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              workspaceOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-[#1E293B] text-[#94A3B8] border-[#334155]'
            }`}
          >
            💻 업무 공간 있는 곳만
          </button>
        </div>

        {/* 숙소 그리드 */}
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((acc) => (
            <Link key={acc.id} href={`/accommodations/${acc.id}`}>
              <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all group">
                {/* 이미지 자리 */}
                <div className="h-44 bg-[#263548] flex items-center justify-center text-4xl group-hover:bg-[#2e3f56] transition-colors">
                  🏨
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-snug">{acc.name}</h3>
                  </div>
                  <p className="text-xs text-[#64748B] mb-3">📍 {acc.location}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {acc.wifi && <span className="text-xs bg-[#263548] text-[#94A3B8] px-2 py-0.5 rounded">📶 와이파이</span>}
                    {acc.workspace && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">💻 업무공간</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-bold text-sm">{acc.price_per_night.toLocaleString()}원<span className="text-[#64748B] font-normal text-xs"> /박</span></span>
                    <span className="text-xs text-[#64748B]">→ 상세보기</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">
            조건에 맞는 숙소가 없어요
          </div>
        )}
      </div>
    </div>
  )
}
