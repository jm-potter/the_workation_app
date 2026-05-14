'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import { supabase } from '@/lib/supabase'

type Booking = {
  id: string | number
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: string
  accommodations: { name: string; region: string } | null
}

type Doc = {
  id: string
  booking_id: string
  type: string
  file_url: string
  file_name: string
  status: string
}

const BOOKING_STATUS: Record<string, { label: string; color: string }> = {
  confirmed: { label: '예약 확정', color: 'bg-emerald-500/10 text-emerald-600' },
  pending:   { label: '대기중',   color: 'bg-amber-500/10 text-amber-600'   },
  cancelled: { label: '취소됨',   color: 'bg-[#F1F5F9] text-[#94A3B8]'     },
}

export default function MyPage() {
  const [userId, setUserId]       = useState<string | null>(null)
  const [userName, setUserName]   = useState('')
  const [email, setEmail]         = useState('')
  const [bookings, setBookings]   = useState<Booking[]>([])
  const [docs, setDocs]           = useState<Doc[]>([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [openId, setOpenId]       = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const uid  = data.user.id
      const meta = data.user.user_metadata
      setUserId(uid)
      setEmail(data.user.email ?? '')
      setUserName(meta?.name ?? '')

      const [{ data: bData }, { data: dData }] = await Promise.all([
        supabase
          .from('bookings')
          .select('id, start_date, end_date, guests, total_price, status, accommodations(name, region)')
          .eq('user_id', uid)
          .order('id', { ascending: false }),
        supabase
          .from('documents')
          .select('id, booking_id, type, file_url, file_name, status')
          .eq('user_id', uid),
      ])

      if (bData) setBookings(bData as any)
      if (dData) setDocs(dData)
      setLoading(false)
    })
  }, [])

  async function handleUpload(bookingId: string, file: File) {
    if (!userId) return
    setUploading(bookingId)

    const path = `${userId}/${bookingId}/work_proof_${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      alert('업로드 실패: ' + uploadError.message)
      setUploading(null)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(path)

    const { data: inserted } = await supabase
      .from('documents')
      .insert({ booking_id: bookingId, user_id: userId, type: 'work_proof', file_url: publicUrl, file_name: file.name })
      .select()
      .single()

    if (inserted) setDocs(prev => [...prev, inserted])
    setUploading(null)
  }

  const confirmedCount  = bookings.filter(b => b.status === 'confirmed').length
  const docSubmitted    = bookings.filter(b =>
    b.status === 'confirmed' && docs.some(d => d.booking_id === String(b.id))
  ).length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* 프로필 카드 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-xl font-bold text-blue-500">
            {userName ? userName[0] : '?'}
          </div>
          <div>
            <div className="font-bold text-lg">{userName || '이름 없음'}</div>
            <div className="text-xs text-[#94A3B8]">{email}</div>
          </div>
          <div className="ml-auto flex gap-3 text-center">
            <div>
              <div className="text-xl font-black text-blue-500">{bookings.length}</div>
              <div className="text-xs text-[#94A3B8]">전체 예약</div>
            </div>
            <div className="w-px bg-[#E2E8F0]" />
            <div>
              <div className="text-xl font-black text-emerald-500">{confirmedCount}</div>
              <div className="text-xs text-[#94A3B8]">확정</div>
            </div>
            <div className="w-px bg-[#E2E8F0]" />
            <div>
              <div className="text-xl font-black text-purple-500">{docSubmitted}/{confirmedCount}</div>
              <div className="text-xs text-[#94A3B8]">서류 제출</div>
            </div>
          </div>
        </div>

        {/* 예약 + 서류 목록 */}
        <h2 className="font-bold text-sm text-[#0F172A] mb-3">내 예약</h2>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#94A3B8] text-sm">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
            불러오는 중...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🏨</div>
            <p className="text-[#475569] font-medium mb-1">예약 내역이 없어요</p>
            <Link href="/accommodations" className="text-xs text-blue-500 hover:underline">숙소 예약하러 가기 →</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.map(b => {
              const sid     = String(b.id)
              const bStatus = BOOKING_STATUS[b.status] ?? { label: b.status, color: 'bg-[#F1F5F9] text-[#94A3B8]' }
              const myDocs  = docs.filter(d => d.booking_id === sid)
              const isOpen  = openId === sid
              const isUploading = uploading === sid

              return (
                <div key={b.id} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                  {/* 예약 요약 행 */}
                  <div className="flex items-center gap-4 px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{b.accommodations?.name ?? '-'}</div>
                      <div className="text-xs text-[#94A3B8] mt-0.5">
                        📍 {b.accommodations?.region} · {b.start_date} ~ {b.end_date} · {b.guests}명
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-sm font-bold text-blue-500">{b.total_price?.toLocaleString()}원</div>
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium ${bStatus.color}`}>{bStatus.label}</span>
                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => setOpenId(isOpen ? null : sid)}
                          className="text-xs text-[#94A3B8] hover:text-blue-500 transition-colors">
                          {isOpen ? '닫기 ▲' : '서류 ▼'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 서류 제출 영역 (확정 예약만, 열렸을 때만) */}
                  {b.status === 'confirmed' && isOpen && (
                    <div className="border-t border-[#F1F5F9] px-5 py-4 bg-[#F8FAFC]">
                      <div className="text-xs font-semibold text-[#475569] mb-3">직무 증빙 자료</div>

                      {myDocs.length > 0 && (
                        <div className="flex flex-col gap-1.5 mb-3">
                          {myDocs.map(doc => (
                            <a key={doc.id} href={doc.file_url} target="_blank" rel="noreferrer"
                              className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 hover:border-blue-500/50 transition-colors">
                              <span className="text-xs text-[#475569] truncate max-w-[220px]">📄 {doc.file_name}</span>
                              <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                doc.status === '확인 완료'
                                  ? 'bg-emerald-500/10 text-emerald-600'
                                  : 'bg-amber-500/10 text-amber-600'
                              }`}>{doc.status}</span>
                            </a>
                          ))}
                        </div>
                      )}

                      <label className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                        isUploading
                          ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
                          : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                      }`}>
                        {isUploading
                          ? <><div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />업로드 중...</>
                          : `+ 파일 추가${myDocs.length > 0 ? ' (추가 첨부)' : ''}`}
                        <input type="file" className="hidden" disabled={!!uploading}
                          onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) handleUpload(sid, file)
                            e.target.value = ''
                          }} />
                      </label>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
