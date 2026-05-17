'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { supabase } from '@/lib/supabase'

type Booking = {
  id: string
  user_id: string
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: string
  accommodations: { name: string; region: string } | null
}

type UserRow = { id: string; name: string; email: string }

const statusLabel: Record<string, string> = { confirmed: '확정', pending: '대기중', cancelled: '취소' }
const PARTNER_REGION = '춘천'
type StatusFilter = 'all' | 'confirmed' | 'pending' | 'cancelled'

function nights(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

export default function PartnerBookingsPage() {
  const [bookings,  setBookings]  = useState<Booking[]>([])
  const [userMap,   setUserMap]   = useState<Record<string, string>>({})
  const [loading,   setLoading]   = useState(true)
  const [filter,    setFilter]    = useState<StatusFilter>('all')
  const [selected,  setSelected]  = useState<Booking | null>(null)
  const [updating,  setUpdating]  = useState(false)

  useEffect(() => {
    Promise.all([
      supabase
        .from('bookings')
        .select('*, accommodations(name, region)')
        .order('id', { ascending: false }),
      supabase.from('users').select('id, name, email'),
    ]).then(([{ data: bData }, { data: uData }]) => {
      if (bData) setBookings(bData as any)
      if (uData) {
        const map: Record<string, string> = {}
        ;(uData as UserRow[]).forEach(u => { map[u.id] = u.name ?? u.email ?? '-' })
        setUserMap(map)
      }
      setLoading(false)
    })
  }, [])

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      setSelected(prev => prev?.id === id ? { ...prev, status } : prev)
    }
    setUpdating(false)
  }

  const myBookings   = bookings.filter(b => b.accommodations?.region?.includes(PARTNER_REGION))
  const filtered     = myBookings.filter(b => filter === 'all' || b.status === filter)
  const pendingCount = myBookings.filter(b => b.status === 'pending').length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center gap-3">
        <Link href="/partner" className="text-[#94A3B8] hover:text-[#475569] transition-colors">← 대시보드</Link>
        <span className="text-[#CBD5E1]">/</span>
        <span className="font-semibold">예약 관리</span>
        {pendingCount > 0 && (
          <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>
        )}
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-5">
        {/* 목록 */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-1.5 mb-5">
            {(['all', 'pending', 'confirmed', 'cancelled'] as StatusFilter[]).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filter === s ? 'bg-blue-500 text-white' : 'bg-white border border-[#E2E8F0] text-[#475569] hover:border-blue-500/50'
                }`}>
                {s === 'all' ? `전체 (${bookings.length})` : `${statusLabel[s]}${s === 'pending' && pendingCount > 0 ? ` (${pendingCount})` : ''}`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#94A3B8] text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />불러오는 중...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#94A3B8] text-sm">해당 예약이 없어요</div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((b) => (
                <button key={b.id} onClick={() => setSelected(b)}
                  className={`w-full text-left bg-white border rounded-xl p-4 transition-colors ${
                    selected?.id === b.id ? 'border-blue-500 shadow-sm' : 'border-[#E2E8F0] hover:border-blue-500/40'
                  }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{b.accommodations?.name ?? '-'}</span>
                      <Badge variant={b.status as any}>{statusLabel[b.status] ?? b.status}</Badge>
                    </div>
                    <span className="text-sm font-bold text-blue-400">{b.total_price?.toLocaleString()}원</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                    <span>👤 {userMap[b.user_id] ?? '-'}</span>
                    <span>📅 {b.start_date} – {b.end_date}</span>
                    <span>👥 {b.guests}명</span>
                    <span>🌙 {nights(b.start_date, b.end_date)}박</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 상세 패널 */}
        {selected && (
          <div className="w-72 shrink-0">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm">WK-{String(selected.id).padStart(4, '0')}</span>
                <Badge variant={selected.status as any}>{statusLabel[selected.status] ?? selected.status}</Badge>
              </div>

              <div className="flex flex-col gap-3 text-sm mb-5">
                {[
                  ['숙소',    selected.accommodations?.name ?? '-'],
                  ['지역',    selected.accommodations?.region ?? '-'],
                  ['예약자',  userMap[selected.user_id] ?? '-'],
                  ['체크인',  selected.start_date],
                  ['체크아웃', selected.end_date],
                  ['숙박',    `${nights(selected.start_date, selected.end_date)}박`],
                  ['인원',    `${selected.guests}명`],
                  ['금액',    `${selected.total_price?.toLocaleString()}원`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-[#94A3B8]">{k}</span>
                    <span className="font-medium text-right max-w-[150px]">{v}</span>
                  </div>
                ))}
              </div>

              {selected.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(selected.id, 'confirmed')} disabled={updating}
                    className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors">
                    {updating ? '처리 중...' : '수락'}
                  </button>
                  <button onClick={() => updateStatus(selected.id, 'cancelled')} disabled={updating}
                    className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 text-red-400 text-sm font-semibold rounded-xl transition-colors">
                    거절
                  </button>
                </div>
              )}
              {selected.status === 'confirmed' && (
                <button onClick={() => updateStatus(selected.id, 'cancelled')} disabled={updating}
                  className="w-full py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] disabled:opacity-50 text-[#475569] text-sm font-medium rounded-xl transition-colors">
                  {updating ? '처리 중...' : '예약 취소'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
