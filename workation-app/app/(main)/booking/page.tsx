'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

const STEPS = ['날짜·인원 선택', '지원금 확인', '최종 확인']

const MATCHED_SUBSIDIES = [
  { name: '강원도 워케이션 유치 지원금', amount: 100000, unit: '1인당', region: '강원도' },
  { name: '강릉시 기업 유치 특별 지원',  amount: 50000,  unit: '1인당', region: '강원도 강릉' },
]

const ACCOMMODATION_ID = null // 실제 예약 시 숙소 ID 연결 예정

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep]             = useState(0)
  const [guests, setGuests]         = useState(4)
  const [checkIn, setCheckIn]       = useState('')
  const [checkOut, setCheckOut]     = useState('')
  const [useSubsidy, setUseSubsidy] = useState(true)
  const [saving, setSaving]         = useState(false)

  const pricePerNight  = 85000
  const nights         = 3
  const roomTotal      = pricePerNight * nights
  const subsidyPerHead = MATCHED_SUBSIDIES.reduce((s, m) => s + m.amount, 0)
  const subsidyTotal   = useSubsidy ? subsidyPerHead * guests : 0
  const finalTotal     = roomTotal * guests - subsidyTotal

  async function handleBookingComplete() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('bookings').insert({
      user_id:           user?.id ?? null,
      accommodation_id:  ACCOMMODATION_ID,
      check_in:          checkIn  || '2026-06-10',
      check_out:         checkOut || '2026-06-13',
      guests,
      total_amount:      finalTotal,
      subsidy_amount:    subsidyTotal,
      status:            'confirmed',
    })

    setSaving(false)
    router.push('/booking/confirm')
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />

      <div className="max-w-xl mx-auto px-6 py-10">
        {/* 단계 표시 */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm font-medium transition-all ${
                i === step ? 'text-blue-400' : i < step ? 'text-[#94A3B8]' : 'text-[#334155]'
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  i === step   ? 'bg-blue-500 border-blue-500 text-white'
                  : i < step   ? 'bg-[#334155] border-[#334155] text-[#94A3B8]'
                  : 'bg-transparent border-[#334155] text-[#334155]'
                }`}>{i + 1}</span>
                {s}
              </div>
              {i < STEPS.length - 1 && <span className="text-[#334155]">—</span>}
            </div>
          ))}
        </div>

        {/* STEP 0 — 날짜·인원 */}
        {step === 0 && (
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">날짜와 인원을 선택해주세요</h2>

            <div className="bg-[#263548] rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl">🏨</span>
              <div>
                <div className="font-medium text-sm">강릉 씨사이드 워크스테이션</div>
                <div className="text-xs text-[#64748B]">강원도 강릉 · 85,000원/박</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#94A3B8] mb-1 block">체크인</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                  className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1 block">체크아웃</label>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                  className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#94A3B8] mb-1 block">인원</label>
              <select value={guests} onChange={e => setGuests(Number(e.target.value))}
                className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500">
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}명</option>)}
              </select>
            </div>

            <Button size="lg" className="w-full mt-2" onClick={() => setStep(1)}>다음 → 지원금 확인</Button>
          </div>
        )}

        {/* STEP 1 — 지원금 */}
        {step === 1 && (
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">💰</span>
              <h2 className="font-bold text-lg">지원금 자동 매칭 결과</h2>
            </div>
            <p className="text-xs text-[#94A3B8]">강원도 강릉 워케이션 기준 · {guests}명</p>

            <div className="flex flex-col gap-2">
              {MATCHED_SUBSIDIES.map(s => (
                <div key={s.name} className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-[#64748B]">📍 {s.region}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">{s.amount.toLocaleString()}원</div>
                    <div className="text-xs text-[#64748B]">{s.unit}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#263548] rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">지원금 선공제 적용</span>
                <button onClick={() => setUseSubsidy(!useSubsidy)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${useSubsidy ? 'bg-emerald-500' : 'bg-[#334155]'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${useSubsidy ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-[#94A3B8]">
                  <span>숙박비</span>
                  <span>{(pricePerNight * nights * guests).toLocaleString()}원</span>
                </div>
                {useSubsidy && (
                  <div className="flex justify-between text-emerald-400">
                    <span>지원금 차감 ({guests}명 × {subsidyPerHead.toLocaleString()}원)</span>
                    <span>- {subsidyTotal.toLocaleString()}원</span>
                  </div>
                )}
                <div className="border-t border-[#334155] pt-2 flex justify-between font-bold">
                  <span>최종 결제 금액</span>
                  <span className="text-blue-400 text-lg">{finalTotal.toLocaleString()}원</span>
                </div>
                {useSubsidy && (
                  <p className="text-xs text-emerald-400 text-right">💡 {subsidyTotal.toLocaleString()}원 절감</p>
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
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg">예약 내용을 확인해주세요</h2>

            <div className="bg-[#263548] rounded-xl p-4 flex flex-col gap-3 text-sm">
              {[
                ['숙소',      '강릉 씨사이드 워크스테이션'],
                ['체크인',    checkIn  || '2026-06-10'],
                ['체크아웃',  checkOut || '2026-06-13'],
                ['숙박 기간', '3박'],
                ['인원',      `${guests}명`],
                ['숙박비',    `${(pricePerNight * nights * guests).toLocaleString()}원`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#64748B]">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              {useSubsidy && (
                <div className="flex justify-between text-emerald-400">
                  <span>지원금 선공제</span>
                  <span>- {subsidyTotal.toLocaleString()}원</span>
                </div>
              )}
              <div className="border-t border-[#334155] pt-3 flex justify-between font-bold">
                <span>최종 결제 금액</span>
                <span className="text-blue-400 text-lg">{finalTotal.toLocaleString()}원</span>
              </div>
              <p className="text-xs text-[#64748B] text-right">회사 예산에서 차감됩니다</p>
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
