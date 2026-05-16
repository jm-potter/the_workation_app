import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const JEJU_CITY_DATA = [
  { city: '서귀포시', visitors: 520, companies: 18, nights: 2600, growth: '+38%', topSpot: '중문·색달' },
  { city: '제주시',   visitors: 460, companies: 17, nights: 2300, growth: '+24%', topSpot: '애월·한림' },
]

const MONTHLY_TREND = [
  { month: '1월', visitors: 62 },
  { month: '2월', visitors: 95 },
  { month: '3월', visitors: 178 },
  { month: '4월', visitors: 261 },
  { month: '5월', visitors: 384 },
]

const maxVisitors = Math.max(...MONTHLY_TREND.map(m => m.visitors))

const JEJU_SUBSIDY = {
  amount: 300000,
  unit: '1인당',
  minNights: 3,
  deadline: '2026-07-31',
  budget: 150000000,
  used: 94500000,
}

const JEJU_APPLICATIONS = [
  { company: 'LG전자',    city: '서귀포시 중문', employees: 3, amount:  900000, status: 'approved' },
  { company: '현대자동차', city: '제주시 애월',   employees: 5, amount: 1500000, status: 'pending'  },
  { company: '토스',       city: '서귀포시 색달', employees: 4, amount: 1200000, status: 'pending'  },
  { company: '당근마켓',   city: '제주시 한림',   employees: 2, amount:  600000, status: 'approved' },
  { company: '무신사',     city: '서귀포시 표선', employees: 3, amount:  900000, status: 'pending'  },
]

const budgetPct = Math.round((JEJU_SUBSIDY.used / JEJU_SUBSIDY.budget) * 100)

export default function GovPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg">더워케이션</span>
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
          <p className="text-sm text-[#475569]">2026년 5월 기준 · 제주도 전체</p>
        </div>

        {/* 제주 요약 통계 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '제주 워케이션 방문자', value: '980명',  sub: '전년 대비 +31%',   color: 'text-blue-400'    },
            { label: '참여 기업 수',         value: '35개사', sub: '이번 달 신규 4개',  color: 'text-emerald-400' },
            { label: '지역 경제 효과',       value: '5.1억',  sub: '숙박·식음료 합산',  color: 'text-amber-400'   },
            { label: '평균 체류 기간',       value: '5.0박',  sub: '전국 평균 +1.8박',  color: 'text-purple-400'  },
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
                  {['지역', '방문자', '참여 기업', '총 숙박일', '인기 지역', '성장률'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {JEJU_CITY_DATA.map((r) => (
                  <tr key={r.city} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                    <td className="px-5 py-3 font-medium">제주 {r.city}</td>
                    <td className="px-5 py-3 text-blue-400 font-bold">{r.visitors.toLocaleString()}명</td>
                    <td className="px-5 py-3 text-[#475569]">{r.companies}개</td>
                    <td className="px-5 py-3 text-[#475569]">{r.nights.toLocaleString()}박</td>
                    <td className="px-5 py-3 text-xs text-[#94A3B8]">📍 {r.topSpot}</td>
                    <td className="px-5 py-3 text-emerald-400 font-semibold text-xs">{r.growth}</td>
                  </tr>
                ))}
                {/* 합계 */}
                <tr className="bg-[#F8FAFC]">
                  <td className="px-5 py-3 font-bold text-xs text-[#475569]">제주도 합계</td>
                  <td className="px-5 py-3 text-blue-500 font-black">980명</td>
                  <td className="px-5 py-3 text-[#475569] font-bold">35개</td>
                  <td className="px-5 py-3 text-[#475569] font-bold">4,900박</td>
                  <td className="px-5 py-3" />
                  <td className="px-5 py-3 text-emerald-400 font-bold text-xs">+31%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 월별 트렌드 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className="font-semibold text-sm mb-5">제주도 월별 방문자 추이</div>
            <div className="flex items-end gap-3 h-36 mb-3">
              {MONTHLY_TREND.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-blue-400 font-bold">{m.visitors}</span>
                  <div
                    className="w-full bg-blue-500/80 rounded-t-md transition-all"
                    style={{ height: `${(m.visitors / maxVisitors) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-around">
              {MONTHLY_TREND.map(m => (
                <span key={m.month} className="flex-1 text-center text-xs text-[#94A3B8]">{m.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 제주 지원금 현황 */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">💰</span>
            <h2 className="font-bold text-sm">제주도 워케이션 지원금 현황</h2>
            <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded-full border border-blue-500/30">2026년 상반기</span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/70 border border-blue-500/20 rounded-xl p-4">
              <div className="text-2xl font-black text-blue-500 mb-1">{JEJU_SUBSIDY.amount.toLocaleString()}원</div>
              <div className="text-xs font-semibold text-[#0F172A] mb-0.5">1인당 지원금</div>
              <div className="text-xs text-[#94A3B8]">{JEJU_SUBSIDY.minNights}박 이상 · ~{JEJU_SUBSIDY.deadline}</div>
            </div>
            <div className="bg-white/70 border border-blue-500/20 rounded-xl p-4">
              <div className="text-2xl font-black text-emerald-500 mb-1">{JEJU_SUBSIDY.used.toLocaleString()}원</div>
              <div className="text-xs font-semibold text-[#0F172A] mb-1">예산 집행액</div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${budgetPct}%` }} />
              </div>
              <div className="text-xs text-[#94A3B8] mt-1">총 예산 {JEJU_SUBSIDY.budget.toLocaleString()}원 · {budgetPct}% 집행</div>
            </div>
            <div className="bg-white/70 border border-blue-500/20 rounded-xl p-4">
              <div className="text-2xl font-black text-amber-500 mb-1">{JEJU_APPLICATIONS.length}건</div>
              <div className="text-xs font-semibold text-[#0F172A] mb-0.5">총 신청 건수</div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full">
                  승인 {JEJU_APPLICATIONS.filter(a => a.status === 'approved').length}건
                </span>
                <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-0.5 rounded-full">
                  검토중 {JEJU_APPLICATIONS.filter(a => a.status === 'pending').length}건
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 지원금 신청 현황 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <div>
              <span className="font-semibold text-sm">제주도 워케이션 지원금 신청 현황</span>
              <span className="text-xs text-[#94A3B8] ml-2">1인당 30만원 지원</span>
            </div>
            <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
              검토중 {JEJU_APPLICATIONS.filter(a => a.status === 'pending').length}건
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                {['기업명', '워케이션 지역', '인원', '신청 금액', '상태', '처리'].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JEJU_APPLICATIONS.map((s, i) => (
                <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                  <td className="px-5 py-3 font-medium">{s.company}</td>
                  <td className="px-5 py-3 text-xs text-[#475569]">📍 {s.city}</td>
                  <td className="px-5 py-3 text-[#475569]">{s.employees}명</td>
                  <td className="px-5 py-3 font-medium">{s.amount.toLocaleString()}원</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                      s.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {s.status === 'approved' ? '승인됨' : '검토중'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {s.status === 'pending' && (
                      <div className="flex gap-1.5">
                        <button className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30">승인</button>
                        <button className="text-xs px-2.5 py-1 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20">반려</button>
                      </div>
                    )}
                    {s.status === 'approved' && (
                      <span className="text-xs text-[#94A3B8]">처리완료</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
