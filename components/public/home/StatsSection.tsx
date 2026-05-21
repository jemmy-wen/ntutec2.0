'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

function useCountUp(target: number, duration = 1.8, start = false) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1000 / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [start, target, duration])
  return value
}

function StatBlock({
  value, suffix = '', label, sublabel, bg, numColor, labelColor,
  delay = 0, className = '', numSize = 'text-5xl md:text-6xl',
}: {
  value: number; suffix?: string; label: string; sublabel?: string
  bg: string; numColor: string; labelColor: string
  delay?: number; className?: string; numSize?: string
}) {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 1.8, triggered)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); io.unobserve(el) } },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col justify-between p-5 md:p-6 ${bg} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${labelColor} opacity-60`}>{label}</span>
      <div className="mt-2">
        <div className={`font-extrabold tabular-nums leading-none ${numSize} ${numColor}`}>
          {count.toLocaleString()}{suffix}
        </div>
        {sublabel && <p className={`mt-1.5 text-xs leading-snug ${labelColor} opacity-70`}>{sublabel}</p>}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const [heroTriggered, setHeroTriggered] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroCount = useCountUp(600, 2.2, heroTriggered)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeroTriggered(true); io.unobserve(el) } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="bg-[#F0EFEB] py-14 md:py-20">
      <div className="container">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">

          {/* ── Left: bento grid ── */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 rounded-[20px] overflow-hidden" style={{ minHeight: 360 }}>

            {/* Top row: large green block spanning full width */}
            <StatBlock
              value={600} suffix="+"
              label="Startups"
              sublabel="累計輔導新創團隊"
              bg="bg-[#00C896]"
              numColor="text-white"
              labelColor="text-white"
              delay={0}
              numSize="text-7xl md:text-8xl"
              className="col-span-2 rounded-[16px]"
            />

            {/* Bottom-left: gray */}
            <StatBlock
              value={13}
              label="Years"
              sublabel="深耕台大創業生態系"
              bg="bg-[#E2E1DC]"
              numColor="text-[#181614]"
              labelColor="text-[#181614]"
              delay={0.1}
              numSize="text-5xl md:text-6xl"
              className="rounded-[16px]"
            />

            {/* Bottom-right: two stacked */}
            <div className="flex flex-col gap-3">
              <StatBlock
                value={35}
                label="Partners"
                sublabel="家企業合作夥伴"
                bg="bg-[#F5C842]"
                numColor="text-[#181614]"
                labelColor="text-[#181614]"
                delay={0.14}
                numSize="text-4xl md:text-5xl"
                className="flex-1 rounded-[16px]"
              />
              <StatBlock
                value={27}
                label="Cohorts"
                sublabel="期企業垂直加速器"
                bg="bg-white"
                numColor="text-[#181614]"
                labelColor="text-[#181614]"
                delay={0.18}
                numSize="text-4xl md:text-5xl"
                className="flex-1 rounded-[16px]"
              />
            </div>
          </div>

          {/* ── Right: title + hero number ── */}
          <div className="flex flex-col justify-between py-2 lg:py-4">
            <div>
              <motion.p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45 }}
              >
                Impact
              </motion.p>
              <motion.h2
                className="text-3xl font-bold leading-tight text-[#181614] md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                數字，<br />見證影響力。
              </motion.h2>
              <motion.p
                className="mt-4 max-w-sm text-base leading-relaxed text-slate-500"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                13 年來累計輔導逾 600 支新創，連結台大研究能量、企業合作夥伴與投資人網絡，陪伴每一支團隊從概念走向市場。
              </motion.p>
            </div>

            {/* Hero number */}
            <motion.div
              ref={heroRef}
              className="mt-8 lg:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">Startups Supported</p>
              <div
                className="font-extrabold tabular-nums leading-none text-[#181614]"
                style={{ fontSize: 'clamp(80px, 14vw, 160px)' }}
              >
                {heroCount}+
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── Extra stats row ── */}
        <motion.div
          className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[
            { value: 74,  suffix: '',  label: 'Demo Day 2025', sub: '位投資人親赴現場' },
            { value: 127, suffix: '+', label: 'Investors',     sub: '位投資人與天使網絡' },
            { value: 40,  suffix: '+', label: 'Mentors 2026',  sub: '位本屆陪跑業師' },
            { value: 1,   suffix: '億+', label: 'Top Fundraise', sub: '歷屆校友最高單筆募資 NT$' },
          ].map((s, i) => (
            <StatBlock
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              sublabel={s.sub}
              bg="bg-white"
              numColor="text-[#181614]"
              labelColor="text-[#181614]"
              delay={0.05 * i}
              numSize="text-3xl md:text-4xl"
              className="rounded-[16px]"
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
