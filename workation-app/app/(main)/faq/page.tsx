'use client'
import { useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'

const FAQ_DATA = [
  {
    category: '💼 서비스 이용',
    items: [
      {
        q: '더 워케이션은 어떤 서비스인가요?',
        a: '더 워케이션은 기업 인사담당자와 직원들을 위한 B2B 워케이션 플랫폼입니다. 숙소 검색부터 단체 예약, 예산 관리, 지원금 신청까지 워케이션에 필요한 모든 과정을 한 곳에서 처리할 수 있습니다.',
      },
      {
        q: '회원가입은 어떻게 하나요?',
        a: '상단의 "무료로 시작하기" 버튼을 클릭해 이메일 또는 Google·카카오 계정으로 간편하게 가입할 수 있습니다. 가입 후 역할(인사담당자 / 직원)을 선택하면 바로 이용 가능합니다.',
      },
      {
        q: '기업 회원과 개인 회원의 차이가 뭔가요?',
        a: '인사담당자(기업 회원)는 예산 설정, 직원 초대, 전체 예약 현황 관리, 보고서 다운로드 등 관리 기능을 사용할 수 있습니다. 직원(개인 회원)은 숙소 검색 및 개인 예약 기능을 이용할 수 있습니다.',
      },
    ],
  },
  {
    category: '🏨 숙소 예약',
    items: [
      {
        q: '숙소 예약은 어떻게 하나요?',
        a: '숙소 찾기 페이지에서 원하는 지역·날짜·인원을 선택한 후 예약하기 버튼을 클릭하세요. 회사 예산이 설정되어 있다면 결제 시 자동으로 차감됩니다.',
      },
      {
        q: '예약 취소 및 환불 정책이 어떻게 되나요?',
        a: '체크인 7일 전까지 취소 시 전액 환불, 3~6일 전 취소 시 50% 환불, 2일 이내 취소 시 환불이 불가합니다. 숙소별로 정책이 상이할 수 있으니 예약 전 상세 페이지를 확인해 주세요.',
      },
      {
        q: '단체 예약은 최소 몇 명부터 가능한가요?',
        a: '단체 예약은 2명 이상부터 가능합니다. 인사담당자가 팀원을 초대하면 각자 원하는 날짜에 개별 예약할 수 있으며, 전체 현황은 대시보드에서 한눈에 확인 가능합니다.',
      },
    ],
  },
  {
    category: '💰 지원금',
    items: [
      {
        q: '지원금은 누구나 받을 수 있나요?',
        a: '지원금은 지자체별로 대상 조건이 다릅니다. 대부분 해당 지역 외 기업 재직자를 대상으로 하며, 최소 숙박 일수 조건이 있습니다. 숙소 예약 시 받을 수 있는 지원금이 자동으로 안내됩니다.',
      },
      {
        q: '지원금은 언제, 어떻게 지급되나요?',
        a: '더 워케이션이 예약 시 지원금을 선공제하여 실제 결제 금액을 낮춰드립니다. 워케이션 종료 후 지자체 정산은 저희가 대행하므로 별도 절차 없이 편리하게 이용 가능합니다.',
      },
      {
        q: '지원금 신청에 필요한 서류가 있나요?',
        a: '재직증명서 또는 사업자등록증이 필요할 수 있습니다. 더 워케이션에서 필요 서류를 안내해 드리며, 대부분의 경우 플랫폼 내에서 간편하게 제출할 수 있습니다.',
      },
    ],
  },
  {
    category: '🏢 기업 담당자',
    items: [
      {
        q: '직원들의 예약 현황을 어떻게 확인하나요?',
        a: '대시보드에서 전체 직원의 예약 현황, 예산 사용률, 일정을 한눈에 확인할 수 있습니다. 보고서 탭에서 월별·부서별 데이터를 다운로드할 수도 있습니다.',
      },
      {
        q: '회사 예산은 어떻게 설정하나요?',
        a: '대시보드 > 설정 메뉴에서 연간·월간 예산을 설정할 수 있습니다. 직원이 예약할 때마다 실시간으로 차감되며, 예산 초과 시 알림을 받을 수 있습니다.',
      },
      {
        q: '세금계산서 발행이 가능한가요?',
        a: '네, 가능합니다. 회사 정보 등록 후 예약 완료 시 세금계산서를 자동 발행해 드립니다. 문의사항은 contact@theworkation.com으로 연락해 주세요.',
      },
    ],
  },
  {
    category: '🤝 파트너 (숙소 운영자)',
    items: [
      {
        q: '파트너 등록은 어떻게 하나요?',
        a: '상단 메뉴의 "파트너 등록"을 클릭해 숙소 정보를 입력하고 신청하시면 됩니다. 검토 후 승인이 완료되면 플랫폼에 숙소가 등록됩니다.',
      },
      {
        q: '정산은 언제 이루어지나요?',
        a: '워케이션 체크아웃 후 영업일 기준 7일 이내에 등록된 계좌로 정산이 완료됩니다. 정산 내역은 파트너 대시보드에서 실시간으로 확인 가능합니다.',
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F8FAFC] transition-colors"
      >
        <span className="font-medium text-sm text-[#0F172A]">{q}</span>
        <span className={`text-[#94A3B8] text-lg transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ∨
        </span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-sm text-[#475569] leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
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

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black mb-3">자주 묻는 질문</h1>
          <p className="text-[#475569]">궁금한 점을 빠르게 찾아보세요</p>
        </div>

        <div className="space-y-10">
          {FAQ_DATA.map((section) => (
            <div key={section.category}>
              <h2 className="text-sm font-bold text-[#475569] mb-3">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center bg-white border border-[#E2E8F0] rounded-2xl p-8">
          <p className="text-sm text-[#475569] mb-4">원하는 답변을 찾지 못하셨나요?</p>
          <a href="mailto:contact@theworkation.com">
            <Button size="lg">이메일로 문의하기</Button>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  )
}
