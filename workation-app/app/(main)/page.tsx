import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-lg font-bold">더 워케이션</span>
        <nav className="flex items-center gap-6">
          <Link href="/accommodations" className="text-sm text-[#475569] hover:text-blue-500 transition-colors">숙소 찾기</Link>
          <Link href="/partner" className="text-sm text-[#475569] hover:text-blue-500 transition-colors">파트너 등록</Link>
        </nav>
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
        <h1 className="text-5xl font-black leading-tight mb-6 text-[#0F172A]">
          워케이션,<br />
          <span className="text-blue-500">한 번에 예약하고</span><br />
          자동으로 관리하세요
        </h1>
        <p className="text-[#475569] text-lg mb-10 max-w-xl mx-auto">
          숙소 검색부터 단체 예약, 지원금 자동 매칭, 예산 관리, 성과 보고까지.
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
      <section className="bg-[#F1F5F9] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { num: '200+', label: '제휴 숙소' },
              { num: '50+',  label: '파트너 기업' },
              { num: '98%',  label: '재이용률' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-3xl font-black text-blue-500 mb-1">{item.num}</div>
                <div className="text-sm text-[#475569]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 기능 3가지 */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">핵심 기능</p>
            <h2 className="text-3xl font-black text-[#0F172A]">복잡한 워케이션 준비,<br />이제 한 곳에서</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: '✨',
                title: 'AI 숙소 매칭',
                desc: '팀 인원, 스타일, 예산을 입력하면 AI가 최적의 숙소를 자동 추천해드려요.',
                color: 'bg-blue-500/10 border-blue-500/20',
              },
              {
                icon: '💰',
                title: '지원금 자동 매칭',
                desc: '강원도, 제주도 등 지자체 워케이션 지원금을 자동으로 찾아 예약 시 선공제합니다.',
                color: 'bg-emerald-500/10 border-emerald-500/20',
              },
              {
                icon: '📊',
                title: '예산·성과 관리',
                desc: '워케이션 예산 집행 현황과 직원 만족도, 생산성 향상 효과를 대시보드로 확인하세요.',
                color: 'bg-purple-500/10 border-purple-500/20',
              },
            ].map((f) => (
              <div key={f.title} className={`${f.color} border rounded-2xl p-6`}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-[#0F172A]">{f.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 도입 효과 */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">워케이션 효과</p>
            <h2 className="text-3xl font-black text-[#0F172A]">데이터로 증명된<br />워케이션의 힘</h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {[
              { icon: '🎯', label: '업무 집중도', value: '+16%' },
              { icon: '🤝', label: '팀 결속력',  value: '+19%' },
              { icon: '😊', label: '직원 만족도', value: '+18%' },
              { icon: '📉', label: '이직 의향',  value: '-19%p' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-2xl font-black text-blue-500 mb-1">{item.value}</div>
                <div className="text-sm text-[#475569]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-500 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4">지금 바로 시작해보세요</h2>
          <p className="text-white/80 mb-8 text-lg">가입 후 5분 안에 첫 워케이션 예약까지 완료할 수 있습니다</p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-500 hover:bg-blue-50">무료로 시작하기 →</Button>
            </Link>
            <Link href="/accommodations">
              <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">숙소 둘러보기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="px-6 py-8 text-center text-xs text-[#94A3B8]">
        © 2026 더 워케이션. All rights reserved.
      </footer>
    </div>
  )
}
