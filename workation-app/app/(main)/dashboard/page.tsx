'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import { supabase } from '@/lib/supabase'

const PERFORMANCE = [
  { label: '업무 집중도',  before: 68, after: 84, unit: '%' },
  { label: '팀 결속력',   before: 72, after: 91, unit: '%' },
  { label: '직원 만족도', before: 74, after: 92, unit: '%' },
  { label: '이직 의향',   before: 38, after: 19, unit: '%', reverse: true },
]

const statusLabel: Record<string, string> = { confirmed: '확정', pending: '대기중', cancelled: '취소' }

type Booking = {
  id: string
  user_id: string
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: string
  accommodations: { name: string; region: string } | null
  users: { name: string; email: string } | null
}

type SubsidyRow = { region: string; name: string; amount_per_person: number }

export default function DashboardPage() {
  const router = useRouter()
  const [bookings,  setBookings]  = useState<Booking[]>([])
  const [subsidies, setSubsidies] = useState<SubsidyRow[]>([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const role = data.user?.user_metadata?.role
      if (!role) router.push('/login')
      else if (role === 'emp') router.push('/accommodations')
    })

    Promise.all([
      supabase
        .from('bookings')
        .select('*, accommodations(name, region), users(name, email)')
        .order('id', { ascending: false })
        .limit(20),
      supabase
        .from('subsidies')
        .select('region, name, amount_per_person'),
    ]).then(([{ data: bData }, { data: sData }]) => {
      if (bData) setBookings(bData as any)
      if (sData) setSubsidies(sData)
      setLoading(false)
    })
  }, [])

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const totalAmount       = confirmedBookings.reduce((s, b) => s + (b.total_price ?? 0), 0)
  const totalGuests       = confirmedBookings.reduce((s, b) => s + (b.guests ?? 0), 0)

  const budgetTotal = 5000000
  const budgetUsed  = totalAmount
  const budgetPct   = Math.min(100, Math.round((budgetUsed / budgetTotal) * 100))

  // 지원금 수혜 현황: 확정 예약 × 매칭 지원금
  const subsidyUsageRaw = confirmedBookings.flatMap(b => {
    const region = b.accommodations?.region ?? ''
    if (!region) return []
    return subsidies
      .filter(s => region.includes(s.region) || s.region.includes(region.split(' ')[0]))
      .map(s => ({
        userId:    b.user_id,
        userName:  b.users?.name ?? b.users?.email ?? '알 수 없음',
        subsidyName: s.name,
        region:    b.accommodations?.region ?? '',
        date:      b.start_date,
        amount:    s.amount_per_person * b.guests,
      }))
  })
  // 중복 감지: 같은 사람이 같은 지원금 2회 이상
  const usageCount = new Map<string, number>()
  subsidyUsageRaw.forEach(u => {
    const key = `${u.userId}:${u.subsidyName}`
    usageCount.set(key, (usageCount.get(key) ?? 0) + 1)
  })
  const subsidyUsage = subsidyUsageRaw.map(u => ({
    ...u,
    isDuplicate: (usageCount.get(`${u.userId}:${u.subsidyName}`) ?? 0) > 1,
  }))

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header role="hr" />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">워케이션 현황판</h1>
            <p className="text-sm text-[#475569]">2026년 상반기</p>
          </div>
          <Link href="/accommodations">
            <Button>+ 새 예약</Button>
          </Link>
        </div>

        {/* 요약 카드 4개 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '총 예약',     value: `${bookings.length}건`,  sub: '전체 예약 수',  color: 'text-blue-500' },
            { label: '참여 직원',   value: `${totalGuests}명`,       sub: '누적 참여',     color: 'text-emerald-500' },
            { label: '예산 사용률', value: `${budgetPct}%`,          sub: `${budgetUsed.toLocaleString()}원 사용`, color: 'text-amber-500' },
            { label: '절감 지원금', value: `${subsidyUsage.reduce((s, u) => s + u.amount, 0).toLocaleString()}원`, sub: '지원금 합계', color: 'text-purple-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <p className="text-xs text-[#94A3B8] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#475569]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* 예산 게이지 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-sm">예산 사용 현황</span>
            <span className="text-xs text-[#94A3B8]">{budgetUsed.toLocaleString()}원 / {budgetTotal.toLocaleString()}원</span>
          </div>
          <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all" style={{ width: `${budgetPct}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#94A3B8]">
            <span>{budgetPct}% 사용</span>
            <span>잔여 {(budgetTotal - budgetUsed).toLocaleString()}원</span>
          </div>
        </div>

        {/* 지원금 수혜 현황 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="text-lg">💰</span>
              <h2 className="font-bold text-sm">지원금 수혜 현황</h2>
              <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full border border-amber-500/20">1인 1회 제한</span>
            </div>
            <Link href="/dashboard/billing" className="text-xs text-blue-500 hover:text-blue-600 transition-colors">원빌링 정산 →</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-8 text-[#94A3B8] text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />불러오는 중...
            </div>
          ) : subsidyUsage.length === 0 ? (
            <div className="text-center py-8 text-[#94A3B8] text-sm">지원금 수혜 내역이 없어요</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                  {['직원', '지원금', '지역', '수혜일', '금액', '상태'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subsidyUsage.map((u, i) => (
                  <tr key={i} className={`border-b border-[#E2E8F0]/50 transition-colors ${u.isDuplicate ? 'bg-amber-500/5' : 'hover:bg-[#F1F5F9]/50'}`}>
                    <td className="px-5 py-3 font-medium">{u.userName}</td>
                    <td className="px-5 py-3 text-xs text-[#475569]">{u.subsidyName}</td>
                    <td className="px-5 py-3 text-xs text-[#94A3B8]">📍 {u.region}</td>
                    <td className="px-5 py-3 text-xs text-[#475569]">{u.date}</td>
                    <td className="px-5 py-3 text-emerald-500 font-medium">{u.amount.toLocaleString()}원</td>
                    <td className="px-5 py-3">
                      {u.isDuplicate
                        ? <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-1 rounded-lg font-medium">⚠️ 중복 수혜</span>
                        : <span className="text-xs bg-emerald-500/20 text-emerald-600 px-2 py-1 rounded-lg font-medium">✅ 정상</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="px-5 py-3 border-t border-[#E2E8F0]">
            <Link href="/dashboard/billing" className="block w-full text-center py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors">
              지원금 일괄 신청하기 →
            </Link>
          </div>
        </div>

        {/* 성과 예측 */}
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📈</span>
            <h2 className="font-bold text-sm">워케이션 성과 예측</h2>
            <span className="text-xs bg-purple-500/20 text-purple-600 px-2 py-0.5 rounded-full border border-purple-500/30">AI 분석</span>
          </div>
          <p className="text-xs text-[#475569] mb-5">{totalGuests || 28}명 참여 기준 · 과거 데이터 및 업계 평균 기반 예측</p>
          <div className="grid grid-cols-4 gap-4 mb-5">
            {PERFORMANCE.map((p) => {
              const diff = p.reverse ? p.before - p.after : p.after - p.before
              return (
                <div key={p.label} className="bg-white rounded-xl p-4">
                  <div className="text-xs text-[#94A3B8] mb-3">{p.label}</div>
                  <div className="flex items-end gap-2 mb-3">
                    <div className="flex-1">
                      <div className="text-xs text-[#94A3B8] mb-1">이전</div>
                      <div className="h-16 bg-[#F1F5F9] rounded-lg flex items-end overflow-hidden">
                        <div className="w-full bg-[#CBD5E1] rounded-lg" style={{ height: `${p.before}%` }} />
                      </div>
                      <div className="text-xs text-center mt-1 text-[#475569]">{p.before}{p.unit}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#94A3B8] mb-1">예측</div>
                      <div className="h-16 bg-[#F1F5F9] rounded-lg flex items-end overflow-hidden">
                        <div className="w-full bg-purple-400 rounded-lg" style={{ height: `${p.after}%` }} />
                      </div>
                      <div className="text-xs text-center mt-1 text-purple-600">{p.after}{p.unit}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-center text-emerald-500">
                    {p.reverse ? '▼' : '▲'} {diff}{p.unit} 개선
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bg-white rounded-xl p-4 text-sm">
            <div className="font-semibold mb-2 text-purple-600">💡 AI 종합 분석</div>
            <p className="text-xs text-[#475569] leading-relaxed">
              워케이션 참여 직원 기준, 업무 집중도 <strong className="text-blue-600">+16%</strong>, 팀 결속력 <strong className="text-blue-600">+19%</strong> 향상이 예측됩니다.
              특히 이직 의향이 <strong className="text-emerald-500">19%p 감소</strong>하여 인재 유지 효과가 클 것으로 분석됩니다.
              예상 ROI는 투자 비용 대비 <strong className="text-blue-600">약 3.2배</strong>입니다.
            </p>
          </div>
        </div>

        {/* 예약 목록 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-5">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <span className="font-semibold text-sm">최근 예약 내역</span>
            <Link href="/booking/manage" className="text-xs text-blue-500 hover:text-blue-600 transition-colors">변경·취소 →</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-10 text-[#94A3B8] text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
              불러오는 중...
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-10 text-[#94A3B8] text-sm">아직 예약 내역이 없어요</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                  {['숙소', '지역', '체크인', '체크아웃', '인원', '금액', '상태'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-sm">{b.accommodations?.name ?? '-'}</td>
                    <td className="px-5 py-3 text-[#475569] text-xs">{b.accommodations?.region ?? '-'}</td>
                    <td className="px-5 py-3 text-[#475569] text-xs">{b.start_date}</td>
                    <td className="px-5 py-3 text-[#475569] text-xs">{b.end_date}</td>
                    <td className="px-5 py-3 text-[#475569] text-xs">{b.guests}명</td>
                    <td className="px-5 py-3 text-sm">{b.total_price?.toLocaleString()}원</td>
                    <td className="px-5 py-3"><Badge variant={b.status as any}>{statusLabel[b.status] ?? b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 퀵 메뉴 */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { href: '/members',        icon: '👥', label: '임직원 초대·관리' },
            { href: '/booking/manage', icon: '📅', label: '예약 변경·취소' },
            { href: '/dashboard/billing', icon: '🧾', label: '원빌링 정산' },
            { href: '/settings',       icon: '⚙️', label: '회사 설정' },
          ].map(q => (
            <Link key={q.href} href={q.href}
              className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-blue-500/50 transition-colors">
              <span className="text-xl">{q.icon}</span>
              <span className="text-sm font-medium">{q.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
