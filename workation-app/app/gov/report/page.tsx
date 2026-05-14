import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const MONTHLY = [
  { month: '1월', visitors: 120, companies: 8,  spend: 36000000  },
  { month: '2월', visitors: 180, companies: 12, spend: 54000000  },
  { month: '3월', visitors: 320, companies: 21, spend: 96000000  },
  { month: '4월', visitors: 480, companies: 31, spend: 144000000 },
  { month: '5월', visitors: 620, companies: 41, spend: 186000000 },
]
const maxVisitors = Math.max(...MONTHLY.map(m => m.visitors))

const COMPANIES = [
  { name: '삼성전자',  team: '개발팀',   headcount: 4, nights: 3, region: '강릉', spend: 1020000, subsidy: 400000 },
  { name: 'LG전자',   team: '마케팅팀', headcount: 3, nights: 3, region: '속초', spend: 855000,  subsidy: 300000 },
  { name: '카카오',   team: '디자인팀', headcount: 2, nights: 2, region: '양양', spend: 280000,  subsidy: 200000 },
  { name: '네이버',   team: '전략팀',   headcount: 5, nights: 4, region: '강릉', spend: 1700000, subsidy: 500000 },
  { name: '쿠팡',     team: 'UX팀',    headcount: 3, nights: 3, region: '속초', spend: 585000,  subsidy: 300000 },
]

const totalVisitors = COMPANIES.reduce((s, c) => s + c.headcount, 0)
const totalSpend    = COMPANIES.reduce((s, c) => s + c.spend, 0)
const totalSubsidy  = COMPANIES.reduce((s, c) => s + c.subsidy, 0)
const totalCompanies = COMPANIES.length

const carbonSaved = Math.round(28.5 * 2 * 3 * totalVisitors * 0.21)

export default function GovReportPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/gov" className="text-[#94A3B8] hover:text-[#475569] transition-colors">← 대시보드</Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="font-semibold">지역 활성화 성과 리포트</span>
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
          <h1 className="text-2xl font-black mb-1">지역 활성화 성과 리포트</h1>
          <p className="text-sm text-[#475569]">강원특별자치도 · 2026년 1~5월 누적</p>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '총 방문 인원',   value: `${totalVisitors}명`,                         sub: '전년 동기 대비 +41%',  color: 'text-blue-500'    },
            { label: '참여 기업',      value: `${totalCompanies}개사`,                       sub: '이번 달 신규 3개',     color: 'text-purple-500'  },
            { label: '지역 소비액',    value: `${(totalSpend / 10000).toFixed(0)}만원`,       sub: '숙박·식음료 합산',    color: 'text-amber-500'   },
            { label: '지원금 집행액',  value: `${(totalSubsidy / 10000).toFixed(0)}만원`,     sub: '예산 대비 62% 소진',  color: 'text-emerald-500' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <p className="text-xs text-[#94A3B8] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#475569]">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* 월별 방문자 추이 */}
          <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className="font-semibold text-sm mb-5">월별 방문자 & 소비액 추이</div>
            <div className="flex items-end gap-4 h-36 mb-3">
              {MONTHLY.map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-blue-500 font-bold">{m.visitors}</span>
                  <div className="w-full flex items-end gap-0.5">
                    <div className="flex-1 bg-blue-500/80 rounded-t-sm"
                      style={{ height: `${(m.visitors / maxVisitors) * 100}%`, minHeight: '4px' }} />
                    <div className="flex-1 bg-emerald-400/60 rounded-t-sm"
                      style={{ height: `${(m.spend / 186000000) * 100}%`, minHeight: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mb-3">
              {MONTHLY.map(m => <span key={m.month} className="flex-1 text-center text-xs text-[#94A3B8]">{m.month}</span>)}
            </div>
            <div className="flex gap-4 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-blue-500/80 rounded inline-block" />방문자 (명)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-emerald-400/60 rounded inline-block" />소비액 (만원)</span>
            </div>
          </div>

          {/* 지역별 방문 분포 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className="font-semibold text-sm mb-5">방문 지역 분포</div>
            <div className="flex flex-col gap-3">
              {[
                { city: '강릉', count: 9, pct: 53 },
                { city: '속초', count: 5, pct: 29 },
                { city: '양양', count: 2, pct: 12 },
                { city: '기타', count: 1, pct: 6  },
              ].map(r => (
                <div key={r.city}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#475569] font-medium">{r.city}</span>
                    <span className="text-[#94A3B8]">{r.count}명 ({r.pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 참여 기업 내역 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <span className="font-semibold text-sm">참여 기업 내역</span>
            <span className="text-xs text-[#94A3B8]">{totalCompanies}개 기업 · 총 {totalVisitors}명</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                {['기업명', '팀', '인원', '숙박', '방문 지역', '소비액', '지원금 집행'].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map(c => (
                <tr key={c.name} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-xs text-[#475569]">{c.team}</td>
                  <td className="px-5 py-3 text-[#475569]">{c.headcount}명</td>
                  <td className="px-5 py-3 text-[#475569]">{c.nights}박</td>
                  <td className="px-5 py-3 text-xs text-[#94A3B8]">📍 {c.region}</td>
                  <td className="px-5 py-3 text-blue-500 font-medium">{c.spend.toLocaleString()}원</td>
                  <td className="px-5 py-3 text-emerald-500">{c.subsidy.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ESG & 지역경제 효과 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌿</span>
              <h2 className="font-bold text-sm">ESG · 지방소멸 기여 지표</h2>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: '생활인구 유입',   value: `${totalVisitors}명`,              sub: '강원도 체류 인구 증가', color: 'text-blue-500'    },
                { label: '탄소 저감',       value: `${carbonSaved}kg CO₂`,           sub: '통근 대체 효과',      color: 'text-emerald-500' },
                { label: '지역 소비 기여',  value: `${(totalSpend/10000).toFixed(0)}만원`, sub: '숙박·식음료·체험', color: 'text-amber-500'   },
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
                <span className="font-bold">3,000,000원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">집행 완료</span>
                <span className="font-bold text-emerald-500">{totalSubsidy.toLocaleString()}원</span>
              </div>
              <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                  style={{ width: `${Math.round((totalSubsidy / 3000000) * 100)}%` }} />
              </div>
              <div className="flex justify-between text-xs text-[#94A3B8]">
                <span>집행률 {Math.round((totalSubsidy / 3000000) * 100)}%</span>
                <span>잔여 {(3000000 - totalSubsidy).toLocaleString()}원</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 text-xs text-[#475569] leading-relaxed">
              <strong className="text-blue-600">기대 효과:</strong> 지원금 1원당 지역 소비 유발 약 <strong>3.2원</strong>으로 분석됩니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
