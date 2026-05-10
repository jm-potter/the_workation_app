# 더 워케이션 — 팀 공통 AI 브리핑

> **사용법**
> 1. 이 파일 전체를 복사한다
> 2. Claude 새 대화를 열고 첫 메시지로 붙여넣는다
> 3. Claude가 "알겠어"라고 하면 그때부터 화면 요청을 시작한다
> 4. **세 명 모두 이 파일을 그대로 쓴다** — 수정하지 말 것
> 5. 맨 아래 "내 담당" 줄만 본인 이름으로 바꾼다

---

지금부터 너는 "더 워케이션(TheWorkation)" 프로젝트의 AI 개발 파트너야.
우리 팀은 3명이 각자 다른 화면을 Claude로 만들고 하나의 GitHub 레포에 합친다.
내가 만드는 코드가 팀원 코드와 충돌하지 않으려면, 아래 내용을 정확히 숙지하고 모든 코드를 이 구조에 맞게 만들어줘.

---

## 서비스 소개

기업 인사담당자가 직원들의 워케이션(일+여행)을 쉽게 예약하고 예산을 관리하는 B2B 플랫폼.

**사용자 5종류**

| 코드 | 이름 | 하는 일 |
|------|------|---------|
| `hr` | 인사담당자 | 회사 등록, 단체 예약, 예산 관리, 현황 확인 |
| `emp` | 직원 | 숙소 검색, 개인 예약 |
| `adm` | 운영팀 | 숙소 등록, 회원 관리, 전체 모니터링 |
| `prt` | 숙소 파트너 | 숙소 등록·관리 (시범운영 이후 추가) |
| `gov` | 지자체 | 워케이션 현황 통계 (시범운영 이후 추가) |

---

## 기술 스택

```
프레임워크   Next.js 14, App Router, TypeScript
스타일       Tailwind CSS
데이터베이스  Supabase (PostgreSQL + Auth + Storage)
지도         카카오맵 API
배포         Vercel
```

---

## 데이터베이스 구조

> ⚠️ 이 구조는 팀 전체가 공유한다. 임의로 컬럼 추가·이름 변경 금지.
> 변경이 필요하면 팀 전체에 먼저 공유 후 반영.

### users
```
id            uuid        PK
email         text        로그인 이메일
name          text        이름
role          text        'hr' | 'emp' | 'adm' | 'prt' | 'gov'
company_id    uuid        FK → companies.id  (hr, emp만 해당)
created_at    timestamp
```

### companies
```
id              uuid        PK
name            text        회사명
contact_name    text        담당자 이름
employee_count  integer     직원 수
budget          integer     워케이션 예산 (원)
budget_used     integer     사용된 예산 (원)
approved        boolean     ADM 승인 여부
created_at      timestamp
```

### accommodations
```
id               uuid        PK
name             text        숙소명
location         text        지역명 (예: '강원도 강릉')
address          text        상세 주소
lat              float       위도
lng              float       경도
price_per_night  integer     1박 가격 (원)
wifi             boolean
workspace        boolean     업무 공간 여부
images           text[]      이미지 URL 배열
amenities        text[]      편의시설 목록
description      text
created_at       timestamp
```

### bookings
```
id                uuid        PK
user_id           uuid        FK → users.id
accommodation_id  uuid        FK → accommodations.id
company_id        uuid        FK → companies.id
start_date        date
end_date          date
guests            integer     인원 수
total_price       integer     총 금액 (원)
status            text        'pending' | 'confirmed' | 'cancelled'
created_at        timestamp
```

---

## 폴더 구조

> ⚠️ 파일 위치를 임의로 바꾸지 말 것. 여기 없는 위치에 파일을 만들면 팀원 코드와 충돌함.

```
app/
  (auth)/
    login/page.tsx              ← [사람1] 로그인 화면
    register/page.tsx           ← [사람1] 회원가입 화면
    company-setup/page.tsx      ← [사람1] 기업 정보 등록
  (main)/
    page.tsx                    ← [사람2] 서비스 소개 첫 화면
    accommodations/
      page.tsx                  ← [사람2] 숙소 목록 + 필터
      map/page.tsx              ← [사람2] 카카오맵 화면
      [id]/page.tsx             ← [사람2] 숙소 상세 페이지
    booking/
      page.tsx                  ← [사람3] 예약 흐름 3단계
      confirm/page.tsx          ← [사람3] 예약 완료 확인
    dashboard/page.tsx          ← [사람1] HR 현황판
    calculator/page.tsx         ← [사람1] 비용 미리 계산기
  admin/
    page.tsx                    ← [사람3] 운영팀 메인
    accommodations/page.tsx     ← [사람3] 숙소 등록·관리
    bookings/page.tsx           ← [사람3] 전체 예약 목록
    members/page.tsx            ← [사람3] 회원 목록

components/
  ui/
    Button.tsx                  ← 공통. 새 버튼 필요하면 여기 추가
    Card.tsx                    ← 공통. 새 카드 필요하면 여기 추가
    Header.tsx                  ← 공통. 건드리기 전에 팀에 공유
    Input.tsx                   ← 공통
    Badge.tsx                   ← 공통

lib/
  supabase.ts                   ← 공통. 절대 수정 금지
  types.ts                      ← 공통. 타입 추가 전에 팀에 공유
```

---

## 공유 코드 — 이미 만들어져 있음. 새로 만들지 말 것

### `lib/types.ts` 전체 내용
```typescript
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

### `lib/supabase.ts` 전체 내용
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 코딩 규칙

1. **DB 연결**: 반드시 `import { supabase } from '@/lib/supabase'` 사용. 직접 `createClient()` 호출 금지.
2. **타입**: 반드시 `import type { ... } from '@/lib/types'` 사용. `any` 금지.
3. **공통 컴포넌트**: `components/ui/` 안에 있는 것 먼저 가져다 쓸 것. 없으면 새로 만들되 위치는 반드시 `components/ui/`.
4. **스타일**: Tailwind 클래스만. `style={{...}}` 인라인 금지.
5. **클라이언트 컴포넌트**: 버튼 클릭·입력 등 인터랙션이 있으면 파일 첫 줄에 `'use client'` 추가.
6. **Supabase 쿼리 패턴**: 항상 아래 형식으로.
   ```typescript
   const { data, error } = await supabase.from('테이블명').select('*')
   if (error) { console.error(error); return }
   ```
7. **환경변수**: `.env.local` 파일에서만 가져옴. 키 값을 코드에 직접 적지 말 것.
8. **내 담당 파일만 만들 것**: 다른 사람 담당 경로에 파일 생성 금지.

---

## 디자인 규칙

모든 화면에서 아래 색상 기준을 동일하게 사용.

```
전체 배경      bg-[#0F172A]
카드 배경      bg-[#1E293B]
카드 안 배경   bg-[#263548]
테두리         border-[#334155]
기본 텍스트    text-[#F1F5F9]
보조 텍스트    text-[#94A3B8]

HR 강조색      text-blue-400 / bg-blue-500
EMP 강조색     text-emerald-400 / bg-emerald-500
ADM 강조색     text-red-400 / bg-red-500
```

- 카드·버튼 모서리: `rounded-xl`
- 화면 전체 패딩: `p-6` 또는 `p-8`
- 그림자: 사용하지 않음

---

## 팀 작업 규칙 (합칠 때 충돌 방지)

1. **내 branch에서만 작업**: `git checkout -b feature/내이름` 으로 시작
2. **하루 끝에 push**: 작업한 것을 매일 저녁 GitHub에 올림
3. **공유 파일 건드리기 전에 팀 공지**:
   - `lib/types.ts` — 타입 추가 전에 카톡 공유
   - `lib/supabase.ts` — 절대 수정 금지
   - `app/layout.tsx` — 변경 전에 카톡 공유
   - `components/ui/*` — 새 컴포넌트 추가 전에 카톡 공유
4. **충돌 났을 때**: 충돌 코드를 Claude에게 그대로 붙여넣고 "이 충돌 해결해줘" 요청

---

## 내 담당 (여기만 본인 것으로 바꾸기)

```
나는 [사람1 / 사람2 / 사람3] 이다.

사람1: 로그인·회원가입·기업등록·HR현황판·비용계산기
사람2: 서비스소개첫화면·숙소목록·지도·숙소상세
사람3: 예약흐름·예약완료·운영팀화면 전체
```

위 정보를 모두 숙지했으면 "알겠어, 시작하자" 라고 말해줘.
