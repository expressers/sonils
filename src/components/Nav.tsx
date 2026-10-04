import { useEffect, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { nav } from '../data'
import { Logo } from './Media'

/** Navegação partilhada; cada proposta estiliza via className. */
export function Nav({ className, cta = 'Contactar' }: { className: string; cta?: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const s = document.createElement('div')
    s.style.cssText = 'position:absolute;top:80px;height:1px;width:1px;pointer-events:none'
    document.body.prepend(s)
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
    io.observe(s)
    return () => { io.disconnect(); s.remove() }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`${className} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <a href="#top" className="nav-logo" aria-label="SONILS, início">
        <Logo size={40} />
        <span className="nav-word">SONILS</span>
      </a>
      <nav className="nav-links" aria-label="Principal">
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
      </nav>
      <div className="nav-end">
        <a className="nav-portal" href="https://www.sonils.co.ao/portal-do-cliente/">Portal do cliente</a>
        <a className="btn nav-cta" href="#contactos" onClick={() => setOpen(false)}>{cta}</a>
        <button className="nav-burger" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>
    </header>
  )
}
