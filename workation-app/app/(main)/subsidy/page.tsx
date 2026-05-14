import Link from 'next/link'
import Button from '@/components/ui/Button'

const SUBSIDIES = [
  {
    region: '부산광역시',
    flag: '🌊',
    amount: 500000,
    unit: '1인당',
    minNights: 3,
    deadline: '2026-12-31',
    provider: '부산광역시청 (BUSANess)',
    conditions: '3박 이상, 부산 외 사업장 재직자',
    color: 'from-purple-500/10 to-blue-500/10',
    border: 'border-purple-500/20',
    badge: 'bg-purple-500/20 text-purple-700 border-purple-500/30',
    highlight: 'text-purple-500',
    desc: 'KTO 2026 워케이션 우수모델 선정. 숙박+업무공간+관광바우처+웰컴키트 포함.',
  },
  {
    region: '제주특별자치도',
    flag: '🌺',
    amount: 300000,
    unit: '1인당',
    minNights: 2,
    deadline: '2026년 차수별 공고',
    provider: '제주특별자치도청',
    conditions: '2박 이상, 제주 외 기업 재직자·프리랜서',
    color: 'from-blue-500/10 to-emerald-500/10',
    border: 'border-blue-500/20',
    badge: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
    highlight: 'text-blue-500',
    desc: '숙박+오피스 최대 25만원 + 여가프로그램 5만원. 2026년 10만명 유치 목표.',
  },
  {
    region: '강원도 속초 (웰케이션)',
    flag: '🏔️',
    amount: 500000,
    unit: '1인당',
    minNights: 3,
    deadline: '2025-12-31',
    provider: '속초시청 / 강원관광재단',
    conditions: '3박 이상, 속초 외 타 지역 재직자·사업자·문화예술인',
    color: 'from-teal-500/10 to-emerald-500/10',
    border: 'border-teal-500/20',
    badge: 'bg-teal-500/20 text-teal-700 border-teal-500/30',
    highlight: 'text-teal-500',
    desc: '속초 웰케이션 사업. 라마다·한화리조트 등 지정 숙소 이용 시 최대 50만원.',
  },
  {
    region: '강원도 (일반)',
    flag: '🌲',
    amount: 100000,
    unit: '1인당',
    minNights: 2,
    deadline: '2025-12-31',
    provider: '강원특별자치도청',
    conditions: '2박 이상, 소규모 팀 가능',
    color: 'from-emerald-500/10 to-green-500/10',
    border: 'border-emerald-500/20',
    badge: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
    highlight: 'text-emerald-500',
    desc: '강원도 워케이션 유치 지원금. 강릉·양양 등 속초 외 강원도 전역에 적용.',
  },
  {
    region: '전라남도',
    flag: '🌾',
    amount: 300000,
    unit: '1인당',
    minNights: 2,
    deadline: '2025-12-31',
    provider: '전라남도청 / 전남관광재단',
    conditions: '2박 이상, 기업·기관 임직원 및 프리랜서',
    color: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
    highlight: 'text-amber-500',
    desc: '2025 블루워케이션. 여수·순천·나주 등 8개 지역. 오피스 무상이용+체험할인 포함.',
  },
  {
    region: '경상남도',
    flag: '⚓',
    amount: 80000,
    unit: '1인당',
    minNights: 2,
    deadline: '2025-12-31',
    provider: '해양수산부 / 한국어촌어항공단',
    conditions: '2박 이상, 남해·거제 어촌마을 대상',
    color: 'from-rose-500/10 to-pink-500/10',
    border: 'border-rose-500/20',
    badge: 'bg-rose-500/20 text-rose-700 border-rose-500/30',
    highlight: 'text-rose-500',
    desc: '어촌마을 워케이션. 공유오피스+숙박+조식+어촌체험+여행자보험 패키지 포함.',
  },
]

const HOW_TO = [
  { step: '01', title: '숙소 예약', desc: '더 워케이션에서 원하는 지역 숙소를 선택하세요. 지원금이 자동으로 표시됩니다.', icon: '🏨' },
  { step: '02', title: '자동 매칭', desc: '숙소 지역과 조건을 분석해 받을 수 있는 지원금을 자동으로 계산해드립니다.', icon: '🤖' },
  { step: '03', title: '선공제 적용', desc: '예약 시 지원금을 미리 차감해서 실제 결제 금액을 낮춰드립니다.', icon: '💳' },
  { step: '04', title: '정산 완료', desc: '워케이션 종료 후 지자체에 자동 신청 및 정산을 대행합니다.', icon: '✅' },
]

export default function SubsidyPage() {
  const totalMax = SUBSIDIES.reduce((s, sub) => s + sub.amount, 0)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-[#94A3B8] hover:text-[#475569] transition-colors">← 뒤로</Link>
          <Link href="/" className="text-lg font-black text-[#0F172A]">더 워케이션</Link>
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="secondary" size="sm">로그인</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">무료로 시작하기</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* 히어로 */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-700 font-medium mb-5">
            💰 2026년 상반기 지자체 지원금 현황
          </div>
          <h1 className="text-4xl font-black mb-4 text-[#0F172A]">
            워케이션, 정부가 <span className="text-emerald-500">지원금</span>까지 줍니다
          </h1>
          <p className="text-lg text-[#475569] mb-2">
            전국 {SUBSIDIES.length}개 지자체 지원금을 자동으로 찾아 예약 시 선공제해 드립니다
          </p>
          <p className="text-sm text-[#94A3B8]">
            지금 바로 신청하면 1인당 최대 <strong className="text-emerald-500">{totalMax.toLocaleString()}원</strong>까지 지원받을 수 있어요
          </p>
        </div>

        {/* 지원금 카드 */}
        <div className="grid grid-cols-2 gap-5 mb-14">
          {SUBSIDIES.map(s => (
            <div key={s.region} className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-2xl mb-1">{s.flag}</div>
                  <h3 className="font-bold text-lg text-[#0F172A]">{s.region}</h3>
                  <div className="text-xs text-[#94A3B8] mt-0.5">{s.provider}</div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-black ${s.highlight}`}>{s.amount.toLocaleString()}원</div>
                  <div className="text-xs text-[#94A3B8]">{s.unit}</div>
                </div>
              </div>

              <p className="text-sm text-[#475569] mb-4 leading-relaxed">{s.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${s.badge}`}>
                  {s.minNights}박 이상
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${s.badge}`}>
                  ~{s.deadline}
                </span>
              </div>

              <div className="bg-white/60 rounded-xl p-3 text-xs text-[#475569]">
                <strong>조건:</strong> {s.conditions}
              </div>
            </div>
          ))}
        </div>

        {/* 신청 프로세스 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-black text-center mb-8">어떻게 받나요?</h2>
          <div className="grid grid-cols-4 gap-6">
            {HOW_TO.map((h, i) => (
              <div key={h.step} className="text-center relative">
                {i < HOW_TO.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-1/2 w-full h-px bg-[#E2E8F0]" />
                )}
                <div className="w-12 h-12 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center text-xl mx-auto mb-3 relative z-10">
                  {h.icon}
                </div>
                <div className="text-xs text-blue-500 font-bold mb-1">STEP {h.step}</div>
                <div className="font-bold text-sm mb-2">{h.title}</div>
                <div className="text-xs text-[#94A3B8] leading-relaxed">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-black mb-2">지금 바로 지원금 확인해보세요</h2>
          <p className="text-white/80 mb-6">숙소를 선택하면 받을 수 있는 지원금을 자동으로 계산해 드립니다</p>
          <Link href="/register">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-white/90 transition-colors">
              무료로 시작하기 →
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
