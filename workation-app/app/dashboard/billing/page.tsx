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

type SubsidyRow = { region: string; name: string; amount_per_person: number }

function nightsBetween(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

function matchSubsidy(region: string, subsidies: SubsidyRow[]) {
  const r = region ?? ''
  return subsidies.find(s => r.includes(s.region) || s.region.includes(r.split(' ')[0]))
    ?.amount_per_person ?? 0
}

const STATUS_CYCLE = ['신청 예정', '신청 완료', '검토중', '승인 완료']

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
        .select('region, name, amount_per_person'),
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

  // 지역별 지원금 신청 현황 (실제 subsidies 테이블에서)
  const subsidyStatus = subsidies.slice(0, 3).map((s, i) => {
    const regionBookings = items.filter(b => (b.accommodations?.region ?? '').includes(s.region))
    const totalGuests    = regionBookings.reduce((sum, b) => sum + b.guests, 0)
    return {
      region: s.region,
      amount: s.amount_per_person * Math.max(totalGuests, 1),
      status: STATUS_CYCLE[i % STATUS_CYCLE.length],
    }
  })

  const nextMonthTotal = Math.round(totalFinal * 1.15)
  const nextSubsidy    = Math.round(totalSubsidy * 1.1)
  const budgetTotal    = 5000000
  const budgetUsed     = totalFinal || 1850000

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

        <div className="grid grid-cols-2 gap-6">
          {/* 지원금 정산 현황 */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">💰</span>
              <h2 className="font-bold text-sm">지원금 신청 현황</h2>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {(subsidyStatus.length > 0 ? subsidyStatus : [
                { region: '연결된 지원금 없음', amount: 0, status: '신청 예정' }
              ]).map(s => (
                <div key={s.region} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{s.region}</div>
                    <div className="text-xs text-emerald-600 font-semibold">{s.amount.toLocaleString()}원</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                    s.status === '승인 완료' ? 'bg-emerald-500/20 text-emerald-600' :
                    s.status === '신청 완료' ? 'bg-emerald-500/20 text-emerald-600' :
                    s.status === '검토중'    ? 'bg-amber-500/20 text-amber-600'    :
                                               'bg-[#F1F5F9] text-[#94A3B8]'
                  }`}>{s.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors">
              전체 지원금 일괄 신청하기 →
            </button>
          </div>

          {/* 다음 달 예상 + 납부 안내 */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex-1">
              <h2 className="font-bold text-sm mb-4">다음 달 예상 청구</h2>
              <div className="text-3xl font-black text-blue-500 mb-1">{nextMonthTotal.toLocaleString()}원</div>
              <div className="text-xs text-emerald-500 mb-4">지원금 차감 후 (절감 예상 {nextSubsidy.toLocaleString()}원)</div>
              <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  style={{ width: `${Math.min(100, Math.round((budgetUsed / budgetTotal) * 100))}%` }} />
              </div>
              <div className="flex justify-between text-xs text-[#94A3B8] mt-1">
                <span>예산 사용률 {Math.min(100, Math.round((budgetUsed / budgetTotal) * 100))}%</span>
                <span>잔여 {(budgetTotal - budgetUsed).toLocaleString()}원</span>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
              <div className="text-xs text-blue-700 font-semibold mb-1">💳 자동 납부 설정됨</div>
              <div className="text-xs text-[#475569]">매월 말일 회사 법인카드 자동 결제됩니다. 지원금은 익월 지자체 정산 후 환급됩니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
