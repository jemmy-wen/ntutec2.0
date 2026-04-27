'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

/* ── count-up hook ── */
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

/* ── colour variants ── */
type Variant = 'teal' | 'navy' | 'stone'

const VARIANTS: Record<Variant, { bg: string; num: string; unit: string; desc: string }> = {
  teal:  { bg: 'bg-teal',       num: 'text-white',       unit: 'text-white/55',    desc: 'text-white/70' },
  navy:  { bg: 'bg-[#0A192F]',  num: 'text-white',       unit: 'text-white/45',    desc: 'text-white/60' },
  stone: { bg: 'bg-white',      num: 'text-[#0A192F]',   unit: 'text-slate-400',   desc: 'text-slate-500' },
}

interface BentoStatProps {
  value: number
  prefix?: string
  suffix?: string
  unit: string
  desc: string
  variant: Variant
  delay?: number
  className?: string
  large?: boolean
}

function BentoStat({ value, prefix = '', suffix = '', unit, desc, variant, delay = 0, className = '', large = false }: BentoStatProps) {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 1.8, triggered)
  const c = VARIANTS[variant]

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
      className={`flex flex-col justify-between rounded-[20px] p-6 ${c.bg} ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`text-[9px] font-bold uppercase tracking-[0.22em] ${c.unit}`}>{unit}</p>
      <div className="mt-3">
        <div className="flex items-baseline gap-0.5 leading-none">
          {prefix && <span className={`text-xl font-bold ${c.num}`}>{prefix}</span>}
          <span className={`font-extrabold tabular-nums ${large ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'} ${c.num}`}>
            {count.toLocaleString()}
          </span>
          {suffix && <span className={`text-2xl font-bold ${c.num}`}>{suffix}</span>}
        </div>
        <p className={`mt-2 text-sm ${c.desc}`}>{desc}</p>
      </div>
    </motion.div>
  )
}

/* ── section ── */
export default function StatsSection() {
  return (
    <section className="bg-[#F6F5F1] py-14 md:py-20">
      <div className="container">

        {/* Header — same pattern as FocusAreasSection */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <motion.p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45 }}
            >
              Impact
            </motion.p>
            <motion.h2
              className="text-3xl font-bold text-[#181614] md:text-4xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              數字，見證影響力。
            </motion.h2>
          </div>
          <motion.p
            className="max-w-md text-base leading-relaxed text-slate-500 lg:mt-8"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            13 年來累計輔導逾 600 支新創，連結台大研究能量、企業合作夥伴與投資人網絡，陪伴每一支團隊從概念走向市場。
          </motion.p>
        </div>

        {/*
          Desktop bento (md:grid-cols-12, 3 rows)
          ┌──────────────┬───────────┬────────────┐
          │  600+ (5 r2) │  13年 (3) │  35家 (4)  │  row 1
          ├──────────────┼───────────┴────────────┤
          │  600+ cont.  │  photo (4) │  74位 (3) │  row 2
          ├───────┬──────┴──────┬────────┬────────┤
          │ 27期  │  NT$1億+(4) │ 127+(3)│  40+(2)│  row 3
          │  (3)  │             │        │        │
          └───────┴─────────────┴────────┴────────┘
        */}

        {/* Mobile: single-col stack */}
        <div className="flex flex-col gap-3 md:hidden">
          <BentoStat value={600} suffix="+" unit="Startups" desc="累計輔導新創" variant="teal" large />
          <BentoStat value={13}  unit="Years"   desc="年深耕台大創業生態系"   variant="navy" />
          <BentoStat value={35}  unit="Partners" desc="家企業合作夥伴"         variant="stone" />
          <motion.div
            className="relative overflow-hidden rounded-[20px]"
            style={{ height: 200 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/images/events/opening-2026-networking.jpg" alt="台大創創 Networking" fill className="object-cover" sizes="100vw" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">Since 2012</p>
              <p className="mt-1 text-base font-bold text-white">台大創業生態系</p>
            </div>
          </motion.div>
          <BentoStat value={74}  unit="Demo Day 2025" desc="位投資人親赴現場"    variant="navy" />
          <BentoStat value={127} suffix="+" unit="Investors" desc="位投資人與天使網絡" variant="stone" />
          <BentoStat value={27}  unit="Cohorts" desc="期企業垂直加速器"         variant="stone" />
          <BentoStat value={40}  suffix="+" unit="Mentors 2026" desc="位本屆陪跑業師" variant="teal" />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-12 gap-3">

          {/* Photo — col 1-5, row 1-2 (largest block) */}
          <motion.div
            className="relative overflow-hidden rounded-[20px] md:col-span-5 md:row-span-2 min-h-[280px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/events/opening-2026-networking.jpg"
              alt="台大創創 Networking"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 42vw, 560px"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">Since 2012</p>
              <p className="mt-1 text-xl font-bold text-white">台大創業生態系</p>
            </div>
          </motion.div>

          {/* 13年 — navy, col 6-8, row 1 */}
          <BentoStat value={13} unit="Years" desc="年深耕台大創業生態系" variant="navy" delay={0.08} className="md:col-span-3" />

          {/* 35家 — stone, col 9-12, row 1 */}
          <BentoStat value={35} unit="Partners" desc="家企業合作夥伴" variant="stone" delay={0.14} className="md:col-span-4" />

          {/* 74位 — teal, col 6-9, row 2 */}
          <BentoStat value={74} unit="Demo Day 2025" desc="位投資人親赴現場" variant="teal" delay={0.18} className="md:col-span-4" />

          {/* 127+ — navy, col 10-12, row 2 */}
          <BentoStat value={127} suffix="+" unit="Investors" desc="位投資人與天使網絡" variant="navy" delay={0.22} className="md:col-span-3" />

          {/* 600+ — teal, col 1-5, row 3 */}
          <BentoStat
            value={600} suffix="+" unit="Startups" desc="累計輔導新創"
            variant="teal" large delay={0.26}
            className="md:col-span-5"
          />

          {/* 27期 — stone, col 6-8, row 3 */}
          <BentoStat value={27} unit="Cohorts" desc="期企業垂直加速器" variant="stone" delay={0.3} className="md:col-span-3" />

          {/* NT$1億+ — teal, col 4-7, row 3 */}
          <motion.div
            className="flex flex-col justify-between rounded-[20px] p-6 bg-teal md:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">Top Fundraise</p>
            <div className="mt-3">
              <div className="flex items-baseline gap-0.5 leading-none">
                <span className="text-xl font-bold text-white">NT$</span>
                <span className="text-5xl md:text-6xl font-extrabold tabular-nums text-white">1</span>
                <span className="text-2xl font-bold text-white">億<span className="text-lg">+</span></span>
              </div>
              <p className="mt-2 text-sm text-white/70">歷屆校友最高單筆募資</p>
            </div>
          </motion.div>

          {/* 127+ — navy, col 8-10, row 3 */}
          <BentoStat value={127} suffix="+" unit="Investors" desc="位投資人與天使網絡" variant="navy" delay={0.3} className="md:col-span-3" />

          {/* 40+ — stone, col 11-12, row 3 */}
          <BentoStat value={40} suffix="+" unit="Mentors 2026" desc="位本屆陪跑業師" variant="stone" delay={0.34} className="md:col-span-2" />

        </div>

      </div>
    </section>
  )
}
