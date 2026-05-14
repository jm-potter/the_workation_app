'use client'
import { useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const REGIONS = ['강원도', '제주도', '전라남도', '전라북도', '경상남도', '경상북도', '충청남도', '충청북도', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '울산광역시', '세종특별자치시']

export default function GovPostPage() {
  const [tab, setTab]               = useState<'manual' | 'api'>('manual')
  const [name, setName]             = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [amount, setAmount]         = useState('')
  const [minNights, setMinNights]   = useState('2')
  const [unit, setUnit]             = useState('1인당')
  const [conditions, setConditions] = useState('')
  const [startDate, setStartDate]   = useState('')
  const [endDate, setEndDate]       = useState('')
  const [provider, setProvider]     = useState('')
  const [contact, setContact]       = useState('')
  const [apiUrl, setApiUrl]         = useState('')
  const [submitted, setSubmitted]   = useState(false)

  if (submitted) return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg">더워케이션</span>
          <Badge variant="gov">지자체</Badge>
        </div>
      </header>
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
        <h1 className="text-2xl font-black mb-2">공고 등록 완료!</h1>
        <p className="text-[#475569] mb-2">지원금 공고가 더워케이션에 등록됐습니다.</p>
        <p className="text-sm text-[#94A3B8] mb-8">기업 담당자가 숙소 예약 시 자동으로 매칭되어 표시됩니다.</p>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left mb-8 text-sm flex flex-col gap-3">
          <div className="font-bold">{name || '강원도 워케이션 지원사업'}</div>
          {[
            ['지역',     selectedRegion || '강원도'],
            ['지원금액', `${Number(amount || 100000).toLocaleString()}원 ${unit}`],
            ['적용 기간', `${startDate || '2026-01-01'} ~ ${endDate || '2026-12-31'}`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-[#94A3B8]">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 text-xs text-emerald-700 font-medium">
            ✅ 즉시 기업 예약 화면에 자동 반영됩니다
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/gov" className="block w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            대시보드로 돌아가기
          </Link>
          <button onClick={() => setSubmitted(false)} className="w-full py-3 bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] font-semibold rounded-xl transition-colors">
            추가 공고 등록하기
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/gov" className="text-[#94A3B8] hover:text-[#475569] transition-colors">← 대시보드</Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="font-semibold">지원금 공고 게재</span>
        </div>
        <Badge variant="gov">지자체</Badge>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">지원금 공고 게재</h1>
          <p className="text-sm text-[#475569]">공고 등록 즉시 기업 예약 화면에 자동 반영됩니다</p>
        </div>

        {/* 탭: 직접입력 / API 연동 */}
        <div className="flex gap-1 bg-[#F1F5F9] p-1 rounded-xl mb-6">
          {[
            { id: 'manual', label: '✏️ 직접 입력' },
            { id: 'api',    label: '🔗 API 자동 연동' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t.id ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#94A3B8] hover:text-[#475569]'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'manual' && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-5">공고 기본 정보</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">사업명 *</label>
                  <input value={name} onChange={e => setName(e.target.value)}
                    placeholder="예: 강원도 워케이션 유치 지원사업"
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">지역 *</label>
                    <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500">
                      <option value="">지역 선택</option>
                      {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">담당 기관명</label>
                    <input value={provider} onChange={e => setProvider(e.target.value)}
                      placeholder="예: 강원특별자치도청"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-5">지원금 조건</h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs text-[#475569] mb-1.5 block">지원 금액 (원) *</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                      placeholder="100000"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">지원 단위</label>
                    <select value={unit} onChange={e => setUnit(e.target.value)}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500">
                      <option>1인당</option>
                      <option>1박당</option>
                      <option>팀당</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">최소 숙박 일수</label>
                  <div className="flex items-center gap-3">
                    {['1', '2', '3', '4', '5'].map(n => (
                      <button key={n} onClick={() => setMinNights(n)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors border ${
                          minNights === n ? 'bg-blue-500 text-white border-blue-500' : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#475569] hover:border-blue-500/50'
                        }`}>{n}박</button>
                    ))}
                    <span className="text-xs text-[#94A3B8]">이상</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">신청 조건</label>
                  <input value={conditions} onChange={e => setConditions(e.target.value)}
                    placeholder="예: 기업·기관 임직원, 프리랜서 (개인사업자 포함)"
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-5">사업 기간 & 담당자</h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">시작일</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs text-[#475569] mb-1.5 block">마감일</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">담당자 연락처</label>
                  <input value={contact} onChange={e => setContact(e.target.value)}
                    placeholder="이메일 또는 전화번호"
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-xs text-[#475569] leading-relaxed">
              💡 <strong className="text-blue-600">자동 반영 안내:</strong> 공고 등록 즉시 해당 지역 숙소 예약 시 지원금이 자동으로 표시되고 선공제 계산에 반영됩니다.
            </div>

            <button onClick={() => setSubmitted(true)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
              공고 등록하기 →
            </button>
          </div>
        )}

        {tab === 'api' && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] uppercase tracking-wide mb-2">API 자동 연동</h2>
              <p className="text-xs text-[#94A3B8] mb-5">지자체 공공데이터 API를 연결하면 공고가 자동으로 최신화됩니다</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">공공데이터 API 엔드포인트</label>
                  <input value={apiUrl} onChange={e => setApiUrl(e.target.value)}
                    placeholder="https://api.data.go.kr/openapi/..."
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] font-mono focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">자동 갱신 주기</label>
                  <div className="flex gap-2">
                    {['매일', '매주', '매월'].map(p => (
                      <button key={p} className="px-4 py-2 rounded-xl text-sm font-medium bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:border-blue-500/50 transition-colors first:bg-blue-500 first:text-white first:border-blue-500">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h2 className="font-bold text-sm text-[#475569] mb-4">지원 가능한 공공 API</h2>
              <div className="flex flex-col gap-3">
                {[
                  { name: '공공데이터포털 워케이션 지원사업', url: 'data.go.kr', status: '연동 가능' },
                  { name: '한국관광공사 지원사업 API',         url: 'knto.or.kr', status: '연동 가능' },
                  { name: '지자체 통합 지원사업 공고 API',     url: 'bizinfo.go.kr', status: '준비중' },
                ].map(a => (
                  <div key={a.name} className="flex items-center justify-between p-3 bg-[#F1F5F9] rounded-xl">
                    <div>
                      <div className="text-sm font-medium">{a.name}</div>
                      <div className="text-xs text-[#94A3B8]">{a.url}</div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-lg ${
                      a.status === '연동 가능' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-[#E2E8F0] text-[#94A3B8]'
                    }`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setSubmitted(true)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
              API 연동 신청하기 →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
