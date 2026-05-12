import Header from '@/components/ui/Header'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const BOOKINGS = [
  { id: 'WK-0010', name: '김지수', accommodation: '강릉 씨사이드 워크스테이션', dates: '6/10 – 6/13', amount: 255000, status: 'confirmed' as const },
  { id: 'WK-0009', name: '박민준', accommodation: '제주 한달살기 스튜디오',     dates: '6/5 – 6/8',  amount: 285000, status: 'confirmed' as const },
  { id: 'WK-0008', name: '이서연', accommodation: '양양 서퍼스 하우스',          dates: '5/28 – 5/30', amount: 140000, status: 'confirmed' as const },
  { id: 'WK-0007', name: '최준혁', accommodation: '여수 오션뷰 코워킹',          dates: '5/20 – 5/23', amount: 225000, status: 'cancelled' as const },
]

const SUBSIDIES = [
  { name: '강원도 워케이션 유치 지원금', region: '강원도', amount: 100000, unit: '1인당', condition: '2박 이상', matched: true,  deadline: '2026-06-30' },
  { name: '제주 기업 유치 특별 지원',    region: '제주도', amount: 150000, unit: '1인당', condition: '3박 이상', matched: true,  deadline: '2026-07-31' },
  { name: '전라남도 워케이션 활성화',    region: '전라남도', amount: 80000, unit: '1인당', condition: '2박 이상', matched: false, deadline: '2026-05-31' },
]

const PERFORMANCE = [
  { label: '업무 집중도',  before: 68, after: 84, unit: '%' },
  { label: '팀 결속력',   before: 72, after: 91, unit: '%' },
  { label: '직원 만족도', before: 74, after: 92, unit: '%' },
  { label: '이직 의향',   before: 38, after: 19, unit: '%', reverse: true },
]

const statusLabel = { confirmed: '확정', pending: '대기중', cancelled: '취소' }

export default function DashboardPage() {
  const budgetTotal = 5000000
  const budgetUsed  = 1850000
  const budgetPct   = Math.round((budgetUsed / budgetTotal) * 100)

  const matchedSubsidies = SUBSIDIES.filter(s => s.matched)
  const subsidyTotal     = matchedSubsidies.reduce((sum, s) => sum + s.amount * 4, 0)

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header role="hr" userName="홍길동 팀장" />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">워케이션 현황판</h1>
            <p className="text-sm text-[#94A3B8]">삼성전자 · 2026년 상반기</p>
          </div>
          <Link href="/accommodations">
            <Button>+ 새 예약</Button>
          </Link>
        </div>

        {/* 요약 카드 4개 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '총 예약',     value: '12건',  sub: '이번 분기',  color: 'text-blue-400' },
            { label: '참여 직원',   value: '28명',  sub: '전체 45명', color: 'text-emerald-400' },
            { label: '예산 사용률', value: `${budgetPct}%`, sub: `${budgetUsed.toLocaleString()}원 사용`, color: 'text-amber-400' },
            { label: '평균 만족도', value: '4.7점', sub: '직원 설문',  color: 'text-purple-400' },
          ].map((s) => (
            <div key={s.label} className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
              <p className="text-xs text-[#64748B] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#94A3B8]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* 예산 게이지 */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-sm">예산 사용 현황</span>
            <span className="text-xs text-[#64748B]">{budgetUsed.toLocaleString()}원 / {budgetTotal.toLocaleString()}원</span>
          </div>
          <div className="h-3 bg-[#263548] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${budgetPct}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#64748B]">
            <span>{budgetPct}% 사용</span>
            <span>잔여 {(budgetTotal - budgetUsed).toLocaleString()}원</span>
          </div>
        </div>

        {/* 지원금 자동 매칭 */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💰</span>
              <h2 className="font-bold text-sm">지원금 자동 매칭</h2>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">자동 분석 완료</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#64748B]">최대 수령 가능 금액</div>
              <div className="text-lg font-black text-emerald-400">{subsidyTotal.toLocaleString()}원</div>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8] mb-4">삼성전자 · 45명 규모 기준으로 신청 가능한 지원금을 자동으로 찾았어요</p>

          <div className="flex flex-col gap-3">
            {SUBSIDIES.map((s) => (
              <div key={s.name} className={`flex items-center justify-between p-3 rounded-xl border ${
                s.matched
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-[#1E293B] border-[#334155] opacity-50'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${s.matched ? '' : 'grayscale'}`}>{s.matched ? '✅' : '❌'}</span>
                  <div>
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="text-xs text-[#64748B]">{s.condition} · 마감 {s.deadline}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-emerald-400">{s.amount.toLocaleString()}원</div>
                  <div className="text-xs text-[#64748B]">{s.unit}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors">
            매칭된 지원금 신청하기 →
          </button>
        </div>

        {/* 성과 예측 */}
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📈</span>
            <h2 className="font-bold text-sm">워케이션 성과 예측</h2>
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">AI 분석</span>
          </div>
          <p className="text-xs text-[#94A3B8] mb-5">28명 참여 기준 · 과거 데이터 및 업계 평균 기반 예측</p>

          <div className="grid grid-cols-4 gap-4 mb-5">
            {PERFORMANCE.map((p) => {
              const diff = p.reverse ? p.before - p.after : p.after - p.before
              return (
                <div key={p.label} className="bg-[#1E293B] rounded-xl p-4">
                  <div className="text-xs text-[#64748B] mb-3">{p.label}</div>
                  <div className="flex items-end gap-2 mb-3">
                    <div className="flex-1">
                      <div className="text-xs text-[#64748B] mb-1">이전</div>
                      <div className="h-16 bg-[#263548] rounded-lg flex items-end overflow-hidden">
                        <div className="w-full bg-[#334155] rounded-lg transition-all" style={{ height: `${p.before}%` }} />
                      </div>
                      <div className="text-xs text-center mt-1 text-[#94A3B8]">{p.before}{p.unit}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#64748B] mb-1">예측</div>
                      <div className="h-16 bg-[#263548] rounded-lg flex items-end overflow-hidden">
                        <div className="w-full bg-purple-500/60 rounded-lg transition-all" style={{ height: `${p.after}%` }} />
                      </div>
                      <div className="text-xs text-center mt-1 text-purple-300">{p.after}{p.unit}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-bold text-center ${p.reverse ? 'text-emerald-400' : 'text-emerald-400'}`}>
                    {p.reverse ? '▼' : '▲'} {diff}{p.unit} 개선
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-[#1E293B] rounded-xl p-4 text-sm">
            <div className="font-semibold mb-2 text-purple-300">💡 AI 종합 분석</div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              이번 분기 워케이션 참여 직원 28명 기준, 업무 집중도 <strong className="text-white">+16%</strong>, 팀 결속력 <strong className="text-white">+19%</strong> 향상이 예측됩니다.
              특히 이직 의향이 <strong className="text-emerald-400">19%p 감소</strong>하여 인재 유지 효과가 클 것으로 분석됩니다.
              예상 ROI는 투자 비용 대비 <strong className="text-white">약 3.2배</strong>입니다.
            </p>
          </div>
        </div>

        {/* 예약 목록 */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
            <span className="font-semibold text-sm">최근 예약 내역</span>
            <Link href="/booking/manage" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">변경·취소 →</Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#64748B] border-b border-[#334155]">
                {['예약번호', '직원', '숙소', '날짜', '금액', '상태'].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => (
                <tr key={b.id} className="border-b border-[#334155]/50 hover:bg-[#263548]/50 transition-colors">
                  <td className="px-5 py-3 text-[#64748B] text-xs">{b.id}</td>
                  <td className="px-5 py-3 font-medium">{b.name}</td>
                  <td className="px-5 py-3 text-[#94A3B8] text-xs">{b.accommodation}</td>
                  <td className="px-5 py-3 text-[#94A3B8] text-xs">{b.dates}</td>
                  <td className="px-5 py-3">{b.amount.toLocaleString()}원</td>
                  <td className="px-5 py-3"><Badge variant={b.status}>{statusLabel[b.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 퀵 메뉴 */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { href: '/members',        icon: '👥', label: '임직원 초대·관리' },
            { href: '/booking/manage', icon: '📅', label: '예약 변경·취소' },
            { href: '/settings',       icon: '⚙️', label: '회사 설정' },
          ].map(q => (
            <Link key={q.href} href={q.href}
              className="flex items-center gap-3 bg-[#1E293B] border border-[#334155] rounded-xl p-4 hover:border-blue-500/50 transition-colors">
              <span className="text-xl">{q.icon}</span>
              <span className="text-sm font-medium">{q.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
