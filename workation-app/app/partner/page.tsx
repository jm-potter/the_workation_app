'use client'
import { useEffect, useState } from 'react'
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
const PARTNER_NAME = '다자요 고산도들집'

function nights(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

export default function PartnerPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userMap,  setUserMap]  = useState<Record<string, string>>({})
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      supabase
        .from('bookings')
        .select('*, accommodations(name, region)')
        .order('id', { ascending: false })
        .limit(50),
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

  const myBookings    = bookings.filter(b => b.accommodations?.name === PARTNER_NAME)
  const confirmed     = myBookings.filter(b => b.status === 'confirmed')
  const pending       = myBookings.filter(b => b.status === 'pending')
  const monthRevenue  = confirmed.reduce((s, b) => s + (b.total_price ?? 0), 0)
  const recent        = myBookings.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg">더 워케이션</span>
          <Badge variant="prt">파트너</Badge>
        </div>
        <span className="text-sm text-[#94A3B8]">{PARTNER_NAME}</span>
        {pending.length > 0 && (
          <span className="text-xs bg-amber-500 text-white font-bold px-2.5 py-1 rounded-full">
            대기중 {pending.length}건
          </span>
        )}
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">파트너 대시보드</h1>
          <p className="text-sm text-[#475569]">실시간 예약 현황</p>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '누적 매출',    value: loading ? '-' : `${(monthRevenue / 10000).toFixed(0)}만원`, sub: '확정 예약 기준',   color: 'text-blue-400'    },
            { label: '전체 예약',    value: loading ? '-' : `${myBookings.length}건`,                    sub: `확정 ${confirmed.length}건`, color: 'text-emerald-400' },
            { label: '대기중 예약',  value: loading ? '-' : `${pending.length}건`,                       sub: '확인 필요',        color: 'text-amber-400'   },
            { label: '취소율',       value: loading ? '-' : myBookings.length > 0 ? `${Math.round((myBookings.filter(b => b.status === 'cancelled').length / myBookings.length) * 100)}%` : '0%', sub: '전체 대비', color: 'text-purple-400' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <p className="text-xs text-[#94A3B8] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#475569]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* 최근 예약 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <span className="font-semibold text-sm">최근 예약</span>
            <Link href="/partner/bookings" className="text-xs text-blue-400 hover:text-blue-600">전체 보기 →</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-10 text-[#94A3B8] text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />불러오는 중...
            </div>
          ) : recent.length === 0 ? (
            <div className="text-center py-10 text-[#94A3B8] text-sm">예약 내역이 없어요</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                  {['예약번호', '숙소', '예약자', '기간', '인원', '금액', '상태'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                    <td className="px-4 py-3 text-xs text-[#94A3B8]">WK-{String(b.id).padStart(4, '0')}</td>
                    <td className="px-4 py-3 text-xs font-medium">{b.accommodations?.name ?? '-'}</td>
                    <td className="px-4 py-3 text-xs">{userMap[b.user_id] ?? '-'}</td>
                    <td className="px-4 py-3 text-xs text-[#475569]">{b.start_date} ~ {b.end_date}</td>
                    <td className="px-4 py-3 text-xs text-[#475569]">{b.guests}명</td>
                    <td className="px-4 py-3 text-sm">{b.total_price?.toLocaleString()}원</td>
                    <td className="px-4 py-3"><Badge variant={b.status as any}>{statusLabel[b.status] ?? b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 빠른 메뉴 */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '내 숙소 관리',   icon: '🏨', href: '/partner/accommodations', desc: '숙소 정보·사진 수정' },
            { label: '예약 전체 보기', icon: '📅', href: '/partner/bookings',       desc: '예약 확인 및 관리' },
            { label: '숙소 등록',      icon: '➕', href: '/partner/accommodations/new', desc: '새 숙소 등록하기' },
          ].map((m) => (
            <Link key={m.label} href={m.href}
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex items-center gap-4 hover:border-blue-500/50 transition-colors">
              <span className="text-3xl">{m.icon}</span>
              <div>
                <div className="font-semibold text-sm">{m.label}</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">{m.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
