'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const WORK_SEC  = 25 * 60
const BREAK_SEC =  5 * 60
const IDLE_SEC  = 10 * 60
const GOAL_POMODOROS = 4

type Task = {
  id: string
  title: string
  done: boolean
  focusSecs: number
}

function todayKey() {
  return `wk-focus-${new Date().toISOString().slice(0, 10)}`
}

function loadTasks(): Task[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(todayKey()) ?? '[]') } catch { return [] }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(todayKey(), JSON.stringify(tasks))
}

export default function FocusPage() {
  const [tasks,        setTasks]        = useState<Task[]>([])
  const [newTitle,     setNewTitle]     = useState('')
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [phase,        setPhase]        = useState<'work' | 'break'>('work')
  const [remaining,    setRemaining]    = useState(WORK_SEC)
  const [running,      setRunning]      = useState(false)
  const [pomoDone,     setPomoDone]     = useState(0)
  const [idleWarn,     setIdleWarn]     = useState(false)
  const [alibi,        setAlibi]        = useState(false)

  const intervalRef  = useRef<NodeJS.Timeout | null>(null)
  const idleRef      = useRef<NodeJS.Timeout | null>(null)
  const runningRef   = useRef(false)
  runningRef.current = running

  // localStorage 초기 로드
  useEffect(() => { setTasks(loadTasks()) }, [])

  // 태스크 저장
  useEffect(() => { if (tasks.length > 0) saveTasks(tasks) }, [tasks])

  // 알리바이 체크
  useEffect(() => {
    const allDone  = tasks.length > 0 && tasks.every(t => t.done)
    const goalMet  = pomoDone >= GOAL_POMODOROS
    setAlibi(allDone && goalMet)
  }, [tasks, pomoDone])

  // 유휴 감지
  const resetIdle = useCallback(() => {
    setIdleWarn(false)
    if (idleRef.current) clearTimeout(idleRef.current)
    if (runningRef.current) {
      idleRef.current = setTimeout(() => {
        setRunning(false)
        setIdleWarn(true)
      }, IDLE_SEC * 1000)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', resetIdle)
    window.addEventListener('keydown',   resetIdle)
    return () => {
      window.removeEventListener('mousemove', resetIdle)
      window.removeEventListener('keydown',   resetIdle)
      if (idleRef.current) clearTimeout(idleRef.current)
    }
  }, [resetIdle])

  // 타이머 틱
  useEffect(() => {
    if (running) {
      resetIdle()
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            // 사이클 전환
            setPhase(p => {
              if (p === 'work') {
                setPomoDone(d => d + 1)
                // 완료된 태스크에 집중 시간 기록
                setActiveTaskId(id => {
                  if (id) setTasks(ts => ts.map(t => t.id === id ? { ...t, focusSecs: t.focusSecs + WORK_SEC } : t))
                  return id
                })
                setRemaining(BREAK_SEC)
                return 'break'
              } else {
                setRemaining(WORK_SEC)
                return 'work'
              }
            })
            return 0
          }
          if (phase === 'work' && activeTaskId) {
            setTasks(ts => ts.map(t => t.id === activeTaskId ? { ...t, focusSecs: t.focusSecs + 1 } : t))
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (idleRef.current) clearTimeout(idleRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, activeTaskId, resetIdle])

  function addTask() {
    const title = newTitle.trim()
    if (!title) return
    const t: Task = { id: Date.now().toString(), title, done: false, focusSecs: 0 }
    setTasks(prev => { const next = [...prev, t]; saveTasks(next); return next })
    setNewTitle('')
  }

  function toggleDone(id: string) {
    setTasks(ts => { const next = ts.map(t => t.id === id ? { ...t, done: !t.done } : t); saveTasks(next); return next })
  }

  function removeTask(id: string) {
    if (activeTaskId === id) { setRunning(false); setActiveTaskId(null) }
    setTasks(ts => { const next = ts.filter(t => t.id !== id); saveTasks(next); return next })
  }

  function startFocus(id: string) {
    if (running && activeTaskId === id) { setRunning(false); return }
    setActiveTaskId(id)
    setPhase('work')
    setRemaining(WORK_SEC)
    setRunning(true)
    setIdleWarn(false)
  }

  function toggleTimer() {
    if (!activeTaskId) return
    setRunning(r => !r)
    setIdleWarn(false)
  }

  function resetTimer() {
    setRunning(false)
    setPhase('work')
    setRemaining(WORK_SEC)
    setIdleWarn(false)
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  const activeTask   = tasks.find(t => t.id === activeTaskId)
  const doneCount    = tasks.filter(t => t.done).length
  const checkPct     = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0
  const totalFocusMins = Math.floor(tasks.reduce((s, t) => s + t.focusSecs, 0) / 60)
  const circumference = 2 * Math.PI * 54
  const progress = phase === 'work'
    ? ((WORK_SEC - remaining) / WORK_SEC) * circumference
    : ((BREAK_SEC - remaining) / BREAK_SEC) * circumference

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* 알리바이 배너 */}
        {alibi && (
          <div className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-lg">
            <span className="text-3xl">🏖️</span>
            <div>
              <div className="text-white font-black text-lg">알리바이 획득!</div>
              <div className="text-emerald-100 text-sm">오늘 목표를 모두 달성했어요. 지금부터는 진짜 휴식 시간입니다.</div>
            </div>
            <div className="ml-auto text-5xl">✅</div>
          </div>
        )}

        {/* 오늘의 목표 선언 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-black text-lg">📋 오늘의 목표 선언</h2>
            <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full border border-blue-500/20">
              {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mb-4">오늘 완료할 마이크로 산출물을 쪼개서 선언하세요</p>

          {/* 입력 */}
          <div className="flex gap-2 mb-4">
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="예: 기획서 3페이지 초안 완성"
              className="flex-1 text-sm border border-[#E2E8F0] rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 transition-colors"
            />
            <button onClick={addTask}
              className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors">
              + 추가
            </button>
          </div>

          {/* 체크리스트 */}
          {tasks.length === 0 ? (
            <div className="text-center py-6 text-[#94A3B8] text-sm">
              오늘의 할 일을 선언해주세요
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {tasks.map(task => (
                <div key={task.id}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
                    task.done
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : activeTaskId === task.id && running
                        ? 'bg-blue-500/5 border-blue-400/40'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}>
                  <button onClick={() => toggleDone(task.id)}
                    className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                      task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-[#CBD5E1] hover:border-blue-400'
                    }`}>
                    {task.done && <span className="text-xs">✓</span>}
                  </button>

                  <span className={`flex-1 text-sm ${task.done ? 'line-through text-[#94A3B8]' : 'text-[#0F172A]'}`}>
                    {task.title}
                  </span>

                  {task.focusSecs > 0 && (
                    <span className="text-xs text-blue-400 font-medium shrink-0">
                      🍅 {Math.floor(task.focusSecs / 60)}분
                    </span>
                  )}

                  {!task.done && (
                    <button
                      onClick={() => startFocus(task.id)}
                      className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                        activeTaskId === task.id && running
                          ? 'bg-amber-500/20 text-amber-600 hover:bg-amber-500/30'
                          : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                      }`}>
                      {activeTaskId === task.id && running ? '⏸ 일시정지' : '🍅 집중 시작'}
                    </button>
                  )}

                  <button onClick={() => removeTask(task.id)}
                    className="shrink-0 text-[#CBD5E1] hover:text-red-400 transition-colors text-lg leading-none">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 진행률 */}
          {tasks.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-[#94A3B8] mb-1.5">
                <span>체크리스트 달성률</span>
                <span className="font-bold text-[#475569]">{doneCount}/{tasks.length} ({checkPct}%)</span>
              </div>
              <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${checkPct}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* 뽀모도로 타이머 */}
        <div className={`rounded-2xl p-6 mb-6 transition-all ${
          phase === 'work'
            ? 'bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#7c3aed]'
            : 'bg-gradient-to-br from-emerald-600 to-teal-600'
        }`}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">{phase === 'work' ? '🍅' : '☕'}</span>
            <h2 className="font-black text-lg text-white">집중 모드</h2>
            <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30">
              {phase === 'work' ? '딥워크 25분' : '휴식 5분'}
            </span>
            {idleWarn && (
              <span className="ml-auto text-xs bg-amber-400/20 text-amber-200 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                ⚠️ 유휴 감지 — 타이머 일시정지됨
              </span>
            )}
          </div>

          <div className="flex items-center gap-8">
            {/* 원형 타이머 */}
            <div className="relative">
              <svg width="128" height="128" className="-rotate-90">
                <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
                <circle cx="64" cy="64" r="54" fill="none"
                  stroke={phase === 'work' ? '#93c5fd' : '#6ee7b7'}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                  className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-white tabular-nums">{mm}:{ss}</span>
              </div>
            </div>

            {/* 오른쪽 정보 */}
            <div className="flex-1">
              <div className="text-blue-200 text-xs mb-1">현재 집중 태스크</div>
              <div className={`font-bold text-base mb-4 ${activeTask ? 'text-white' : 'text-white/40'}`}>
                {activeTask ? activeTask.title : '태스크를 선택해주세요'}
              </div>

              <div className="flex gap-2 mb-4">
                <button onClick={toggleTimer} disabled={!activeTaskId}
                  className="px-5 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all border border-white/20">
                  {running ? '⏸ 일시정지' : '▶ 시작'}
                </button>
                <button onClick={resetTimer}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl transition-all border border-white/20">
                  ↺ 리셋
                </button>
              </div>

              {/* 뽀모도로 카운터 */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: GOAL_POMODOROS }).map((_, i) => (
                  <span key={i} className={`text-lg transition-all ${i < pomoDone ? 'opacity-100' : 'opacity-30'}`}>
                    🍅
                  </span>
                ))}
                <span className="text-xs text-blue-200 ml-1">{pomoDone}/{GOAL_POMODOROS} 세션</span>
              </div>
            </div>
          </div>

          {/* 유휴 감지 안내 */}
          <div className="mt-4 text-xs text-blue-200/60 flex items-center gap-1">
            <span>🖱️</span>
            <span>마우스·키보드 입력이 10분 없으면 타이머가 자동 일시정지됩니다</span>
          </div>
        </div>

        {/* 오늘의 성과 요약 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
          <h2 className="font-black text-lg mb-4">📊 오늘의 성과</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label:  '체크리스트 달성률',
                value:  `${checkPct}%`,
                sub:    `${doneCount}/${tasks.length}개 완료`,
                color:  checkPct === 100 ? 'text-emerald-500' : 'text-blue-500',
                icon:   '✅',
              },
              {
                label:  '총 딥워크 시간',
                value:  `${totalFocusMins}분`,
                sub:    `${pomoDone}세션 완료`,
                color:  totalFocusMins >= 100 ? 'text-emerald-500' : 'text-purple-500',
                icon:   '🍅',
              },
              {
                label:  '알리바이 상태',
                value:  alibi ? '획득!' : '진행중',
                sub:    alibi ? '자유롭게 즐기세요 🏖️' : `목표: 체크 100% + ${GOAL_POMODOROS}세션`,
                color:  alibi ? 'text-emerald-500' : 'text-amber-500',
                icon:   alibi ? '🏖️' : '⏳',
              },
            ].map(s => (
              <div key={s.label} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className={`text-2xl font-black mb-0.5 ${s.color}`}>{s.value}</div>
                <div className="text-xs font-semibold text-[#475569] mb-0.5">{s.label}</div>
                <div className="text-xs text-[#94A3B8]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 예정 업무 기능 (로드맵) */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🚀</span>
            <h2 className="font-black text-lg">💡 마이 업무 툴 - 추가 예정 기능 로드맵</h2>
          </div>
          <p className="text-xs text-[#94A3B8] mb-6">
            워케이션 임직원의 자율적이고 신뢰성 높은 업무 수행을 위해 곧 도입될 연동 기능입니다.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                title: '🔌 협업 툴 실시간 연동 (API)',
                desc: 'Slack 메시지 전송 빈도, Notion 문서 수정 이력, Github 커밋 수 등 연동된 외부 협업 툴의 활동을 감지해 워케이션 중 실제 업무 수행 상태를 자동으로 증빙합니다.',
                tag: '개발 예정 (CBT)',
                tagColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
              },
              {
                title: '🧾 1-Billing 실시간 지출 청구 (OCR)',
                desc: '워케이션 중 지출한 식비, 교통비, 카페 음료 비용 영수증을 사진 촬영하여 간편 업로드하면 OCR이 가맹점명과 세부 금액을 자동 인식하여 회사의 재무팀으로 즉시 청구 정산합니다.',
                tag: '개발 예정 (CBT)',
                tagColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
              },
              {
                title: '📶 카페/근무지 공유 & 네트워크 품질 체크',
                desc: '현지에서 방문한 카페나 코워킹 스페이스의 인터넷(Wi-Fi) 속도, 소음도, 업무 편의성(콘센트 여부)을 원클릭으로 측정하고 평가하여 동료들에게 최적의 근무지를 실시간으로 공유합니다.',
                tag: '기획 중',
                tagColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
              },
              {
                title: '👥 동료 실시간 현황 위젯',
                desc: '동일한 지역 또는 숙소 인근에서 워케이션을 보내고 있는 다른 부서 팀원들의 현재 상태(집중 모드 중, 휴식 중)와 오늘 목표 달성도를 실시간 소셜 위젯으로 공유하여 유기적으로 소통합니다.',
                tag: '기획 중',
                tagColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
              },
              {
                title: '✍️ AI 일일 업무 보고서 초안 생성 (LLM)',
                desc: '오늘 작성한 마이크로 목표 달성 여부와 뽀모도로 타이머로 수집된 순수 딥워크 집중 데이터를 분석하여, 하루 업무를 마치면 자동으로 보고용 일지/이메일 초안을 인공지능이 완성해 줍니다.',
                tag: '정식 출시 이후',
                tagColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
              },
            ].map((feature, i) => (
              <div key={i} className="border border-[#F1F5F9] rounded-xl p-4 bg-[#F8FAFC]/50 hover:bg-white transition-all duration-200 hover:shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                  <h3 className="font-bold text-sm text-[#0F172A]">{feature.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${feature.tagColor}`}>
                    {feature.tag}
                  </span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
