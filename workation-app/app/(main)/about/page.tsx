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
      <section className="relative py-20 px-6 text-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-black px-4 py-2 rounded-full mb-6 border border-blue-100 uppercase tracking-wider shadow-sm">
            🎯 솔루션 가설 검증 장표 (Hypothesis Validation)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-6 text-slate-900">
            기업·임직원·지자체가 모두 상생하는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 drop-shadow-sm">
              더 워케이션 3-Win 비즈니스 모델
            </span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            더 워케이션은 **"도입 명분 부족", "업무 성과 불확실성", "지자체 예산 연동의 복잡함"** 그리고 가장 본질적인 **"직원과 회사 간의 신뢰 장벽"**을 해결하여, 지자체의 지방소멸대응 기금이 기업 임직원의 실질 복지로 흘러가도록 연결합니다.
          </p>
        </div>
      </section>

      {/* 4대 핵심 문제 정의 (The Problems We Defined) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-red-500 tracking-widest uppercase">The Problems</span>
          <h2 className="text-3xl font-black mt-2 text-slate-900">우리가 발견한 4가지 핵심 문제 장벽</h2>
          <div className="w-12 h-1.5 bg-red-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: '💡 도입 명분(Benefits)의 부재',
              desc: '회사가 비용과 리소스를 들여 워케이션을 보내주어야 하는 명확한 경영상의 명분이 부족합니다. 단순 휴양이나 일회성 복지에 그친다는 인식이 강합니다.'
            },
            {
              title: '📉 업무 성과(Performance) 측정 불가',
              desc: '사무실 밖 원격 근무지에서 임직원이 실제로 몰입하여 산출물을 내고 있는지 객관적으로 파악하고 정량화할 수 있는 기준이나 협업 도구가 없습니다.'
            },
            {
              title: '🏛️ 복잡한 행정으로 인한 정보 격차',
              desc: '전국의 많은 지자체들이 생활인구 유입을 위해 예산(보조금)과 무료 워케이션 센터 인프라를 마련해두었지만, 복잡한 신청/사후 증빙 절차로 인해 기업들이 혜택을 인지하지 못하거나 포기합니다.'
            },
            {
              title: '🔒 가장 본질적인 장벽: 직원과 회사 간의 \'신뢰\'',
              desc: '보이지 않는 곳에서 일하는 직원을 온전히 신뢰할 수 있는가에 대한 문화적·제도적 한계가 존재합니다. 마이크로 매니징(감시) 없이도 신뢰를 구축할 수 있는 장치가 필수적입니다.',
              highlight: true
            }
          ].map((prob, i) => (
            <div key={i} className={`bg-white border rounded-2xl p-6 transition-all duration-300 ${
              prob.highlight 
                ? 'border-red-400 shadow-[0_10px_30px_rgba(239,68,68,0.08)] bg-red-50/10' 
                : 'border-slate-200 hover:shadow-md'
            }`}>
              <h3 className="font-extrabold text-slate-900 text-base mb-3">{prob.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{prob.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Logic & Data Section (KTO & IT Big Tech Data) */}
      <section className="bg-white border-y border-slate-200 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Core Evidence & Logic</span>
            <h2 className="text-3xl font-black mt-2 text-slate-900">가설 검증을 뒷받침하는 핵심 근거 데이터</h2>
            <div className="w-12 h-1.5 bg-blue-600 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* 한국관광공사 데이터 */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">KTO 공식 통계</span>
                <h3 className="text-lg font-black mt-4 mb-3 text-slate-900">경험자 90% 이상 "삶의 질 & 만족도 향상"</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  한국관광공사(KTO)의 실태조사에 따르면, 워케이션 경험 임직원의 **90% 이상**이 직무 만족도 증가와 업무 능률 향상을 체감했습니다. 이는 단순한 휴식이 아닌, 업무 몰입 환경 제공이 생산성에 긍정적 영향을 미쳤음을 증명합니다.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-400">삶의 질 및 직무만족 향상</span>
                <span className="text-2xl font-black text-blue-600">90% ↑</span>
              </div>
            </div>

            {/* IT 대기업 도입 사례 */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">IT 선도기업 벤치마킹</span>
                <h3 className="text-lg font-black mt-4 mb-3 text-slate-900">리쿠르팅 및 인재 유치(Retention)의 치트키</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  네이버, 라인, 야놀자 등 주요 IT 대기업의 워케이션 도입 후 임직원 만족도는 압도적인 수치를 기록했습니다. 특히 핵심 직군인 개발자 및 기획자 사이에서 **"회사의 워케이션 지원 여부"가 이직을 결정하는 주요 복지 혜택 기준** 중 하나로 부상했습니다.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-400">인재 유치 및 채용 경쟁력</span>
                <span className="text-2xl font-black text-indigo-600">핵심 지표 등극</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Win Value Chain Structure */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase">The 3-Win Value Chain</span>
          <h2 className="text-3xl font-black mt-2 text-slate-900">지자체 · 임직원 · 기업의 상생 윈-윈 구조</h2>
          <div className="w-12 h-1.5 bg-emerald-500 rounded-full mx-auto mt-4" />
        </div>

        {/* 3-Win 카드 레이아웃 */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* 기업의 이점 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-2xl w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">🏢</div>
            <h3 className="font-bold text-slate-900 mb-3 text-sm sm:text-base">기업 (Company)</h3>
            <ul className="text-xs sm:text-sm text-slate-500 space-y-2.5">
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 지자체 보조금 연동으로 복지 예산 활용 극대화</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 우수 인재 리텐션(유지) 및 채용 우위 확보</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 성과 측정 툴 제공으로 원격 근무 생산성 관리</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 근무 인증 자동화로 무임승차 걱정 없는 신뢰 구현</li>
            </ul>
          </div>

          {/* 임직원의 이점 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-2xl w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">👥</div>
            <h3 className="font-bold text-slate-900 mb-3 text-sm sm:text-base">임직원 (Employee)</h3>
            <ul className="text-xs sm:text-sm text-slate-500 space-y-2.5">
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 일과 쉼의 완벽한 조화(WLB)를 통한 재충전</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 지자체가 구축한 고품질 워케이션 센터 활용</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 쾌적하고 몰입도 높은 원격 업무 환경 무상 확보</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 자율적이고 스마트하게 본인의 성과 증빙 가능</li>
            </ul>
          </div>

          {/* 지자체의 이점 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-2xl w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">🏛️</div>
            <h3 className="font-bold text-slate-900 mb-3 text-sm sm:text-base">지자체 (Government)</h3>
            <ul className="text-xs sm:text-sm text-slate-500 space-y-2.5">
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 인구감소 소도시에 양질의 관계·생활인구 대거 유입</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 지방소멸대응기금 및 공공 보조금의 효과적인 집행</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 유휴 상태의 지역 인프라 및 숙박 시설 가동률 증가</li>
              <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 주말 관광객 중심에서 평일 체류 소비 활성화 유도</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solving the "Trust" Barrier (가장 중요한 신뢰 문제 극복 방안) */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">The Trust Loop</span>
            <h2 className="text-3xl font-black mt-2 text-white">가장 본질적인 '신뢰의 한계'를 해결하는 방식</h2>
            <div className="w-12 h-1.5 bg-blue-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-6xl shrink-0">🍅</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 text-white">
                  감시(Monitoring)가 아닌 자율적인 "근무 알리바이 증명"
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  임직원이 오늘 완수할 마이크로 목표를 스스로 선언하고, 뽀모도로 타이머로 딥워크 세션을 기록하여 채워나갑니다. 화면을 훔쳐보거나 감시하지 않고도 직원은 떳떳하게 업무 성과와 몰입을 인증하고, 회사는 객관적인 활동 요약을 확인하여 깊은 상호 신뢰를 쌓아나갈 수 있습니다.
                </p>
                <div className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-500/30">
                  🛡️ 자율적 업무 관리 도구 제공을 통한 상호 신뢰 회복
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Funnel Section (Vibrant Funnel Design) */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Market Potential</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900">지방 소멸 기금 활성화를 이끄는 시장 잠재력</h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-4">
          {[
            { level: 'TAM', title: '글로벌 기업 웰니스 & 원격 복지 시장', size: '30조 원', desc: '글로벌 기업 웰니스 시장 72조 원 중 원격근무 도입 비중 40% 적용 (Allied Market Research)', width: 'w-full', bg: 'from-blue-600 to-indigo-600 shadow-blue-500/20' },
            { level: 'SAM', title: '국내 300인 이상 기업 복지 시장', size: '2조 원', desc: '국내 300인 이상 종사자 300만 명 × 연평균 복지 예산 70만 원 (고용노동부)', width: 'sm:w-[92%] w-full', bg: 'from-indigo-600 to-purple-600 shadow-indigo-500/20' },
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

      {/* Analysis: Missing Elements Checked (개발자가 진단하는 추가 고려사항) */}
      <section className="bg-slate-50 border-t border-slate-200 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Platform Insights</span>
            <h2 className="text-2xl font-black mt-2 text-slate-900">💡 솔루션 검증을 위해 보완 및 설계된 요소</h2>
            <p className="text-xs text-slate-400 mt-2">비즈니스 가설 검증 과정에서 실무 관점으로 추가 설계된 내용입니다.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-2">💸 1-Billing 정산의 세무 회계적 타당성</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                재무팀(CFO) 설득에 가장 큰 무기는 세무 처리입니다. 여러 가맹점 영수증을 복리후생비 또는 출장비로 정당하게 처리할 수 있는 **단일 전자세금계산서 증빙**을 제공하여 재무적 리스크를 영(Zero)으로 만듭니다.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-2">🏛️ 지자체 예산 집행 한계의 돌파구</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                지자체 예산 코드는 연말이나 분기 말에 예산이 소진되면 혜택이 중단됩니다. 대시보드 내 **지원금 실시간 잔액 한도 알림 기능**을 갖춤으로써, 기업이 예산 계획을 짤 때 리스크를 사전 방지하도록 도우며 검증을 강화합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Stunning Blue Section) */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
            가상 예약과 툴로 검증해 보세요
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mb-10 max-w-xl mx-auto leading-relaxed">
            비로그인 상태로도 숙소 예약 프로세스 및 뽀모도로 업무 집중 툴을 직접 조작해 볼 수 있습니다.<br />
            실제 현장 피칭 및 솔루션 타당성 검증을 바로 시작해 보세요.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/accommodations">
              <Button size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50 shadow-xl border border-transparent">
                숙소 예약 프로세스 체험
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
