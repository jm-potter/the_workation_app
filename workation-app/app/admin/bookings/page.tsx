'use client'
import { useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const BOOKINGS = [
  { id: 'WK-0010', company: '삼성전자', employee: '김지수', accommodation: '강릉 씨사이드 워크스테이션', checkIn: '2026-06-10', checkOut: '2026-06-13', nights: 3, people: 4, amount: 1020000, status: 'confirmed' as const },
  { id: 'WK-0009', company: 'LG전자',   employee: '박민준', accommodation: '제주 한달살기 스튜디오',     checkIn: '2026-06-05', checkOut: '2026-06-08', nights: 3, people: 3, amount: 855000, status: 'confirmed' as const },
  { id: 'WK-0008', company: '카카오',   employee: '이서연', accommodation: '양양 서퍼스 하우스',          checkIn: '2026-05-28', checkOut: '2026-05-30', nights: 2, people: 2, amount: 280000, status: 'pending'   as const },
  { id: 'WK-0007', company: '네이버',   employee: '최준혁', accommodation: '여수 오션뷰 코워킹',          checkIn: '2026-05-20', checkOut: '2026-05-23', nights: 3, people: 3, amount: 675000, status: 'cancelled' as const },
  { id: 'WK-0006', company: '삼성전자', employee: '정유진', accommodation: '속초 설악 리트릿',            checkIn: '2026-05-15', checkOut: '2026-05-17', nights: 2, people: 2, amount: 260000, status: 'confirmed' as const },
  { id: 'WK-0005', company: 'SK텔레콤', employee: '한동훈', accommodation: '전주 한옥 스테이',            checkIn: '2026-05-10', checkOut: '2026-05-12', nights: 2, people: 4, amount: 640000, status: 'confirmed' as const },
  { id: 'WK-0004', company: '현대자동차', employee: '오민서', accommodation: '강릉 씨사이드 워크스테이션', checkIn: '2026-05-05', checkOut: '2026-05-07', nights: 2, people: 6, amount: 1020000, status: 'confirmed' as const },
]

type StatusFilter = 'all' | 'confirmed' | 'pending' | 'cancelled'
const statusLabel: Record<string, string> = { confirmed: '확정', pending: '대기중', cancelled: '취소' }

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [search, setSearch] = useState('')

  const filtered = BOOKINGS.filter(b =>
    (filter === 'all' || b.status === filter) &&
    (b.company.includes(search) || b.employee.includes(search) || b.id.includes(search))
  )

  const totalAmount = filtered.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.amount : sum, 0)

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur border-b border-[#334155] px-6 h-14 flex items-center">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-[#64748B] hover:text-[#94A3B8] transition-colors">← 대시보드</Link>
          <span className="text-[#334155]">/</span>
          <span className="font-semibold">예약 관리</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 요약 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '전체 예약',  value: `${BOOKINGS.length}건`,  color: 'text-blue-400'    },
            { label: '확정',       value: `${BOOKINGS.filter(b => b.status === 'confirmed').length}건`, color: 'text-emerald-400' },
            { label: '대기중',     value: `${BOOKINGS.filter(b => b.status === 'pending').length}건`,   color: 'text-amber-400'   },
            { label: '총 매출',    value: `${(totalAmount / 10000).toLocaleString()}만원`,              color: 'text-purple-400'  },
          ].map(s => (
            <div key={s.label} className="bg-[#1E293B] border border-[#334155] rounded-xl p-4">
              <p className="text-xs text-[#64748B] mb-1">{s.label}</p>
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* 필터 & 검색 */}
        <div className="flex items-center gap-3 mb-5">
          <input
            type="text"
            placeholder="기업명, 직원명, 예약번호 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-[#1E293B] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-1.5">
            {(['all', 'confirmed', 'pending', 'cancelled'] as StatusFilter[]).map(s => (
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
                {['예약번호', '기업', '직원', '숙소', '체크인', '체크아웃', '인원', '금액', '상태', '액션'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-[#334155]/50 hover:bg-[#263548]/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-[#64748B]">{b.id}</td>
                  <td className="px-4 py-3 text-xs font-medium">{b.company}</td>
                  <td className="px-4 py-3 font-medium">{b.employee}</td>
                  <td className="px-4 py-3 text-xs text-[#94A3B8] max-w-[140px] truncate">{b.accommodation}</td>
                  <td className="px-4 py-3 text-xs text-[#94A3B8]">{b.checkIn}</td>
                  <td className="px-4 py-3 text-xs text-[#94A3B8]">{b.checkOut}</td>
                  <td className="px-4 py-3 text-xs text-[#94A3B8]">{b.people}명</td>
                  <td className="px-4 py-3 font-medium">{b.amount.toLocaleString()}원</td>
                  <td className="px-4 py-3"><Badge variant={b.status}>{statusLabel[b.status]}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {b.status === 'pending' && (
                        <>
                          <button className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30">승인</button>
                          <button className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30">거절</button>
                        </>
                      )}
                      {b.status === 'confirmed' && (
                        <button className="text-xs px-2 py-0.5 bg-[#263548] text-[#94A3B8] rounded-md hover:bg-[#334155]">상세</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#334155] text-xs text-[#64748B]">
            총 {filtered.length}건
          </div>
        </div>
      </div>
    </div>
  )
}
