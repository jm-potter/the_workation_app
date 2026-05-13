import Link from 'next/link'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'

export default function BookingConfirmPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-md mx-auto px-6 py-16 text-center">
        {/* 성공 아이콘 */}
        <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>

        <h1 className="text-2xl font-black mb-2">예약 완료!</h1>
        <p className="text-[#475569] mb-8">예약이 성공적으로 접수됐어요</p>

        {/* 예약 요약 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left flex flex-col gap-3 text-sm mb-8">
          <div className="font-bold text-base mb-1">예약 번호 #WK-20260010</div>
          {[
            ['숙소', '강릉 씨사이드 워크스테이션'],
            ['체크인', '2026년 6월 10일'],
            ['체크아웃', '2026년 6월 13일'],
            ['인원', '4명'],
            ['결제 금액', '1,020,000원'],
            ['결제 방식', '회사 예산 차감'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-[#94A3B8]">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button size="lg" className="w-full">예약 현황 확인하기</Button>
          </Link>
          <Link href="/accommodations">
            <Button variant="secondary" size="lg" className="w-full">숙소 더 둘러보기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
