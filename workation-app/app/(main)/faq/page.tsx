import Link from 'next/link'
import Button from '@/components/ui/Button'

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

      <section className="max-w-5xl mx-auto px-6 py-40 text-center">
        <div className="text-5xl mb-6">💬</div>
        <h1 className="text-2xl font-bold mb-4">자주 묻는 질문</h1>
        <p className="text-[#94A3B8]">내용을 추가할 예정입니다.</p>
        <div className="mt-10">
          <Link href="/">
            <Button variant="secondary" size="lg">← 메인으로 돌아가기</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
