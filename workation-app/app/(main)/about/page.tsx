'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-28 px-6 text-center overflow-hidden border-b border-white/5">
        {/* Glowing backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-8 border border-blue-500/30 tracking-wider uppercase shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            ✨ B2B2G 행정 혁신 플랫폼
          </span>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight mb-8">
            경쟁사는 안내하고,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 drop-shadow-[0_2px_10px_rgba(56,189,248,0.15)]">
              더 워케이션은 해결합니다
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            더 워케이션은 단순한 숙소 중개 플랫폼이 아닙니다.<br className="hidden sm:inline" />
            지자체 지원금 매칭 및 기업 정산 프로세스에서 발생하는 행정 병목을 혁신적으로 제거하는 <br />
            <span className="text-white font-semibold">B2B 행정 자동화 SaaS + 1-Billing 정산 핀테크 솔루션</span>입니다.
          </p>
        </div>
      </section>

      {/* Problem & Gap Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">The Opportunity</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-white">행정 병목이 만드는 도입률의 차이</h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* 비주얼 통계 카드 */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#131927] to-[#0F1320] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
            <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
            
            <h3 className="font-bold text-slate-400 text-xs sm:text-sm mb-8 uppercase tracking-wider">워케이션 선호도와 실제 도입률의 격차</h3>
            <div className="flex items-end gap-8 mb-8">
              <div className="flex-1 text-center">
                <div className="text-xs text-slate-400 mb-3 font-medium">직장인 선호도</div>
                <div className="h-36 bg-slate-800/50 rounded-2xl flex items-end overflow-hidden border border-white/5 p-1">
                  <div className="w-full bg-gradient-to-t from-blue-600 to-sky-400 h-[90%] rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
                </div>
                <div className="text-xl font-black text-sky-400 mt-3">90.0%</div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="text-xs text-slate-400 mb-3 font-medium">실제 기업 도입률</div>
                <div className="h-36 bg-slate-800/50 rounded-2xl flex items-end border border-white/5 p-1">
                  <div className="w-full bg-gradient-to-t from-slate-600 to-slate-400 h-[19.9%] rounded-xl shadow-[0_0_10px_rgba(148,163,184,0.2)]" />
                </div>
                <div className="text-lg font-black text-slate-400 mt-3">19.9%</div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center">대한상공회의소 워케이션 선호도 실태조사 (2023)</p>
          </div>

          {/* 문제 및 혁신 가치 설명 */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex gap-5 bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <span className="text-3xl shrink-0">📊</span>
              <div>
                <h4 className="font-bold text-white text-base sm:text-lg mb-2">기업의 정산 절차 및 영수증 처리 부담</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  직원 50명 기준, 워케이션 시 발생하는 수십 장의 숙박비·식비·교통비 영수증과 대조 업무로 인해 재무 담당자의 수기 정산 시간이 막대하게 증가합니다. 이는 기업이 복지 혜택을 확대하고 싶어도 포기하게 만드는 주요 병목입니다.
                </p>
              </div>
            </div>
            
            <div className="flex gap-5 bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <span className="text-3xl shrink-0">🏛️</span>
              <div>
                <h4 className="font-bold text-white text-base sm:text-lg mb-2">지자체 보조금 심사 및 사후 정산 프로세스</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  지역 경제 활성화를 위해 제공되는 지자체 보조금 역시, 복잡한 사후 증빙 제출과 집행 자격 확인 절차를 통과해야 지급됩니다. 기업과 지자체 양측 모두 서류 처리와 검수 과정에서 상당한 행정적 자원을 소모하게 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Section (Glassmorphism & Neon Glow) */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">The Solution</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-white">행정 정산 제로, 더 워케이션의 3대 혁신</h2>
            <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧾',
                title: '1-Billing 통합 결제망',
                desc: '임직원들이 워케이션 중 사용한 숙박비, 식비, 교통비 내역을 개별 증빙할 필요가 없습니다. 더 워케이션 시스템에서 일괄 취합하여 매월 1회 단 1장의 통합 세금계산서로 청구합니다.',
                benefit: '인사/재무 부서 행정 비용 90% 이상 절감'
              },
              {
                icon: '💰',
                title: '지자체 지원금 즉시 선공제',
                desc: '사후 지급 방식 대신, 지자체 보조금 연동을 통한 실시간 선공제 결제 시스템을 적용합니다. 결제 단계에서 지원 혜택 금액이 즉시 할인 차감되므로 기업의 비용 부담이 줄어듭니다.',
                benefit: '복잡한 사후 제출 절차 간소화'
              },
              {
                icon: '📈',
                title: 'AI 성과 및 ESG 임팩트 리포트',
                desc: '임직원의 업무 집중 데이터와 협업 활동을 분석하여 성과 보고서를 생성하며, 지역 상권 지출액 분석을 통해 대기업 ESG 공시용 지역 경제 기여도 수치를 리포트로 자동 제공합니다.',
                benefit: '신뢰도 높은 사후 결과 입증 지원'
              }
            ].map((sol, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 transform flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-5 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">{sol.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{sol.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{sol.desc}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold py-2 px-3 rounded-lg text-center">
                  🎯 {sol.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Funnel Section (Vibrant Funnel Design) */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Market Opportunity</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-white">우리가 개척하는 웰니스 복지 시장</h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-5">
          {[
            { level: 'TAM', title: '글로벌 기업 웰니스 & 원격 복지 시장', size: '30조 원', desc: '글로벌 기업 웰니스 시장 72조 원 중 원격근무 도입 비중 40% 적용 (Allied Market Research)', width: 'w-full', border: 'border-blue-500/30', bg: 'from-blue-600/20 via-blue-500/10 to-transparent' },
            { level: 'SAM', title: '국내 300인 이상 기업 복지 시장', size: '2조 원', desc: '국내 300인 이상 종사자 300만 명 × 연평균 복지 예산 70만 원 (고용노동부)', width: 'sm:w-[92%] w-full', border: 'border-indigo-500/30', bg: 'from-indigo-600/20 via-indigo-500/10 to-transparent' },
            { level: 'SOM', title: '수도권 IT 벤처 및 스타트업 시장', size: '1,000억 원', desc: '수도권 스타트업 4만 개사 중 10% 우선 타겟 × 기업 연평균 예산 2,500만 원 (중소벤처기업부)', width: 'sm:w-[84%] w-full', border: 'border-purple-500/30', bg: 'from-purple-600/20 via-purple-500/10 to-transparent' },
            { level: 'LAM', title: '1차년도 진입 목표 시장', size: '10.5억 원', desc: '초기 IT 스타트업 150개사 × 부서 단위 14명 × 인당 지원 한도 50만 원 거래액 기준', width: 'sm:w-[76%] w-full', border: 'border-emerald-500/30', bg: 'from-emerald-600/20 via-emerald-500/10 to-transparent' }
          ].map((m) => (
            <div key={m.level} className={`mx-auto ${m.width} bg-gradient-to-r ${m.bg} border ${m.border} rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300`}>
              <div className="w-14 h-14 rounded-xl bg-[#131927] border border-white/10 flex items-center justify-center font-black text-white shrink-0 text-lg shadow-inner">
                {m.level}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-white">{m.title}</h3>
                  <span className="text-xs bg-white/10 text-white font-extrabold px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">{m.size}</span>
                </div>
                <p className="text-xs text-slate-400">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Roadmap Section (Horizontal Timeline Style) */}
      <section className="py-24 px-6 border-y border-white/5 relative overflow-hidden bg-[#0A0D16]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-white">4단계 동반 성장 로드맵</h2>
            <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: '지자체 협력 MVP 실증',
                timeline: '0 ~ 1년차',
                color: 'from-blue-500 to-sky-400 shadow-blue-500/20',
                desc: '주요 인구소멸 소도시 지자체와의 거버넌스를 바탕으로, 1-Billing 정산 프로세스를 적용한 1차 임직원 워케이션 실증을 완료합니다.'
              },
              {
                step: '02',
                title: '전국 핵심 거점 확장',
                timeline: '1 ~ 3년차',
                color: 'from-indigo-500 to-purple-400 shadow-indigo-500/20',
                desc: '전국 주요 지자체 결제망 및 제휴 숙소를 확보하고, 대기업 수요를 유치하기 위해 ESG 지역 경제 성과 공헌 리포트를 세일즈에 결합합니다.'
              },
              {
                step: '03',
                title: '글로벌 인바운드 연동',
                timeline: '3년차 이상',
                color: 'from-purple-500 to-pink-400 shadow-purple-500/20',
                desc: 'Stripe 글로벌 결제망과 다국어 송장 발행을 연동하여, 한국을 방문해 원격 근무하고자 하는 해외 기업/팀의 행정 처리를 자동화합니다.'
              },
              {
                step: '04',
                title: '글로벌 아웃바운드 개척',
                timeline: '글로벌 확장기',
                desc: '해외 현지 워크스페이스 및 호텔 인프라와 제휴하여, 국내 임직원의 해외 체류 워케이션 세무 정산도 원화 단일 인보이스로 지원합니다.',
                color: 'from-emerald-500 to-teal-400 shadow-emerald-500/20',
              }
            ].map((road, i) => (
              <div key={i} className="bg-gradient-to-b from-[#131927] to-[#0F1320] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 hover:shadow-2xl transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">{road.timeline}</span>
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${road.color} flex items-center justify-center font-black text-white text-xs shadow-lg`}>
                      {road.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2">{road.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{road.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Modern Grid Layout) */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Our Team</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-white">행정과 관광, 기술을 연결하는 전문가</h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: '호텔경영 전공', role: '대표이사 / 서비스 기획', desc: '국내외 숙소 파트너십 구축 및 서비스 설계 총괄. 관광 정책 모니터링 경력 보유.' },
            { name: '회계 전공 공동창업자', role: '재무 / 수익 모델 설계', desc: '1-Billing 정산 시스템 설계, 법인 결제 및 지자체 세무 정산 프로세스 자동화 설계.' },
            { name: '마케팅 전공 팀원', role: '그로스 마케팅 / B2B 영업', desc: '기업 타겟 마케팅 및 지자체 제안 기획, 임직원 전사 워케이션 활성화 전략 기획.' },
            { name: 'IT 개발 전공 팀원', role: '플랫폼 개발 / 테크 총괄', desc: 'Supabase DB 최적화 및 Next.js 풀스택 아키텍처 및 지자체 연동 API 개발.' },
            { name: '사진 전공 팀원', role: '콘텐츠 / 디자인', desc: '큐레이션 비주얼 디렉팅 및 플랫폼 디자인 브랜딩, 사용자 경험(UX) 최적화 기획.' },
            { name: '여행업 20년 경력 고문', role: '수석 자문위원', desc: '지자체 관광 부서 거버넌스 연결 자문 및 지자체 보조금 연동 세무 정산 감수.' }
          ].map((member, i) => (
            <div key={i} className="bg-gradient-to-br from-[#131927] to-[#0F1320] border border-white/5 rounded-2xl p-5 hover:border-blue-500/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-500/20">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{member.name}</h3>
                  <div className="text-[9px] text-sky-400 font-bold tracking-wider uppercase">{member.role}</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section (Stunning Blue Section) */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
            워케이션, 이제 복잡한 행정 없이 떠나세요
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            지자체 지원금 자동 공제부터 통합 정산 청구까지, 더 워케이션과 함께 가장 간편하고 혁신적인 워케이션을 실현해 보세요.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/accommodations">
              <Button size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50 shadow-xl border border-transparent">
                서비스 둘러보기
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg" className="!bg-transparent !text-white hover:!bg-white/10 !border-white/30">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
