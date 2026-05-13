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

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="secondary" size="lg">← 메인으로 돌아가기</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
