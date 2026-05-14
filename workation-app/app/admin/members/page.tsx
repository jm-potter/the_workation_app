'use client'
import { useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const MEMBERS = [
  { id: 'm1',  name: '홍길동',  email: 'hong@samsung.com',  company: '삼성전자',   role: 'hr'  as const, joined: '2026-01-15', bookings: 12, status: 'active' },
  { id: 'm2',  name: '김지수',  email: 'kim@samsung.com',   company: '삼성전자',   role: 'emp' as const, joined: '2026-01-20', bookings: 3,  status: 'active' },
  { id: 'm3',  name: '박민준',  email: 'park@lg.com',        company: 'LG전자',    role: 'emp' as const, joined: '2026-02-05', bookings: 2,  status: 'active' },
  { id: 'm4',  name: '이서연',  email: 'lee@kakao.com',      company: '카카오',    role: 'hr'  as const, joined: '2026-02-10', bookings: 8,  status: 'active' },
  { id: 'm5',  name: '최준혁',  email: 'choi@naver.com',     company: '네이버',    role: 'emp' as const, joined: '2026-03-01', bookings: 1,  status: 'inactive' },
  { id: 'm6',  name: '정유진',  email: 'jung@samsung.com',   company: '삼성전자',  role: 'emp' as const, joined: '2026-03-12', bookings: 4,  status: 'active' },
  { id: 'm7',  name: '한동훈',  email: 'han@skt.com',        company: 'SK텔레콤', role: 'hr'  as const, joined: '2026-03-20', bookings: 6,  status: 'active' },
  { id: 'm8',  name: '오민서',  email: 'oh@hyundai.com',     company: '현대자동차', role: 'emp' as const, joined: '2026-04-02', bookings: 2,  status: 'active' },
  { id: 'm9',  name: '윤채원',  email: 'yoon@kakao.com',     company: '카카오',    role: 'emp' as const, joined: '2026-04-15', bookings: 0,  status: 'active' },
  { id: 'm10', name: '강태양',  email: 'kang@naver.com',     company: '네이버',    role: 'emp' as const, joined: '2026-05-01', bookings: 1,  status: 'active' },
]

type RoleFilter = 'all' | 'hr' | 'emp'

const roleLabel: Record<string, string> = { hr: 'HR 담당자', emp: '직원' }

export default function AdminMembersPage() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [search, setSearch] = useState('')

  const filtered = MEMBERS.filter(m =>
    (roleFilter === 'all' || m.role === roleFilter) &&
    (m.name.includes(search) || m.email.includes(search) || m.company.includes(search))
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur border-b border-[#E2E8F0] px-6 h-14 flex items-center">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-[#94A3B8] hover:text-[#475569] transition-colors">← 대시보드</Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="font-semibold">회원 관리</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 요약 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '전체 회원',   value: `${MEMBERS.length}명`,                                                   color: 'text-blue-400' },
            { label: 'HR 담당자',   value: `${MEMBERS.filter(m => m.role === 'hr').length}명`,                     color: 'text-emerald-400' },
            { label: '직원',        value: `${MEMBERS.filter(m => m.role === 'emp').length}명`,                    color: 'text-amber-400' },
            { label: '이번 달 신규', value: `${MEMBERS.filter(m => m.joined.startsWith('2026-05')).length}명`,     color: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <p className="text-xs text-[#94A3B8] mb-1">{s.label}</p>
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* 필터 & 검색 */}
        <div className="flex items-center gap-3 mb-5">
          <input
            type="text"
            placeholder="이름, 이메일, 기업명 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-white border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-1.5">
            {(['all', 'hr', 'emp'] as RoleFilter[]).map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  roleFilter === r ? 'bg-blue-500 text-white' : 'bg-white border border-[#E2E8F0] text-[#475569] hover:border-blue-500/50'
                }`}
              >
                {r === 'all' ? '전체' : roleLabel[r]}
              </button>
            ))}
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                {['이름', '이메일', '소속 기업', '역할', '가입일', '예약 수', '상태', '액션'].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]/50 transition-colors">
                  <td className="px-5 py-3 font-medium">{m.name}</td>
                  <td className="px-5 py-3 text-xs text-[#475569]">{m.email}</td>
                  <td className="px-5 py-3 text-xs">{m.company}</td>
                  <td className="px-5 py-3"><Badge variant={m.role}>{roleLabel[m.role]}</Badge></td>
                  <td className="px-5 py-3 text-xs text-[#475569]">{m.joined}</td>
                  <td className="px-5 py-3 text-xs text-[#475569]">{m.bookings}건</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                      m.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-[#F1F5F9] text-[#94A3B8]'
                    }`}>
                      {m.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <button className="text-xs px-2.5 py-1 bg-[#F1F5F9] text-[#475569] rounded-md hover:bg-[#334155] transition-colors">상세</button>
                      <button className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                        m.status === 'active'
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}>
                        {m.status === 'active' ? '정지' : '복구'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#E2E8F0] text-xs text-[#94A3B8]">
            총 {filtered.length}명
          </div>
        </div>
      </div>
    </div>
  )
}
