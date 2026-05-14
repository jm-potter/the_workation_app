import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'

export default function WorkationInfoPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-[#94A3B8] hover:text-[#475569] transition-colors">← 뒤로</Link>
          <Link href="/" className="text-lg font-bold">더 워케이션</Link>
        </div>
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

        {/* 타이틀 */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-black mb-3">워케이션이란?</h1>
          <p className="text-[#475569]">일과 휴가를 동시에, 새로운 근무 방식</p>
        </div>

        {/* Work + Vacation = Workation */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-8 py-6 text-center w-40">
            <div className="text-4xl mb-2">💼</div>
            <div className="font-black text-xl text-blue-600">Work</div>
            <div className="text-xs text-[#475569] mt-1">업무</div>
          </div>
          <div className="text-3xl font-black text-[#94A3B8]">+</div>
          <div className="bg-green-50 border border-green-200 rounded-2xl px-8 py-6 text-center w-40">
            <div className="text-4xl mb-2">🌴</div>
            <div className="font-black text-xl text-green-600">Vacation</div>
            <div className="text-xs text-[#475569] mt-1">휴가</div>
          </div>
          <div className="text-3xl font-black text-[#94A3B8]">=</div>
          <div className="bg-gradient-to-br from-blue-500 to-green-400 rounded-2xl px-8 py-6 text-center w-40 shadow-lg">
            <div className="text-4xl mb-2">✨</div>
            <div className="font-black text-xl text-white">Workation</div>
            <div className="text-xs text-white/80 mt-1">워케이션</div>
          </div>
        </div>

        {/* 문제 → 해결 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-center mb-10">왜 도입할까요?</h2>
          <div className="space-y-4">
            {[
              { problem: '😓 반복되는 사무실, 번아웃 증가', solution: '환경 전환으로 집중력·창의성 회복' },
              { problem: '🏆 MZ세대 채용 경쟁 심화', solution: '워케이션 복지로 입사 선호 기업 등극' },
              { problem: '💸 직원 복지 예산 효율화 필요', solution: '여행+업무 동시에, 비용 대비 효과 최대' },
            ].map((item) => (
              <div key={item.problem} className="flex items-center gap-4">
                <div className="flex-1 bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-sm text-[#475569]">
                  {item.problem}
                </div>
                <div className="text-2xl text-blue-400 font-black shrink-0">→</div>
                <div className="flex-1 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-sm text-blue-700 font-medium">
                  ✅ {item.solution}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 수치 */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl p-10 mb-20">
          <h2 className="text-xl font-bold text-white text-center mb-8">이미 검증된 효과</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { num: '23%', label: '업무 집중도 향상' },
              { num: '40%', label: '직원 만족도 상승' },
              { num: '15%', label: '이직률 감소' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-5xl font-black text-white mb-2">{item.num}</div>
                <div className="text-sm text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/60 mt-6">* 국내 워케이션 도입 기업 평균</p>
        </div>

        {/* 더워케이션의 장점 */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-center mb-10">더워케이션의 장점</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: '🗺️',
                color: 'bg-purple-50 border-purple-200',
                iconBg: 'bg-purple-100',
                title: '지도로 한눈에 보기',
                desc: '전국 숙소를 지도에서 탐색하고 업무 환경·와이파이·가격을 한 번에 비교',
              },
              {
                icon: '📊',
                color: 'bg-blue-50 border-blue-200',
                iconBg: 'bg-blue-100',
                title: '예산 자동 관리',
                desc: '예약 즉시 회사 예산 자동 차감, 잔여 예산과 사용률 실시간 확인',
              },
              {
                icon: '👥',
                color: 'bg-green-50 border-green-200',
                iconBg: 'bg-green-100',
                title: '단체 예약 한 번에',
                desc: '팀 전체를 한 번에 예약, 초대 링크로 각자 원하는 날짜 선택',
              },
            ].map((f) => (
              <div key={f.title} className={`border rounded-2xl p-6 ${f.color}`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <div className="font-bold text-base mb-2">{f.title}</div>
                <div className="text-sm text-[#475569] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button variant="secondary" size="lg">← 메인으로 돌아가기</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}
