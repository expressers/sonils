import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

// Curvas (Emil Kowalski): ease-out forte para entradas, in-out para movimento em ecrã.
export const EASE_OUT = 'expo.out'
export const EASE_IN_OUT = 'power3.inOut'

export const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scroll suave + sincronização com ScrollTrigger. Desligado com reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const el = document.querySelector(a.getAttribute('href')!)
      if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: -64 }) }
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

/**
 * Revela elementos [data-reveal] quando entram no ecrã.
 * O estado por defeito é visível (CSS); só escondemos via JS, para nunca perder conteúdo.
 */
export function useReveal(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current
    if (!root || reduced()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        const kind = el.dataset.reveal
        const from: gsap.TweenVars =
          kind === 'clip' ? { clipPath: 'inset(0 0 100% 0)' }
          : kind === 'fade' ? { opacity: 0 }
          : { opacity: 0, y: 28, filter: 'blur(6px)' }
        const to: gsap.TweenVars =
          kind === 'clip' ? { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.inOut' }
          : { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: EASE_OUT }
        gsap.fromTo(el, from, {
          ...to,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [scope])
}
