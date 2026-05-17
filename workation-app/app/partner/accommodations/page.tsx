'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Accommodation = {
  id: string
  name: string
  region: string
  price_per_night: number
  capacity: number
  rating: number
  amenities: string[]
  description: string
  image_url?: string
}

const ALL_AMENITIES = ['Wi-Fi', '모니터', '화이트보드', '주차', '조식', '세탁기', '에어컨', '프린터', '회의실', '휴게공간']
const PARTNER_REGION = '춘천'

export default function PartnerAccommodationsPage() {
  const [acc, setAcc]               = useState<Accommodation | null>(null)
  const [loading, setLoading]       = useState(true)
  const [editing, setEditing]       = useState(false)
  const [saving, setSaving]         = useState(false)
  const [form, setForm]             = useState<Partial<Accommodation>>({})
  const [totalBookings, setTotalBookings] = useState(0)
  const [saveError, setSaveError]   = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('accommodations')
        .select('*')
        .ilike('region', `%${PARTNER_REGION}%`)
        .limit(1)
        .maybeSingle()

      if (data) {
        setAcc(data)
        setForm(data)
        const { count } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('accommodation_id', data.id)
        setTotalBookings(count ?? 0)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave() {
    if (!acc) return
    setSaving(true)
    setSaveError('')
    const { error } = await supabase
      .from('accommodations')
      .update({
        name: form.name,
        region: form.region,
        price_per_night: Number(form.price_per_night),
        capacity: Number(form.capacity),
        description: form.description,
        amenities: form.amenities,
      })
      .eq('id', acc.id)
    if (!error) {
      setAcc(prev => prev ? { ...prev, ...form } : prev)
      setEditing(false)
    } else {
      setSaveError('저장 중 오류가 발생했어요')
    }
    setSaving(false)
  }

  function toggleAmenity(item: string) {
    if (!editing) return
    setForm(prev => {
      const current = prev.amenities ?? []
      return {
        ...prev,
        amenities: current.includes(item) ? current.filter(a => a !== item) : [...current, item],
      }
    })
  }

  const display = editing ? form : acc

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/partner" className="text-[#94A3B8] hover:text-[#475569] transition-colors">← 대시보드</Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="font-semibold">내 숙소 관리</span>
        </div>
        {acc && (
          <div className="flex items-center gap-2">
            <Link href="/partner/accommodations/new"
              className="text-sm font-semibold px-4 py-2 bg-white border border-[#E2E8F0] hover:border-blue-500/50 text-[#475569] rounded-xl transition-colors">
              + 신규 등록
            </Link>
            {editing ? (
              <button
                onClick={handleSave}
                disabled={saving}
                className="text-sm font-semibold px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white rounded-xl transition-colors"
              >
                {saving ? '저장 중...' : '저장하기'}
              </button>
            ) : (
              <button
                onClick={() => { setForm(acc); setEditing(true) }}
                className="text-sm font-semibold px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
              >
                수정하기
              </button>
            )}
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#94A3B8] text-sm">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
            숙소 정보 불러오는 중...
          </div>
        ) : !acc ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏨</div>
            <p className="text-[#475569] font-medium mb-1">등록된 춘천 숙소가 없어요</p>
            <p className="text-xs text-[#94A3B8] mb-6">Supabase accommodations 테이블에 춘천 지역 숙소를 추가해주세요</p>
            <Link href="/partner/accommodations/new"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              + 숙소 등록하기
            </Link>
          </div>
        ) : (
          <>
            {/* 운영 상태 배너 */}
            <div className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                <span className="text-sm font-medium">운영 중</span>
                <span className="text-xs text-[#94A3B8]">· 예약 가능 상태입니다</span>
              </div>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">운영 중단</button>
            </div>

            {saveError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 mb-4">{saveError}</div>
            )}

            <div className="flex flex-col gap-5">
              {/* 기본 정보 */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <h2 className="font-bold text-sm text-[#475569] mb-4 uppercase tracking-wide">기본 정보</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">숙소명</label>
                    <input
                      value={display?.name ?? ''}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!editing}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">주소 / 지역</label>
                    <input
                      value={display?.region ?? ''}
                      onChange={e => setForm(prev => ({ ...prev, region: e.target.value }))}
                      disabled={!editing}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#475569] mb-1.5 block">1박 가격 (원)</label>
                      <input
                        type="number"
                        value={display?.price_per_night ?? ''}
                        onChange={e => setForm(prev => ({ ...prev, price_per_night: Number(e.target.value) }))}
                        disabled={!editing}
                        className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#475569] mb-1.5 block">최대 수용 인원</label>
                      <input
                        type="number"
                        value={display?.capacity ?? ''}
                        onChange={e => setForm(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                        disabled={!editing}
                        className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 disabled:opacity-60"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">숙소 소개</label>
                    <textarea
                      rows={3}
                      value={display?.description ?? ''}
                      onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                      disabled={!editing}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 disabled:opacity-60 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 편의시설 */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <h2 className="font-bold text-sm text-[#475569] mb-4 uppercase tracking-wide">편의시설</h2>
                <div className="flex flex-wrap gap-2">
                  {ALL_AMENITIES.map(item => {
                    const has = (display?.amenities ?? []).includes(item)
                    return (
                      <button
                        key={item}
                        onClick={() => toggleAmenity(item)}
                        disabled={!editing}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:cursor-default ${
                          has
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                            : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]'
                        } ${editing ? 'hover:border-blue-500/60 cursor-pointer' : ''}`}
                      >
                        {has ? '✓ ' : ''}{item}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 사진 */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide">숙소 사진</h2>
                  {editing && <button className="text-xs text-blue-400 hover:text-blue-600">+ 사진 추가</button>}
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {acc.image_url ? (
                    <img src={acc.image_url} alt={acc.name} className="aspect-square object-cover rounded-xl" />
                  ) : null}
                  {Array.from({ length: acc.image_url ? 3 : 4 }, (_, i) => (
                    <div key={i} className="aspect-square bg-[#F1F5F9] rounded-xl flex items-center justify-center text-2xl text-[#CBD5E1]">
                      🏨
                    </div>
                  ))}
                  {editing && (
                    <div className="aspect-square bg-[#F1F5F9] border-2 border-dashed border-[#E2E8F0] rounded-xl flex items-center justify-center text-[#94A3B8] text-2xl cursor-pointer hover:border-blue-500/50 transition-colors">
                      +
                    </div>
                  )}
                </div>
              </div>

              {/* 운영 현황 */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <h2 className="font-bold text-sm text-[#475569] mb-4 uppercase tracking-wide">운영 현황</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: '총 예약 수',  value: `${totalBookings}건`,        color: 'text-blue-400'    },
                    { label: '평균 평점',   value: `⭐ ${acc.rating ?? '-'}`,    color: 'text-amber-400'   },
                    { label: '최대 수용',   value: `${acc.capacity}명`,          color: 'text-emerald-400' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#F1F5F9] rounded-xl p-4 text-center">
                      <div className={`text-xl font-black ${s.color} mb-1`}>{s.value}</div>
                      <div className="text-xs text-[#94A3B8]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
