'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useHrOnly } from '@/lib/useHrOnly'

const MEMBERS = [
  { id: 1, name: '김지수', email: 'jisoo@company.com',   dept: '개발팀', role: 'emp', status: 'active'   as const },
  { id: 2, name: '박민준', email: 'minjun@company.com',  dept: '마케팅팀', role: 'emp', status: 'active' as const },
  { id: 3, name: '이서연', email: 'seoyeon@company.com', dept: '디자인팀', role: 'emp', status: 'active' as const },
  { id: 4, name: '최준혁', email: 'junhyeok@company.com',dept: '영업팀',  role: 'emp', status: 'pending' as const },
  { id: 5, name: '홍길동', email: 'gildong@company.com', dept: '인사팀',  role: 'hr',  status: 'active'  as const },
]

const DEPTS = ['전체', '개발팀', '마케팅팀', '디자인팀', '영업팀', '인사팀']

export default function MembersPage() {
  useHrOnly()
  const [members, setMembers]     = useState(MEMBERS)
  const [dept, setDept]           = useState('전체')
  const [search, setSearch]       = useState('')
  const [emails, setEmails]       = useState('')
  const [inviteDept, setInviteDept] = useState('개발팀')
  const [inviteRole, setInviteRole] = useState('emp')
  const [sent, setSent]           = useState(false)

  const filtered = members.filter(m => {
    const matchDept   = dept === '전체' || m.dept === dept
    const matchSearch = m.name.includes(search) || m.email.includes(search)
    return matchDept && matchSearch
  })

  function handleInvite() {
    if (!emails.trim()) return
    const list = emails.split(/[\n,]/).map(e => e.trim()).filter(Boolean)
    const newMembers = list.map((email, i) => ({
      id: Date.now() + i,
      name: email.split('@')[0],
      email,
      dept: inviteDept,
      role: inviteRole,
      status: 'pending' as const,
    }))
    setMembers(prev => [...prev, ...newMembers])
    setEmails('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  function removeInvite(id: number) {
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header role="hr" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-xs text-[#94A3B8] hover:text-[#475569] mb-2 block">← 대시보드</Link>
          <h1 className="text-2xl font-black mb-1">임직원 관리</h1>
          <p className="text-sm text-[#475569]">초대 링크 발송 및 부서·권한 설정</p>
        </div>

        <div className="flex flex-col gap-5">
          {/* 일괄 초대 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">✉️</span>
              <h2 className="font-bold">임직원 일괄 초대</h2>
            </div>
            <p className="text-xs text-[#94A3B8] mb-4">이메일을 입력하면 초대 링크를 일괄 발송합니다 (쉼표 또는 줄 바꿈으로 구분)</p>

            <div className="flex flex-col gap-3">
              <textarea
                rows={3}
                value={emails}
                onChange={e => setEmails(e.target.value)}
                placeholder={'jisoo@company.com\nminjun@company.com, seoyeon@company.com'}
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-blue-500 resize-none font-mono"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">부서 배정</label>
                  <select
                    value={inviteDept}
                    onChange={e => setInviteDept(e.target.value)}
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500"
                  >
                    {DEPTS.filter(d => d !== '전체').map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#475569] mb-1.5 block">권한</label>
                  <select
                    value={inviteRole}
                    onChange={e => setInviteRole(e.target.value)}
                    className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-blue-500"
                  >
                    <option value="emp">임직원 (일반)</option>
                    <option value="hr">HR 담당자</option>
                  </select>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handleInvite}>
                {sent ? '✅ 초대 메일 발송 완료' : '초대 링크 발송'}
              </Button>
            </div>
          </div>

          {/* 현재 멤버 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">멤버 현황 <span className="text-sm font-normal text-[#94A3B8]">{members.length}명</span></h2>
              <div className="flex items-center gap-3">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="이름·이메일 검색"
                  className="bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-blue-500 w-44"
                />
                <div className="flex gap-1.5">
                  {DEPTS.map(d => (
                    <button key={d} onClick={() => setDept(d)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        dept === d ? 'bg-blue-500 text-white' : 'bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:border-blue-500/50'
                      }`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-[#94A3B8] border-b border-[#E2E8F0]">
                    <th className="text-left py-2 pr-4 font-medium">이름</th>
                    <th className="text-left py-2 pr-4 font-medium">이메일</th>
                    <th className="text-left py-2 pr-4 font-medium">부서</th>
                    <th className="text-left py-2 pr-4 font-medium">권한</th>
                    <th className="text-left py-2 pr-4 font-medium">상태</th>
                    <th className="py-2 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filtered.map(m => (
                    <tr key={m.id} className="hover:bg-[#F1F5F9]/50 transition-colors">
                      <td className="py-3 pr-4 font-medium">{m.name}</td>
                      <td className="py-3 pr-4 text-[#94A3B8] font-mono text-xs">{m.email}</td>
                      <td className="py-3 pr-4 text-[#475569]">{m.dept}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs px-2 py-0.5 rounded-md ${
                          m.role === 'hr' ? 'bg-blue-500/20 text-blue-600' : 'bg-[#F1F5F9] text-[#475569]'
                        }`}>
                          {m.role === 'hr' ? 'HR 담당자' : '임직원'}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs px-2 py-0.5 rounded-md ${
                          m.status === 'active'  ? 'bg-emerald-500/20 text-emerald-400' :
                          m.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : ''
                        }`}>
                          {m.status === 'active' ? '활성' : '초대 대기'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {m.status === 'pending' && (
                          <button onClick={() => removeInvite(m.id)} className="text-xs text-[#94A3B8] hover:text-red-400 transition-colors">
                            취소
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
