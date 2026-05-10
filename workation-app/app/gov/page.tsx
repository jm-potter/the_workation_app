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

const RECENT_SUBSIDIES = [
  { company: '삼성전자',  region: '강원도 강릉',  employees: 4, amount: 400000, status: 'approved' },
  { company: 'LG전자',   region: '제주도 서귀포', employees: 3, amount: 300000, status: 'approved' },
  { company: '카카오',   region: '강원도 양양',  employees: 2, amount: 200000, status: 'pending'  },
  { company: '네이버',   region: '전라남도 여수', employees: 3, amount: 300000, status: 'pending'  },
]

export default function GovPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur border-b border-[#334155] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg">더워케이션</span>
          <Badge variant="gov">지자체</Badge>
        </div>
        <div className="text-sm text-[#64748B]">강원도청 · 관광진흥과</div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">지역 워케이션 현황</h1>
          <p className="text-sm text-[#94A3B8]">2026년 5월 기준 · 전국</p>
        </div>

        {/* 전국 요약 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '총 워케이션 방문자', value: '3,530명', sub: '전년 대비 +22%',   color: 'text-blue-400'    },
            { label: '참여 기업 수',       value: '131개사', sub: '이번 달 신규 12개', color: 'text-emerald-400' },
            { label: '지역 경제 효과',     value: '18.4억', sub: '숙박·식음료 합산',  color: 'text-amber-400'   },
            { label: '평균 체류 기간',     value: '3.2박',  sub: '전월 대비 +0.3박',  color: 'text-purple-400'  },
          ].map(s => (
            <div key={s.label} className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
              <p className="text-xs text-[#64748B] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#94A3B8]">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* 지역별 현황 */}
          <div className="col-span-2 bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#334155] font-semibold text-sm">지역별 방문 현황</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#64748B] border-b border-[#334155]">
                  {['지역', '방문자', '참여 기업', '총 숙박일', '주요 도시', '성장률'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REGION_DATA.map((r) => (
                  <tr key={r.region} className="border-b border-[#334155]/50 hover:bg-[#263548]/50 transition-colors">
                    <td className="px-5 py-3 font-medium">{r.region}</td>
                    <td className="px-5 py-3 text-blue-400 font-bold">{r.visitors.toLocaleString()}명</td>
                    <td className="px-5 py-3 text-[#94A3B8]">{r.companies}개</td>
                    <td className="px-5 py-3 text-[#94A3B8]">{r.nights.toLocaleString()}박</td>
                    <td className="px-5 py-3 text-xs text-[#64748B]">📍 {r.topCity}</td>
                    <td className="px-5 py-3 text-emerald-400 font-semibold text-xs">{r.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 월별 트렌드 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
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
                <span key={m.month} className="flex-1 text-center text-xs text-[#64748B]">{m.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 지원금 신청 현황 */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
            <div>
              <span className="font-semibold text-sm">워케이션 지원금 신청 현황</span>
              <span className="text-xs text-[#64748B] ml-2">1인당 10만원 지원</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                대기 {RECENT_SUBSIDIES.filter(s => s.status === 'pending').length}건
              </span>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#64748B] border-b border-[#334155]">
                {['기업명', '워케이션 지역', '인원', '신청 금액', '상태', '처리'].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_SUBSIDIES.map((s, i) => (
                <tr key={i} className="border-b border-[#334155]/50 hover:bg-[#263548]/50 transition-colors">
                  <td className="px-5 py-3 font-medium">{s.company}</td>
                  <td className="px-5 py-3 text-xs text-[#94A3B8]">📍 {s.region}</td>
                  <td className="px-5 py-3 text-[#94A3B8]">{s.employees}명</td>
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
                      <span className="text-xs text-[#64748B]">처리완료</span>
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
