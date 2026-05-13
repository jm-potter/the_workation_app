import Link from 'next/link'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'

const MOCK_DETAIL = {
  id: '1',
  name: '강릉 씨사이드 워크스테이션',
  location: '강원도 강릉',
  address: '강원도 강릉시 경포로 123',
  price_per_night: 85000,
  wifi: true,
  workspace: true,
  description: '동해 바다가 바로 보이는 업무 공간. 24인치 모니터 2대와 인체공학 의자가 갖춰져 있어 장시간 작업도 편안합니다. 경포해변까지 도보 3분.',
  amenities: ['와이파이 (1Gbps)', '27인치 모니터', '인체공학 의자', '주차 무료', '에어컨·난방', '세탁기', '주방', '바비큐'],
}

export default function AccommodationDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 뒤로가기 */}
        <Link href="/accommodations" className="text-sm text-[#94A3B8] hover:text-[#475569] flex items-center gap-1 mb-6 transition-colors">
          ← 숙소 목록으로
        </Link>

        {/* 이미지 */}
        <div className="h-72 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-center text-7xl mb-6">
          🏨
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 왼쪽: 상세 정보 */}
          <div className="col-span-2 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {MOCK_DETAIL.workspace && (
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">💻 업무공간</span>
                )}
                {MOCK_DETAIL.wifi && (
                  <span className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded">📶 와이파이</span>
                )}
              </div>
              <h1 className="text-2xl font-bold mb-1">{MOCK_DETAIL.name}</h1>
              <p className="text-sm text-[#475569]">📍 {MOCK_DETAIL.address}</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <h2 className="font-semibold mb-3">숙소 소개</h2>
              <p className="text-sm text-[#475569] leading-relaxed">{MOCK_DETAIL.description}</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <h2 className="font-semibold mb-3">편의시설</h2>
              <div className="grid grid-cols-2 gap-2">
                {MOCK_DETAIL.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-[#475569]">
                    <span className="text-emerald-500">✓</span> {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 예약 카드 */}
          <div className="col-span-1">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sticky top-6">
              <div className="text-2xl font-black text-blue-400 mb-1">
                {MOCK_DETAIL.price_per_night.toLocaleString()}원
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

              <Link href={`/booking?id=${MOCK_DETAIL.id}`}>
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
