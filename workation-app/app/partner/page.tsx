import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const RECENT_BOOKINGS = [
  { id: 'WK-0010', guest: '삼성전자 · 김지수',  checkIn: '6/10', checkOut: '6/13', people: 4, amount: 1020000, status: 'confirmed' as const },
  { id: 'WK-0009', guest: 'LG전자 · 박민준',   checkIn: '6/05', checkOut: '6/08', people: 3, amount: 855000,  status: 'confirmed' as const },
  { id: 'WK-0008', guest: '카카오 · 이서연',   checkIn: '5/28', checkOut: '5/30', people: 2, amount: 280000,  status: 'pending'   as const },
  { id: 'WK-0007', guest: '네이버 · 최준혁',   checkIn: '5/20', checkOut: '5/23', people: 3, amount: 675000,  status: 'cancelled' as const },
]

const statusLabel = { confirmed: '확정', pending: '대기중', cancelled: '취소' }

export default function PartnerPage() {
  const monthRevenue = 2830000
  const totalBookings = 24
  const avgRating = 4.8

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur border-b border-[#334155] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg">더워케이션</span>
          <Badge variant="prt">파트너</Badge>
        </div>
        <div className="text-sm text-[#64748B]">강릉 씨사이드 워크스테이션</div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">파트너 대시보드</h1>
          <p className="text-sm text-[#94A3B8]">2026년 5월 기준</p>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '이번 달 매출',  value: `${(monthRevenue / 10000).toLocaleString()}만원`, sub: '전월 대비 +18%',   color: 'text-blue-400'    },
            { label: '이번 달 예약',  value: `${totalBookings}건`,                              sub: '확정 20건',         color: 'text-emerald-400' },
            { label: '평균 평점',     value: `⭐ ${avgRating}`,                                 sub: '리뷰 38개',         color: 'text-amber-400'   },
            { label: '객실 점유율',   value: '73%',                                             sub: '이번 달 기준',      color: 'text-purple-400'  },
          ].map((s) => (
            <div key={s.label} className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
              <p className="text-xs text-[#64748B] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#94A3B8]">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 예약 현황 */}
          <div className="col-span-2 bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
              <span className="font-semibold text-sm">최근 예약</span>
              <Link href="/partner/bookings" className="text-xs text-blue-400 hover:text-blue-300">전체 보기 →</Link>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#64748B] border-b border-[#334155]">
                  {['예약번호', '예약자', '체크인', '체크아웃', '인원', '금액', '상태'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_BOOKINGS.map((b) => (
                  <tr key={b.id} className="border-b border-[#334155]/50 hover:bg-[#263548]/50 transition-colors">
                    <td className="px-4 py-3 text-xs text-[#64748B]">{b.id}</td>
                    <td className="px-4 py-3 text-sm font-medium">{b.guest}</td>
                    <td className="px-4 py-3 text-xs text-[#94A3B8]">{b.checkIn}</td>
                    <td className="px-4 py-3 text-xs text-[#94A3B8]">{b.checkOut}</td>
                    <td className="px-4 py-3 text-xs text-[#94A3B8]">{b.people}명</td>
                    <td className="px-4 py-3 text-sm">{b.amount.toLocaleString()}원</td>
                    <td className="px-4 py-3"><Badge variant={b.status}>{statusLabel[b.status]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 이번 달 달력 점유율 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
            <div className="font-semibold text-sm mb-4">6월 예약 현황</div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {['일','월','화','수','목','금','토'].map(d => (
                <div key={d} className="text-[#64748B] py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* 6월 1일이 월요일 */}
              <div />
              {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
                const booked = [10,11,12,13,5,6,7,8].includes(d)
                const today  = d === 11
                return (
                  <div key={d} className={`py-1.5 rounded-md font-medium transition-colors ${
                    today  ? 'bg-blue-500 text-white' :
                    booked ? 'bg-blue-500/30 text-blue-300' :
                    'text-[#94A3B8] hover:bg-[#263548]'
                  }`}>{d}</div>
                )
              })}
            </div>
            <div className="flex gap-3 mt-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500/30 rounded inline-block" />예약됨</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded inline-block" />오늘</span>
            </div>
          </div>
        </div>

        {/* 빠른 메뉴 */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: '내 숙소 관리',  icon: '🏨', href: '/partner/accommodations', desc: '숙소 정보·사진 수정' },
            { label: '예약 전체 보기', icon: '📅', href: '/partner/bookings',       desc: '예약 확인 및 관리' },
            { label: '정산 내역',     icon: '💰', href: '#',                        desc: '월별 정산 확인' },
          ].map((m) => (
            <Link key={m.label} href={m.href}
              className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 flex items-center gap-4 hover:border-blue-500/50 transition-colors">
              <span className="text-3xl">{m.icon}</span>
              <div>
                <div className="font-semibold text-sm">{m.label}</div>
                <div className="text-xs text-[#64748B] mt-0.5">{m.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
