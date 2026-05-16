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
  accommodations: { name: string; region: string } | null
}

type UserRow = { id: string; name: string; email: string }

const GANGWON_SUBSIDY_AMOUNT = 100_000
const GANGWON_BUDGET         = 300_000_000
const MONTH_LABELS           = ['1월', '2월', '3월', '4월', '5월']

function nightsCount(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

function cityOf(region: string | undefined) {
  if (!region) return '기타'
  if (region.includes('강릉')) return '강릉시'
  if (region.includes('속초')) return '속초시'
  if (region.includes('양양')) return '양양군'
  if (region.includes('평창')) return '평창군'
  if (region.includes('춘천')) return '춘천시'
  if (region.includes('원주')) return '원주시'
  return region.split(' ').slice(1).join(' ') || '기타'
}

export default function GovReportPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userMap,  setUserMap]  = useState<Record<string, string>>({})
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      supabase
        .from('bookings')
        .select('id, user_id, start_date, end_date, guests, total_price, accommodations(name, region)')
        .eq('status', 'confirmed'),
      supabase.from('users').select('id, name, email'),
    ]).then(([{ data: bData }, { data: uData }]) => {
      if (bData) {
        setBookings((bData as unknown as Booking[]).filter(b => b.accommodations?.region?.includes('강원')))
      }
      if (uData) {
        const map: Record<string, string> = {}
        ;(uData as UserRow[]).forEach(u => { map[u.id] = u.name ?? u.email ?? '-' })
        setUserMap(map)
      }
      setLoading(false)
    })
  }, [])

  // 집계
  const totalVisitors  = bookings.reduce((s, b) => s + (b.guests || 0), 0)
  const totalCompanies = new Set(bookings.map(b => b.user_id)).size
  const totalSpend     = bookings.reduce((s, b) => s + (b.total_price || 0), 0)
  const totalSubsidy   = bookings.reduce((s, b) => s + (b.guests || 0) * GANGWON_SUBSIDY_AMOUNT, 0)
  const budgetPct      = Math.min(100, Math.round((totalSubsidy / GANGWON_BUDGET) * 100))
  const carbonSaved    = Math.round(28.5 * 2 * 3 * totalVisitors * 0.21)

  // 월별
  const monthlyMap: Record<string, { visitors: number; spend: number }> = {}
  bookings.forEach(b => {
    const label = `${new Date(b.start_date).getMonth() + 1}월`
    if (!monthlyMap[label]) monthlyMap[label] = { visitors: 0, spend: 0 }
    monthlyMap[label].visitors += b.guests || 0
    monthlyMap[label].spend    += b.total_price || 0
  })
  const MONTHLY = MONTH_LABELS.map(label => ({
    month:    label,
    visitors: monthlyMap[label]?.visitors ?? 0,
    spend:    monthlyMap[label]?.spend    ?? 0,
  }))
  const maxVisitors = Math.max(...MONTHLY.map(m => m.visitors), 1)
  const maxSpend    = Math.max(...MONTHLY.map(m => m.spend), 1)

  // 시군별 분포
  const cityMap: Record<string, number> = {}
  bookings.forEach(b => {
    const c = cityOf(b.accommodations?.region ?? undefined)
    cityMap[c] = (cityMap[c] ?? 0) + (b.guests || 0)
  })
  const cityEntries   = Object.entries(cityMap).sort((a, b) => b[1] - a[1])
  const cityTotal     = cityEntries.reduce((s, [, v]) => s + v, 0) || 1
  const CITY_DIST     = cityEntries.map(([city, count]) => ({
    city, count, pct: Math.round((count / cityTotal) * 100),
  }))

  // 예약별 상세 행
  const rows = bookings.map(b => ({
    id:      b.id,
    name:    userMap[b.user_id] ?? '-',
    acc:     b.accommodations?.name ?? '-',
    city:    cityOf(b.accommodations?.region ?? undefined),
    guests:  b.guests,
    nights:  nightsCount(b.start_date, b.end_date),
    spend:   b.total_price,
    subsidy: (b.guests || 0) * GANGWON_SUBSIDY_AMOUNT,
  }))

  const spendFmt = (n: number) =>
    n >= 100_000_000 ? `${(n / 100_000_000).toFixed(1)}억` : `${(n / 10_000).toFixed(0)}만원`

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-black text-lg hover:text-blue-500 transition-colors">더 워케이션</Link>
          <span className="text-[#CBD5E1]">/</span>
          <Link href="/gov" className="text-[#94A3B8] hover:text-[#475569] transition-colors text-sm">지자체 대시보드</Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="font-semibold text-sm">성과 리포트</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="gov">지자체</Badge>
          <button className="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-semibold">
            📄 PDF 저장
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🍊</span>
            <h1 className="text-2xl font-black">지역 활성화 성과 리포트</h1>
          </div>
          <p className="text-sm text-[#475569]">강원특별자치도 · 확정 예약 기준 실시간 집계</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 text-[#94A3B8] text-sm gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            데이터 불러오는 중...
          </div>
        ) : (
          <>
            {/* 핵심 지표 */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: '총 방문 인원',  value: `${totalVisitors.toLocaleString()}명`,  sub: `${bookings.length}건 확정 예약`,    color: 'text-blue-500'    },
                { label: '참여 기업·개인', value: `${totalCompanies}개사`,               sub: '강원 워케이션 이용',                 color: 'text-purple-500'  },
                { label: '지역 소비액',   value: spendFmt(totalSpend),                   sub: '숙박비 합산 (확정)',                 color: 'text-amber-500'   },
                { label: '지원금 집행액', value: spendFmt(totalSubsidy),                 sub: `예산 ${budgetPct}% 집행`,           color: 'text-emerald-500' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                  <p className="text-xs text-[#94A3B8] mb-2">{s.label}</p>
                  <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
                  <p className="text-xs text-[#475569]">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* 월별 추이 */}
              <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-5">
                <div className="font-semibold text-sm mb-5">월별 방문자 & 소비액 추이</div>
                <div className="flex items-end gap-4 h-36 mb-3">
                  {MONTHLY.map(m => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-blue-500 font-bold">{m.visitors || 0}</span>
                      <div className="w-full flex items-end gap-0.5" style={{ height: '100%' }}>
                        <div className="flex-1 bg-blue-500/80 rounded-t-sm"
                          style={{ height: `${((m.visitors || 0) / maxVisitors) * 100}%`, minHeight: m.visitors > 0 ? '4px' : '0' }} />
                        <div className="flex-1 bg-emerald-400/60 rounded-t-sm"
                          style={{ height: `${((m.spend || 0) / maxSpend) * 100}%`, minHeight: m.spend > 0 ? '4px' : '0' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-around mb-3">
                  {MONTHLY.map(m => <span key={m.month} className="flex-1 text-center text-xs text-[#94A3B8]">{m.month}</span>)}
                </div>
                <div className="flex gap-4 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-blue-500/80 rounded inline-block" />방문자 (명)</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-emerald-400/60 rounded inline-block" />소비액</span>
                </div>
              </div>

              {/* 시군별 분포 */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                <div className="font-semibold text-sm mb-5">방문 지역 분포</div>
                {CITY_DIST.length === 0 ? (
                  <p className="text-xs text-[#94A3B8] text-center py-8">데이터 없음</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {CITY_DIST.map(r => (
                      <div key={r.city}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#475569] font-medium">강원 {r.city}</span>
                          <span className="text-[#94A3B8]">{r.count}명 ({r.pct}%)</span>
                        </div>
                        <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 예약 상세 내역 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                <span className="font-semibold text-sm">확정 예약 상세 내역</span>
                <span className="text-xs text-[#94A3B8]">총 {rows.length}건</span>
              </div>
              {rows.length === 0 ? (
                <div className="py-14 text-center text-sm text-[#94A3B8]">
                  확정된 강원 워케이션 예약이 없어요
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                      {['예약자', '숙소', '지역', '인원', '숙박', '소비액', '지원금'].map(h => (
                        <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(r => (
                      <tr key={r.id} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                        <td className="px-5 py-3 font-medium">{r.name}</td>
                        <td className="px-5 py-3 text-xs text-[#475569]">{r.acc}</td>
                        <td className="px-5 py-3 text-xs text-[#94A3B8]">📍 강원 {r.city}</td>
                        <td className="px-5 py-3 text-[#475569]">{r.guests}명</td>
                        <td className="px-5 py-3 text-[#475569]">{r.nights}박</td>
                        <td className="px-5 py-3 text-blue-500 font-medium">{r.spend.toLocaleString()}원</td>
                        <td className="px-5 py-3 text-emerald-500">{r.subsidy.toLocaleString()}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* ESG & 예산 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🌿</span>
                  <h2 className="font-bold text-sm">ESG · 지방소멸 기여 지표</h2>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: '생활인구 유입',  value: `${totalVisitors.toLocaleString()}명`,  sub: '강원도 체류 인구 증가',  color: 'text-blue-500'    },
                    { label: '탄소 저감',       value: `${carbonSaved.toLocaleString()}kg CO₂`, sub: '통근 대체 효과',        color: 'text-emerald-500' },
                    { label: '지역 소비 기여',  value: spendFmt(totalSpend),                    sub: '숙박·식음료·체험',      color: 'text-amber-500'   },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#94A3B8]">{s.label}</div>
                        <div className="text-xs text-[#475569]">{s.sub}</div>
                      </div>
                      <div className={`font-black text-base ${s.color}`}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">💰</span>
                  <h2 className="font-bold text-sm">지원금 예산 집행 현황</h2>
                </div>
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#475569]">총 배정 예산</span>
                    <span className="font-bold">{spendFmt(GANGWON_BUDGET)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#475569]">집행 완료</span>
                    <span className="font-bold text-emerald-500">{spendFmt(totalSubsidy)}</span>
                  </div>
                  <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                      style={{ width: `${budgetPct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-[#94A3B8]">
                    <span>집행률 {budgetPct}%</span>
                    <span>잔여 {spendFmt(Math.max(0, GANGWON_BUDGET - totalSubsidy))}</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-xs text-[#475569] leading-relaxed">
                  <strong className="text-blue-600">기대 효과:</strong> 지원금 1원당 지역 소비 유발 약 <strong>3.2원</strong>으로 분석됩니다.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
