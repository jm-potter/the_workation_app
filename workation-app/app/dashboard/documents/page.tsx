'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import { useHrOnly } from '@/lib/useHrOnly'
import { supabase } from '@/lib/supabase'

type Doc = {
  id: string
  booking_id: string
  user_id: string
  type: string
  file_url: string
  file_name: string
  status: string
  created_at: string
  booking?: { start_date: string; end_date: string; accommodation_name: string; region: string } | null
  userName?: string
}

const TYPE_LABELS: Record<string, string> = {
  receipt:    '영수증',
  work_proof: '직무 증빙',
}

type FilterType = '전체' | '확인 전' | '확인 완료'

export default function DocumentsAdminPage() {
  useHrOnly()
  const [docs, setDocs]       = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState<FilterType>('전체')

  useEffect(() => {
    async function load() {
      const { data: docsData } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (!docsData || docsData.length === 0) { setLoading(false); return }

      const bookingIds = Array.from(new Set(docsData.map(d => d.booking_id).filter(Boolean)))
      const userIds    = Array.from(new Set(docsData.map(d => d.user_id).filter(Boolean)))

      const [{ data: bookingsData }, { data: usersData }] = await Promise.all([
        supabase
          .from('bookings')
          .select('id, start_date, end_date, accommodations(name, region)')
          .in('id', bookingIds),
        supabase
          .from('users')
          .select('id, name, email')
          .in('id', userIds),
      ])

      const bookingMap = Object.fromEntries(
        (bookingsData ?? []).map(b => [String(b.id), {
          start_date:        b.start_date,
          end_date:          b.end_date,
          accommodation_name: (b.accommodations as any)?.name ?? '-',
          region:            (b.accommodations as any)?.region ?? '-',
        }])
      )
      const userMap = Object.fromEntries(
        (usersData ?? []).map(u => [String(u.id), u.name ?? u.email ?? '-'])
      )

      setDocs(docsData.map(d => ({
        ...d,
        booking:  bookingMap[d.booking_id] ?? null,
        userName: userMap[d.user_id] ?? '-',
      })))
      setLoading(false)
    }
    load()
  }, [])

  async function handleConfirm(id: string) {
    const { error } = await supabase.from('documents').update({ status: '확인 완료' }).eq('id', id)
    if (!error) setDocs(prev => prev.map(d => d.id === id ? { ...d, status: '확인 완료' } : d))
  }

  const filtered    = docs.filter(d => filter === '전체' || d.status === filter)
  const pendingCount = docs.filter(d => d.status === '확인 전').length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header role="hr" />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/dashboard" className="text-xs text-[#94A3B8] hover:text-[#475569] mb-2 block">← 대시보드</Link>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">제출 서류 관리</h1>
            <p className="text-sm text-[#475569]">영수증 · 직무 증빙 자료 검토 및 확인</p>
          </div>
          <div className="flex gap-2">
            {(['전체', '확인 전', '확인 완료'] as FilterType[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === f ? 'bg-blue-500 text-white' : 'bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#94A3B8]'
                }`}>
                {f}
                {f === '확인 전' && pendingCount > 0 && (
                  <span className="ml-1.5 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#94A3B8] text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
              불러오는 중...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#94A3B8] text-sm">
              {filter === '전체' ? '제출된 서류가 없어요' : `${filter} 서류가 없어요`}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                  {['직원', '숙소', '기간', '종류', '파일', '제출일', '상태', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(doc => (
                  <tr key={doc.id} className={`border-b border-[#E2E8F0]/50 transition-colors ${
                    doc.status === '확인 전' ? 'hover:bg-amber-500/5' : 'hover:bg-[#F1F5F9]/50'
                  }`}>
                    <td className="px-5 py-3 font-medium">{doc.userName}</td>
                    <td className="px-5 py-3">
                      <div className="text-xs font-medium">{doc.booking?.accommodation_name ?? '-'}</div>
                      <div className="text-xs text-[#94A3B8]">📍 {doc.booking?.region ?? '-'}</div>
                    </td>
                    <td className="px-5 py-3 text-xs text-[#94A3B8]">
                      {doc.booking ? `${doc.booking.start_date} ~ ${doc.booking.end_date}` : '-'}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded font-medium">
                        {TYPE_LABELS[doc.type] ?? doc.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <a href={doc.file_url} target="_blank" rel="noreferrer"
                        className="text-xs text-blue-500 hover:underline max-w-[130px] block truncate">
                        📄 {doc.file_name}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-xs text-[#94A3B8]">
                      {new Date(doc.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                        doc.status === '확인 완료'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-amber-500/10 text-amber-600'
                      }`}>{doc.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      {doc.status !== '확인 완료' && (
                        <button onClick={() => handleConfirm(doc.id)}
                          className="text-xs text-blue-500 hover:text-blue-600 font-medium whitespace-nowrap">
                          확인 완료
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
