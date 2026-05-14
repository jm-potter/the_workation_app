import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-lg font-bold">더 워케이션</span>
        <nav className="flex items-center gap-6">
          <Link href="/workation" className="text-sm text-[#475569] hover:text-blue-500 transition-colors">워케이션이란?</Link>
          <Link href="/accommodations" className="text-sm text-[#475569] hover:text-blue-500 transition-colors">숙소 찾기</Link>
          <Link href="/subsidy" className="text-sm text-[#475569] hover:text-blue-500 transition-colors">지원금 안내</Link>
          <Link href="/partner" className="text-sm text-[#475569] hover:text-blue-500 transition-colors">파트너 등록</Link>
          <Link href="/faq" className="text-sm text-[#475569] hover:text-blue-500 transition-colors">자주 묻는 질문</Link>
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

      {/* 히어로 — 흰 배경 */}
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

      {/* 수치 — 회색 배경 */}
      <section className="bg-[#F1F5F9] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-sm font-bold text-[#475569] uppercase tracking-widest">지금까지의 성과</span>
            <div className="w-8 h-1 bg-blue-400 rounded-full mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-3 gap-8 text-center">
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
        </div>
      </section>

      {/* 워케이션이란? — 흰 배경 */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-sm font-bold text-[#475569] uppercase tracking-widest">워케이션 알아보기</span>
            <div className="w-8 h-1 bg-blue-400 rounded-full mx-auto mt-2" />
          </div>
          <div className="text-center">
            <p className="text-[#475569] mb-6">워케이션이 처음이신가요?</p>
            <Link href="/workation">
              <Button variant="secondary" size="lg">워케이션이란? →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — 파란 배경 */}
      <section className="bg-blue-500 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-6">
            <span className="text-sm font-bold text-white/80 uppercase tracking-widest">지금 시작하기</span>
            <div className="w-8 h-1 bg-white/50 rounded-full mx-auto mt-2" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">지금 바로 시작해보세요</h2>
          <p className="text-white/80 mb-8">가입 후 5분 안에 첫 워케이션 예약까지 완료할 수 있습니다</p>
          <Link href="/register">
            <Button size="lg">무료로 시작하기</Button>
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#1E293B] text-white px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* 링크 모음 */}
          <div className="grid grid-cols-4 gap-10 mb-12">
            <div>
              <div className="font-bold text-sm mb-4">서비스</div>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><Link href="/workation" className="hover:text-white transition-colors">워케이션이란?</Link></li>
                <li><Link href="/accommodations" className="hover:text-white transition-colors">숙소 찾기</Link></li>
                <li><Link href="/subsidy" className="hover:text-white transition-colors">지원금 안내</Link></li>
                <li><Link href="/partner" className="hover:text-white transition-colors">파트너 등록</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-sm mb-4">고객지원</div>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><Link href="#" className="hover:text-white transition-colors">공지사항</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">1:1 문의</Link></li>
                <li><a href="mailto:contact@theworkation.com" className="hover:text-white transition-colors">이메일 문의</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-sm mb-4">회사</div>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><Link href="#" className="hover:text-white transition-colors">회사 소개</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">이용약관</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-sm mb-4">연락처</div>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li>📧 contact@theworkation.com</li>
                <li>📞 02-000-0000</li>
                <li className="text-xs">평일 10:00 ~ 18:00</li>
              </ul>
            </div>
          </div>

          {/* 하단 구분선 + 카피라이트 */}
          <div className="border-t border-[#334155] pt-6 text-xs text-[#475569] text-center">
            © 2026 더 워케이션. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
