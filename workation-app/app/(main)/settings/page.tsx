'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'

const TOOLS = [
  { id: 'slack',   name: 'Slack',            icon: '💬', desc: '메시지 응답속도·채널 활동 분석', connected: true,  scope: '메시지 읽기 권한' },
  { id: 'notion',  name: 'Notion',           icon: '📝', desc: '문서 공동편집 빈도·페이지 활동', connected: true,  scope: '워크스페이스 읽기' },
  { id: 'google',  name: 'Google Workspace', icon: '📊', desc: '미팅 참여율·캘린더·드라이브 활동', connected: false, scope: 'Calendar·Drive 읽기' },
]

const INDUSTRIES = ['IT·소프트웨어', '제조·엔지니어링', '금융·핀테크', '바이오·헬스케어', '유통·이커머스', '미디어·콘텐츠', '기타']
const PURPOSES   = ['팀 결속력 강화', '집중 업무 환경', '번아웃 회복', '신규 프로젝트 킥오프', '전략 워크숍', '채용·온보딩']

export default function SettingsPage() {
  const [industry, setIndustry]   = useState('IT·소프트웨어')
  const [purposes, setPurposes]   = useState<string[]>(['팀 결속력 강화'])
  const [saved, setSaved]         = useState(false)

  function togglePurpose(p: string) {
    setPurposes(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header role="hr" userName="홍길동 팀장" />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-xs text-[#64748B] hover:text-[#94A3B8] mb-2 block">← 대시보드</Link>
          <h1 className="text-2xl font-black mb-1">회사 설정</h1>
          <p className="text-sm text-[#94A3B8]">AI 매칭 정확도와 성과 예측에 활용됩니다</p>
        </div>

        <div className="flex flex-col gap-5">
          {/* 기업 프로파일 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
            <h2 className="font-bold text-sm text-[#94A3B8] uppercase tracking-wide mb-4">기업 프로파일</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#94A3B8] mb-1.5 block">회사명</label>
                  <input defaultValue="삼성전자" className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-[#94A3B8] mb-1.5 block">직원 수</label>
                  <input defaultValue="45" type="number" className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* 업종 */}
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">업종 (AI 매칭에 활용)</label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map(i => (
                    <button key={i} onClick={() => setIndustry(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        industry === i ? 'bg-blue-500 text-white' : 'bg-[#263548] border border-[#334155] text-[#94A3B8] hover:border-blue-500/50'
                      }`}>
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              {/* 워케이션 목적 */}
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">주요 워케이션 목적 (복수 선택)</label>
                <div className="flex flex-wrap gap-2">
                  {PURPOSES.map(p => (
                    <button key={p} onClick={() => togglePurpose(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        purposes.includes(p) ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40' : 'bg-[#263548] border border-[#334155] text-[#94A3B8] hover:border-purple-500/40'
                      }`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* 연간 예산 */}
              <div>
                <label className="text-xs text-[#94A3B8] mb-1.5 block">워케이션 연간 예산</label>
                <div className="relative">
                  <input type="number" defaultValue="5000000" className="w-full bg-[#263548] border border-[#334155] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-blue-500 pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B]">원</span>
                </div>
              </div>
            </div>
          </div>

          {/* 협업툴 연동 */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-bold text-sm text-[#94A3B8] uppercase tracking-wide">협업툴 연동</h2>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">성과 예측에 활용</span>
            </div>
            <p className="text-xs text-[#64748B] mb-4">워케이션 전후 30일 데이터를 자동 수집해 성과 리포트를 생성합니다</p>

            <div className="flex flex-col gap-3">
              {TOOLS.map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-[#263548] rounded-xl border border-[#334155]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-[#64748B]">{t.desc}</div>
                      <div className="text-xs text-[#475569] mt-0.5">권한: {t.scope}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {t.connected ? (
                      <>
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">연동됨</span>
                        <button className="text-xs text-[#64748B] hover:text-red-400 transition-colors">해제</button>
                      </>
                    ) : (
                      <button className="text-xs px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        연동하기
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-[#94A3B8] leading-relaxed">
              🔒 OAuth2.0 인증 방식으로 연동되며, 개인 메시지 내용은 수집하지 않습니다. 수집 데이터는 성과 지표 산출에만 활용됩니다.
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={() => setSaved(true)}>
            {saved ? '✅ 저장됐어요' : '설정 저장'}
          </Button>
        </div>
      </div>
    </div>
  )
}
