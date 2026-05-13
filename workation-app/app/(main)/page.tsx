import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 헤더 */}
      <header className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-lg font-bold">더 워케이션</span>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">로그인</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">무료로 시작하기</Button>
          </Link>
        </div>
      </header>

      {/* 히어로 */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-6">
          기업 전용 워케이션 플랫폼
        </div>
        <h1 className="text-5xl font-black leading-tight mb-6">
          워케이션,<br />
          <span className="text-blue-400">한 번에 예약하고</span><br />
          자동으로 관리하세요
        </h1>
        <p className="text-[#475569] text-lg mb-10 max-w-xl mx-auto">
          숙소 검색부터 단체 예약, 예산 관리, 성과 보고까지.
          인사담당자를 위한 올인원 워케이션 솔루션.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">지금 시작하기 →</Button>
          </Link>
          <Link href="/accommodations">
            <Button variant="secondary" size="lg">숙소 둘러보기</Button>
          </Link>
        </div>
      </section>

      {/* 수치 */}
      <section className="border-y border-[#E2E8F0] py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { num: '200+', label: '제휴 숙소' },
            { num: '50+', label: '파트너 기업' },
            { num: '98%', label: '재이용률' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-3xl font-black text-blue-400 mb-1">{item.num}</div>
              <div className="text-sm text-[#475569]">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 워케이션이란? */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">워케이션이란?</h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            워케이션(Workation)은 <strong>일(Work) + 휴가(Vacation)</strong>의 합성어로,
            여행지에서 업무를 이어가는 새로운 근무 방식입니다.
          </p>
        </div>

        {/* 문제 → 해결 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-2 divide-x divide-[#E2E8F0]">
            <div className="p-6 bg-[#F8FAFC]">
              <div className="text-sm font-bold text-[#94A3B8] mb-4">기업의 고민</div>
              <ul className="space-y-4 text-sm text-[#475569]">
                <li>😓 반복되는 사무실 환경, 번아웃 증가</li>
                <li>🏆 MZ세대 채용 경쟁 심화</li>
                <li>💸 직원 복지 예산 효율화 필요</li>
              </ul>
            </div>
            <div className="p-6">
              <div className="text-sm font-bold text-blue-500 mb-4">워케이션 효과</div>
              <ul className="space-y-4 text-sm text-[#475569]">
                <li>✅ 환경 전환으로 집중력·창의성 회복</li>
                <li>✅ 워케이션 복지로 입사 선호 기업 등극</li>
                <li>✅ 여행+업무 동시에, 비용 대비 효과 최대</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 수치 */}
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { num: '23%', label: '업무 집중도 향상' },
            { num: '40%', label: '직원 만족도 상승' },
            { num: '15%', label: '이직률 감소' },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <div className="text-3xl font-black text-blue-400 mb-1">{item.num}</div>
              <div className="text-sm text-[#475569]">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#94A3B8] mt-4">* 국내 워케이션 도입 기업 평균</p>
      </section>

      {/* 기능 3가지 */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">더워케이션의 장점</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              icon: '🗺️',
              title: '지도로 한눈에 보기',
              desc: '전국 워케이션 숙소를 지도에서 탐색하고, 업무 환경·와이파이·가격을 한 번에 비교할 수 있어요.',
            },
            {
              icon: '📊',
              title: '예산 자동 관리',
              desc: '직원이 예약하면 회사 예산에서 자동으로 차감돼요. 잔여 예산과 사용률을 실시간으로 확인하세요.',
            },
            {
              icon: '👥',
              title: '단체 예약 한 번에',
              desc: '팀 전체를 한 번에 예약하세요. 직원 초대 링크를 보내면 각자 원하는 날짜에 예약할 수 있어요.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className="font-bold text-base mb-2">{f.title}</div>
              <div className="text-sm text-[#475569] leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-[#E2E8F0] py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">지금 바로 시작해보세요</h2>
        <p className="text-[#475569] mb-8">가입 후 5분 안에 첫 워케이션 예약까지 완료할 수 있습니다</p>
        <Link href="/register">
          <Button size="lg">무료로 시작하기</Button>
        </Link>
      </section>

      {/* 푸터 */}
      <footer className="px-6 py-8 text-center text-xs text-[#94A3B8]">
        © 2026 더 워케이션. All rights reserved.
      </footer>
    </div>
  )
}
