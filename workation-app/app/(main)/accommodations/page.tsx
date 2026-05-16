'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import { supabase } from '@/lib/supabase'

type Accommodation = {
  id: string
  name: string
  region: string
  price_per_night: number
  capacity: number
  rating: number
  tags: string[]
  amenities: string[]
  description: string
  image_url?: string
}

type SubsidyInfo = {
  region: string
  amount_per_person: number
}

const LOCATIONS = ['전체', '강원도', '제주도', '전라남도', '전라북도']

const LOCATION_ALIASES: Record<string, string[]> = {
  '강원도': ['강원도', '강원특별자치도'],
  '제주도': ['제주도', '제주특별자치도'],
  '전라남도': ['전라남도'],
  '전라북도': ['전라북도', '전북특별자치도'],
}

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [subsidies, setSubsidies]           = useState<SubsidyInfo[]>([])
  const [loading, setLoading]               = useState(true)
  const [location, setLocation]             = useState('전체')
  const [aiPeople, setAiPeople]             = useState(4)
  const [aiStyle, setAiStyle]               = useState('집중')
  const [aiLoading, setAiLoading]           = useState(false)
  const [aiDone, setAiDone]                 = useState(false)

  useEffect(() => {
    async function fetchAccommodations() {
      const { data, error } = await supabase.from('accommodations').select('*')
      if (error) console.error('[accommodations fetch error]', error)
      if (data) setAccommodations(data)
      setLoading(false)
    }
    supabase.from('subsidies').select('region, amount_per_person').then(({ data, error }) => {
      if (error) console.error('[subsidies fetch error]', error)
      if (data) setSubsidies(data)
    })
    fetchAccommodations()
  }, [])

  function getSubsidyTotal(region: string) {
    return subsidies
      .filter(s => region.includes(s.region) || s.region.includes(region.split(' ')[0]))
      .reduce((sum, s) => sum + s.amount_per_person, 0)
  }

  const filtered = accommodations.filter(a => {
    if (location === '전체') return true
    const aliases = LOCATION_ALIASES[location] ?? [location]
    return aliases.some(alias => a.region.includes(alias))
  })

  const aiRecommended = accommodations
    .filter(a => a.tags?.includes(aiStyle))
    .slice(0, 3)

  function handleAiMatch() {
    setAiLoading(true)
    setAiDone(false)
    setTimeout(() => { setAiLoading(false); setAiDone(true) }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* AI 숙소 매칭 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#7c3aed] rounded-2xl p-7 mb-8 shadow-lg">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-purple-400/10 rounded-full translate-y-1/2 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">✨</span>
              <h2 className="font-black text-xl text-white tracking-tight">AI 숙소 매칭</h2>
              <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30 font-semibold">Beta</span>
            </div>
            <p className="text-blue-100 text-sm mb-6">팀 정보를 입력하면 AI가 최적의 숙소를 3초 안에 추천해드려요</p>

            <div className="flex flex-wrap items-end gap-4 mb-2">
              <div>
                <label className="text-xs text-blue-200 mb-1.5 block font-medium">팀 인원</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAiPeople(Math.max(1, aiPeople - 1))}
                    className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors font-bold">-</button>
                  <span className="font-black text-white w-7 text-center text-lg">{aiPeople}</span>
                  <button onClick={() => setAiPeople(Math.min(50, aiPeople + 1))}
                    className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors font-bold">+</button>
                  <span className="text-sm text-blue-200">명</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-blue-200 mb-1.5 block font-medium">워케이션 스타일</label>
                <div className="flex gap-2">
                  {['집중', '힐링', '팀빌딩', '액티비티'].map(s => (
                    <button key={s} onClick={() => setAiStyle(s)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        aiStyle === s
                          ? 'bg-white text-blue-700 shadow-md'
                          : 'bg-white/15 border border-white/20 text-white hover:bg-white/25'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleAiMatch} disabled={aiLoading}
                className="px-6 py-2.5 bg-white hover:bg-blue-50 disabled:opacity-60 text-blue-700 text-sm font-black rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                {aiLoading ? '분석 중...' : '✨ AI 추천 받기'}
              </button>
            </div>
          </div>

          {aiLoading && (
            <div className="relative flex items-center gap-3 pt-5 text-sm text-blue-100">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              AI가 {aiPeople}명 팀에 최적화된 숙소를 분석하고 있어요...
            </div>
          )}

          {aiDone && !aiLoading && (
            <div className="relative mt-5">
              <p className="text-xs text-blue-200 mb-3">✅ {aiPeople}명 · {aiStyle} 스타일 기준 추천 결과</p>
              <div className="grid grid-cols-3 gap-3">
                {(aiRecommended.length > 0 ? aiRecommended : accommodations.slice(0, 3)).map((acc, i) => (
                  <Link key={acc.id} href={`/accommodations/${acc.id}`}>
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                          {i === 0 ? '🥇 1순위' : i === 1 ? '🥈 2순위' : '🥉 3순위'}
                        </span>
                        <span className="text-xs font-bold text-blue-200">{acc.price_per_night.toLocaleString()}원/박</span>
                      </div>
                      <div className="font-semibold text-sm text-white mb-1">{acc.name}</div>
                      <div className="text-xs text-blue-200 mb-2">📍 {acc.region}</div>
                      {getSubsidyTotal(acc.region) > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-xs bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                            💰 1인당 {getSubsidyTotal(acc.region).toLocaleString()}원 할인
                          </span>
                        </div>
                      )}
                      {getSubsidyTotal(acc.region) > 0 && (
                        <div className="text-xs text-blue-200 mb-2">
                          {aiPeople}명 기준 <span className="text-emerald-300 font-bold">{(getSubsidyTotal(acc.region) * aiPeople).toLocaleString()}원</span> 절감
                        </div>
                      )}
                      <p className="text-xs text-blue-100 leading-relaxed line-clamp-2">{acc.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 타이틀 + 지도 링크 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">전체 숙소</h1>
            <p className="text-sm text-[#475569]">전국 {accommodations.length}개 제휴 숙소</p>
          </div>
          <Link href="/accommodations/map"
            className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-4 py-2 text-sm hover:border-blue-500/50 transition-all">
            🗺️ 지도로 보기
          </Link>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {LOCATIONS.map(loc => (
            <button key={loc} onClick={() => setLocation(loc)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                location === loc ? 'bg-blue-500 text-white' : 'bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#94A3B8]'
              }`}>
              {loc}
            </button>
          ))}
        </div>

        {/* 숙소 그리드 */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#94A3B8]">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
            숙소 불러오는 중...
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {filtered.map(acc => (
              <Link key={acc.id} href={`/accommodations/${acc.id}`}>
                <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all group">
                  {acc.image_url
                    ? <img src={acc.image_url} alt={acc.name} className="h-44 w-full object-cover" />
                    : <div className="h-44 bg-[#F1F5F9] flex items-center justify-center text-4xl">🏨</div>
                  }
                  <div className="p-4">
                    <h3 className="font-semibold text-sm leading-snug mb-1">{acc.name}</h3>
                    <p className="text-xs text-[#94A3B8] mb-2">📍 {acc.region}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {acc.amenities?.slice(0, 2).map(a => (
                        <span key={a} className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded">{a}</span>
                      ))}
                      {getSubsidyTotal(acc.region) > 0 && (
                        <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded border border-emerald-500/20">
                          💰 {getSubsidyTotal(acc.region).toLocaleString()}원/인 지원
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 font-bold text-sm">
                        {acc.price_per_night.toLocaleString()}원<span className="text-[#94A3B8] font-normal text-xs"> /박</span>
                      </span>
                      <span className="text-xs text-[#94A3B8]">⭐ {acc.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && accommodations.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏨</div>
            <p className="text-[#475569] font-medium mb-1">등록된 숙소가 없어요</p>
            <p className="text-xs text-[#94A3B8]">Supabase accommodations 테이블을 확인해주세요</p>
          </div>
        )}
        {!loading && accommodations.length > 0 && filtered.length === 0 && (
          <div className="text-center py-20 text-[#94A3B8]">조건에 맞는 숙소가 없어요</div>
        )}
      </div>
      <Footer />
    </div>
  )
}
