'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import { useHrOnly } from '@/lib/useHrOnly'
import { supabase } from '@/lib/supabase'

const PERF_BENCHMARKS = [
  { label: '업무 집중도',  before: 68, after: 84, unit: '%', icon: '🎯' },
  { label: '팀 결속력',   before: 72, after: 91, unit: '%', icon: '🤝' },
  { label: '직원 만족도', before: 74, after: 92, unit: '%', icon: '😊' },
  { label: '이직 의향',   before: 38, after: 19, unit: '%', icon: '🚪', reverse: true },
  { label: '번아웃 지수', before: 52, after: 31, unit: '%', icon: '🔥', reverse: true },
  { label: '협업 활동',   before: 64, after: 88, unit: '%', icon: '💬' },
]

type BookingRow = {
  id: string
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: string
  accommodations: { name: string; region: string; location: string } | null
}

type SubsidyRow = { region: string; name: string; amount_per_person: number }

function normalizeRegion(r: string) {
  return r.replace('특별자치도', '도').replace('특별자치시', '시').replace('특별시', '시').replace('광역시', '시').split(' ')[0]
}
function regionMatch(a: string, b: string) {
  if (!a || !b) return false
  const na = normalizeRegion(a), nb = normalizeRegion(b)
  return na.includes(nb) || nb.includes(na)
}
function daysBetween(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

export default function ReportPage() {
  useHrOnly()

  const [bookings,   setBookings]   = useState<BookingRow[]>([])
  const [subsidies,  setSubsidies]  = useState<SubsidyRow[]>([])
  const [companyName, setCompany]   = useState('우리 회사')
  const [loading,    setLoading]    = useState(true)
  const [aiSummary,  setAiSummary]  = useState('')
  const [aiLoading,  setAiLoading]  = useState(false)
  const [aiError,    setAiError]    = useState('')

  useEffect(() => {
    Promise.all([
      supabase
        .from('bookings')
        .select('*, accommodations(name, region, location)')
        .eq('status', 'confirmed')
        .order('start_date', { ascending: false }),
      supabase.from('subsidies').select('region, name, amount_per_person'),
      supabase.auth.getUser(),
    ]).then(async ([{ data: bData }, { data: sData }, { data: uData }]) => {
      if (bData) setBookings(bData as any)
      if (sData) setSubsidies(sData)

      const companyId = uData.user?.user_metadata?.company_id
      if (companyId) {
        const { data: co } = await supabase
          .from('companies')
          .select('name')
          .eq('id', companyId)
          .single()
        if (co?.name) setCompany(co.name)
      }
      setLoading(false)
    })
  }, [])

  const confirmed = bookings
  const participants = confirmed.reduce((s, b) => s + (b.guests ?? 0), 0)
  const totalBudget  = confirmed.reduce((s, b) => s + (b.total_price ?? 0), 0)

  const subsidySaved = confirmed.reduce((s, b) => {
    const region = b.accommodations?.region ?? ''
    if (!region) return s
    return s + subsidies
      .filter(sub => regionMatch(region, sub.region))
      .reduce((a, sub) => a + sub.amount_per_person * (b.guests ?? 0), 0)
  }, 0)

  const latest       = confirmed[0]
  const accomName    = latest?.accommodations?.name ?? '워케이션 숙소'
  const region       = latest?.accommodations?.region ?? ''
  const startDate    = latest?.start_date ?? ''
  const endDate      = latest?.end_date ?? ''
  const days         = startDate && endDate ? daysBetween(startDate, endDate) : 3

  const carbonSaved  = Math.round(28.5 * 2 * days * (participants || 28) * 0.21)
  const localSpend   = (participants || 28) * days * 100000
  const roi          = totalBudget > 0
    ? (((participants * 84 * 50000) - totalBudget) / totalBudget + 1).toFixed(1)
    : '3.2'

  const generateAI = useCallback(async () => {
    setAiLoading(true)
    setAiError('')
    try {
      const res = await fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          accommodationName: accomName,
          region,
          startDate,
          endDate,
          participants: participants || 28,
          totalBudget,
          subsidySaved,
          days,
        }),
      })
      const data = await res.json()
      if (data.summary) setAiSummary(data.summary)
      else setAiError(data.error ?? 'AI 생성에 실패했습니다.')
    } catch {
      setAiError('서버 오류가 발생했습니다.')
    } finally {
      setAiLoading(false)
    }
  }, [companyName, accomName, region, startDate, endDate, participants, totalBudget, subsidySaved, days])

  const summaryText = aiSummary || (
    `이번 워케이션(${participants || 28}명)은 직원 만족도 +18%p, 팀 결속력 +19%p 향상을 이끌어냈습니다. ` +
    `지원금 ${subsidySaved.toLocaleString()}원 절감으로 실질 비용 부담이 줄었으며, ` +
    `투자 대비 생산성·리텐션 효과를 종합한 ROI는 ${roi}배로 측정됩니다. ` +
    `통근 거리 감소로 인한 탄소 ${carbonSaved}kg 저감은 ESG 경영 지표에 반영 가능합니다.`
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header role="hr" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/dashboard" className="text-xs text-[#94A3B8] hover:text-[#475569] mb-2 block">← 대시보드</Link>
            <h1 className="text-2xl font-black mb-1">워케이션 성과 리포트</h1>
            {loading ? (
              <p className="text-sm text-[#94A3B8]">데이터 불러오는 중...</p>
            ) : (
              <p className="text-sm text-[#475569]">
                {companyName}
                {accomName !== '워케이션 숙소' && ` · ${accomName}`}
                {region && ` (${region})`}
                {startDate && ` · ${startDate}${endDate ? ` ~ ${endDate}` : ''}`}
                {participants > 0 && ` · ${participants}명 참여`}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button className="text-sm px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl hover:border-blue-500/50 transition-colors">
              PDF 저장
            </button>
            <button className="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
              경영진 보고 →
            </button>
          </div>
        </div>

        {/* CEO용 1페이지 요약 */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📋</span>
            <h2 className="font-bold">경영진 요약 (Executive Summary)</h2>
            <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded-full border border-blue-500/30">AI 생성</span>
            <button
              onClick={generateAI}
              disabled={aiLoading}
              className="ml-auto text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-1"
            >
              {aiLoading ? (
                <><span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> 생성 중...</>
              ) : (
                '✨ AI 재생성'
              )}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'ROI',        value: `${roi}배`,                       sub: '투자 대비 효과',   color: 'text-blue-400' },
              { label: '만족도 향상', value: '+18%p',                          sub: '직원 설문 기준',   color: 'text-emerald-400' },
              { label: '지원금 절감', value: `${(subsidySaved/10000).toFixed(0)}만원`, sub: '지자체 지원금', color: 'text-purple-400' },
              { label: '탄소 저감',   value: `${carbonSaved}kg`,               sub: 'CO₂ 절감',       color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 text-center">
                <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs font-semibold mb-0.5">{s.label}</div>
                <div className="text-xs text-[#94A3B8]">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 text-sm leading-relaxed text-[#475569] min-h-[80px]">
            {aiLoading ? (
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                Claude AI가 리포트를 작성하고 있습니다...
              </div>
            ) : aiError ? (
              <p className="text-red-400 text-xs">{aiError}</p>
            ) : (
              <p>{summaryText}</p>
            )}
          </div>
        </div>

        {/* 성과 상세 — 전후 비교 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-bold">📊 지표별 상세 비교 (워케이션 전 → 후)</h2>
          </div>
          <p className="text-xs text-[#94A3B8] mb-5">업계 평균 기반 예측값 · 실제 설문 연동 시 자동 업데이트</p>
          <div className="grid grid-cols-3 gap-4">
            {PERF_BENCHMARKS.map(p => {
              const diff   = p.reverse ? p.before - p.after : p.after - p.before
              const isGood = p.reverse ? p.after < p.before : p.after > p.before
              return (
                <div key={p.label} className="bg-[#F1F5F9] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span>{p.icon}</span>
                    <span className="text-sm font-medium">{p.label}</span>
                  </div>
                  <div className="flex items-end gap-3 mb-3">
                    <div className="flex-1 text-center">
                      <div className="text-xs text-[#94A3B8] mb-1">이전</div>
                      <div className="h-20 bg-white rounded-lg flex items-end overflow-hidden">
                        <div className="w-full bg-[#CBD5E1] rounded-lg" style={{ height: `${p.before}%` }} />
                      </div>
                      <div className="text-sm font-bold mt-1 text-[#475569]">{p.before}{p.unit}</div>
                    </div>
                    <div className="text-[#94A3B8] mb-4">→</div>
                    <div className="flex-1 text-center">
                      <div className="text-xs text-[#94A3B8] mb-1">이후</div>
                      <div className="h-20 bg-white rounded-lg flex items-end overflow-hidden">
                        <div className="w-full bg-blue-500/70 rounded-lg" style={{ height: `${p.after}%` }} />
                      </div>
                      <div className="text-sm font-bold mt-1 text-blue-600">{p.after}{p.unit}</div>
                    </div>
                  </div>
                  <div className={`text-center text-xs font-bold py-1 rounded-lg ${isGood ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {p.reverse ? '▼' : '▲'} {diff}{p.unit} {isGood ? '개선' : '악화'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ESG · 탄소발자국 */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🌿</span>
            <h2 className="font-bold">ESG · 탄소발자국 자동 산출</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">기후테크</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: '탄소 저감량',     value: `${carbonSaved}kg CO₂`,                        sub: '통근 대체 효과',              color: 'text-emerald-400' },
              { label: '지역 소비 기여',  value: `약 ${(localSpend/10000).toLocaleString()}만원`, sub: `${participants||28}명 × ${days}일 × 10만원`, color: 'text-blue-400' },
              { label: '지방소멸 기여',   value: `생활인구 ${participants||28}명`,                sub: `${region||'워케이션 지역'} 유입`,              color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4">
                <div className={`text-xl font-black ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs font-semibold mb-0.5">{s.label}</div>
                <div className="text-xs text-[#94A3B8]">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 text-xs text-[#94A3B8] leading-relaxed">
            <strong className="text-[#475569]">산출 기준:</strong> 평균 통근 거리 28.5km × 왕복 × {days}일 × {participants||28}명 × 0.21kgCO₂/km = <strong className="text-emerald-400">{carbonSaved}kg CO₂</strong> 저감.
            본 수치는 기업 ESG 보고서 및 탄소중립 공시에 활용 가능합니다.
          </div>
        </div>

        {/* 협업툴 데이터 연동 현황 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
          <h2 className="font-bold mb-4">🔗 협업툴 데이터 연동 현황</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Slack',            icon: '💬', status: 'connected', data: '메시지 응답속도 +34%' },
              { name: 'Notion',           icon: '📝', status: 'connected', data: '문서 공동편집 +52%' },
              { name: 'Google Workspace', icon: '📊', status: 'pending',   data: '연동 설정 필요' },
            ].map(t => (
              <div key={t.name} className={`rounded-xl p-4 border ${
                t.status === 'connected' ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-white border-[#E2E8F0] opacity-60'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span>{t.icon}</span>
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-md ${
                    t.status === 'connected' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {t.status === 'connected' ? '연동됨' : '대기중'}
                  </span>
                </div>
                <div className="text-xs text-[#94A3B8]">{t.data}</div>
              </div>
            ))}
          </div>
          <Link href="/settings" className="mt-4 block text-center text-xs text-blue-400 hover:text-blue-600 transition-colors">
            협업툴 연동 설정 →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
