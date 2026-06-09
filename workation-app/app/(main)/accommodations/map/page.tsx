'use client'
import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import { supabase } from '@/lib/supabase'

type Accommodation = {
  id: string
  name: string
  region: string
  price_per_night: number
  rating: number
  amenities: string[]
  description: string
  image_url?: string
}

type SubsidyInfo = {
  region: string
  amount_per_person: number
}

const REGION_COORDS: { keyword: string; lat: number; lng: number }[] = [
  { keyword: '삼척', lat: 37.4496, lng: 129.1659 },
  { keyword: '속초', lat: 38.2070, lng: 128.5918 },
  { keyword: '양양', lat: 38.0752, lng: 128.6186 },
  { keyword: '강릉', lat: 37.7519, lng: 128.8760 },
  { keyword: '춘천', lat: 37.8813, lng: 127.7298 },
  { keyword: '원주', lat: 37.3422, lng: 127.9202 },
  { keyword: '평창', lat: 37.3705, lng: 128.3906 },
  { keyword: '홍천', lat: 37.6969, lng: 127.8886 },
  { keyword: '제주', lat: 33.4996, lng: 126.5312 },
  { keyword: '서귀포', lat: 33.2541, lng: 126.5600 },
  { keyword: '여수', lat: 34.7604, lng: 127.6622 },
  { keyword: '전주', lat: 35.8242, lng: 127.1480 },
  { keyword: '수원', lat: 37.2636, lng: 127.0286 },
  { keyword: '인천', lat: 37.4563, lng: 126.7052 },
  { keyword: '경기', lat: 37.4138, lng: 127.5183 },
  { keyword: '부산', lat: 35.1796, lng: 129.0756 },
]

function getCoords(region: string) {
  for (const { keyword, lat, lng } of REGION_COORDS) {
    if (region.includes(keyword)) return { lat, lng }
  }
  return { lat: 37.5665, lng: 126.9780 }
}

function getSubsidyTotal(region: string, subsidies: SubsidyInfo[]) {
  return subsidies
    .filter(s => region.includes(s.region) || s.region.includes(region.split(' ')[0]))
    .reduce((sum, s) => sum + s.amount_per_person, 0)
}

declare global {
  interface Window {
    kakao: any
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [subsidies, setSubsidies] = useState<SubsidyInfo[]>([])
  const [selected, setSelected] = useState<Accommodation | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const markersRef = useRef<any[]>([])
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    supabase.from('accommodations').select('*').then(({ data }) => {
      if (data) setAccommodations(data)
    })
    supabase.from('subsidies').select('region, amount_per_person').then(({ data }) => {
      if (data) setSubsidies(data)
    })
  }, [])

  function onKakaoLoad() {
    window.kakao.maps.load(() => setMapLoaded(true))
  }

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || accommodations.length === 0) return

    const { kakao } = window
    const center = new kakao.maps.LatLng(35.8, 127.5)
    const map = new kakao.maps.Map(mapRef.current, { center, level: 13 })
    mapInstanceRef.current = map

    // 남한 영역 벗어나면 되돌아오기
    const SW = new kakao.maps.LatLng(33.0, 124.6)
    const NE = new kakao.maps.LatLng(38.6, 131.9)
    kakao.maps.event.addListener(map, 'center_changed', () => {
      const c = map.getCenter()
      const lat = c.getLat()
      const lng = c.getLng()
      if (lat < 33.0 || lat > 38.6 || lng < 124.6 || lng > 131.9) {
        map.setCenter(new kakao.maps.LatLng(
          Math.max(33.0, Math.min(38.6, lat)),
          Math.max(124.6, Math.min(131.9, lng))
        ))
      }
    })

    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    accommodations.forEach(acc => {
      const coords = getCoords(acc.region)
      const position = new kakao.maps.LatLng(coords.lat, coords.lng)

      const subsidy = getSubsidyTotal(acc.region, subsidies)
      const subsidyHtml = subsidy > 0
        ? `<div style="background:#10b981;color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;margin-top:4px;">💰 ${subsidy.toLocaleString()}원/인</div>`
        : ''
      const imgHtml = acc.image_url
        ? `<img src="${acc.image_url}" style="width:130px;height:80px;object-fit:cover;display:block;" />`
        : `<div style="width:130px;height:80px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:24px;">🏨</div>`

      const content = `
        <div style="background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;overflow:hidden;width:130px;box-shadow:0 4px 12px rgba(0,0,0,0.15);cursor:pointer;">
          ${imgHtml}
          <div style="padding:6px 8px;">
            <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${acc.name}</div>
            <div style="font-size:11px;color:#3b82f6;font-weight:700;">${acc.price_per_night.toLocaleString()}원/박</div>
            ${subsidyHtml}
          </div>
        </div>
      `

      const overlay = new kakao.maps.CustomOverlay({ position, content, yAnchor: 1.05 })
      overlay.setMap(map)

      const overlayEl = overlay.getContent() as HTMLElement
      if (overlayEl && overlayEl.addEventListener) {
        overlayEl.addEventListener('click', () => setSelected(acc))
      }

      markersRef.current.push(overlay)
    })
  }, [mapLoaded, accommodations, subsidies])

  useEffect(() => {
    if (!mapInstanceRef.current || !selected) return
    const { kakao } = window
    const coords = getCoords(selected.region)
    const position = new kakao.maps.LatLng(coords.lat, coords.lng)
    mapInstanceRef.current.panTo(position)
  }, [selected])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7bc287dcd5f0f88909d9ba455ede678d&autoload=false"
        strategy="afterInteractive"
        onLoad={onKakaoLoad}
      />
      <Header />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 65px)' }}>
        {/* 카카오 지도 */}
        <div className="flex-1 relative" style={{ minHeight: 0 }}>
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#EEF2FF]">
              <div className="text-center text-[#94A3B8]">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <div className="text-sm">지도 불러오는 중...</div>
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽 패널 */}
        <div className="w-72 bg-white border-l border-[#E2E8F0] flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-[#E2E8F0]">
            <div className="text-sm font-bold mb-1">숙소 {accommodations.length}개</div>
            <div className="text-xs text-[#94A3B8]">마커를 클릭하면 상세 정보가 보여요</div>
          </div>

          {selected ? (
            <div className="p-4">
              {selected.image_url
                ? <img src={selected.image_url} alt={selected.name} className="h-28 w-full object-cover rounded-xl mb-3" />
                : <div className="h-28 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-4xl mb-3">🏨</div>
              }
              <div className="font-bold text-sm mb-1">{selected.name}</div>
              <div className="text-xs text-[#94A3B8] mb-2">📍 {selected.region}</div>
              <div className="text-blue-400 font-bold mb-2">
                {selected.price_per_night.toLocaleString()}원
                <span className="text-[#94A3B8] font-normal text-xs">/박</span>
              </div>
              {getSubsidyTotal(selected.region, subsidies) > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mb-3">
                  <div className="text-xs text-emerald-700 font-semibold">💰 지원금 적용 가능</div>
                  <div className="text-xs text-emerald-600 mt-0.5">
                    {getSubsidyTotal(selected.region, subsidies).toLocaleString()}원/인 지원
                  </div>
                </div>
              )}
              <p className="text-xs text-[#475569] mb-4 leading-relaxed line-clamp-3">{selected.description}</p>
              <Link
                href={`/accommodations/${selected.id}`}
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                상세 보기 →
              </Link>
              <button
                onClick={() => setSelected(null)}
                className="block w-full text-center text-xs text-[#94A3B8] mt-2 hover:text-[#475569]"
              >
                목록으로
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-2 p-4">
              {accommodations.map(acc => {
                const subsidy = getSubsidyTotal(acc.region, subsidies)
                return (
                  <button
                    key={acc.id}
                    onClick={() => setSelected(acc)}
                    className="text-left p-3 bg-[#F1F5F9] rounded-xl hover:bg-[#E2E8F0] transition-colors border border-transparent hover:border-blue-500/30"
                  >
                    <div className="font-medium text-sm">{acc.name}</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5">📍 {acc.region}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-blue-400 font-bold">{acc.price_per_night.toLocaleString()}원/박</span>
                      {subsidy > 0 && (
                        <span className="text-[10px] text-emerald-600 font-semibold">💰 {subsidy.toLocaleString()}원/인</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
