'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'

type BookingStatus = 'confirmed' | 'pending' | 'cancelled'

const MOCK_BOOKINGS = [
  {
    id: 'WK-0010',
    accommodation: '강릉 씨사이드 워크스테이션',
    region: '강원도 강릉',
    checkIn:  '2026-06-10',
    checkOut: '2026-06-13',
    nights: 3,
    guests: 4,
    pricePerNight: 85000,
    status: 'confirmed' as BookingStatus,
    cancelPolicy: '체크인 7일 전까지 전액 환불',
  },
  {
    id: 'WK-0009',
    accommodation: '제주 한달살기 스튜디오',
    region: '제주도 서귀포',
    checkIn:  '2026-06-05',
    checkOut: '2026-06-08',
    nights: 3,
    guests: 2,
    pricePerNight: 95000,
    status: 'confirmed' as BookingStatus,
    cancelPolicy: '체크인 3일 전까지 50% 환불',
  },
  {
    id: 'WK-0007',
    accommodation: '여수 오션뷰 코워킹',
    region: '전라남도 여수',
    checkIn:  '2026-05-20',
    checkOut: '2026-05-23',
    nights: 3,
    guests: 3,
    pricePerNight: 75000,
    status: 'cancelled' as BookingStatus,
    cancelPolicy: '취소 완료',
  },
]

const STATUS_LABEL: Record<BookingStatus, string> = {
  confirmed: '예약 확정',
  pending:   '대기중',
  cancelled: '취소됨',
}

const STATUS_COLOR: Record<BookingStatus, string> = {
  confirmed: 'bg-emerald-500/20 text-emerald-400',
  pending:   'bg-amber-500/20 text-amber-400',
  cancelled: 'bg-[#263548] text-[#64748B]',
}

export default function BookingManagePage() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS)
  const [selected, setSelected] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [newCheckIn,  setNewCheckIn]  = useState('')
  const [newCheckOut, setNewCheckOut] = useState('')
  const [newGuests,   setNewGuests]   = useState(0)
  const [done, setDone] = useState<'changed' | 'cancelled' | null>(null)

  const booking = bookings.find(b => b.id === selected)

  function openEdit(b: typeof MOCK_BOOKINGS[0]) {
    setSelected(b.id)
    setNewCheckIn(b.checkIn)
    setNewCheckOut(b.checkOut)
    setNewGuests(b.guests)
    setEditMode(true)
    setConfirmCancel(false)
    setDone(null)
  }

  function applyChange() {
    setBookings(prev => prev.map(b =>
      b.id === selected ? { ...b, checkIn: newCheckIn, checkOut: newCheckOut, guests: newGuests } : b
    ))
    setDone('changed')
    setEditMode(false)
  }

  function applyCancel() {
    setBookings(prev => prev.map(b =>
      b.id === selected ? { ...b, status: 'cancelled' } : b
    ))
    setDone('cancelled')
    setConfirmCancel(false)
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header role="hr" userName="홍길동 팀장" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-xs text-[#64748B] hover:text-[#94A3B8] mb-2 block">← 대시보드</Link>
          <h1 className="text-2xl font-black mb-1">예약 변경·취소</h1>
          <p className="text-sm text-[#94A3B8]">예약 일정 수정 또는 취소 처리</p>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {/* 예약 목록 */}
          <div className="col-span-3 flex flex-col gap-3">
            {bookings.map(b => (
              <button
                key={b.id}
                onClick={() => { setSelected(b.id); setEditMode(false); setConfirmCancel(false); setDone(null) }}
                className={`w-full text-left bg-[#1E293B] border rounded-2xl p-5 transition-all ${
                  selected === b.id ? 'border-blue-500/60' : 'border-[#334155] hover:border-[#475569]'
                } ${b.status === 'cancelled' ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-sm">{b.accommodation}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">📍 {b.region} · {b.id}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-lg ${STATUS_COLOR[b.status]}`}>
                    {STATUS_LABEL[b.status]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                  <span>📅 {b.checkIn} ~ {b.checkOut} ({b.nights}박)</span>
                  <span>👥 {b.guests}명</span>
                  <span>💰 {(b.pricePerNight * b.nights * b.guests).toLocaleString()}원</span>
                </div>
              </button>
            ))}
          </div>

          {/* 상세 패널 */}
          <div className="col-span-2">
            {!booking ? (
              <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 text-center text-sm text-[#64748B]">
                예약을 선택하면<br />변경·취소 옵션이 나타납니다
              </div>
            ) : (
              <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 flex flex-col gap-4">
                <div>
                  <div className="font-bold mb-0.5">{booking.accommodation}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-md ${STATUS_COLOR[booking.status]}`}>
                    {STATUS_LABEL[booking.status]}
                  </span>
                </div>

                {/* 완료 메시지 */}
                {done === 'changed' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-sm text-emerald-400">
                    ✅ 예약이 변경됐어요
                  </div>
                )}
                {done === 'cancelled' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400">
                    🚫 예약이 취소됐어요
                  </div>
                )}

                {booking.status !== 'cancelled' && !done && (
                  <>
                    {/* 예약 변경 */}
                    {editMode ? (
                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="text-xs text-[#94A3B8] mb-1 block">체크인</label>
                          <input type="date" value={newCheckIn} onChange={e => setNewCheckIn(e.target.value)}
                            className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                          <label className="text-xs text-[#94A3B8] mb-1 block">체크아웃</label>
                          <input type="date" value={newCheckOut} onChange={e => setNewCheckOut(e.target.value)}
                            className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                          <label className="text-xs text-[#94A3B8] mb-1 block">인원</label>
                          <select value={newGuests} onChange={e => setNewGuests(Number(e.target.value))}
                            className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500">
                            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}명</option>)}
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" className="flex-1 text-sm" onClick={() => setEditMode(false)}>취소</Button>
                          <Button className="flex-1 text-sm" onClick={applyChange}>변경 확정</Button>
                        </div>
                      </div>
                    ) : confirmCancel ? (
                      <div className="flex flex-col gap-3">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-[#94A3B8]">
                          <div className="font-semibold text-red-400 mb-1">예약을 취소하시겠어요?</div>
                          <div className="text-xs text-[#64748B]">취소 정책: {booking.cancelPolicy}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" className="flex-1 text-sm" onClick={() => setConfirmCancel(false)}>돌아가기</Button>
                          <button onClick={applyCancel}
                            className="flex-1 text-sm py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors">
                            취소 확정
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-[#64748B] bg-[#263548] rounded-xl p-3">
                          취소 정책: {booking.cancelPolicy}
                        </div>
                        <Button className="w-full text-sm" onClick={() => openEdit(booking)}>
                          📅 날짜·인원 변경
                        </Button>
                        <button onClick={() => setConfirmCancel(true)}
                          className="w-full text-sm py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-medium">
                          🚫 예약 취소
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
