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

  const filtered = accommodations.filter(a =>
    location === '전체' || a.region.includes(location)
  )

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
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h2 className="font-bold text-base">AI 숙소 매칭</h2>
            <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded-full border border-blue-500/30">Beta</span>
          </div>
          <p className="text-sm text-[#475569] mb-5">팀 정보를 입력하면 AI가 최적의 숙소를 추천해드려요</p>

          <div className="flex flex-wrap items-end gap-4 mb-5">
            <div>
              <label className="text-xs text-[#475569] mb-1.5 block">팀 인원</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setAiPeople(Math.max(1, aiPeople - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#475569] hover:border-blue-500 transition-colors">-</button>
                <span className="font-bold w-6 text-center">{aiPeople}</span>
                <button onClick={() => setAiPeople(Math.min(50, aiPeople + 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#475569] hover:border-blue-500 transition-colors">+</button>
                <span className="text-xs text-[#94A3B8]">명</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#475569] mb-1.5 block">워케이션 스타일</label>
              <div className="flex gap-2">
                {['집중', '힐링', '팀빌딩', '액티비티'].map(s => (
                  <button key={s} onClick={() => setAiStyle(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      aiStyle === s ? 'bg-blue-500 text-white' : 'bg-white border border-[#E2E8F0] text-[#475569] hover:border-blue-500/50'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAiMatch} disabled={aiLoading}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors">
              {aiLoading ? '분석 중...' : '✨ AI 추천 받기'}
            </button>
          </div>

          {aiLoading && (
            <div className="flex items-center gap-3 py-4 text-sm text-[#475569]">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              AI가 {aiPeople}명 팀에 최적화된 숙소를 분석하고 있어요...
            </div>
          )}

          {aiDone && !aiLoading && (
            <div>
              <p className="text-xs text-[#94A3B8] mb-3">✅ {aiPeople}명 · {aiStyle} 스타일 기준 추천 결과</p>
              <div className="grid grid-cols-3 gap-3">
                {(aiRecommended.length > 0 ? aiRecommended : accommodations.slice(0, 3)).map((acc, i) => (
                  <Link key={acc.id} href={`/accommodations/${acc.id}`}>
                    <div className="bg-white border border-blue-500/30 rounded-xl p-4 hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded-full">
                          {i === 0 ? '🥇 1순위' : i === 1 ? '🥈 2순위' : '🥉 3순위'}
                        </span>
                        <span className="text-xs font-bold text-blue-400">{acc.price_per_night.toLocaleString()}원/박</span>
                      </div>
                      <div className="font-medium text-sm mb-1">{acc.name}</div>
                      <div className="text-xs text-[#94A3B8] mb-2">📍 {acc.region}</div>
                      <p className="text-xs text-[#475569] leading-relaxed">{acc.description}</p>
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
