'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import { useHrOnly } from '@/lib/useHrOnly'
import { supabase } from '@/lib/supabase'

const MONTHS = ['2026년 5월', '2026년 4월', '2026년 3월', '2026년 2월']

type Booking = {
  id: string
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: string
  accommodations: { name: string; region: string } | null
}

type SubsidyRow = { region: string; name: string; amount_per_person: number; status: string }

function nightsBetween(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

function normalizeRegion(r: string) {
  return r.replace('특별자치도', '도').replace('특별자치시', '시').replace('특별시', '시').replace('광역시', '시').split(' ')[0]
}

function matchSubsidy(region: string, subsidies: SubsidyRow[]) {
  if (!region) return 0
  const a = normalizeRegion(region)
  return subsidies.find(s => {
    const b = normalizeRegion(s.region)
    return a.includes(b) || b.includes(a)
  })?.amount_per_person ?? 0
}


export default function BillingPage() {
  useHrOnly()
  const [month, setMonth]             = useState(MONTHS[0])
  const [downloaded, setDownloaded]   = useState(false)
  const [bookings, setBookings]       = useState<Booking[]>([])
  const [subsidies, setSubsidies]     = useState<SubsidyRow[]>([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    Promise.all([
      supabase
        .from('bookings')
        .select('*, accommodations(name, region)')
        .in('status', ['confirmed', 'pending'])
        .order('id', { ascending: false })
        .limit(20),
      supabase
        .from('subsidies')
        .select('region, name, amount_per_person, status'),
    ]).then(([{ data: bData }, { data: sData }]) => {
      if (bData) setBookings(bData)
      if (sData) setSubsidies(sData)
      setLoading(false)
    })
  }, [])

  const items = bookings.map(b => {
    const nights          = nightsBetween(b.start_date, b.end_date)
    const accommodationCost = b.total_price
    const subsidyPerPerson  = matchSubsidy(b.accommodations?.region ?? '', subsidies)
    const subsidyTotal      = subsidyPerPerson * b.guests
    const finalAmount       = Math.max(0, accommodationCost - subsidyTotal)
    return { ...b, nights, accommodationCost, subsidyTotal, finalAmount }
  })

  const totalCost    = items.reduce((s, b) => s + b.accommodationCost, 0)
  const totalSubsidy = items.reduce((s, b) => s + b.subsidyTotal, 0)
  const totalFinal   = items.reduce((s, b) => s + b.finalAmount, 0)

  // 실제 예약이 있는 지역의 지원금만 표시
  const subsidyStatus = subsidies
    .map(s => {
      const regionBookings = items.filter(b => {
        const r = b.accommodations?.region ?? ''
        return r !== '' && (normalizeRegion(r).includes(normalizeRegion(s.region)) || normalizeRegion(s.region).includes(normalizeRegion(r)))
      })
      const totalGuests = regionBookings.reduce((sum, b) => sum + b.guests, 0)
      return totalGuests > 0 ? { region: s.region, name: s.name, amount: s.amount_per_person * totalGuests, status: s.status ?? '신청 예정' } : null
    })
    .filter((s): s is { region: string; name: string; amount: number; status: string } => s !== null)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header role="hr" />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-xs text-[#94A3B8] hover:text-[#475569] mb-2 block">← 대시보드</Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black mb-1">원빌링 정산</h1>
              <p className="text-sm text-[#475569]">워케이션 비용 통합 청구서 · 지원금 선공제 포함</p>
            </div>
            <div className="flex items-center gap-3">
              <select value={month} onChange={e => setMonth(e.target.value)}
                className="bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500">
                {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <button onClick={() => setDownloaded(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                {downloaded ? '✅ 저장됨' : '📄 PDF 저장'}
              </button>
            </div>
          </div>
        </div>

        {/* 정산 요약 카드 */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-lg">🧾</span>
            <h2 className="font-bold">정산 요약</h2>
            <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded-full border border-blue-500/30">{month}</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-6 text-[#94A3B8] text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />불러오는 중...
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: '총 예약 건수',   value: `${items.length}건`,                    color: 'text-blue-500'    },
                { label: '숙박비 합계',    value: `${totalCost.toLocaleString()}원`,       color: 'text-[#0F172A]'   },
                { label: '지원금 차감',    value: `- ${totalSubsidy.toLocaleString()}원`,  color: 'text-emerald-500' },
                { label: '최종 청구 금액', value: `${totalFinal.toLocaleString()}원`,      color: 'text-blue-600'    },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 text-center">
                  <div className={`text-xl font-black ${s.color} mb-1`}>{s.value}</div>
                  <div className="text-xs text-[#94A3B8]">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 상세 청구 내역 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <span className="font-semibold text-sm">예약별 상세 내역</span>
            <span className="text-xs text-[#94A3B8]">지원금 선공제 반영</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-10 text-[#94A3B8] text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />불러오는 중...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-[#94A3B8] text-sm">확정된 예약 내역이 없어요</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                  {['예약번호', '숙소', '기간 / 인원', '숙박비', '지원금 차감', '청구액'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(b => (
                  <tr key={b.id} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                    <td className="px-4 py-4 text-xs text-[#94A3B8]">WK-{String(b.id).padStart(4, '0')}</td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-sm">{b.accommodations?.name ?? '-'}</div>
                      <div className="text-xs text-[#94A3B8] mt-0.5">📍 {b.accommodations?.region ?? '-'}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-[#475569]">
                      <div>{b.start_date} ~ {b.end_date}</div>
                      <div className="text-[#94A3B8]">{b.guests}명 · {b.nights}박</div>
                    </td>
                    <td className="px-4 py-4 text-sm">{b.accommodationCost.toLocaleString()}원</td>
                    <td className="px-4 py-4 text-sm text-emerald-500 font-medium">
                      {b.subsidyTotal > 0 ? `- ${b.subsidyTotal.toLocaleString()}원` : '-'}
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-blue-500">{b.finalAmount.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#F8FAFC] border-t-2 border-[#E2E8F0] font-bold">
                  <td colSpan={3} className="px-4 py-4 text-right text-sm text-[#475569]">합계</td>
                  <td className="px-4 py-4 text-sm">{totalCost.toLocaleString()}원</td>
                  <td className="px-4 py-4 text-sm text-emerald-500">- {totalSubsidy.toLocaleString()}원</td>
                  <td className="px-4 py-4 text-base text-blue-600">{totalFinal.toLocaleString()}원</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {/* 지원금 신청 현황 */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💰</span>
            <h2 className="font-bold text-sm">지원금 신청 현황</h2>
          </div>
          <p className="text-xs text-[#475569] mb-4 ml-7">The Workation이 자동으로 신청 · 관리해드립니다</p>
          <div className="flex flex-col gap-2">
            {(subsidyStatus.length > 0 ? subsidyStatus : [
              { region: '연결된 지원금 없음', name: '', amount: 0, status: '신청 예정' }
            ]).map(s => (
              <div key={s.region} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{s.region}</div>
                  <div className="text-xs text-emerald-600 font-semibold">{s.amount > 0 ? `${s.amount.toLocaleString()}원` : '-'}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                  s.status === '승인 완료' ? 'bg-emerald-500/20 text-emerald-600' :
                  s.status === '신청 완료' ? 'bg-blue-500/10 text-blue-600'       :
                  s.status === '검토중'    ? 'bg-amber-500/20 text-amber-600'     :
                                             'bg-[#F1F5F9] text-[#94A3B8]'
                }`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
