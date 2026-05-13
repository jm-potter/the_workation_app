import Link from 'next/link'
import Header from '@/components/ui/Header'

const BEFORE_AFTER = [
  { label: '업무 집중도',   before: 68, after: 84, unit: '%',  icon: '🎯' },
  { label: '팀 결속력',    before: 72, after: 91, unit: '%',  icon: '🤝' },
  { label: '직원 만족도',  before: 74, after: 92, unit: '%',  icon: '😊' },
  { label: '이직 의향',    before: 38, after: 19, unit: '%',  icon: '🚪', reverse: true },
  { label: '번아웃 지수',  before: 52, after: 31, unit: '%',  icon: '🔥', reverse: true },
  { label: '협업 활동',    before: 64, after: 88, unit: '%',  icon: '💬' },
]

const CARBON = {
  avgCommute:   28.5,
  days:         3,
  people:       28,
  coefficient:  0.21,
}
const carbonSaved = Math.round(CARBON.avgCommute * 2 * CARBON.days * CARBON.people * CARBON.coefficient)

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header role="hr" userName="홍길동 팀장" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/dashboard" className="text-xs text-[#94A3B8] hover:text-[#475569] mb-2 block">← 대시보드</Link>
            <h1 className="text-2xl font-black mb-1">워케이션 성과 리포트</h1>
            <p className="text-sm text-[#475569]">삼성전자 · 강릉 씨사이드 · 2026년 6월 10~13일 · 28명 참여</p>
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
          </div>

          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'ROI',        value: '3.2배',   sub: '투자 대비 효과',   color: 'text-blue-400' },
              { label: '만족도 향상', value: '+18%p',  sub: '직원 설문 기준',   color: 'text-emerald-400' },
              { label: '이직 의향',   value: '-19%p',  sub: '리텐션 효과',     color: 'text-purple-400' },
              { label: '탄소 저감',   value: `${carbonSaved}kg`, sub: 'CO₂ 절감', color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 text-center">
                <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs font-semibold mb-0.5">{s.label}</div>
                <div className="text-xs text-[#94A3B8]">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 text-sm leading-relaxed text-[#475569]">
            <p>
              이번 강릉 워케이션(6/10~13, 28명)은 <strong className="text-blue-600">직원 만족도 +18%p, 팀 결속력 +19%p</strong> 향상을 이끌어냈습니다.
              특히 이직 의향이 <strong className="text-emerald-400">38% → 19%로 절반 수준으로 감소</strong>하여 인재 유지 비용 절감 효과가 두드러집니다.
              투자 비용 대비 생산성·리텐션 효과를 종합한 <strong className="text-blue-600">ROI는 3.2배</strong>로 측정됐으며,
              통근 거리 감소로 인한 <strong className="text-amber-400">탄소 {carbonSaved}kg 저감</strong>은 ESG 경영 지표에 반영 가능합니다.
            </p>
          </div>
        </div>

        {/* 성과 상세 — 전후 비교 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 mb-6">
          <h2 className="font-bold mb-5">📊 지표별 상세 비교 (워케이션 전 → 후)</h2>
          <div className="grid grid-cols-3 gap-4">
            {BEFORE_AFTER.map(p => {
              const diff    = p.reverse ? p.before - p.after : p.after - p.before
              const isGood  = p.reverse ? p.after < p.before : p.after > p.before
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
                        <div className="w-full bg-[#334155] rounded-lg" style={{ height: `${p.before}%` }} />
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
              { label: '탄소 저감량',      value: `${carbonSaved}kg CO₂`,   sub: '통근 대체 효과',       color: 'text-emerald-400' },
              { label: '지역 소비 기여',   value: '약 840만원',               sub: `${CARBON.people}명 × 3일 × 10만원`, color: 'text-blue-400' },
              { label: '지방소멸 기여',    value: '생활인구 28명',             sub: '강릉시 유입',         color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4">
                <div className={`text-xl font-black ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs font-semibold mb-0.5">{s.label}</div>
                <div className="text-xs text-[#94A3B8]">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 text-xs text-[#94A3B8] leading-relaxed">
            <strong className="text-[#475569]">산출 기준:</strong> 평균 통근 거리 {CARBON.avgCommute}km × 왕복 × {CARBON.days}일 × {CARBON.people}명 × 0.21kgCO₂/km = <strong className="text-emerald-400">{carbonSaved}kg CO₂</strong> 저감.
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
                t.status === 'connected' ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-[#1a2540] border-[#E2E8F0] opacity-60'
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
    </div>
  )
}
