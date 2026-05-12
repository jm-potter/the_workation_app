'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'

const MOCK = [
  { id: '1', name: '강릉 씨사이드 워크스테이션', location: '강원도 강릉',   price_per_night: 85000, wifi: true, workspace: true,  amenities: ['와이파이', '모니터', '주차'],       description: '바다가 보이는 업무 공간',          tags: ['집중', '자연', '소규모'] },
  { id: '2', name: '제주 한달살기 스튜디오',     location: '제주도 서귀포', price_per_night: 95000, wifi: true, workspace: true,  amenities: ['와이파이', '주방', '세탁기'],       description: '제주 자연 속 집중 업무',            tags: ['힐링', '장기체류', '소규모'] },
  { id: '3', name: '양양 서퍼스 하우스',          location: '강원도 양양',  price_per_night: 70000, wifi: true, workspace: false, amenities: ['와이파이', '서핑 장비'],             description: '서핑과 일의 완벽한 균형',           tags: ['액티비티', '자연', '팀빌딩'] },
  { id: '4', name: '여수 오션뷰 코워킹',          location: '전라남도 여수', price_per_night: 75000, wifi: true, workspace: true,  amenities: ['와이파이', '코워킹존', '카페'],     description: '한려해상이 보이는 작업 공간',       tags: ['집중', '대규모', '팀빌딩'] },
  { id: '5', name: '속초 설악 리트릿',            location: '강원도 속초',  price_per_night: 65000, wifi: true, workspace: true,  amenities: ['와이파이', '모니터', '산책로'],     description: '설악산 아래 조용한 집중 환경',      tags: ['집중', '자연', '소규모'] },
  { id: '6', name: '전주 한옥 워크스테이션',      location: '전라북도 전주', price_per_night: 80000, wifi: true, workspace: true,  amenities: ['와이파이', '한옥 정원', '자전거'], description: '한옥 감성의 특별한 워케이션',       tags: ['힐링', '문화', '소규모'] },
]

const LOCATIONS = ['전체', '강원도', '제주도', '전라남도', '전라북도']

const AI_REASONS: Record<string, string> = {
  '1': '팀 규모와 집중 업무 환경에 최적화된 숙소예요. 업무 공간과 바다 뷰가 생산성을 높여줄 거예요.',
  '2': '장기 체류 시 비용 효율이 높고, 독립된 작업 공간이 확보돼 있어요.',
  '4': '대형 코워킹존이 있어 팀 전체가 함께 일하기 좋아요. 회의실도 완비돼 있어요.',
}

export default function AccommodationsPage() {
  const [location, setLocation]           = useState('전체')
  const [workspaceOnly, setWorkspaceOnly] = useState(false)
  const [aiPeople, setAiPeople]           = useState(4)
  const [aiStyle, setAiStyle]             = useState('집중')
  const [aiLoading, setAiLoading]         = useState(false)
  const [aiDone, setAiDone]               = useState(false)

  const filtered = MOCK.filter((a) => {
    if (location !== '전체' && !a.location.includes(location)) return false
    if (workspaceOnly && !a.workspace) return false
    return true
  })

  const aiRecommended = MOCK.filter(a =>
    a.tags.includes(aiStyle) && (aiPeople <= 4 ? a.tags.includes('소규모') : a.tags.includes('대규모') || a.tags.includes('팀빌딩'))
  ).slice(0, 3)

  function handleAiMatch() {
    setAiLoading(true)
    setAiDone(false)
    setTimeout(() => {
      setAiLoading(false)
      setAiDone(true)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* AI 숙소 매칭 */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h2 className="font-bold text-base">AI 숙소 매칭</h2>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">Beta</span>
          </div>
          <p className="text-sm text-[#94A3B8] mb-5">팀 정보를 입력하면 AI가 최적의 숙소를 추천해드려요</p>

          <div className="flex flex-wrap items-end gap-4 mb-5">
            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">팀 인원</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setAiPeople(Math.max(1, aiPeople - 1))}
                  className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:border-blue-500 transition-colors">-</button>
                <span className="font-bold w-6 text-center">{aiPeople}</span>
                <button onClick={() => setAiPeople(Math.min(20, aiPeople + 1))}
                  className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:border-blue-500 transition-colors">+</button>
                <span className="text-xs text-[#64748B]">명</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#94A3B8] mb-1.5 block">워케이션 스타일</label>
              <div className="flex gap-2">
                {['집중', '힐링', '팀빌딩', '액티비티'].map(s => (
                  <button key={s} onClick={() => setAiStyle(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      aiStyle === s ? 'bg-blue-500 text-white' : 'bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:border-blue-500/50'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAiMatch}
              disabled={aiLoading}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors">
              {aiLoading ? '분석 중...' : '✨ AI 추천 받기'}
            </button>
          </div>

          {/* AI 결과 */}
          {aiLoading && (
            <div className="flex items-center gap-3 py-4 text-sm text-[#94A3B8]">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              AI가 {aiPeople}명 팀에 최적화된 숙소를 분석하고 있어요...
            </div>
          )}

          {aiDone && !aiLoading && (
            <div>
              <p className="text-xs text-[#64748B] mb-3">✅ {aiPeople}명 · {aiStyle} 스타일 기준 추천 결과</p>
              <div className="grid grid-cols-3 gap-3">
                {(aiRecommended.length > 0 ? aiRecommended : MOCK.slice(0, 3)).map((acc, i) => (
                  <Link key={acc.id} href={`/accommodations/${acc.id}`}>
                    <div className="bg-[#1E293B] border border-blue-500/30 rounded-xl p-4 hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                          {i === 0 ? '🥇 1순위' : i === 1 ? '🥈 2순위' : '🥉 3순위'}
                        </span>
                        <span className="text-xs font-bold text-blue-400">{acc.price_per_night.toLocaleString()}원/박</span>
                      </div>
                      <div className="font-medium text-sm mb-1">{acc.name}</div>
                      <div className="text-xs text-[#64748B] mb-2">📍 {acc.location}</div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        {AI_REASONS[acc.id] ?? acc.description}
                      </p>
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
            <p className="text-sm text-[#94A3B8]">전국 {MOCK.length}개 제휴 숙소</p>
          </div>
          <Link href="/accommodations/map"
            className="flex items-center gap-2 bg-[#1E293B] border border-[#334155] rounded-xl px-4 py-2 text-sm hover:border-blue-500/50 transition-all">
            🗺️ 지도로 보기
          </Link>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex gap-2">
            {LOCATIONS.map((loc) => (
              <button key={loc} onClick={() => setLocation(loc)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  location === loc
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:border-[#475569]'
                }`}>
                {loc}
              </button>
            ))}
          </div>
          <button onClick={() => setWorkspaceOnly(!workspaceOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              workspaceOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-[#1E293B] text-[#94A3B8] border-[#334155]'
            }`}>
            💻 업무 공간 있는 곳만
          </button>
        </div>

        {/* 숙소 그리드 */}
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((acc) => (
            <Link key={acc.id} href={`/accommodations/${acc.id}`}>
              <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all group">
                <div className="h-44 bg-[#263548] flex items-center justify-center text-4xl group-hover:bg-[#2e3f56] transition-colors">🏨</div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm leading-snug mb-1">{acc.name}</h3>
                  <p className="text-xs text-[#64748B] mb-3">📍 {acc.location}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {acc.wifi && <span className="text-xs bg-[#263548] text-[#94A3B8] px-2 py-0.5 rounded">📶 와이파이</span>}
                    {acc.workspace && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">💻 업무공간</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-bold text-sm">{acc.price_per_night.toLocaleString()}원<span className="text-[#64748B] font-normal text-xs"> /박</span></span>
                    <span className="text-xs text-[#64748B]">→ 상세보기</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">조건에 맞는 숙소가 없어요</div>
        )}
      </div>
    </div>
  )
}
