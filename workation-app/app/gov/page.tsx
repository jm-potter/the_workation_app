import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const REGION_DATA = [
  { region: '강원도',    visitors: 1240, companies: 48, nights: 3720, growth: '+24%', topCity: '강릉' },
  { region: '제주도',    visitors: 980,  companies: 35, nights: 4900, growth: '+31%', topCity: '서귀포' },
  { region: '전라남도',  visitors: 620,  companies: 22, nights: 1860, growth: '+18%', topCity: '여수' },
  { region: '전라북도',  visitors: 410,  companies: 15, nights: 1230, growth: '+12%', topCity: '전주' },
  { region: '경상남도',  visitors: 280,  companies: 11, nights: 840,  growth: '+8%',  topCity: '통영' },
]

const MONTHLY_TREND = [
  { month: '1월', visitors: 120 },
  { month: '2월', visitors: 180 },
  { month: '3월', visitors: 320 },
  { month: '4월', visitors: 480 },
  { month: '5월', visitors: 620 },
]

const maxVisitors = Math.max(...MONTHLY_TREND.map(m => m.visitors))

const SUBSIDY_RATES = [
  { region: '부산광역시',    amount: 500000, unit: '1인당', minNights: 3, deadline: '2026-12-31', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { region: '제주도',        amount: 300000, unit: '1인당', minNights: 3, deadline: '2026-07-31', color: 'text-blue-500',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
  { region: '강원도 속초',   amount: 500000, unit: '1인당', minNights: 3, deadline: '2025-12-31', color: 'text-teal-500',   bg: 'bg-teal-500/10',   border: 'border-teal-500/20'   },
  { region: '강원도 (일반)', amount: 100000, unit: '1인당', minNights: 2, deadline: '2025-12-31', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { region: '전라남도',      amount: 300000, unit: '1인당', minNights: 2, deadline: '2025-12-31', color: 'text-amber-500',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
  { region: '경상남도',      amount:  80000, unit: '1인당', minNights: 2, deadline: '2025-12-31', color: 'text-rose-500',   bg: 'bg-rose-500/10',   border: 'border-rose-500/20'   },
]

const RECENT_SUBSIDIES = [
  { company: '삼성전자',  region: '강원도 강릉',  employees: 4, amount:  400000, status: 'approved' },
  { company: 'LG전자',   region: '제주도 서귀포', employees: 3, amount:  900000, status: 'approved' },
  { company: '카카오',   region: '강원도 양양',  employees: 2, amount:  200000, status: 'pending'  },
  { company: '네이버',   region: '전라남도 여수', employees: 5, amount:  400000, status: 'pending'  },
  { company: '쿠팡',     region: '부산광역시',   employees: 6, amount: 3000000, status: 'pending'  },
]

export default function GovPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg">더워케이션</span>
          <Badge variant="gov">지자체</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/gov/post" className="text-sm px-3 py-1.5 bg-white border border-[#E2E8F0] hover:border-blue-500/50 text-[#475569] rounded-xl transition-colors font-medium">📢 공고 게재</Link>
          <Link href="/gov/report" className="text-sm px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium">📊 성과 리포트</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">지역 워케이션 현황</h1>
          <p className="text-sm text-[#475569]">2026년 5월 기준 · 전국</p>
        </div>

        {/* 전국 요약 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '총 워케이션 방문자', value: '3,530명', sub: '전년 대비 +22%',   color: 'text-blue-400'    },
            { label: '참여 기업 수',       value: '131개사', sub: '이번 달 신규 12개', color: 'text-emerald-400' },
            { label: '지역 경제 효과',     value: '18.4억', sub: '숙박·식음료 합산',  color: 'text-amber-400'   },
            { label: '평균 체류 기간',     value: '3.2박',  sub: '전월 대비 +0.3박',  color: 'text-purple-400'  },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <p className="text-xs text-[#94A3B8] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#475569]">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* 지역별 현황 */}
          <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E2E8F0] font-semibold text-sm">지역별 방문 현황</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                  {['지역', '방문자', '참여 기업', '총 숙박일', '주요 도시', '성장률'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REGION_DATA.map((r) => (
                  <tr key={r.region} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                    <td className="px-5 py-3 font-medium">{r.region}</td>
                    <td className="px-5 py-3 text-blue-400 font-bold">{r.visitors.toLocaleString()}명</td>
                    <td className="px-5 py-3 text-[#475569]">{r.companies}개</td>
                    <td className="px-5 py-3 text-[#475569]">{r.nights.toLocaleString()}박</td>
                    <td className="px-5 py-3 text-xs text-[#94A3B8]">📍 {r.topCity}</td>
                    <td className="px-5 py-3 text-emerald-400 font-semibold text-xs">{r.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 월별 트렌드 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className="font-semibold text-sm mb-5">월별 방문자 추이</div>
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

        {/* 지역별 지원금 현황 */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">💰</span>
            <h2 className="font-bold text-sm">지역별 워케이션 지원금 현황</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-500/30">2026년 상반기</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SUBSIDY_RATES.map(s => (
              <div key={s.region} className={`${s.bg} border ${s.border} rounded-xl p-4`}>
                <div className={`text-xl font-black ${s.color} mb-1`}>{s.amount.toLocaleString()}원</div>
                <div className="text-xs font-semibold text-[#0F172A] mb-0.5">{s.region}</div>
                <div className="text-xs text-[#94A3B8]">{s.unit} · {s.minNights}박 이상</div>
                <div className="text-xs text-[#94A3B8] mt-1">~{s.deadline}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 지원금 신청 현황 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <div>
              <span className="font-semibold text-sm">워케이션 지원금 신청 현황</span>
              <span className="text-xs text-[#94A3B8] ml-2">지역별 차등 지원</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                대기 {RECENT_SUBSIDIES.filter(s => s.status === 'pending').length}건
              </span>
            </div>
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
              {RECENT_SUBSIDIES.map((s, i) => (
                <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                  <td className="px-5 py-3 font-medium">{s.company}</td>
                  <td className="px-5 py-3 text-xs text-[#475569]">📍 {s.region}</td>
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
