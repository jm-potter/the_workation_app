import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function WorkationInfoPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-lg font-bold">더 워케이션</Link>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">로그인</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">무료로 시작하기</Button>
          </Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">워케이션이란?</h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            워케이션(Workation)은 <strong>일(Work) + 휴가(Vacation)</strong>의 합성어로,
            여행지에서 업무를 이어가는 새로운 근무 방식입니다.
          </p>
        </div>

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

        {/* 더워케이션의 장점 */}
        <div className="mt-20">
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
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="secondary" size="lg">← 메인으로 돌아가기</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
