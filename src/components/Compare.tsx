import { useRef, useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { M } from '../data'

/** Comparador antes/depois com clip-path (sem elementos extra a medir). */
export function Compare({ a, b, className }: { a: string; b: string; className?: string }) {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const drag = useRef(false)

  const move = (clientX: number) => {
    const r = box.current!.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={box}
      className={`cmp ${className ?? ''}`}
      onPointerDown={(e) => { drag.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX) }}
      onPointerMove={(e) => drag.current && move(e.clientX)}
      onPointerUp={() => { drag.current = false }}
      onPointerCancel={() => { drag.current = false }}
    >
      <img src={M(`sat/${b}.jpg`)} alt={`A base em ${b}`} draggable={false} />
      <img src={M(`sat/${a}.jpg`)} alt={`A base em ${a}`} draggable={false} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <span className="cmp-y cmp-a">{a}</span>
      <span className="cmp-y cmp-b">{b}</span>
      <div className="cmp-handle" style={{ left: `${pos}%` }} aria-hidden="true"><span><CaretLeft size={14} weight="bold" /><CaretRight size={14} weight="bold" /></span></div>
      <input
        className="cmp-range"
        type="range" min={0} max={100} value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparar ${a} com ${b}`}
      />
    </div>
  )
}
