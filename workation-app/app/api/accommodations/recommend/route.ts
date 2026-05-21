import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
  }

  const { people, style, budget, days, accommodations, subsidies } = await req.json()

  const accomText = accommodations
    .map((a: any, i: number) => {
      const subsidy = subsidies
        .filter((s: any) => a.region?.includes(s.region) || s.region?.includes(a.region?.split(' ')[0]))
        .reduce((sum: number, s: any) => sum + s.amount_per_person, 0)
      return `[${i + 1}] ID:${a.id} | ${a.name} | ${a.region} | ${a.price_per_night.toLocaleString()}원/박 | 정원${a.capacity || '?'}명 | 평점${a.rating || '-'} | 태그:${(a.tags || []).join(',')} | 편의:${(a.amenities || []).slice(0, 4).join(',')} | 지원금:${subsidy > 0 ? `1인당 ${subsidy.toLocaleString()}원` : '없음'}`
    })
    .join('\n')

  const prompt = `당신은 기업 워케이션 전문 컨설턴트입니다. 아래 조건에 맞는 최적의 숙소 TOP 3를 추천해주세요.

[팀 조건]
- 인원: ${people}명
- 스타일: ${style} (집중=업무집중/조용한환경, 힐링=자연/휴식, 팀빌딩=단체활동/소통, 액티비티=야외활동/체험)
- 예산: 1인당 ${budget ? `${budget.toLocaleString()}원/일` : '제한 없음'}
- 기간: ${days || 2}박

[등록된 숙소 목록]
${accomText}

[답변 형식] 반드시 아래 JSON 형식으로만 답변하세요. 다른 텍스트 없이 JSON만:
{
  "recommendations": [
    {"id": "숙소ID", "rank": 1, "reason": "20자 이내 핵심 추천 이유"},
    {"id": "숙소ID", "rank": 2, "reason": "20자 이내 핵심 추천 이유"},
    {"id": "숙소ID", "rank": 3, "reason": "20자 이내 핵심 추천 이유"}
  ],
  "summary": "팀 조건에 맞는 50자 이내 종합 추천 코멘트"
}`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text.trim() : '{}'

  try {
    const parsed = JSON.parse(text)
    return NextResponse.json(parsed)
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return NextResponse.json(JSON.parse(jsonMatch[0]))
    }
    return NextResponse.json({ error: 'AI 응답 파싱 실패', raw: text }, { status: 500 })
  }
}
