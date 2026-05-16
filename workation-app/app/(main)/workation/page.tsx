import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'

export default function WorkationInfoPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-[#94A3B8] hover:text-[#475569] transition-colors">← 뒤로</Link>
          <Link href="/" className="text-lg font-bold">The Workation</Link>
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

        {/* 핵심 문구 */}
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-6">
            워케이션이란?
          </div>
          <h1 className="text-3xl font-black leading-snug text-[#0F172A] mb-6">
            Work + Vacation
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            일하며 쉬는 것이 아니라,<br />
            <span className="text-blue-500 font-bold">잘 쉬기에 더 잘 일하는 것입니다.</span>
          </p>
        </div>

        {/* Work / Stay / Play */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {[
            {
              label: 'Work',
              emoji: '💻',
              color: 'bg-blue-50 border-blue-200',
              labelColor: 'text-blue-600',
              iconBg: 'bg-blue-100',
              items: [
                '5G 초고속 와이파이',
                '허리 편한 의자',
                '넉넉한 콘센트',
                '공용 라운지',
              ],
            },
            {
              label: 'Stay',
              emoji: '🛏️',
              color: 'bg-purple-50 border-purple-200',
              labelColor: 'text-purple-600',
              iconBg: 'bg-purple-100',
              items: [
                '호텔급 침구류',
                '채광 좋은 객실',
                '독립된 프라이빗 공간',
              ],
            },
            {
              label: 'Play',
              emoji: '🌊',
              color: 'bg-green-50 border-green-200',
              labelColor: 'text-green-600',
              iconBg: 'bg-green-100',
              items: [
                '도보 5분 거리의 명소',
                '전용 액티비티 할인권',
              ],
            },
          ].map((card) => (
            <div key={card.label} className={`border rounded-2xl p-6 ${card.color}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 ${card.iconBg}`}>
                {card.emoji}
              </div>
              <div className={`text-xl font-black mb-4 ${card.labelColor}`}>{card.label}</div>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#475569]">
                    <span className="text-[#94A3B8]">·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 하루 루틴 타임라인 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 mb-16">
          <h2 className="text-xl font-black text-center mb-10">하루 루틴 시나리오</h2>
          <div className="space-y-0">
            {[
              {
                time: '09:00 – 12:00',
                emoji: '🌊',
                title: '오전 딥워크',
                desc: '파도 소리 ASMR과 함께 집중 업무',
                color: 'border-blue-300 bg-blue-50',
                dot: 'bg-blue-400',
              },
              {
                time: '12:00 – 14:00',
                emoji: '🍜',
                title: '여유로운 점심',
                desc: '줄 서서 먹는 로컬 맛집에서 느긋한 식사',
                color: 'border-orange-300 bg-orange-50',
                dot: 'bg-orange-400',
              },
              {
                time: '14:00 – 17:00',
                emoji: '☕',
                title: '테라스 오피스',
                desc: '팀 화상 회의 및 업무 마무리',
                color: 'border-purple-300 bg-purple-50',
                dot: 'bg-purple-400',
              },
              {
                time: '17:00 ~',
                emoji: '🏄',
                title: '일몰 액티비티',
                desc: '일몰을 보며 즐기는 요가 또는 서핑',
                color: 'border-green-300 bg-green-50',
                dot: 'bg-green-400',
              },
            ].map((item, i, arr) => (
              <div key={item.time} className="flex gap-5">
                {/* 타임라인 선 */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full shrink-0 mt-5 ${item.dot}`} />
                  {i < arr.length - 1 && <div className="w-px flex-1 bg-[#E2E8F0] my-1" />}
                </div>
                {/* 카드 */}
                <div className={`flex-1 border rounded-xl p-4 mb-3 ${item.color}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <div className="text-xs text-[#94A3B8] font-medium">{item.time}</div>
                      <div className="font-bold text-sm text-[#0F172A]">{item.title}</div>
                      <div className="text-xs text-[#475569] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Workation의 장점 */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-center mb-10">The Workation의 장점</h2>
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
