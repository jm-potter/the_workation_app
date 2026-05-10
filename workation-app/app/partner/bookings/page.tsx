'use client'
import { useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const BOOKINGS = [
  { id: 'WK-0010', company: '삼성전자', contact: '홍길동 HR팀장', checkIn: '2026-06-10', checkOut: '2026-06-13', nights: 3, people: 4, amount: 1020000, status: 'confirmed' as const, note: '' },
  { id: 'WK-0009', company: 'LG전자',   contact: '이서연 HR팀장', checkIn: '2026-06-05', checkOut: '2026-06-08', nights: 3, people: 3, amount: 855000,  status: 'confirmed' as const, note: '' },
  { id: 'WK-0008', company: '카카오',   contact: '박민준 팀장',   checkIn: '2026-05-28', checkOut: '2026-05-30', nights: 2, people: 2, amount: 280000,  status: 'pending'   as const, note: '채식 식단 요청' },
  { id: 'WK-0007', company: '네이버',   contact: '최준혁 팀장',   checkIn: '2026-05-20', checkOut: '2026-05-23', nights: 3, people: 3, amount: 675000,  status: 'cancelled' as const, note: '' },
  { id: 'WK-0006', company: '삼성전자', contact: '정유진 팀장',   checkIn: '2026-05-15', checkOut: '2026-05-17', nights: 2, people: 2, amount: 340000,  status: 'confirmed' as const, note: '주차 2대 필요' },
]

const statusLabel = { confirmed: '확정', pending: '대기중', cancelled: '취소' }

type StatusFilter = 'all' | 'confirmed' | 'pending' | 'cancelled'

export default function PartnerBookingsPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [selected, setSelected] = useState<typeof BOOKINGS[0] | null>(null)

  const filtered = BOOKINGS.filter(b => filter === 'all' || b.status === filter)
  const pendingCount = BOOKINGS.filter(b => b.status === 'pending').length

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur border-b border-[#334155] px-6 h-14 flex items-center">
        <div className="flex items-center gap-3">
          <Link href="/partner" className="text-[#64748B] hover:text-[#94A3B8] transition-colors">← 대시보드</Link>
          <span className="text-[#334155]">/</span>
          <span className="font-semibold">예약 관리</span>
          {pendingCount > 0 && (
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-5">
        {/* 목록 */}
        <div className="flex-1">
          {/* 필터 */}
          <div className="flex gap-1.5 mb-5">
            {(['all', 'pending', 'confirmed', 'cancelled'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filter === s ? 'bg-blue-500 text-white' : 'bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:border-blue-500/50'
                }`}
              >
                {s === 'all' ? '전체' : statusLabel[s]}
                {s === 'pending' && pendingCount > 0 && ` (${pendingCount})`}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelected(b)}
                className={`w-full text-left bg-[#1E293B] border rounded-xl p-4 transition-colors ${
                  selected?.id === b.id ? 'border-blue-500' : 'border-[#334155] hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{b.company}</span>
                    <Badge variant={b.status}>{statusLabel[b.status]}</Badge>
                  </div>
                  <span className="text-sm font-bold text-blue-400">{b.amount.toLocaleString()}원</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
                  <span>📅 {b.checkIn} – {b.checkOut}</span>
                  <span>👥 {b.people}명</span>
                  <span>🌙 {b.nights}박</span>
                </div>
                {b.note && (
                  <div className="mt-2 text-xs text-amber-400 bg-amber-500/10 rounded-lg px-2.5 py-1.5">
                    💬 {b.note}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 상세 패널 */}
        {selected && (
          <div className="w-72 shrink-0">
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm">{selected.id}</span>
                <Badge variant={selected.status}>{statusLabel[selected.status]}</Badge>
              </div>

              <div className="flex flex-col gap-3 text-sm mb-5">
                {[
                  ['기업',    selected.company],
                  ['담당자',  selected.contact],
                  ['체크인',  selected.checkIn],
                  ['체크아웃', selected.checkOut],
                  ['숙박',    `${selected.nights}박`],
                  ['인원',    `${selected.people}명`],
                  ['금액',    `${selected.amount.toLocaleString()}원`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-[#64748B]">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
                {selected.note && (
                  <div className="bg-amber-500/10 rounded-lg p-2.5 text-xs text-amber-400">
                    💬 {selected.note}
                  </div>
                )}
              </div>

              {selected.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors">
                    수락
                  </button>
                  <button className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-semibold rounded-xl transition-colors">
                    거절
                  </button>
                </div>
              )}
              {selected.status === 'confirmed' && (
                <button className="w-full py-2 bg-[#263548] hover:bg-[#2e3f56] text-[#94A3B8] text-sm font-medium rounded-xl transition-colors">
                  예약 취소
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
