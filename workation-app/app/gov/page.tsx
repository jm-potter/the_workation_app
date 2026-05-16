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

const JEJU_SUBSIDY_AMOUNT = 300000
const JEJU_BUDGET = 150_000_000

function nightsCount(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

function getMonthlyTrend(bookings: Booking[]) {
  const result = []
  for (let i = 4; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const visitors = bookings
      .filter(b => {
        const bd = new Date(b.start_date)
        return bd.getFullYear() === year && bd.getMonth() + 1 === month
      })
      .reduce((sum, b) => sum + (b.guests || 0), 0)
    result.push({ month: `${month}월`, visitors })
  }
  return result
}

function isJeju(region: string | undefined) {
  return !!region?.includes('제주')
}

function cityOf(region: string | undefined) {
  if (!region) return '제주시'
  if (region.includes('서귀포')) return '서귀포시'
  return '제주시'
}

export default function GovPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userMap,  setUserMap]  = useState<Record<string, string>>({})
  const [loading,  setLoading]  = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    Promise.all([
      supabase
        .from('bookings')
        .select('*, accommodations(name, region)')
        .order('id', { ascending: false }),
      supabase.from('users').select('id, name, email'),
    ]).then(([{ data: bData }, { data: uData }]) => {
      if (bData) {
        setBookings((bData as Booking[]).filter(b => isJeju(b.accommodations?.region ?? undefined)))
      }
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
    if (!error) setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    setUpdating(false)
  }

  // 통계 계산
  const active     = bookings.filter(b => b.status !== 'cancelled')
  const confirmed  = bookings.filter(b => b.status === 'confirmed')
  const pending    = bookings.filter(b => b.status === 'pending')

  const totalVisitors  = active.reduce((s, b) => s + (b.guests || 0), 0)
  const totalCompanies = new Set(active.map(b => b.user_id)).size
  const totalRevenue   = confirmed.reduce((s, b) => s + (b.total_price || 0), 0)
  const avgNights      = active.length
    ? active.reduce((s, b) => s + nightsCount(b.start_date, b.end_date), 0) / active.length
    : 0

  // 시군별
  const seoguipo = active.filter(b => cityOf(b.accommodations?.region ?? undefined) === '서귀포시')
  const jejusi   = active.filter(b => cityOf(b.accommodations?.region ?? undefined) === '제주시')
  const cityRows = [
    { city: '서귀포시', topSpot: '중문·색달', bookings: seoguipo },
    { city: '제주시',   topSpot: '애월·한림', bookings: jejusi   },
  ]

  // 월별 트렌드
  const monthlyData = getMonthlyTrend(active)
  const maxMonthly  = Math.max(...monthlyData.map(m => m.visitors), 1)

  // 지원금 예산
  const subsidyUsed = confirmed.reduce((s, b) => s + (b.guests || 0) * JEJU_SUBSIDY_AMOUNT, 0)
  const budgetPct   = Math.min(100, Math.round((subsidyUsed / JEJU_BUDGET) * 100))

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-black text-lg hover:text-blue-500 transition-colors">더워케이션</Link>
          <Badge variant="gov">지자체</Badge>
          <span className="text-sm text-[#475569] font-medium">제주특별자치도</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/gov/post" className="text-sm px-3 py-1.5 bg-white border border-[#E2E8F0] hover:border-blue-500/50 text-[#475569] rounded-xl transition-colors font-medium">📢 공고 게재</Link>
          <Link href="/gov/report" className="text-sm px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium">📊 성과 리포트</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🍊</span>
            <h1 className="text-2xl font-black">제주특별자치도 워케이션 현황</h1>
          </div>
          <p className="text-sm text-[#475569]">실시간 데이터 · 제주도 전체</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 text-[#94A3B8] text-sm gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            데이터 불러오는 중...
          </div>
        ) : (
          <>
            {/* 요약 통계 */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: '제주 워케이션 방문자', value: `${totalVisitors.toLocaleString()}명`,  sub: `총 ${active.length}건 예약`,          color: 'text-blue-400'    },
                { label: '참여 기업·개인 수',   value: `${totalCompanies}개사`,                sub: `확정 ${confirmed.length}건`,           color: 'text-emerald-400' },
                { label: '지역 경제 효과',       value: totalRevenue >= 100_000_000
                    ? `${(totalRevenue / 100_000_000).toFixed(1)}억`
                    : `${(totalRevenue / 10_000).toFixed(0)}만원`,
                                                                                                sub: '확정 예약 합산',                       color: 'text-amber-400'   },
                { label: '평균 체류 기간',       value: `${avgNights.toFixed(1)}박`,            sub: `검토중 ${pending.length}건 대기`,      color: 'text-purple-400'  },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                  <p className="text-xs text-[#94A3B8] mb-2">{s.label}</p>
                  <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
                  <p className="text-xs text-[#475569]">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* 시군별 현황 */}
              <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E2E8F0] font-semibold text-sm">시군별 방문 현황</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                      {['지역', '방문자', '예약 건수', '총 숙박일', '인기 지역', '비중'].map(h => (
                        <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cityRows.map(r => {
                      const visitors  = r.bookings.reduce((s, b) => s + (b.guests || 0), 0)
                      const totalNights = r.bookings.reduce((s, b) => s + nightsCount(b.start_date, b.end_date) * (b.guests || 0), 0)
                      const pct       = totalVisitors > 0 ? Math.round((visitors / totalVisitors) * 100) : 0
                      return (
                        <tr key={r.city} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                          <td className="px-5 py-3 font-medium">제주 {r.city}</td>
                          <td className="px-5 py-3 text-blue-400 font-bold">{visitors.toLocaleString()}명</td>
                          <td className="px-5 py-3 text-[#475569]">{r.bookings.length}건</td>
                          <td className="px-5 py-3 text-[#475569]">{totalNights.toLocaleString()}박</td>
                          <td className="px-5 py-3 text-xs text-[#94A3B8]">📍 {r.topSpot}</td>
                          <td className="px-5 py-3 text-xs text-[#475569]">{pct}%</td>
                        </tr>
                      )
                    })}
                    <tr className="bg-[#F8FAFC]">
                      <td className="px-5 py-3 font-bold text-xs text-[#475569]">제주도 합계</td>
                      <td className="px-5 py-3 text-blue-500 font-black">{totalVisitors.toLocaleString()}명</td>
                      <td className="px-5 py-3 text-[#475569] font-bold">{active.length}건</td>
                      <td className="px-5 py-3 text-[#475569] font-bold">
                        {active.reduce((s, b) => s + nightsCount(b.start_date, b.end_date) * (b.guests || 0), 0).toLocaleString()}박
                      </td>
                      <td className="px-5 py-3" />
                      <td className="px-5 py-3 text-xs text-[#475569] font-bold">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 월별 트렌드 */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                <div className="font-semibold text-sm mb-5">제주도 월별 방문자 추이</div>
                <div className="flex items-end gap-3 h-36 mb-3">
                  {monthlyData.map((m) => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-blue-400 font-bold">{m.visitors || 0}</span>
                      <div
                        className="w-full bg-blue-500/80 rounded-t-md transition-all"
                        style={{ height: `${((m.visitors || 0) / maxMonthly) * 100}%`, minHeight: m.visitors > 0 ? '4px' : '0' }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 justify-around">
                  {monthlyData.map(m => (
                    <span key={m.month} className="flex-1 text-center text-xs text-[#94A3B8]">{m.month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 지원금 현황 */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">💰</span>
                <h2 className="font-bold text-sm">제주도 워케이션 지원금 현황</h2>
                <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded-full border border-blue-500/30">2026년 상반기</span>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/70 border border-blue-500/20 rounded-xl p-4">
                  <div className="text-2xl font-black text-blue-500 mb-1">{JEJU_SUBSIDY_AMOUNT.toLocaleString()}원</div>
                  <div className="text-xs font-semibold text-[#0F172A] mb-0.5">1인당 지원금</div>
                  <div className="text-xs text-[#94A3B8]">3박 이상 · ~2026-07-31</div>
                </div>
                <div className="bg-white/70 border border-blue-500/20 rounded-xl p-4">
                  <div className="text-2xl font-black text-emerald-500 mb-1">
                    {subsidyUsed >= 100_000_000
                      ? `${(subsidyUsed / 100_000_000).toFixed(1)}억`
                      : `${(subsidyUsed / 10_000).toFixed(0)}만원`}
                  </div>
                  <div className="text-xs font-semibold text-[#0F172A] mb-1">예산 집행액 (확정 예약 기준)</div>
                  <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
                    <div className="bg-emerald-400 h-1.5 rounded-full transition-all" style={{ width: `${budgetPct}%` }} />
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-1">총 예산 {(JEJU_BUDGET / 100_000_000).toFixed(1)}억 · {budgetPct}% 집행</div>
                </div>
                <div className="bg-white/70 border border-blue-500/20 rounded-xl p-4">
                  <div className="text-2xl font-black text-amber-500 mb-1">{bookings.length}건</div>
                  <div className="text-xs font-semibold text-[#0F172A] mb-0.5">총 신청 건수</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full">
                      승인 {confirmed.length}건
                    </span>
                    <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-0.5 rounded-full">
                      검토중 {pending.length}건
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 신청 현황 테이블 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="font-semibold text-sm">제주도 워케이션 예약 · 지원금 신청 현황</span>
                  <span className="text-xs text-[#94A3B8] ml-2">1인당 {JEJU_SUBSIDY_AMOUNT.toLocaleString()}원 지원</span>
                </div>
                {pending.length > 0 && (
                  <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    검토중 {pending.length}건
                  </span>
                )}
              </div>

              {bookings.length === 0 ? (
                <div className="py-16 text-center text-sm text-[#94A3B8]">
                  제주도 워케이션 예약이 없어요
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                      {['예약자', '숙소', '지역', '인원', '기간', '신청 금액', '상태', '처리'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => {
                      const n          = nightsCount(b.start_date, b.end_date)
                      const subsidyAmt = (b.guests || 0) * JEJU_SUBSIDY_AMOUNT
                      return (
                        <tr key={b.id} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                          <td className="px-4 py-3 font-medium">{userMap[b.user_id] ?? '-'}</td>
                          <td className="px-4 py-3 text-xs text-[#475569]">{b.accommodations?.name ?? '-'}</td>
                          <td className="px-4 py-3 text-xs text-[#475569]">📍 {b.accommodations?.region ?? '-'}</td>
                          <td className="px-4 py-3 text-[#475569]">{b.guests}명</td>
                          <td className="px-4 py-3 text-xs text-[#475569]">{b.start_date} ({n}박)</td>
                          <td className="px-4 py-3 font-medium">{subsidyAmt.toLocaleString()}원</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                              b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400'
                              : b.status === 'cancelled' ? 'bg-red-500/10 text-red-400'
                              : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {b.status === 'confirmed' ? '승인됨' : b.status === 'cancelled' ? '반려됨' : '검토중'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {b.status === 'pending' && (
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => updateStatus(b.id, 'confirmed')}
                                  disabled={updating}
                                  className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30 disabled:opacity-50"
                                >승인</button>
                                <button
                                  onClick={() => updateStatus(b.id, 'cancelled')}
                                  disabled={updating}
                                  className="text-xs px-2.5 py-1 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 disabled:opacity-50"
                                >반려</button>
                              </div>
                            )}
                            {b.status !== 'pending' && (
                              <span className="text-xs text-[#94A3B8]">처리완료</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
