'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const AMENITY_LABELS: Record<string, string> = {
  wifi: '고속 Wi-Fi', monitor: '모니터', whiteboard: '화이트보드',
  parking: '주차장', breakfast: '조식 제공', printer: '프린터',
  meeting: '회의실', laundry: '세탁기', ac: '에어컨',
  lounge: '휴게공간', kitchen: '공용 주방', gym: '피트니스',
}

const AMENITY_OPTIONS = [
  { id: 'wifi',       label: '고속 Wi-Fi',   icon: '📶' },
  { id: 'monitor',    label: '모니터',        icon: '🖥️' },
  { id: 'whiteboard', label: '화이트보드',    icon: '📋' },
  { id: 'parking',    label: '주차장',        icon: '🅿️' },
  { id: 'breakfast',  label: '조식 제공',    icon: '🍳' },
  { id: 'printer',    label: '프린터',        icon: '🖨️' },
  { id: 'meeting',    label: '회의실',        icon: '🏢' },
  { id: 'laundry',    label: '세탁기',        icon: '🧺' },
  { id: 'ac',         label: '에어컨',        icon: '❄️' },
  { id: 'lounge',     label: '휴게공간',      icon: '🛋️' },
  { id: 'kitchen',    label: '공용 주방',     icon: '🍽️' },
  { id: 'gym',        label: '피트니스',      icon: '💪' },
]

const TAGS = ['집중', '힐링', '팀빌딩', '액티비티', '자연', '바다뷰', '산뷰']

const STEPS = ['기본 정보', '업무 환경', '소개 & 완료']

export default function NewAccommodationPage() {
  const [step, setStep]           = useState(0)
  const [name, setName]           = useState('')
  const [region, setRegion]       = useState('')
  const [address, setAddress]     = useState('')
  const [price, setPrice]         = useState('')
  const [capacity, setCapacity]   = useState('')
  const [amenities, setAmenities] = useState<string[]>(['wifi', 'monitor', 'whiteboard'])
  const [tags, setTags]           = useState<string[]>(['집중'])
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl]   = useState('')
  const [done, setDone]           = useState(false)
  const [saving, setSaving]       = useState(false)
  const [saveError, setSaveError] = useState('')

  function toggleAmenity(id: string) {
    setAmenities(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }
  function toggleTag(t: string) {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  async function handleRegister() {
    setSaving(true)
    setSaveError('')
    const { error } = await supabase.from('accommodations').insert({
      name,
      region,
      address:         address      || null,
      price_per_night: Number(price),
      capacity:        Number(capacity),
      amenities:       amenities.map(id => AMENITY_LABELS[id] ?? id),
      tags,
      description:     description  || null,
      image_url:       imageUrl      || null,
      rating:          0,
    })
    setSaving(false)
    if (error) { setSaveError(error.message); return }
    setDone(true)
  }

  if (done) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>
        <h1 className="text-2xl font-black mb-2">숙소 등록 완료!</h1>
        <p className="text-[#475569] mb-2">더워케이션 운영팀이 검토 후 24시간 내 승인 처리됩니다.</p>
        <p className="text-sm text-[#94A3B8] mb-8">승인 완료 시 이메일로 안내드립니다.</p>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left mb-8">
          <div className="font-bold text-base mb-3">{name}</div>
          {[
            ['지역',   region],
            ['가격',   `${Number(price).toLocaleString()}원/박`],
            ['수용인원', `최대 ${capacity}명`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm py-1.5 border-b border-[#F1F5F9] last:border-0">
              <span className="text-[#94A3B8]">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
        <Link href="/partner" className="block w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
          파트너 대시보드로 →
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/partner/accommodations" className="text-[#94A3B8] hover:text-[#475569] transition-colors">← 숙소 관리</Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="font-semibold">신규 숙소 등록</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                i === step ? 'bg-blue-500 text-white' : i < step ? 'bg-[#E2E8F0] text-[#475569]' : 'border border-[#E2E8F0] text-[#CBD5E1]'
              }`}>{i + 1}</span>
              <span className={i === step ? 'text-blue-500 font-semibold' : 'text-[#94A3B8]'}>{s}</span>
              {i < STEPS.length - 1 && <span className="text-[#E2E8F0]">—</span>}
            </div>
          ))}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* STEP 0: 기본 정보 */}
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-5">기본 정보</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">숙소명 *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="예: 강릉 씨사이드 워크스테이션"
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">지역 *</label>
                    <select value={region} onChange={e => setRegion(e.target.value)}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500">
                      <option value="">지역 선택</option>
                      {['강원도 강릉', '강원도 속초', '강원도 양양', '제주도 서귀포', '제주도 제주시', '전라남도 여수', '전라남도 순천', '경상남도 남해', '경상남도 거제', '부산광역시', '전라북도 전주'].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">상세 주소</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} placeholder="도로명 주소"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">1박 가격 (원) *</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="85000"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">최대 수용 인원 *</label>
                    <input type="number" value={capacity} onChange={e => setCapacity(e.target.value)} placeholder="8"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => name && region && price && capacity && setStep(1)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white font-semibold rounded-xl transition-colors"
            >
              다음 → 업무 환경 설정
            </button>
          </div>
        )}

        {/* STEP 1: 업무 환경 */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-5">워케이션 편의시설</h2>
              <p className="text-xs text-[#94A3B8] mb-4">제공하는 시설을 모두 선택해주세요</p>
              <div className="grid grid-cols-3 gap-2">
                {AMENITY_OPTIONS.map(a => {
                  const active = amenities.includes(a.id)
                  return (
                    <button key={a.id} onClick={() => toggleAmenity(a.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        active
                          ? 'bg-blue-500/10 border-blue-500/40 text-blue-600'
                          : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#475569] hover:border-blue-500/30'
                      }`}>
                      <span>{a.icon}</span>
                      <span>{a.label}</span>
                      {active && <span className="ml-auto text-blue-500 text-xs">✓</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-5">워케이션 스타일 태그</h2>
              <p className="text-xs text-[#94A3B8] mb-4">숙소 분위기에 맞는 태그를 선택하세요 (AI 매칭에 활용)</p>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(t => {
                  const active = tags.includes(t)
                  return (
                    <button key={t} onClick={() => toggleTag(t)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                        active
                          ? 'bg-purple-500/10 border-purple-500/40 text-purple-600'
                          : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#475569] hover:border-purple-500/30'
                      }`}>
                      {active ? '✓ ' : ''}{t}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 py-3 bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] font-semibold rounded-xl transition-colors">
                ← 이전
              </button>
              <button onClick={() => setStep(2)} className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
                다음 → 소개 작성
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 소개 & 이미지 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-5">숙소 소개</h2>
              <textarea rows={5} value={description} onChange={e => setDescription(e.target.value)}
                placeholder="숙소의 특징과 워케이션에 적합한 이유를 소개해주세요. 업무 공간, 주변 환경, 편의시설 등을 자세히 적어주실수록 예약 전환율이 높아집니다."
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 resize-none" />
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-2">대표 이미지</h2>
              <p className="text-xs text-[#94A3B8] mb-4">Supabase Storage 또는 외부 이미지 URL을 입력하세요</p>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..."
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500 mb-4" />
              {imageUrl && (
                <img src={imageUrl} alt="preview" className="w-full h-40 object-cover rounded-xl" />
              )}
              {!imageUrl && (
                <div className="h-32 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-4xl text-[#CBD5E1]">
                  🏨
                </div>
              )}
            </div>

            {/* 최종 요약 */}
            <div className="bg-[#F1F5F9] rounded-2xl p-5 text-sm">
              <div className="font-semibold mb-3 text-[#475569]">등록 정보 요약</div>
              <div className="flex flex-col gap-2">
                {[
                  ['숙소명', name],
                  ['지역', region],
                  ['가격', `${Number(price).toLocaleString()}원/박`],
                  ['수용인원', `최대 ${capacity}명`],
                  ['편의시설', `${amenities.length}개 선택`],
                  ['스타일 태그', tags.join(', ')],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-[#94A3B8]">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] font-semibold rounded-xl transition-colors">
                ← 이전
              </button>
              {saveError && <p className="text-xs text-red-500 text-center">{saveError}</p>}
              <button onClick={handleRegister} disabled={saving} className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-semibold rounded-xl transition-colors">
                {saving ? '등록 중...' : '✅ 등록 신청'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
