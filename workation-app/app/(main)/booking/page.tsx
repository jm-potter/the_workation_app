'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { useAuthOnly } from '@/lib/useAuthOnly'

const STEPS = ['날짜·인원 선택', '지원금 확인', '최종 확인']

const MATCHED_SUBSIDIES = [
  { name: '강원도 워케이션 유치 지원금', amount: 100000, unit: '1인당', region: '강원도' },
  { name: '강릉시 기업 유치 특별 지원',  amount: 50000,  unit: '1인당', region: '강원도 강릉' },
]

type Accommodation = {
  id: string
  name: string
  region: string
  price_per_night: number
  image_url?: string
}

function BookingContent() {
  useAuthOnly()
  const router       = useRouter()
  const searchParams = useSearchParams()
  const accId        = searchParams.get('id')

  const [acc, setAcc]               = useState<Accommodation | null>(null)
  const [step, setStep]             = useState(0)
  const [guests, setGuests]         = useState(4)
  const [checkIn, setCheckIn]       = useState('')
  const [checkOut, setCheckOut]     = useState('')
  const [useSubsidy, setUseSubsidy] = useState(true)
  const [saving, setSaving]         = useState(false)

  useEffect(() => {
    if (!accId) return
    supabase.from('accommodations').select('*').eq('id', accId).single()
      .then(({ data }) => { if (data) setAcc(data) })
  }, [accId])

  const pricePerNight  = acc?.price_per_night ?? 85000
  const nights         = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 3
  const subsidyPerHead = MATCHED_SUBSIDIES.reduce((s, m) => s + m.amount, 0)
  const subsidyTotal   = useSubsidy ? subsidyPerHead * guests : 0
  const finalTotal     = pricePerNight * nights * guests - subsidyTotal

  async function handleBookingComplete() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('bookings').insert({
      user_id:          user?.id ?? null,
      accommodation_id: accId,
      start_date:       checkIn  || '2026-06-10',
      end_date:         checkOut || '2026-06-13',
      guests,
      total_price:      finalTotal,
      status:           'confirmed',
    })
    setSaving(false)
    if (error) {
      alert('예약 저장 실패: ' + error.message)
      return
    }
    router.push('/booking/confirm')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-xl mx-auto px-6 py-10">
        {/* 단계 표시 */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm font-medium transition-all ${
                i === step ? 'text-blue-500' : i < step ? 'text-[#475569]' : 'text-[#CBD5E1]'
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  i === step   ? 'bg-blue-500 border-blue-500 text-white'
                  : i < step   ? 'bg-[#E2E8F0] border-[#E2E8F0] text-[#475569]'
                  : 'bg-transparent border-[#E2E8F0] text-[#CBD5E1]'
                }`}>{i + 1}</span>
                {s}
              </div>
              {i < STEPS.length - 1 && <span className="text-[#CBD5E1]">—</span>}
            </div>
          ))}
        </div>

        {/* STEP 0 — 날짜·인원 */}
        {step === 0 && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">날짜와 인원을 선택해주세요</h2>

            <div className="bg-[#F1F5F9] rounded-xl p-4 flex items-center gap-3">
              {acc?.image_url
                ? <img src={acc.image_url} alt={acc.name} className="w-12 h-12 rounded-lg object-cover" />
                : <span className="text-3xl">🏨</span>
              }
              <div>
                <div className="font-medium text-sm">{acc?.name ?? '숙소 불러오는 중...'}</div>
                <div className="text-xs text-[#94A3B8]">{acc?.region} · {pricePerNight.toLocaleString()}원/박</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#475569] mb-1 block">체크인</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs text-[#475569] mb-1 block">체크아웃</label>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                  className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#475569] mb-1 block">인원</label>
              <select value={guests} onChange={e => setGuests(Number(e.target.value))}
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500">
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}명</option>)}
              </select>
            </div>

            <Button size="lg" className="w-full mt-2" onClick={() => setStep(1)}>다음 → 지원금 확인</Button>
          </div>
        )}

        {/* STEP 1 — 지원금 */}
        {step === 1 && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">💰</span>
              <h2 className="font-bold text-lg">지원금 자동 매칭 결과</h2>
            </div>
            <p className="text-xs text-[#475569]">{acc?.region} 워케이션 기준 · {guests}명</p>

            <div className="flex flex-col gap-2">
              {MATCHED_SUBSIDIES.map(s => (
                <div key={s.name} className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-[#94A3B8]">📍 {s.region}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">{s.amount.toLocaleString()}원</div>
                    <div className="text-xs text-[#94A3B8]">{s.unit}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F1F5F9] rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">지원금 선공제 적용</span>
                <button onClick={() => setUseSubsidy(!useSubsidy)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${useSubsidy ? 'bg-emerald-500' : 'bg-[#E2E8F0]'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${useSubsidy ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-[#475569]">
                  <span>숙박비 ({nights}박)</span>
                  <span>{(pricePerNight * nights * guests).toLocaleString()}원</span>
                </div>
                {useSubsidy && (
                  <div className="flex justify-between text-emerald-500">
                    <span>지원금 차감 ({guests}명 × {subsidyPerHead.toLocaleString()}원)</span>
                    <span>- {subsidyTotal.toLocaleString()}원</span>
                  </div>
                )}
                <div className="border-t border-[#E2E8F0] pt-2 flex justify-between font-bold">
                  <span>최종 결제 금액</span>
                  <span className="text-blue-500 text-lg">{finalTotal.toLocaleString()}원</span>
                </div>
                {useSubsidy && (
                  <p className="text-xs text-emerald-500 text-right">💡 {subsidyTotal.toLocaleString()}원 절감</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep(0)}>← 수정</Button>
              <Button size="lg" className="flex-1" onClick={() => setStep(2)}>다음 → 최종 확인</Button>
            </div>
          </div>
        )}

        {/* STEP 2 — 최종 확인 */}
        {step === 2 && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">예약 내용을 확인해주세요</h2>

            <div className="bg-[#F1F5F9] rounded-xl p-4 flex flex-col gap-3 text-sm">
              {[
                ['숙소',      acc?.name ?? ''],
                ['지역',      acc?.region ?? ''],
                ['체크인',    checkIn  || '2026-06-10'],
                ['체크아웃',  checkOut || '2026-06-13'],
                ['숙박 기간', `${nights}박`],
                ['인원',      `${guests}명`],
                ['숙박비',    `${(pricePerNight * nights * guests).toLocaleString()}원`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#94A3B8]">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              {useSubsidy && (
                <div className="flex justify-between text-emerald-500">
                  <span>지원금 선공제</span>
                  <span>- {subsidyTotal.toLocaleString()}원</span>
                </div>
              )}
              <div className="border-t border-[#E2E8F0] pt-3 flex justify-between font-bold">
                <span>최종 결제 금액</span>
                <span className="text-blue-500 text-lg">{finalTotal.toLocaleString()}원</span>
              </div>
              <p className="text-xs text-[#94A3B8] text-right">회사 예산에서 차감됩니다</p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep(1)}>← 수정</Button>
              <Button size="lg" className="flex-1" onClick={handleBookingComplete}>
                {saving ? '저장 중...' : '예약 완료'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-[#94A3B8]">불러오는 중...</div>}>
      <BookingContent />
    </Suspense>
  )
}
