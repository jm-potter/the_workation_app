'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useAuthOnly } from '@/lib/useAuthOnly'
import { supabase } from '@/lib/supabase'

type BookingDetail = {
  id: string | number
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: string
  accommodations: { name: string; region: string } | null
}

export default function BookingConfirmPage() {
  useAuthOnly()
  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLastBooking() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data } = await supabase
        .from('bookings')
        .select('*, accommodations(name, region)')
        .eq('user_id', user.id)
        .order('id', { ascending: false })
        .limit(1)
        .single()
      if (data) setBooking(data)
      setLoading(false)
    }
    fetchLastBooking()
  }, [])

  const nights = booking
    ? Math.max(1, Math.round((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / 86400000))
    : 0
  const bookingNum = booking ? `#WK-${String(booking.id).slice(-6).padStart(6, '0')}` : '#WK-......'

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>

        <h1 className="text-2xl font-black mb-2">예약 완료!</h1>
        <p className="text-[#475569] mb-8">예약이 성공적으로 접수됐어요</p>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left flex flex-col gap-3 text-sm mb-8">
          <div className="font-bold text-base mb-1">예약 번호 {bookingNum}</div>

          {loading ? (
            <div className="flex items-center justify-center py-6 text-[#94A3B8]">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
              불러오는 중...
            </div>
          ) : booking ? (
            <>
              {[
                ['숙소',      booking.accommodations?.name ?? '-'],
                ['지역',      booking.accommodations?.region ?? '-'],
                ['체크인',    booking.start_date],
                ['체크아웃',  booking.end_date],
                ['숙박 기간', `${nights}박`],
                ['인원',      `${booking.guests}명`],
                ['결제 금액', `${booking.total_price?.toLocaleString()}원`],
                ['결제 방식', '회사 예산 차감'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#94A3B8]">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </>
          ) : (
            <div className="text-[#94A3B8] text-sm text-center py-4">예약 정보를 불러올 수 없어요</div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/my">
            <Button size="lg" className="w-full">마이페이지에서 확인하기</Button>
          </Link>
          <Link href="/accommodations">
            <Button variant="secondary" size="lg" className="w-full">숙소 더 둘러보기</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
