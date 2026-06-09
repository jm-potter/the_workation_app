'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden bg-white border-b border-slate-100">
        {/* Soft colorful gradients in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-black px-4 py-2 rounded-full mb-6 border border-blue-100 uppercase tracking-wider shadow-sm">
            ✨ B2B2G 행정 혁신 플랫폼
          </span>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight mb-6 text-slate-900">
            경쟁사는 안내하고,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 drop-shadow-sm">
              더 워케이션은 해결합니다
            </span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            더 워케이션은 단순한 숙소 중개 플랫폼이 아닙니다.<br className="hidden sm:inline" />
            지자체 지원금 매칭 및 기업 정산 프로세스에서 발생하는 행정 병목을 완벽히 해결하는 <br />
            <span className="text-slate-900 font-semibold underline decoration-blue-500 decoration-2">B2B 행정 자동화 SaaS + 1-Billing 정산 핀테크 솔루션</span>입니다.
          </p>
        </div>
      </section>

      {/* Problem & Gap Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">The Opportunity</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900">행정 병목이 만드는 도입률의 차이</h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* 비주얼 통계 카드 */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:border-blue-400 hover:shadow-2xl transition-all duration-300">
            <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-blue-500/5 rounded-full blur-2xl transition-colors" />
            
            <h3 className="font-bold text-slate-700 text-xs sm:text-sm mb-6 uppercase tracking-wider">워케이션 선호도와 실제 도입률의 격차</h3>
            <div className="flex items-end gap-8 mb-6">
              <div className="flex-1 text-center">
                <div className="text-xs text-slate-500 mb-2 font-medium">직장인 선호도</div>
                <div className="h-36 bg-slate-100 rounded-2xl flex items-end p-1 border border-slate-200">
                  <div className="w-full bg-gradient-to-t from-blue-600 to-sky-400 h-[90%] rounded-xl shadow-md" />
                </div>
                <div className="text-xl font-black text-blue-600 mt-2">90.0%</div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="text-xs text-slate-500 mb-2 font-medium">실제 기업 도입률</div>
                <div className="h-36 bg-slate-100 rounded-2xl flex items-end p-1 border border-slate-200">
                  <div className="w-full bg-gradient-to-t from-slate-400 to-slate-300 h-[19.9%] rounded-xl" />
                </div>
                <div className="text-lg font-black text-slate-500 mt-2">19.9%</div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 text-center">대한상공회의소 워케이션 선호도 실태조사 (2023)</p>
          </div>

          {/* 문제 및 혁신 가치 설명 */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex gap-5 bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <span className="text-3xl shrink-0">📊</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5">기업의 정산 절차 및 영수증 처리 부담</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  직원 50명 기준, 워케이션 진행 시 발생하는 수십 장의 영수증과 지출 내역 대조 업무로 인해 재무 담당자의 수기 정산 시간이 크게 증가합니다. 이는 인사팀의 관리 리소스 부담을 가중시키는 핵심 요인입니다.
                </p>
              </div>
            </div>
            
            <div className="flex gap-5 bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <span className="text-3xl shrink-0">🏛️</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5">지자체 보조금 심사 및 사후 정산 프로세스</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  지역 경제 활성화 보조금 혜택을 받기 위해 필수적인 증빙 제출과 정산 서류 처리 과정 역시, 기업과 지자체 양측 담당자 모두에게 복잡한 검수 과정과 행정 처리 시간을 요구하게 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Section (Bright Cards with Colored Borders) */}
      <section className="bg-white border-y border-slate-200 py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">The Solution</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900">행정 정산 제로, 더 워케이션의 3대 혁신</h2>
            <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧾',
                title: '1-Billing 통합 결제망',
                desc: '임직원들이 사용한 복잡한 개별 정산 비용을 일일이 청구할 필요가 없습니다. 더 워케이션 시스템에서 일괄 매칭하여 매월 1회 단 1장의 통합 세금계산서로 청구합니다.',
                benefit: '행정 처리 리소스 90% 이상 절감',
                borderColor: 'border-l-blue-500',
                iconBg: 'bg-blue-50 text-blue-600'
              },
              {
                icon: '💰',
                title: '지자체 지원금 즉시 선공제',
                desc: '사후 청구 및 정산 방식 대신, 지자체 보조금을 실시간으로 선공제하는 결제망을 지원합니다. 결제창에서 혜택 금액이 바로 할인 차감되어 비용 집행이 매우 투명해집니다.',
                benefit: '복잡한 사후 정산 보고서 생략',
                borderColor: 'border-l-emerald-500',
                iconBg: 'bg-emerald-50 text-emerald-600'
              },
              {
                icon: '📈',
                title: 'AI 성과 및 ESG 분석 리포트',
                desc: '뽀모도로 딥워크 및 협업 이력을 수집하여 객관적인 근무 성과 리포트를 생성하며, 워케이션지 내 소상공인 매출 기여도를 자동 분석해 기업 ESG 지역상권 기여도 데이터를 제공합니다.',
                benefit: '성과 및 ESG 지표 자동 수치화',
                borderColor: 'border-l-indigo-500',
                iconBg: 'bg-indigo-50 text-indigo-600'
              }
            ].map((sol, index) => (
              <div key={index} className={`bg-[#F8FAFC] border border-slate-200 border-l-4 ${sol.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 transform`}>
                <div>
                  <div className={`text-2xl mb-4 w-11 h-11 ${sol.iconBg} rounded-xl flex items-center justify-center font-bold shadow-sm border border-slate-200/20`}>
                    {sol.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{sol.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">{sol.desc}</p>
                </div>
                <div className="bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg text-center shadow-sm">
                  🎯 {sol.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Funnel Section (Vibrant Solid Gradient Shapes) */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Market Opportunity</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900">우리가 개척하는 웰니스 복지 시장</h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-4">
          {[
            { level: 'TAM', title: '글로벌 기업 웰니스 & 원격 복지 시장', size: '30조 원', desc: '글로벌 기업 웰니스 시장 72조 원 중 원격근무 도입 비중 40% 적용 (Allied Market Research)', width: 'w-full', bg: 'from-blue-600 to-indigo-600 shadow-blue-500/20' },
            { level: 'SAM', title: '국내 300인 이상 기업 복지 시장', size: '2조 원', desc: '국내 300인 이상 대기업 및 중견기업 종사자 300만 명 × 연평균 복지 예산 70만 원 (고용노동부)', width: 'sm:w-[92%] w-full', bg: 'from-indigo-600 to-purple-600 shadow-indigo-500/20' },
            { level: 'SOM', title: '수도권 IT 벤처 및 스타트업 시장', size: '1,000억 원', desc: '수도권 스타트업 4만 개사 중 10% 우선 타겟 × 기업 연평균 예산 2,500만 원 (중소벤처기업부)', width: 'sm:w-[84%] w-full', bg: 'from-purple-600 to-pink-600 shadow-purple-500/20' },
            { level: 'LAM', title: '1차년도 진입 목표 시장', size: '10.5억 원', desc: '초기 IT 스타트업 150개사 × 부서 단위 14명 × 인당 지원 한도 50만 원 거래액 기준', width: 'sm:w-[76%] w-full', bg: 'from-emerald-600 to-teal-600 shadow-emerald-500/20' }
          ].map((m) => (
            <div key={m.level} className={`mx-auto ${m.width} bg-gradient-to-r ${m.bg} text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg hover:scale-[1.01] transition-all duration-300`}>
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-white shrink-0 text-base border border-white/20">
                {m.level}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-extrabold text-sm sm:text-base text-white">{m.title}</h3>
                  <span className="text-xs bg-white text-slate-900 font-black px-2.5 py-0.5 rounded-full border border-white/20 shadow-sm">{m.size}</span>
                </div>
                <p className="text-xs text-white/80">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Roadmap Section (Bright Vertical or Horizontal Timeline) */}
      <section className="bg-white border-y border-slate-200 py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900">4단계 동반 성장 로드맵</h2>
            <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: '지자체 협력 MVP 실증',
                timeline: '0 ~ 1년차',
                color: 'from-blue-600 to-indigo-600',
                desc: '정선·영월·평창 등 주요 지방 자치 지자체와의 파트너십을 바탕으로, 1-Billing 정산 프로세스를 적용한 1차 임직원 워케이션 실증을 완료합니다.'
              },
              {
                step: '02',
                title: '전국 핵심 거점 확장',
                timeline: '1 ~ 3년차',
                color: 'from-indigo-600 to-purple-600',
                desc: '전국 단위 주요 지자체 결제 인프라와 숙소 파트너를 확보하고, 대기업을 타겟으로 한 ESG 지역 경제 기여도 보고서를 세일즈에 결합합니다.'
              },
              {
                step: '03',
                title: '글로벌 인바운드 연동',
                timeline: '3년차 이상',
                color: 'from-purple-600 to-pink-600',
                desc: 'Stripe 글로벌 PG 연동 및 영문 송장 발행 자동화를 구축하여, 한국 로컬을 방문해 일하고자 하는 글로벌 원격 근무 인력을 유치합니다.'
              },
              {
                step: '04',
                title: '글로벌 아웃바운드 개척',
                timeline: '글로벌 확장기',
                color: 'from-emerald-600 to-teal-600',
                desc: '해외 현지 워크스페이스 및 호텔 인프라와 제휴하여, 국내 임직원의 해외 체류 워케이션 세무 정산도 원화 단일 인보이스로 일괄 대행합니다.'
              }
            ].map((road, i) => (
              <div key={i} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-slate-500 bg-slate-200/50 px-2.5 py-0.5 rounded-full border border-slate-300/30">{road.timeline}</span>
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${road.color} flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform duration-200`}>
                      {road.step}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 mb-2">{road.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{road.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Modern Grid Layout) */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Our Team</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900">행정과 관광, 기술을 연결하는 전문가</h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-4" />
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
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-100 shadow-sm">
                  👤
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{member.name}</h3>
                  <div className="text-[9px] text-blue-600 font-extrabold tracking-wider uppercase">{member.role}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{member.desc}</p>
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
