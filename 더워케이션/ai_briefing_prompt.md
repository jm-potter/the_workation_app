# 더 워케이션 — AI 공통 브리핑

> **사용법**
> 새 Claude 대화를 열고 이 파일 전체를 첫 메시지로 붙여넣기.
> Claude가 "알겠어"라고 하면 그때부터 요청 시작.
> **세 명 모두 이 파일을 그대로 쓴다. 맨 아래 역할 줄만 본인 것으로 바꾼다.**

---

지금부터 너는 "더 워케이션(TheWorkation)" 프로젝트의 AI 파트너야.

우리 팀은 3명이 각자 다른 시간에 작업하고, 중간에 한두 번 합치는 방식으로 진행한다.
- **코더** 1명이 모든 화면을 Claude로 만든다.
- **디자인·기획** 1명이 만들어진 화면을 보고 피드백을 주고, 텍스트 내용을 작성한다.
- **데이터·테스트** 1명이 숙소 데이터를 입력하고, 배포된 화면을 테스트한다.

모든 코드가 나중에 하나로 합쳐질 때 충돌이 없으려면 아래 구조를 정확히 따라야 해.

---

## 서비스 소개

**더 워케이션** — 기업 인사담당자가 직원들의 워케이션(일+여행)을 예약하고 예산을 관리하는 B2B 플랫폼.

**사용자 5종류**

| 코드 | 이름 | 하는 일 |
|------|------|---------|
| `hr` | 인사담당자 | 회사 등록, 단체 예약, 예산 관리, 현황 확인 |
| `emp` | 직원 | 숙소 검색, 개인 예약 |
| `adm` | 운영팀 | 숙소 등록, 회원 관리, 전체 모니터링 |
| `prt` | 숙소 파트너 | 추후 추가 예정 |
| `gov` | 지자체 | 추후 추가 예정 |

---

## 기술 스택

```
프레임워크   Next.js 14 (App Router, TypeScript)
스타일       Tailwind CSS
데이터베이스  Supabase (PostgreSQL + Auth + Storage)
지도         카카오맵 API
배포         Vercel
```

---

## 데이터베이스 구조

> 이 구조는 팀 전체 공유. 컬럼 추가·이름 변경은 팀 전체 동의 후에만 가능.

### users
```
id            uuid        PK
email         text        로그인 이메일
name          text        이름
role          text        'hr' | 'emp' | 'adm' | 'prt' | 'gov'
company_id    uuid        FK → companies.id  (hr, emp만 해당, 나머지는 null)
created_at    timestamp
```

### companies
```
id              uuid
name            text        회사명
contact_name    text        담당자 이름
employee_count  integer
budget          integer     워케이션 예산 (원)
budget_used     integer     사용된 예산 (원)
approved        boolean     ADM 승인 여부 (기본값 false)
created_at      timestamp
```

### accommodations
```
id               uuid
name             text        숙소명
location         text        지역 (예: '강원도 강릉')
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
id                uuid
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

> 파일 위치를 임의로 바꾸지 말 것. 각 파일 옆에 담당자가 표시돼 있음.

```
app/
  (auth)/
    login/page.tsx              ← [코더] 로그인
    register/page.tsx           ← [코더] 회원가입
    company-setup/page.tsx      ← [코더] 기업 정보 등록 (HR 전용)
  (main)/
    page.tsx                    ← [코더] 서비스 소개 첫 화면
    accommodations/
      page.tsx                  ← [코더] 숙소 목록 + 필터
      map/page.tsx              ← [코더] 카카오맵 화면
      [id]/page.tsx             ← [코더] 숙소 상세 페이지
    booking/
      page.tsx                  ← [코더] 예약 흐름 3단계
      confirm/page.tsx          ← [코더] 예약 완료 확인
    dashboard/page.tsx          ← [코더] HR 현황판
    calculator/page.tsx         ← [코더] 비용 미리 계산기
  admin/
    page.tsx                    ← [코더] 운영팀 메인
    accommodations/page.tsx     ← [코더] 숙소 등록·관리
    bookings/page.tsx           ← [코더] 전체 예약 목록
    members/page.tsx            ← [코더] 회원 목록

components/
  ui/
    Button.tsx                  ← 공통 버튼
    Card.tsx                    ← 공통 카드
    Header.tsx                  ← 공통 헤더
    Input.tsx                   ← 공통 입력 필드
    Badge.tsx                   ← 공통 뱃지

lib/
  supabase.ts                   ← DB 연결 설정 (절대 수정 금지)
  types.ts                      ← TypeScript 타입 정의
```

---

## 공유 코드 — 이미 만들어져 있음. 새로 만들지 말 것

### `lib/types.ts`
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

### `lib/supabase.ts`
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
3. **공통 컴포넌트**: `components/ui/` 것 먼저 사용. 없으면 새로 만들되 반드시 `components/ui/`에 저장.
4. **스타일**: Tailwind 클래스만. `style={{}}` 인라인 금지.
5. **인터랙션 있는 컴포넌트**: 파일 첫 줄에 `'use client'` 추가.
6. **Supabase 쿼리**: 항상 아래 패턴으로.
   ```typescript
   const { data, error } = await supabase.from('테이블명').select('*')
   if (error) { console.error(error); return }
   ```
7. **환경변수**: 코드에 직접 키 값 쓰지 말 것. `.env.local`에서만 가져옴.

---

## 디자인 규칙

```
전체 배경      bg-[#0F172A]
카드 배경      bg-[#1E293B]
카드 안 배경   bg-[#263548]
테두리         border-[#334155]
기본 텍스트    text-[#F1F5F9]
보조 텍스트    text-[#94A3B8]

HR 강조        text-blue-400 / bg-blue-500
EMP 강조       text-emerald-400 / bg-emerald-500
ADM 강조       text-red-400 / bg-red-500
```

카드·버튼 모서리: `rounded-xl` / 패딩: `p-6` 기본 / 그림자 없음

---

## 역할별 작업 방식

### 코더가 이 브리핑을 쓸 때

UI 디자인은 Claude가 만들어주는 기본 스타일로 먼저 완성한다.
디자인·기획 담당이 나중에 피드백을 주면 그때 수정하면 된다.
작업한 것은 GitHub에 올려두면 나머지 팀원이 확인할 수 있다.

화면 만드는 순서:
1. DB 설정 + 로그인 → GitHub 올리기 (팀원들이 시작 신호로 사용)
2. 숙소 목록·지도·상세
3. 예약 흐름
4. HR 현황판
5. 운영팀 화면
6. 서비스 소개 첫 화면

### 디자인·기획이 이 브리핑을 쓸 때

코더가 올린 배포 URL을 열어서 화면을 보고 피드백을 정리한다.
피드백 형식: "숙소 카드에서 가격이 너무 작게 보여, 크게 해줘" 처럼 구체적으로.
그 외에 직접 할 일:
- 모든 화면에 들어갈 텍스트 내용 작성 (숙소 설명, 서비스 소개 문구 등)
- 발표 자료 제작
- 데모 시나리오 스크립트 작성

### 데이터·테스트가 이 브리핑을 쓸 때

Supabase 대시보드에 직접 접속해서 accommodations 테이블에 숙소 데이터를 입력한다.
코더와 동시에 독립적으로 작업 가능하다.
그 외에 직접 할 일:
- 숙소 10개 이상 데이터 수집 및 입력 (이름·주소·위도·경도·가격·사진URL·편의시설)
- 테스트 계정 생성 (HR 2개, EMP 3개, ADM 1개)
- 배포 URL로 전체 흐름 테스트 후 오류 목록 정리

---

## 합치기 포인트 (2번)

```
1차 합치기   코더가 기본 화면들 완성 후 배포했을 때
             → 셋이 같이 보면서 방향 조정, 피드백 반영

2차 합치기   데모 직전
             → 최종 테스트 + 발표 순서 맞추기
```

---

## 내 역할 (아래에서 본인 것만 남기고 나머지 두 줄 지우기)

```
나는 코더다.
나는 디자인·기획 담당이다.
나는 데이터·테스트 담당이다.
```

위 내용을 모두 숙지했으면 "알겠어, 시작하자" 라고 말해줘.
