'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import { supabase } from '@/lib/supabase'

type Booking = {
  id: string | number
  start_date: string
  end_date: string
  accommodations: { name: string; region: string } | null
}

type Doc = {
  id: string
  booking_id: string
  type: string
  file_url: string
  file_name: string
  status: string
  created_at: string
}

const TYPE_LABELS: Record<string, { label: string; desc: string }> = {
  work_proof: { label: '직무 증빙', desc: '업무 보고서, 회의록, 결과물 등' },
}

export default function DocumentsPage() {
  const [userId, setUserId]     = useState<string | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [docs, setDocs]         = useState<Doc[]>([])
  const [loading, setLoading]   = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const uid = data.user.id
      setUserId(uid)

      const [{ data: bData }, { data: dData }] = await Promise.all([
        supabase
          .from('bookings')
          .select('id, start_date, end_date, accommodations(name, region)')
          .eq('user_id', uid)
          .eq('status', 'confirmed'),
        supabase
          .from('documents')
          .select('*')
          .eq('user_id', uid)
          .order('created_at', { ascending: false }),
      ])

      if (bData) setBookings(bData as any)
      if (dData) setDocs(dData)
      setLoading(false)
    })
  }, [])

  async function handleUpload(bookingId: string, type: string, file: File) {
    if (!userId) return
    const key = `${bookingId}_${type}`
    setUploading(key)

    const path = `${userId}/${bookingId}/${type}_${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      alert('업로드 실패: ' + uploadError.message)
      setUploading(null)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(path)

    const { data: inserted } = await supabase
      .from('documents')
      .insert({ booking_id: bookingId, user_id: userId, type, file_url: publicUrl, file_name: file.name })
      .select()
      .single()

    if (inserted) setDocs(prev => [inserted, ...prev])
    setUploading(null)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/accommodations" className="text-xs text-[#94A3B8] hover:text-[#475569] mb-2 block">← 숙소 목록</Link>
        <h1 className="text-2xl font-bold mb-1">서류 제출</h1>
        <p className="text-sm text-[#475569] mb-8">워케이션 지원금 처리를 위한 서류를 업로드해주세요</p>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#94A3B8] text-sm">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
            불러오는 중...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-[#475569] font-medium mb-1">확정된 예약이 없어요</p>
            <Link href="/accommodations" className="text-xs text-blue-500 hover:underline">숙소 예약하러 가기 →</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {bookings.map(b => {
              const bookingDocs = docs.filter(d => d.booking_id === String(b.id))
              return (
                <div key={b.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                  <div className="mb-4 pb-4 border-b border-[#F1F5F9]">
                    <div className="font-semibold">{b.accommodations?.name ?? '-'}</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5">
                      📍 {b.accommodations?.region} · {b.start_date} ~ {b.end_date}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(TYPE_LABELS) as (keyof typeof TYPE_LABELS)[]).map(type => {
                      const key = `${b.id}_${type}`
                      const existing = bookingDocs.filter(d => d.type === type)
                      const isUploading = uploading === key
                      return (
                        <div key={type} className="border border-dashed border-[#E2E8F0] rounded-xl p-4">
                          <div className="text-xs font-semibold text-[#0F172A] mb-0.5">{TYPE_LABELS[type].label}</div>
                          <div className="text-xs text-[#94A3B8] mb-3">{TYPE_LABELS[type].desc}</div>
                          <label className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                            isUploading
                              ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
                              : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                          }`}>
                            {isUploading ? (
                              <><div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />업로드 중...</>
                            ) : '+ 파일 추가'}
                            <input type="file" className="hidden" disabled={!!uploading}
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) handleUpload(String(b.id), type, file)
                                e.target.value = ''
                              }} />
                          </label>
                          {existing.length > 0 && (
                            <div className="mt-2 flex flex-col gap-1">
                              {existing.map(doc => (
                                <a key={doc.id} href={doc.file_url} target="_blank" rel="noreferrer"
                                  className="flex items-center justify-between text-xs text-[#475569] hover:text-blue-500 transition-colors">
                                  <span className="truncate max-w-[110px]">📄 {doc.file_name}</span>
                                  <span className={`shrink-0 ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                    doc.status === '확인 완료'
                                      ? 'bg-emerald-500/10 text-emerald-600'
                                      : 'bg-[#F1F5F9] text-[#94A3B8]'
                                  }`}>{doc.status}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
