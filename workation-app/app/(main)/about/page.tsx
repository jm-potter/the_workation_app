'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-blue-500/30 tracking-wider uppercase">
            Platform Vision
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
            "경쟁사는 안내하고,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">더 워케이션은 해결합니다."</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            더 워케이션은 단순한 숙박 중개 예약 플랫폼이 아닙니다.<br className="hidden sm:inline" />
            기업의 워케이션 도입을 가로막는 행정 지옥과 사후 정산 마비를 완전히 해결하는 <br />
            <strong>B2B 행정 자동화 SaaS + 1-Billing 정산 핀테크 플랫폼</strong>입니다.
          </p>
        </div>
      </section>

      {/* Market Gap & Problem Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-500 tracking-widest uppercase">The Problem</span>
          <h2 className="text-3xl font-black mt-2 text-[#0F172A]">수요는 폭발하지만, 도입은 막히는 이유</h2>
          <div className="w-8 h-1 bg-blue-500 rounded-full mx-auto mt-3" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* 가시적 통계 카드 */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/5 rounded-full" />
            
            <h3 className="font-bold text-slate-500 text-sm mb-6 uppercase tracking-wider">워케이션 수요 vs 실제 도입률 갭 (Gap)</h3>
            <div className="flex items-end gap-6 mb-6">
              <div className="flex-1 text-center">
                <div className="text-xs text-slate-400 mb-2">직장인 워케이션 선호도</div>
                <div className="h-32 bg-[#F1F5F9] rounded-2xl flex items-end overflow-hidden">
                  <div className="w-full bg-blue-500 h-[90%] rounded-2xl animate-pulse" />
                </div>
                <div className="text-lg font-black text-blue-600 mt-2">90.0%</div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="text-xs text-slate-400 mb-2">실제 기업 도입률</div>
                <div className="h-32 bg-[#F1F5F9] rounded-2xl flex items-end">
                  <div className="w-full bg-[#94A3B8] h-[19.9%] rounded-2xl" />
                </div>
                <div className="text-lg font-black text-slate-600 mt-2">19.9%</div>
              </div>
            </div>
            <p className="text-xs text-[#94A3B8] text-center">출처: 대한상공회의소 직장인 워케이션 실태조사</p>
          </div>

          {/* 문제 설명 */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <span className="text-3xl shrink-0">📉</span>
              <div>
                <h4 className="font-bold text-[#0F172A] text-base mb-1">도입을 망설이게 만드는 '행정 마비'</h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  임직원 50명 기준, 3박 4일 워케이션 진행 시 **평균 150장의 영수증과 근무지 인증샷**이 쏟아집니다. 이를 수집하고 지자체 보조금 신청 서류와 대조하느라 재무팀 담당자 1명이 최소 7일을 야근해야 합니다.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="text-3xl shrink-0">💸</span>
              <div>
                <h4 className="font-bold text-[#0F172A] text-base mb-1">악명 높은 지자체 보조금 '사후정산 지옥'</h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  1인당 10~30만 원에 달하는 지자체 워케이션 보조금 혜택을 받으려면, 워케이션이 끝난 후 통장 사본, 지출 세부 내역, 근무지 인증 사진, 보고서 등 까다로운 행정 증빙을 제출해야만 사후 지급됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Section */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">The Solution</span>
            <h2 className="text-3xl font-black mt-2 text-white">행정 정산 제로, 더 워케이션의 3대 핵심 모델</h2>
            <div className="w-8 h-1 bg-blue-500 rounded-full mx-auto mt-3" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧾',
                title: '1-Billing 통합 결제망',
                desc: '임직원들이 각자 사용한 숙박비, 식비, 교통비 내역을 하나하나 증빙할 필요가 없습니다. 더 워케이션이 통합 취합하여 매월 1회 단 1장의 전자세금계산서로 합산 청구합니다.',
                benefit: '인사담당자 행정 처리 90% 이상 절감'
              },
              {
                icon: '💰',
                title: '지자체 지원금 즉시 선공제',
                desc: '지원금을 받기 위해 사후 정산 보고서를 쓰고 몇 달을 기다릴 필요가 없습니다. 지자체 보조금 시스템과 연동되어 결제 단계에서 즉시 할인 차감된 비용으로 결제합니다.',
                benefit: '기업 실지출 부담 최소화'
              },
              {
                icon: '📊',
                title: 'AI 성과 & ESG 분석 리포트',
                desc: '워케이션 기간 임직원의 뽀모도로 업무 집중 데이터와 협업 툴 활동을 집계해 성과 분석 보고서를 자동 생성하고, 현지 지출 금액을 분석해 기업의 ESG 지역상권 공헌 리포트를 제공합니다.',
                benefit: '경영진 승인을 이끌어내는 명확한 근거'
              }
            ].map((sol, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-3xl mb-4">{sol.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{sol.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{sol.desc}</p>
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold py-1.5 px-3 rounded-lg inline-block">
                  🎯 {sol.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity Funnel Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-500 tracking-widest uppercase">Market Opportunity</span>
          <h2 className="text-3xl font-black mt-2 text-[#0F172A]">우리가 바라보는 거대한 기회</h2>
          <div className="w-8 h-1 bg-blue-500 rounded-full mx-auto mt-3" />
        </div>

        <div className="space-y-4">
          {[
            { level: 'TAM', title: '글로벌 기업 웰니스 & 원격 복지 시장', size: '30조 원', desc: '글로벌 기업 웰니스 시장 72조 원 중 원격근무 도입 비중 40% 적용 (Allied Market Research)' },
            { level: 'SAM', title: '국내 300인 이상 기업 복지 시장', size: '2조 원', desc: '국내 300인 이상 대기업 및 중견기업 종사자 300만 명 × 연평균 복지예산 70만 원 (고용노동부)' },
            { level: 'SOM', title: '수도권 IT 벤처 및 스타트업 시장', size: '1,000억 원', desc: '수도권 스타트업 4만 개사 중 10% 우선 타겟 × 기업 연평균 예산 2,500만 원 (중소벤처기업부)' },
            { level: 'LAM', title: '1차년도 진입 목표 시장', size: '10.5억 원', desc: '초기 150개 스타트업 고객 확보 × 참여 부서원 14명 × 1인당 지원 한도 50만 원 거래액 기준' }
          ].map((m, index) => (
            <div key={m.level} className="flex flex-col sm:flex-row items-start sm:items-center bg-white border border-[#E2E8F0] hover:border-blue-300 rounded-2xl p-5 gap-4 shadow-sm transition-all duration-200">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white shrink-0 shadow-md shadow-blue-500/10">
                {m.level}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-sm sm:text-base text-[#0F172A]">{m.title}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded border border-blue-100">{m.size}</span>
                </div>
                <p className="text-xs text-[#94A3B8]">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Roadmap Section */}
      <section className="bg-slate-50 py-20 px-6 border-y border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-500 tracking-widest uppercase">Roadmap</span>
            <h2 className="text-3xl font-black mt-2 text-[#0F172A]">지방 소멸을 해결하는 4단계 성장 로드맵</h2>
            <div className="w-8 h-1 bg-blue-500 rounded-full mx-auto mt-3" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: '강원 내륙 MVP 검증',
                timeline: '0~1년차',
                desc: '정선·영월·평창 등 강원권 주요 인구소멸 지자체와의 MOU를 기반으로, 1-Billing 행정 정산 자동화를 적용해 초기 100명 규모의 실증 검증을 성공적으로 마칩니다.'
              },
              {
                step: '02',
                title: '전국 단위 확장',
                timeline: '1~3년차',
                desc: '전국 89개 인구소멸지역 지자체 결제망을 확보하고, 대기업 세일즈를 위해 ESG 임팩트 리포트를 결합하여 연간 거래액 50억 원을 돌파합니다.'
              },
              {
                step: '03',
                title: '글로벌 인바운드',
                timeline: '3년차 이상',
                desc: 'Stripe 글로벌 PG 및 영문 인보이스 발행을 연동하여, 한국의 아름다운 로컬 지역으로 해외 원격 근무 팀들을 유치(인바운드)하여 세무 증빙을 대행합니다.'
              },
              {
                step: '04',
                title: '글로벌 아웃바운드',
                timeline: '글로벌 확장기',
                desc: '시차가 유사한 일본, 베트남 등 동아시아/동남아 현지 리조트 체인 및 코워킹 인프라와 제휴하여 국내 기업 임직원들의 글로벌 해외 워케이션 정산도 원화 단일 인보이스로 지원합니다.'
              }
            ].map((road, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative">
                <div>
                  <div className="text-xs font-black text-blue-500 mb-2">STEP {road.step}</div>
                  <h3 className="font-bold text-sm text-[#0F172A] mb-1">{road.title}</h3>
                  <div className="text-[10px] font-bold text-slate-400 mb-3">{road.timeline}</div>
                  <p className="text-xs text-[#475569] leading-relaxed">{road.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-500 tracking-widest uppercase">Our Team</span>
          <h2 className="text-3xl font-black mt-2 text-[#0F172A]">더 워케이션을 만드는 사람들</h2>
          <div className="w-8 h-1 bg-blue-500 rounded-full mx-auto mt-3" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: '호텔경영 전공 대표', role: '대표이사 / 서비스 총괄', desc: '국내외 숙소 파트너십 구축 및 숙박/관광 트렌드 기반 플랫폼 총괄 서비스 설계. 지자체 모니터링 경력 보유.' },
            { name: '회계 전공 공동창업자', role: '재무 / 수익 모델 (CFO)', desc: '1-Billing 정산 시스템 설계, 법인 결제 및 지자체 세무 증빙 회계 자동화 정산 플로우 구체화.' },
            { name: '마케팅 전공 팀원', role: '그로스 마케팅 / 영업', desc: '기업 HR 및 재무 담당자 핀셋 영업 제안서 설계 및 타겟 매칭 광고 기획, 전사 참여 활성화 전략 수립.' },
            { name: 'IT 개발 전공 팀원', role: '플랫폼 개발 / CTO', desc: 'Supabase DB 설계 및 Next.js 프레임워크 기반 프론트엔드/백엔드 로직 개발 및 API 연동.' },
            { name: '사진 전공 팀원', role: '콘텐츠 / 브랜딩', desc: '숙소 큐레이션 화보 촬영 및 플랫폼 비주얼 브랜딩 디자인, UI/UX 비주얼 마이크로 인터랙션 기획.' },
            { name: '여행업 20년 경력 고문', role: '수석 자문위원', desc: '전국 지자체 관광 기획 부서 네트워크 연동 자문 및 인바운드/아웃바운드 여행 패키지 세무 행정 자문.' }
          ].map((member, i) => (
            <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{member.name}</h3>
                  <div className="text-[10px] text-blue-500 font-semibold">{member.role}</div>
                </div>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-4">
            워케이션, 이제 행정 마비 없이 시작할 때입니다
          </h2>
          <p className="text-sm text-[#475569] mb-8">
            지자체 지원금 매칭부터 월 1회 단일 세금계산서 청구까지, 더 워케이션과 함께 기업 복지 혁신을 실현해 보세요.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/accommodations">
              <Button size="lg">숙소 탐색하러 가기</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">홈으로 이동</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
