import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const STATS = [
  { label: '총 회원',     value: '1,284명',  sub: '이번 달 +32',    color: 'text-blue-400',    href: '/admin/members' },
  { label: '등록 숙소',   value: '214개',    sub: '검토 대기 5개',   color: 'text-emerald-400', href: '/admin/accommodations' },
  { label: '이번 달 예약', value: '87건',    sub: '전월 대비 +12%',  color: 'text-amber-400',   href: '/admin/bookings' },
  { label: '총 매출',     value: '24.5M',    sub: '이번 달 기준',    color: 'text-purple-400',  href: '#' },
]

const RECENT_BOOKINGS = [
  { id: 'WK-0010', company: '삼성전자', employee: '김지수', accommodation: '강릉 씨사이드', amount: 255000, status: 'confirmed' as const },
  { id: 'WK-0009', company: 'LG전자',  employee: '박민준', accommodation: '제주 한달살기', amount: 285000, status: 'confirmed' as const },
  { id: 'WK-0008', company: '카카오',  employee: '이서연', accommodation: '양양 서퍼스',   amount: 140000, status: 'pending'   as const },
  { id: 'WK-0007', company: '네이버',  employee: '최준혁', accommodation: '여수 오션뷰',   amount: 225000, status: 'cancelled' as const },
]

const PENDING_ACCOMMODATIONS = [
  { name: '부산 해운대 코워크',    location: '부산 해운대구', submitted: '2026-05-10' },
  { name: '강릉 율곡 리트릿',      location: '강원도 강릉',  submitted: '2026-05-09' },
  { name: '통영 바다쉼',          location: '경남 통영',    submitted: '2026-05-08' },
]

const statusLabel = { confirmed: '확정', pending: '대기중', cancelled: '취소' }

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 어드민 헤더 */}
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg">The Workation</span>
          <Badge variant="adm">ADMIN</Badge>
        </div>
        <div className="text-sm text-[#94A3B8]">운영팀 · 관리자</div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">운영 대시보드</h1>
          <p className="text-sm text-[#475569]">2026년 5월 기준</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {STATS.map((s) => (
            <Link key={s.label} href={s.href}
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-blue-500/50 transition-colors">
              <p className="text-xs text-[#94A3B8] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-[#475569]">{s.sub}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 최근 예약 */}
          <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <span className="font-semibold text-sm">최근 예약</span>
              <Link href="/admin/bookings" className="text-xs text-blue-400 hover:text-blue-600">전체 보기 →</Link>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                  {['예약번호', '기업', '직원', '숙소', '금액', '상태'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_BOOKINGS.map((b) => (
                  <tr key={b.id} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                    <td className="px-4 py-3 text-xs text-[#94A3B8]">{b.id}</td>
                    <td className="px-4 py-3 text-xs text-[#475569]">{b.company}</td>
                    <td className="px-4 py-3 font-medium text-sm">{b.employee}</td>
                    <td className="px-4 py-3 text-xs text-[#475569]">{b.accommodation}</td>
                    <td className="px-4 py-3 text-sm">{b.amount.toLocaleString()}원</td>
                    <td className="px-4 py-3"><Badge variant={b.status}>{statusLabel[b.status]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 숙소 검토 대기 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <span className="font-semibold text-sm">검토 대기 숙소</span>
              <Link href="/admin/accommodations" className="text-xs text-blue-400 hover:text-blue-600">전체 →</Link>
            </div>
            <div className="flex flex-col divide-y divide-[#E2E8F0]">
              {PENDING_ACCOMMODATIONS.map((a) => (
                <div key={a.name} className="px-5 py-4 hover:bg-[#F1F5F9]/50 transition-colors cursor-pointer">
                  <div className="font-medium text-sm mb-1">{a.name}</div>
                  <div className="text-xs text-[#94A3B8] mb-2">📍 {a.location}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#475569]">{a.submitted}</span>
                    <div className="flex gap-1.5">
                      <button className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30">승인</button>
                      <button className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30">반려</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 빠른 메뉴 */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: '숙소 관리',  icon: '🏨', href: '/admin/accommodations' },
            { label: '예약 관리',  icon: '📅', href: '/admin/bookings' },
            { label: '회원 관리',  icon: '👥', href: '/admin/members' },
            { label: '정산 관리',  icon: '💰', href: '#' },
          ].map((m) => (
            <Link key={m.label} href={m.href}
              className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-3 hover:border-blue-500/50 transition-colors">
              <span className="text-2xl">{m.icon}</span>
              <span className="font-medium text-sm">{m.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
