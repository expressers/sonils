import { useEffect, useRef } from 'react'
import { gsap, reduced } from '../lib/motion'

const fmt = (n: number, dec: number) => {
  const [i, d] = n.toFixed(dec).split('.')
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (d ? ',' + d : '')
}

/** Número que conta até ao valor quando entra no ecrã. Texto final já está no HTML. */
export function Count({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const dec = value.includes(',') ? value.split(',')[1].length : 0
    const target = parseFloat(value.replace(/\./g, '').replace(',', '.'))
    const o = { v: 0 }
    const tw = gsap.to(o, {
      v: target,
      duration: 1.8,
      ease: 'expo.out',
      paused: true,
      onUpdate: () => { el.textContent = fmt(o.v, dec) },
      onComplete: () => { el.textContent = value },
    })
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.textContent = fmt(0, dec); tw.play(); io.disconnect() }
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); tw.kill() }
  }, [value])
  return <span ref={ref} className={`num ${className ?? ''}`}>{value}</span>
}
