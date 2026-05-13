'use client'
import Link from 'next/link'
import Badge from './Badge'
import type { UserRole } from '@/lib/types'

const roleLabel: Record<UserRole, string> = {
  hr:  '인사담당자',
  emp: '직원',
  adm: '운영팀',
  prt: '파트너',
  gov: '지자체',
}

interface HeaderProps {
  role?: UserRole
  userName?: string
}

export default function Header({ role, userName }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-[#0F172A] tracking-tight">
          더 워케이션
        </Link>

        {role ? (
          <div className="flex items-center gap-3">
            <Badge variant={role}>{roleLabel[role]}</Badge>
            <span className="text-sm text-[#475569]">{userName}</span>
            <Link href="/login" className="text-xs text-[#94A3B8] hover:text-[#475569] transition-colors">
              로그아웃
            </Link>
          </div>
        ) : (
          <Link href="/login" className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors">
            로그인
          </Link>
        )}
      </div>
    </header>
  )
}
