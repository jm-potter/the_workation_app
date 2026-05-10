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

const statusLabel = { confirmed: '확정', pending: '대기중', cancelled: '취소' }

export default function DashboardPage() {
  const budgetTotal = 5000000
  const budgetUsed  = 1850000
  const budgetPct   = Math.round((budgetUsed / budgetTotal) * 100)

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
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all" style={{ width: `${budgetPct}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#64748B]">
            <span>{budgetPct}% 사용</span>
            <span>잔여 {(budgetTotal - budgetUsed).toLocaleString()}원</span>
          </div>
        </div>

        {/* 예약 목록 */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
            <span className="font-semibold text-sm">최근 예약 내역</span>
            <span className="text-xs text-[#64748B]">전체 보기 →</span>
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
      </div>
    </div>
  )
}
