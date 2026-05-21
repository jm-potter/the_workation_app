import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
  }

  const body = await req.json()
  const {
    companyName,
    accommodationName,
    region,
    startDate,
    endDate,
    participants,
    totalBudget,
    subsidySaved,
    days,
  } = body

  const prompt = `당신은 기업 워케이션 성과를 분석하는 전문 컨설턴트입니다.
아래 워케이션 데이터를 바탕으로 경영진용 성과 리포트 요약을 작성해주세요.

[워케이션 정보]
- 기업명: ${companyName}
- 숙소: ${accommodationName} (${region})
- 기간: ${startDate} ~ ${endDate} (${days}박)
- 참여 인원: ${participants}명
- 총 비용: ${Number(totalBudget).toLocaleString()}원
- 지원금 절감: ${Number(subsidySaved).toLocaleString()}원

[작성 조건]
- 2~3문장으로 간결하게
- 구체적인 수치 포함 (ROI, 참여율, 절감액 등)
- 경영진이 바로 읽을 수 있는 전문적인 어조
- 한국어로 작성
- 마크다운 없이 일반 텍스트

리포트 요약:`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
  return NextResponse.json({ summary: text })
}
