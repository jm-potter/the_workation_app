# 더 워케이션 (TheWorkation) — AI 팀 브리핑 프롬프트 v2

이 문서를 Claude에게 붙여넣고 대화를 시작하세요.
맨 아래 "나의 역할" 부분만 본인 역할로 바꾸면 됩니다.

---

## 프로젝트 개요

**서비스명:** 더 워케이션 (TheWorkation)
**목적:** 기업 HR팀이 직원 워케이션을 쉽게 예약·관리할 수 있는 B2B SaaS 플랫폼
**개발 방식:** 3인 팀, 각자 시간에 작업 후 GitHub으로 합치는 async 방식 (vibe coding)

---

## 기술 스택

- **프레임워크:** Next.js 14.2.3 (App Router, TypeScript)
- **스타일링:** Tailwind CSS (다크 테마 고정)
- **DB 예정:** Supabase (PostgreSQL + Auth) — 현재 미연결, mock 데이터 사용
- **GitHub:** https://github.com/JM-potter/The_Workation_app
- **로컬 실행:** `cd workation-app && npm install && npm run dev` → localhost:3000

---

## 폴더 구조

```
workation-app/
├── app/
│   ├── (auth)/               # 로그인/회원가입 관련
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── company-setup/page.tsx
│   ├── (main)/               # 일반 사용자 화면
│   │   ├── page.tsx          # 랜딩
│   │   ├── accommodations/
│   │   │   ├── page.tsx      # 숙소 목록
│   │   │   ├── [id]/page.tsx # 숙소 상세
│   │   │   └── map/page.tsx  # 지도 보기
│   │   ├── booking/
│   │   │   ├── page.tsx      # 예약하기
│   │   │   └── confirm/page.tsx # 예약 완료
│   │   ├── dashboard/page.tsx   # HR 대시보드
│   │   └── calculator/page.tsx  # 비용 계산기
│   ├── admin/                # 운영팀 (adm)
│   │   ├── page.tsx
│   │   ├── accommodations/page.tsx
│   │   ├── bookings/page.tsx
│   │   └── members/page.tsx
│   ├── partner/              # 숙소 운영자 (prt)
│   │   ├── page.tsx
│   │   ├── accommodations/page.tsx
│   │   └── bookings/page.tsx
│   └── gov/                  # 지자체 (gov)
│       └── page.tsx
├── components/ui/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Header.tsx
├── lib/
│   ├── types.ts              # TypeScript 인터페이스
│   └── supabase.ts           # Supabase 클라이언트 (현재 stub)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5가지 사용자 역할

| 역할 | 코드 | 설명 | 주요 화면 |
|------|------|------|-----------|
| HR 담당자 | `hr` | 기업 워케이션 관리 | /dashboard, /calculator |
| 직원 | `emp` | 숙소 검색·예약 | /accommodations, /booking |
| 운영팀 | `adm` | 플랫폼 전체 관리 | /admin/* |
| 파트너 | `prt` | 숙소 운영자 | /partner/* |
| 지자체 | `gov` | 지역 현황 통계 | /gov |

---

## 디자인 시스템 (다크 테마 — 반드시 준수)

### 색상
```
배경:       #0F172A  (bg-[#0F172A])
카드:       #1E293B  (bg-[#1E293B])
카드 내부:  #263548  (bg-[#263548])
테두리:     #334155  (border-[#334155])
텍스트:     #F1F5F9  (text-[#F1F5F9])
보조 텍스트: #94A3B8 (text-[#94A3B8])
흐린 텍스트: #64748B (text-[#64748B])
포인트:     blue-500 (#3B82F6)
```

### 공통 컴포넌트 사용법
```tsx
// Button
<Button variant="primary" size="lg">확인</Button>
// variant: primary | secondary | ghost | danger
// size: sm | md | lg

// Badge
<Badge variant="hr">인사담당자</Badge>
// variant: hr | emp | adm | prt | gov | pending | confirmed | cancelled

// Input
<Input label="이메일" placeholder="example@company.com" error="오류메시지" />

// Header
<Header role="hr" userName="홍길동 팀장" />
```

---

## TypeScript 타입 정의

```typescript
// lib/types.ts
export type UserRole = 'hr' | 'emp' | 'adm' | 'prt' | 'gov'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company_id: string | null
  created_at: string
}

export interface Company {
  id: string
  name: string
  contact_name: string
  employee_count: number
  budget: number
  budget_used: number
  approved: boolean
  created_at: string
}

export interface Accommodation {
  id: string
  name: string
  location: string
  address: string
  lat: number
  lng: number
  price_per_night: number
  wifi: boolean
  workspace: boolean
  images: string[]
  amenities: string[]
  description: string
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  accommodation_id: string
  company_id: string
  start_date: string
  end_date: string
  guests: number
  total_price: number
  status: BookingStatus
  created_at: string
}
```

---

## 코딩 규칙

1. **mock 데이터 우선** — Supabase 연결 전까지 파일 상단에 MOCK 배열 하드코딩
2. **'use client'** — useState, onClick 등 인터랙션 있는 파일 맨 위에 반드시 추가
3. **절대경로** — import 시 `@/components/...`, `@/lib/...` 형식 사용
4. **다크 테마 고정** — 흰색 배경 절대 사용 금지, 위 색상 팔레트만 사용
5. **공통 컴포넌트 재사용** — Button, Badge, Input, Header는 직접 만들지 말고 import해서 사용
6. **한국어 UI** — 모든 텍스트는 한국어로 작성

---

## 현재 개발 상태

- ✅ 전체 화면 뼈대 21개 완성 (mock 데이터)
- ✅ GitHub 업로드 완료
- ❌ Supabase 미연결 (lib/supabase.ts는 stub 상태)
- ❌ 실제 로그인/인증 미구현
- ❌ 실제 예약 기능 미구현

---

## 다음 개발 우선순위

1. **Supabase 프로젝트 생성** → URL, anon key 발급
2. **인증 구현** — 로그인, 회원가입 실제 연동
3. **숙소 데이터** — Supabase DB에 실제 숙소 데이터 입력
4. **예약 기능** — 예약 생성·조회 실제 연동
5. **디자인 개선** — 화면별 세부 UI 개선

---

## 팀 역할 분담

| 역할 | 담당 업무 |
|------|-----------|
| 코더 | 기능 구현, Supabase 연동, 버그 수정 |
| 디자이너 | 화면 UI/UX 개선 요청, 자료 정리 |
| 데이터 | Supabase 세팅, 테스트 데이터 입력, QA |

---

## 나의 역할

나는 이 프로젝트의 **[코더 / 디자이너 / 데이터]** 입니다.
← 본인 역할 하나만 남기고 나머지 지우세요.
