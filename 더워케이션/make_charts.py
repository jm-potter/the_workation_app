import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
from matplotlib.font_manager import FontProperties
import matplotlib.font_manager as fm
import numpy as np

# ── 폰트 ──
FONT_REG  = FontProperties(fname='/usr/share/fonts/truetype/nanum/NanumSquare_acR.ttf')
FONT_BOLD = FontProperties(fname='/usr/share/fonts/truetype/nanum/NanumSquare_acEB.ttf')

fm.fontManager.addfont('/usr/share/fonts/truetype/nanum/NanumSquare_acR.ttf')
fm.fontManager.addfont('/usr/share/fonts/truetype/nanum/NanumSquare_acEB.ttf')
plt.rcParams['font.family'] = 'NanumSquare_ac'
plt.rcParams['axes.unicode_minus'] = False

# ── 팔레트 ──
NAVY   = '#1B3A5C'
BLUE   = '#2563EB'
LBLUE  = '#EFF6FF'
ORANGE = '#EA580C'
LORANG = '#FFF7ED'
GREEN  = '#16A34A'
LGREEN = '#F0FDF4'
LGRAY  = '#F1F5F9'
MGRAY  = '#94A3B8'
TEXT   = '#0F172A'
SUB    = '#64748B'
WHITE  = '#FFFFFF'
BORDER = '#E2E8F0'


# ════════════════════════════════════════════
# ② 갭 차트
# ════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(11, 6))
fig.patch.set_facecolor(WHITE)
ax.set_facecolor(WHITE)
ax.set_xlim(0, 11); ax.set_ylim(0, 6)
ax.axis('off')

# 헤더
ax.text(5.5, 5.65, '왜 기업은 워케이션을 도입하지 않는가', ha='center',
        fontproperties=FONT_BOLD, fontsize=17, color=TEXT)
ax.text(5.5, 5.15, '수요는 넘치지만, 기업을 움직이게 할 이유가 없었다',
        ha='center', fontproperties=FONT_REG, fontsize=11, color=SUB)

# ─ 왼쪽 카드 (90%) ─
lbox = FancyBboxPatch((0.4, 0.8), 4.2, 3.9,
                      boxstyle='round,pad=0.15',
                      facecolor=LBLUE, edgecolor=BLUE, linewidth=2)
ax.add_patch(lbox)
ax.text(2.5, 4.0, '90', ha='center', fontproperties=FONT_BOLD, fontsize=72, color=BLUE)
ax.text(3.55, 3.9, '%', ha='left', fontproperties=FONT_BOLD, fontsize=32, color=BLUE, va='center')
ax.text(2.5, 2.85, '워케이션을 희망하는 직장인', ha='center',
        fontproperties=FONT_BOLD, fontsize=12, color=TEXT)
ax.text(2.5, 2.35, 'n=1,112명 조사', ha='center',
        fontproperties=FONT_REG, fontsize=10, color=SUB)
ax.text(2.5, 1.2, '대한상공회의소 (2023)', ha='center',
        fontproperties=FONT_REG, fontsize=8.5, color=MGRAY)

# ─ 가운데 갭 표시 ─
ax.text(5.5, 3.35, '▼', ha='center', fontsize=9, color=MGRAY)
gap_box = FancyBboxPatch((4.75, 2.6), 1.5, 1.2,
                         boxstyle='round,pad=0.1',
                         facecolor=NAVY, edgecolor='none')
ax.add_patch(gap_box)
ax.text(5.5, 3.38, '70%p', ha='center', fontproperties=FONT_BOLD,
        fontsize=14, color=WHITE)
ax.text(5.5, 2.95, '갭', ha='center', fontproperties=FONT_REG,
        fontsize=11, color=LGRAY)
ax.text(5.5, 2.45, '▲', ha='center', fontsize=9, color=MGRAY)

# ─ 오른쪽 카드 (19.9%) ─
rbox = FancyBboxPatch((6.4, 0.8), 4.2, 3.9,
                      boxstyle='round,pad=0.15',
                      facecolor=LORANG, edgecolor=ORANGE, linewidth=2)
ax.add_patch(rbox)
ax.text(8.5, 4.0, '19.9', ha='center', fontproperties=FONT_BOLD, fontsize=66, color=ORANGE)
ax.text(9.98, 3.9, '%', ha='left', fontproperties=FONT_BOLD, fontsize=28, color=ORANGE, va='center')
ax.text(8.5, 2.85, '실제 기업 워케이션 도입률', ha='center',
        fontproperties=FONT_BOLD, fontsize=12, color=TEXT)
ax.text(8.5, 2.35, '전국 기업 실태조사', ha='center',
        fontproperties=FONT_REG, fontsize=10, color=SUB)
ax.text(8.5, 1.2, '대한상공회의소 (2023)', ha='center',
        fontproperties=FONT_REG, fontsize=8.5, color=MGRAY)

# 하단 메시지
msg_box = FancyBboxPatch((0.4, 0.1), 10.2, 0.6,
                         boxstyle='round,pad=0.08',
                         facecolor=LGRAY, edgecolor='none')
ax.add_patch(msg_box)
ax.text(5.5, 0.42, '문제는 수요 부재가 아님 — 기업에 도입할 이유를 제공한 플랫폼이 없었음',
        ha='center', fontproperties=FONT_BOLD, fontsize=10.5, color=NAVY)

plt.savefig('/home/jovyan/work/chart_gap.png', dpi=200, bbox_inches='tight', facecolor=WHITE)
plt.close()
print("② 완료")


# ════════════════════════════════════════════
# ③ TAM/SAM/SOM/LAM
# ════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(12, 6.5))
fig.patch.set_facecolor(WHITE)
ax.set_facecolor(WHITE)
ax.axis('off')

data = [
    ('TAM', '글로벌 기업 리트릿 시장', '약 43조원', '#2563EB', 1.0,  'Allied Market Research (2024)'),
    ('SAM', '국내 기업 복지 워케이션 시장', '약 1조원',   '#16A34A', 0.7,  '현대이지웰 IR'),
    ('SOM', '수도권 벤처·스타트업 시장', '약 1,000억원','#D97706', 0.48, '중소벤처기업부 (2024)'),
    ('LAM', '초기 진입 시장 (1년차)', '약 12억원',    '#DC2626', 0.3,  '수도권 IT스타트업 150개사'),
]

ax.text(6, 6.7, '목표 시장 규모', ha='center', fontproperties=FONT_BOLD, fontsize=18, color=TEXT)
ax.text(6, 6.2, 'TAM → SAM → SOM → LAM 단계별 진입 전략',
        ha='center', fontproperties=FONT_REG, fontsize=11, color=SUB)

bar_h = 0.72
gap   = 0.22
total = len(data)
max_w = 9.5

for i, (label, desc, amount, color, ratio, source) in enumerate(data):
    y = 5.0 - i * (bar_h + gap)
    w = max_w * ratio
    x0 = 1.5

    # 배경 트랙
    track = FancyBboxPatch((x0, y - bar_h/2), max_w, bar_h,
                           boxstyle='round,pad=0.05',
                           facecolor=LGRAY, edgecolor='none')
    ax.add_patch(track)

    # 실제 바
    bar = FancyBboxPatch((x0, y - bar_h/2), w, bar_h,
                         boxstyle='round,pad=0.05',
                         facecolor=color, edgecolor='none', alpha=0.92)
    ax.add_patch(bar)

    # 레이블 (왼쪽 밖)
    ax.text(x0 - 0.15, y, label, ha='right', va='center',
            fontproperties=FONT_BOLD, fontsize=13, color=color)

    # 설명 (바 안)
    ax.text(x0 + 0.25, y + 0.08, desc, ha='left', va='center',
            fontproperties=FONT_BOLD, fontsize=10.5, color=WHITE)
    ax.text(x0 + 0.25, y - 0.2, source, ha='left', va='center',
            fontproperties=FONT_REG, fontsize=8, color='#E2E8F0')

    # 금액 (오른쪽)
    ax.text(x0 + w + 0.15, y, amount, ha='left', va='center',
            fontproperties=FONT_BOLD, fontsize=13, color=color)

ax.set_xlim(0, 13); ax.set_ylim(1.8, 7.2)

# 하단 인사이트
ins = FancyBboxPatch((1.5, 2.0), 9.5, 0.55,
                     boxstyle='round,pad=0.08',
                     facecolor=NAVY, edgecolor='none')
ax.add_patch(ins)
ax.text(6.25, 2.3, '이 시장의 성장은 민간 수요가 아닌 정부 예산 공급이 결정 — 연간 1조원이 이미 편성됨',
        ha='center', va='center', fontproperties=FONT_BOLD, fontsize=10, color=WHITE)

plt.savefig('/home/jovyan/work/chart_market.png', dpi=200, bbox_inches='tight', facecolor=WHITE)
plt.close()
print("③ 완료")


# ════════════════════════════════════════════
# ④ B2B2G 구조도
# ════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(13, 6))
fig.patch.set_facecolor(WHITE)
ax.set_facecolor(WHITE)
ax.set_xlim(0, 13); ax.set_ylim(0, 6)
ax.axis('off')

ax.text(6.5, 5.65, 'B2B2G 서비스 구조', ha='center',
        fontproperties=FONT_BOLD, fontsize=17, color=TEXT)
ax.text(6.5, 5.15, '지자체의 미집행 예산 → 플랫폼 → 기업 → 임직원 → 지방 경제 활성화',
        ha='center', fontproperties=FONT_REG, fontsize=11, color=SUB)

nodes = [
    ('지자체',      '8,190억원\n미집행 예산',     '#1B3A5C', WHITE),
    ('더 워케이션', '가치 증명\n+ 실행 자동화',   '#2563EB', WHITE),
    ('기업',        '도입 결정\n비용 0원',         '#16A34A', WHITE),
    ('임직원',      '자율 숙소\n선택·체류',        '#D97706', WHITE),
    ('지방',        '생활인구 유입\n세수 회복',    '#DC2626', WHITE),
]

box_w = 1.9
box_h = 2.0
spacing = 2.45
start_x = 0.55
y_center = 2.5

for i, (title, sub, color, fg) in enumerate(nodes):
    x = start_x + i * spacing
    is_platform = (i == 1)
    lw = 3 if is_platform else 1.5

    outer = FancyBboxPatch((x, y_center - box_h/2 - 0.12), box_w + 0.24, box_h + 0.24,
                           boxstyle='round,pad=0.0',
                           facecolor=color if is_platform else 'none',
                           edgecolor=color, linewidth=lw, alpha=0.15 if not is_platform else 1.0)
    if is_platform:
        outer.set_alpha(1.0)
    ax.add_patch(outer)

    inner = FancyBboxPatch((x, y_center - box_h/2), box_w, box_h,
                           boxstyle='round,pad=0.1',
                           facecolor=color, edgecolor='none')
    ax.add_patch(inner)

    ax.text(x + box_w/2, y_center + 0.42, title, ha='center', va='center',
            fontproperties=FONT_BOLD, fontsize=13, color=fg)

    for j, line in enumerate(sub.split('\n')):
        ax.text(x + box_w/2, y_center - 0.18 - j*0.42, line, ha='center', va='center',
                fontproperties=FONT_REG, fontsize=10, color=fg, alpha=0.9)

    # 화살표
    if i < len(nodes) - 1:
        ax_x = x + box_w + 0.1
        ax.annotate('', xy=(ax_x + 0.34, y_center), xytext=(ax_x, y_center),
                    arrowprops=dict(arrowstyle='->', color=MGRAY,
                                   lw=2.0, mutation_scale=18))

# 하단 플로우 레이블
flow_labels = ['예산 집행', '연결·자동화', '도입·실행', '체류·소비']
for i, lbl in enumerate(flow_labels):
    x = start_x + box_w + 0.05 + i * spacing
    ax.text(x, y_center - box_h/2 - 0.5, lbl, ha='center',
            fontproperties=FONT_REG, fontsize=9, color=MGRAY)

# 하단 바
ins = FancyBboxPatch((0.3, 0.12), 12.4, 0.52,
                     boxstyle='round,pad=0.08', facecolor=LGRAY, edgecolor='none')
ax.add_patch(ins)
ax.text(6.5, 0.39,
        '지자체는 예산을 집행하고 ㅣ 기업은 비용 없이 도입하고 ㅣ 임직원은 지방으로 이동하고 ㅣ 지방은 살아남는다',
        ha='center', va='center', fontproperties=FONT_BOLD, fontsize=10, color=NAVY)

plt.savefig('/home/jovyan/work/chart_flow.png', dpi=200, bbox_inches='tight', facecolor=WHITE)
plt.close()
print("④ 완료")


# ════════════════════════════════════════════
# ⑥ 4단계 로드맵
# ════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(14, 6.5))
fig.patch.set_facecolor(WHITE)
ax.set_facecolor(WHITE)
ax.set_xlim(0, 14); ax.set_ylim(0, 6.5)
ax.axis('off')

ax.text(7, 6.15, '4단계 글로벌 성장 로드맵', ha='center',
        fontproperties=FONT_BOLD, fontsize=17, color=TEXT)
ax.text(7, 5.65, '지방소멸 해결 → 국내 표준 → 글로벌 인바운드 → 아웃바운드',
        ha='center', fontproperties=FONT_REG, fontsize=11, color=SUB)

stages = [
    ('1단계',  '0 ~ 1년차',    '강원 내륙 MVP',
     ['정선·영월·평창 지자체 MOU', 'HR 핀셋 마케팅', 'GMV 12억원'],
     '#2563EB', 0.8),
    ('2단계',  '1 ~ 3년차',    '전국 확장',
     ['89개 인구감소지역 B2G', '대기업 ESG 세일즈', 'GMV 50억원'],
     '#16A34A', 3.3),
    ('3단계',  '3 ~ 5년차',    '글로벌 인바운드',
     ['Stripe 연동', '영문 리포트 자동발행', '일본 시장 진입'],
     '#D97706', 5.8),
    ('4단계',  '5년차 이후',   '글로벌 아웃바운드',
     ['동아시아·동남아 파트너십', '원화 단일 정산', 'GMV 1,000억원'],
     '#7C3AED', 8.3),
]

line_y = 3.2
ax.plot([0.6, 13.4], [line_y, line_y], color=BORDER, lw=2.5, zorder=1)

for title, period, name, bullets, color, cx in stages:
    # 타임라인 점
    ax.scatter([cx + 1.3], [line_y], s=180, color=color, zorder=3)
    ax.scatter([cx + 1.3], [line_y], s=60,  color=WHITE,  zorder=4)

    # 카드 (위아래 교차)
    card_y = 3.75
    bullet_y_start = 4.9

    card = FancyBboxPatch((cx, card_y), 2.6, 1.7,
                          boxstyle='round,pad=0.12',
                          facecolor=color, edgecolor='none')
    ax.add_patch(card)

    ax.text(cx + 1.3, card_y + 1.32, title, ha='center', va='center',
            fontproperties=FONT_BOLD, fontsize=13, color=WHITE)
    ax.text(cx + 1.3, card_y + 0.95, period, ha='center', va='center',
            fontproperties=FONT_REG, fontsize=9, color='#E2E8F0')
    ax.text(cx + 1.3, card_y + 0.55, name, ha='center', va='center',
            fontproperties=FONT_BOLD, fontsize=11, color=WHITE)

    # 연결선
    ax.plot([cx + 1.3, cx + 1.3], [line_y, card_y], color=color, lw=1.5,
            linestyle='--', alpha=0.5, zorder=2)

    # 하단 불릿
    for j, b in enumerate(bullets):
        by = line_y - 0.55 - j * 0.52
        ax.text(cx + 0.15, by, '·', fontproperties=FONT_BOLD,
                fontsize=13, color=color, va='center')
        ax.text(cx + 0.35, by, b, fontproperties=FONT_REG,
                fontsize=9.5, color=TEXT, va='center')

# 하단 바
ins = FancyBboxPatch((0.4, 0.1), 13.2, 0.52,
                     boxstyle='round,pad=0.08', facecolor=NAVY, edgecolor='none')
ax.add_patch(ins)
ax.text(7, 0.37,
        '동일한 지방소멸 문제를 가진 일본 → 동남아로 구조를 그대로 이식',
        ha='center', va='center', fontproperties=FONT_BOLD, fontsize=10.5, color=WHITE)

plt.savefig('/home/jovyan/work/chart_roadmap.png', dpi=200, bbox_inches='tight', facecolor=WHITE)
plt.close()
print("⑥ 완료")

print("\n전체 완료 ✓")
