'use client'
import { useState } from 'react'
import Link from 'next/link'

const MY_ACCOMMODATIONS = [
  {
    id: '1',
    name: '강릉 씨사이드 워크스테이션',
    location: '강원도 강릉시 해변로 123',
    price: 85000,
    capacity: 8,
    status: 'active',
    rating: 4.8,
    totalBookings: 24,
    amenities: ['Wi-Fi', '모니터', '화이트보드', '주차', '조식'],
    description: '바다가 보이는 워케이션 전용 숙소. 개인 작업실과 팀 미팅룸 완비.',
  },
]

export default function PartnerAccommodationsPage() {
  const [editing, setEditing] = useState(false)
  const acc = MY_ACCOMMODATIONS[0]

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur border-b border-[#334155] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/partner" className="text-[#64748B] hover:text-[#94A3B8] transition-colors">← 대시보드</Link>
          <span className="text-[#334155]">/</span>
          <span className="font-semibold">내 숙소 관리</span>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
            editing
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {editing ? '저장하기' : '수정하기'}
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* 숙소 상태 배너 */}
        <div className="flex items-center justify-between bg-[#1E293B] border border-[#334155] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            <span className="text-sm font-medium">운영 중</span>
            <span className="text-xs text-[#64748B]">· 예약 가능 상태입니다</span>
          </div>
          <button className="text-xs text-red-400 hover:text-red-300 transition-colors">운영 중단</button>
        </div>

        <div className="flex flex-col gap-5">
          {/* 기본 정보 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
            <h2 className="font-bold text-sm text-[#94A3B8] mb-4 uppercase tracking-wide">기본 정보</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">숙소명</label>
                <input
                  defaultValue={acc.name}
                  disabled={!editing}
                  className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">주소</label>
                <input
                  defaultValue={acc.location}
                  disabled={!editing}
                  className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#94A3B8] mb-1.5 block">1박 가격 (원)</label>
                  <input
                    type="number"
                    defaultValue={acc.price}
                    disabled={!editing}
                    className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#94A3B8] mb-1.5 block">최대 수용 인원</label>
                  <input
                    type="number"
                    defaultValue={acc.capacity}
                    disabled={!editing}
                    className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">숙소 소개</label>
                <textarea
                  rows={3}
                  defaultValue={acc.description}
                  disabled={!editing}
                  className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500 disabled:opacity-60 resize-none"
                />
              </div>
            </div>
          </div>

          {/* 편의시설 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
            <h2 className="font-bold text-sm text-[#94A3B8] mb-4 uppercase tracking-wide">편의시설</h2>
            <div className="flex flex-wrap gap-2">
              {['Wi-Fi', '모니터', '화이트보드', '주차', '조식', '세탁기', '에어컨', '프린터', '회의실', '휴게공간'].map(item => {
                const has = acc.amenities.includes(item)
                return (
                  <button
                    key={item}
                    disabled={!editing}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:cursor-default ${
                      has
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-[#263548] text-[#64748B] border border-[#334155]'
                    } ${editing ? 'hover:border-blue-500/60' : ''}`}
                  >
                    {has ? '✓ ' : ''}{item}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 사진 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm text-[#94A3B8] uppercase tracking-wide">숙소 사진</h2>
              {editing && <button className="text-xs text-blue-400 hover:text-blue-300">+ 사진 추가</button>}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="aspect-square bg-[#263548] rounded-xl flex items-center justify-center text-2xl text-[#334155]">
                  🏨
                </div>
              ))}
              {editing && (
                <div className="aspect-square bg-[#263548] border-2 border-dashed border-[#334155] rounded-xl flex items-center justify-center text-[#64748B] text-2xl cursor-pointer hover:border-blue-500/50 transition-colors">
                  +
                </div>
              )}
            </div>
          </div>

          {/* 통계 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
            <h2 className="font-bold text-sm text-[#94A3B8] mb-4 uppercase tracking-wide">운영 현황</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '총 예약 수',  value: `${acc.totalBookings}건`, color: 'text-blue-400' },
                { label: '평균 평점',   value: `⭐ ${acc.rating}`,       color: 'text-amber-400' },
                { label: '재방문율',    value: '42%',                    color: 'text-emerald-400' },
              ].map(s => (
                <div key={s.label} className="bg-[#263548] rounded-xl p-4 text-center">
                  <div className={`text-xl font-black ${s.color} mb-1`}>{s.value}</div>
                  <div className="text-xs text-[#64748B]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
