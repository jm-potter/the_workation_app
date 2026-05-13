'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { useAuthOnly } from '@/lib/useAuthOnly'

type Accommodation = {
  id: string
  name: string
  region: string
  address?: string
  price_per_night: number
  capacity: number
  rating: number
  tags: string[]
  amenities: string[]
  description: string
  image_url?: string
}

export default function AccommodationDetailPage() {
  useAuthOnly()
  const { id } = useParams()
  const [acc, setAcc] = useState<Accommodation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('accommodations').select('*').eq('id', id).single()
      if (data) setAcc(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="flex items-center justify-center py-40 text-[#94A3B8]">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
        불러오는 중...
      </div>
    </div>
  )

  if (!acc) return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="text-center py-40 text-[#94A3B8]">숙소를 찾을 수 없어요</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/accommodations" className="text-sm text-[#94A3B8] hover:text-[#475569] flex items-center gap-1 mb-6 transition-colors">
          ← 숙소 목록으로
        </Link>

        {/* 이미지 */}
        {acc.image_url
          ? <img src={acc.image_url} alt={acc.name} className="w-full h-72 object-cover rounded-2xl mb-6" />
          : <div className="h-72 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-center text-7xl mb-6">🏨</div>
        }

        <div className="grid grid-cols-3 gap-6">
          {/* 왼쪽: 상세 정보 */}
          <div className="col-span-2 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">💻 업무공간</span>
                <span className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded">📶 와이파이</span>
                <span className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded">⭐ {acc.rating}</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">{acc.name}</h1>
              <p className="text-sm text-[#475569]">📍 {acc.address || acc.region}</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <h2 className="font-semibold mb-3">숙소 소개</h2>
              <p className="text-sm text-[#475569] leading-relaxed">{acc.description}</p>
            </div>

            {acc.amenities?.length > 0 && (
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                <h2 className="font-semibold mb-3">편의시설</h2>
                <div className="grid grid-cols-2 gap-2">
                  {acc.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-[#475569]">
                      <span className="text-emerald-500">✓</span> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 예약 카드 */}
          <div className="col-span-1">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sticky top-6">
              <div className="text-2xl font-black text-blue-400 mb-1">
                {acc.price_per_night.toLocaleString()}원
              </div>
              <div className="text-xs text-[#94A3B8] mb-5">1박 기준 · 세금 포함</div>

              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <label className="text-xs text-[#475569] mb-1 block">체크인</label>
                  <input type="date" className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-[#475569] mb-1 block">체크아웃</label>
                  <input type="date" className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-[#475569] mb-1 block">인원</label>
                  <select className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500">
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}명</option>)}
                  </select>
                </div>
              </div>

              <Link href={`/booking?id=${acc.id}`}>
                <Button size="lg" className="w-full">예약하기</Button>
              </Link>

              <p className="text-xs text-[#94A3B8] text-center mt-3">회사 예산에서 자동 차감됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
