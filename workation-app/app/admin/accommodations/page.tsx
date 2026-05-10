'use client'
import { useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const ACCOMMODATIONS = [
  { id: '1', name: '강릉 씨사이드 워크스테이션', location: '강원도 강릉',  price: 85000, capacity: 8,  status: 'active',   bookings: 24, rating: 4.8 },
  { id: '2', name: '제주 한달살기 스튜디오',     location: '제주도 서귀포', price: 95000, capacity: 4,  status: 'active',   bookings: 31, rating: 4.9 },
  { id: '3', name: '양양 서퍼스 하우스',          location: '강원도 양양',  price: 70000, capacity: 6,  status: 'active',   bookings: 18, rating: 4.7 },
  { id: '4', name: '여수 오션뷰 코워킹',          location: '전라남도 여수', price: 75000, capacity: 10, status: 'active',   bookings: 15, rating: 4.6 },
  { id: '5', name: '속초 설악 리트릿',            location: '강원도 속초',  price: 65000, capacity: 6,  status: 'active',   bookings: 12, rating: 4.5 },
  { id: '6', name: '전주 한옥 스테이',            location: '전라북도 전주', price: 80000, capacity: 4,  status: 'active',   bookings: 9,  rating: 4.8 },
  { id: '7', name: '부산 해운대 코워크',          location: '부산 해운대구', price: 90000, capacity: 12, status: 'pending',  bookings: 0,  rating: 0   },
  { id: '8', name: '강릉 율곡 리트릿',            location: '강원도 강릉',  price: 72000, capacity: 8,  status: 'pending',  bookings: 0,  rating: 0   },
  { id: '9', name: '통영 바다쉼',                location: '경남 통영',    price: 68000, capacity: 6,  status: 'inactive', bookings: 3,  rating: 4.3 },
]

type StatusFilter = 'all' | 'active' | 'pending' | 'inactive'

const statusLabel: Record<string, string> = { active: '운영중', pending: '검토중', inactive: '중단' }
const statusColor: Record<string, string> = {
  active:   'bg-emerald-500/20 text-emerald-400',
  pending:  'bg-amber-500/20 text-amber-400',
  inactive: 'bg-[#334155] text-[#64748B]',
}

export default function AdminAccommodationsPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [search, setSearch] = useState('')

  const filtered = ACCOMMODATIONS.filter(a =>
    (filter === 'all' || a.status === filter) &&
    (a.name.includes(search) || a.location.includes(search))
  )

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur border-b border-[#334155] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-[#64748B] hover:text-[#94A3B8] transition-colors">← 대시보드</Link>
          <span className="text-[#334155]">/</span>
          <span className="font-semibold">숙소 관리</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          + 숙소 등록
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 필터 & 검색 */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="숙소명 또는 지역 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-[#1E293B] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-1.5">
            {(['all', 'active', 'pending', 'inactive'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filter === s ? 'bg-blue-500 text-white' : 'bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:border-blue-500/50'
                }`}
              >
                {s === 'all' ? '전체' : statusLabel[s]}
              </button>
            ))}
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#64748B] border-b border-[#334155]">
                {['숙소명', '위치', '가격/박', '수용인원', '예약수', '평점', '상태', '액션'].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-[#334155]/50 hover:bg-[#263548]/50 transition-colors">
                  <td className="px-5 py-4 font-medium">{a.name}</td>
                  <td className="px-5 py-4 text-xs text-[#94A3B8]">📍 {a.location}</td>
                  <td className="px-5 py-4">{a.price.toLocaleString()}원</td>
                  <td className="px-5 py-4 text-[#94A3B8]">최대 {a.capacity}명</td>
                  <td className="px-5 py-4 text-[#94A3B8]">{a.bookings}건</td>
                  <td className="px-5 py-4">{a.rating > 0 ? `⭐ ${a.rating}` : '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColor[a.status]}`}>
                      {statusLabel[a.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {a.status === 'pending' && (
                        <>
                          <button className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors">승인</button>
                          <button className="text-xs px-2.5 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">반려</button>
                        </>
                      )}
                      {a.status !== 'pending' && (
                        <>
                          <button className="text-xs px-2.5 py-1 bg-[#263548] text-[#94A3B8] rounded-lg hover:border hover:border-blue-500/50 transition-colors">수정</button>
                          <button className="text-xs px-2.5 py-1 bg-[#263548] text-[#94A3B8] rounded-lg hover:border hover:border-red-500/50 transition-colors">
                            {a.status === 'active' ? '중단' : '재개'}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#334155] text-xs text-[#64748B]">
            총 {filtered.length}개 숙소
          </div>
        </div>
      </div>
    </div>
  )
}
