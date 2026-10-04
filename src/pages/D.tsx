import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Phone } from '@phosphor-icons/react'
import {
  hero, figures, services, satellite, fields, recentOps, safety, people, news,
  contacts, access, address, validarNota, M,
} from '../data'
import { Media, Logo } from '../components/Media'
import { Nav } from '../components/Nav'
import { Switcher } from '../components/Switcher'
import { gsap, ScrollTrigger, useSmoothScroll, reduced } from '../lib/motion'
import './d.css'

const statement =
  'Em 1995, Angola decidiu construir em terra a base de que o offshore precisava. Trinta anos depois, é por aqui que passa a logística dos grandes campos de águas profundas.'

// Posições aproximadas no panorama oficial (esquerda para a direita), segundo a planta da SONILS.
const panMarks = [
  { x: 9, title: 'Porto comercial de Luanda', text: 'A base nasceu ao lado do principal porto do país.' },
  { x: 27, title: 'Centro inicial, 1995', text: 'O primeiro aterro e os primeiros cais de apoio offshore.' },
  { x: 47, title: 'Primeira expansão', text: 'Novos lotes para operadores e empresas de serviços.' },
  { x: 66, title: 'Segunda expansão', text: 'A frente de mar estende-se para nascente.' },
  { x: 86, title: 'Terceira expansão', text: 'A base ganha a forma contínua que tem hoje.' },
]

export default function D() {
  const root = useRef<HTMLDivElement>(null)
  const maskText = useRef<SVGTextElement>(null)
  const [year, setYear] = useState(0)
  const [fig, setFig] = useState(0)
  const [portrait] = useState(() => typeof window !== 'undefined' && window.innerWidth < window.innerHeight * 0.9)
  const VW = portrait ? 900 : 1600, VH = portrait ? 1600 : 900
  useSmoothScroll()

  useEffect(() => {
    document.title = 'SONILS | Cinematográfica'
    let ctx: gsap.Context | undefined
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        const rm = reduced()

        // 1. Abertura: barras de cinema abrem, o nome SONILS é uma janela para o mar.
        const t = maskText.current!
        const box = t.getExtentOfChar(3) // o "I": haste vertical
        const ox = box.x + box.width / 2
        const oy = box.y + box.height * 0.55
        if (rm) gsap.set('.d-bar i', { scaleY: 0.16 })
        else {
          gsap.fromTo('.d-bar i', { scaleY: 1 }, { scaleY: 0.16, duration: 1.8, ease: 'power4.inOut', delay: 0.35 })
          gsap.from(t, { opacity: 0, duration: 1.6, ease: 'power2.out', delay: 0.9 })
        }
        gsap.timeline({
          scrollTrigger: { trigger: '.d-open', start: 'top top', end: '+=160%', scrub: 1, pin: true },
        })
          .to(t, { scale: 90, svgOrigin: `${ox} ${oy}`, ease: 'power2.in', duration: 1 })
          .to('.d-mask', { opacity: 0, duration: 0.1 }, 0.92)
          .to('.d-bar', { opacity: 0, duration: 0.3 }, 0)
          .fromTo('.d-open-video', { scale: 1.25 }, { scale: 1, ease: 'none', duration: 1 }, 0)
          .fromTo('.d-open-copy > *', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.35, ease: 'power3.out' }, 0.85)

        // 2. Declaração: as palavras acendem com o scroll.
        gsap.fromTo('.d-st .w', { opacity: 0.12 }, {
          opacity: 1, stagger: 0.05, ease: 'none',
          scrollTrigger: { trigger: '.d-st', start: 'top 70%', end: 'bottom 55%', scrub: true },
        })

        // 3. Panorama: travelling lateral sobre a base real.
        const track = document.querySelector<HTMLElement>('.d-pan-track')!
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: { trigger: '.d-pan', start: 'top top', end: () => `+=${track.scrollWidth - window.innerWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true },
        })

        // 4. Time-lapse de satélite.
        ScrollTrigger.create({
          trigger: '.d-tl', start: 'top top', end: '+=220%', pin: true, scrub: true,
          onUpdate: (s) => setYear(Math.min(satellite.length - 1, Math.floor(s.progress * satellite.length))),
        })
        gsap.fromTo('.d-tl-frame', { scale: 0.86 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.d-tl', start: 'top bottom', end: 'top top', scrub: true } })

        // 5. Números, um de cada vez, em ecrã inteiro.
        ScrollTrigger.create({
          trigger: '.d-figs', start: 'top top', end: `+=${figures.length * 70}%`, pin: true, scrub: true,
          onUpdate: (s) => setFig(Math.min(figures.length - 1, Math.floor(s.progress * figures.length))),
        })

        // 6. Serviços empilhados: cada cartão recua quando o seguinte chega.
        gsap.utils.toArray<HTMLElement>('.d-card').forEach((c, i, all) => {
          if (i === all.length - 1) return
          gsap.fromTo(c, { scale: 1, filter: 'brightness(1)' }, {
            scale: 0.92, filter: 'brightness(0.9)', ease: 'none',
            scrollTrigger: { trigger: all[i + 1], start: 'top bottom', end: 'top 12%', scrub: true },
          })
        })

        // 7. A planta oficial: aproximação lenta.
        gsap.fromTo('.d-plan img', { scale: 1 }, { scale: 1.6, xPercent: -8, ease: 'none', scrollTrigger: { trigger: '.d-plan', start: 'top top', end: '+=120%', scrub: true, pin: true } })
        gsap.fromTo('.d-plan-cap', { opacity: 0, y: 30 }, { opacity: 1, y: 0, scrollTrigger: { trigger: '.d-plan', start: 'top 40%', end: 'top top', scrub: true } })

        // 8. Campos em movimento contrário.
        gsap.utils.toArray<HTMLElement>('.d-row').forEach((r, i) => {
          gsap.fromTo(r, { xPercent: i % 2 ? -30 : 0 }, { xPercent: i % 2 ? 0 : -30, ease: 'none', scrollTrigger: { trigger: '.d-fields', start: 'top bottom', end: 'bottom top', scrub: true } })
        })

        // 9. Pessoas: a imagem abre de janela a ecrã inteiro.
        gsap.fromTo('.d-people-img', { clipPath: 'inset(22% 30% 22% 30%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.d-people', start: 'top top', end: '+=100%', scrub: true, pin: true } })
        gsap.fromTo('.d-people-copy', { opacity: 0, y: 40 }, { opacity: 1, y: 0, scrollTrigger: { trigger: '.d-people', start: 'top -60%', end: 'top -95%', scrub: true } })

        // Revelações simples
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          if (rm) return
          gsap.from(el, { opacity: 0, y: 30, filter: 'blur(8px)', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        })
        ScrollTrigger.refresh()
      }, root)
    })
    return () => { cancelled = true; ctx?.revert() }
  }, [])

  const f = figures[fig]

  return (
    <div ref={root} className="pd" id="top">
      <Nav className="nav d-nav" />

      {/* 1. ABERTURA */}
      <section className="d-open" aria-label="SONILS">
        <div className="d-open-video"><Media src="video/hero-psv" priority /></div>
        <svg className="d-mask" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <mask id="d-mask-m" maskUnits="userSpaceOnUse" x="-4000" y="-4000" width="9600" height="8900">
              <rect x="-4000" y="-4000" width="9600" height="8900" fill="#fff" />
              {portrait ? (
                <text ref={maskText} textAnchor="middle" className="d-mask-word d-mask-p">
                  <tspan x={VW / 2} y={740}>SON</tspan>
                  <tspan x={VW / 2} y={980}>ILS</tspan>
                </text>
              ) : (
                <text ref={maskText} x={VW / 2} y={540} textAnchor="middle" className="d-mask-word">SONILS</text>
              )}
            </mask>
          </defs>
          <rect x="-4000" y="-4000" width="9600" height="8900" fill="#fbfbf9" mask="url(#d-mask-m)" />
        </svg>
        <div className="d-bar d-bar-t" aria-hidden="true"><i /></div>
        <div className="d-bar d-bar-b" aria-hidden="true"><i /></div>
        <div className="d-open-copy">
          <h1>{hero.title}</h1>
          <p>{hero.sub}</p>
          <div className="d-ctas">
            <a className="btn d-btn-y" href="#contactos">{hero.primary} <ArrowRight size={18} weight="bold" /></a>
            <a className="btn d-btn-w" href="#base">{hero.secondary}</a>
          </div>
        </div>
      </section>

      {/* 2. DECLARAÇÃO */}
      <section className="d-st" id="base">
        <p aria-label={statement}>
          {statement.split(' ').map((w, i) => <span key={i} className="w" aria-hidden="true">{w} </span>)}
        </p>
      </section>

      {/* 3. PANORAMA */}
      <section className="d-pan" aria-label="Panorama da base SONILS">
        <div className="d-pan-track">
          <img src={M('img/panorama.jpg')} alt="Vista aérea panorâmica da base SONILS na frente marítima de Luanda" />
          {panMarks.map((m) => (
            <div key={m.title} className="d-pan-mark" style={{ left: `${m.x}%` }}>
              <span className="d-pin" />
              <div><strong>{m.title}</strong><span>{m.text}</span></div>
            </div>
          ))}
        </div>
        <p className="d-pan-cap">A base SONILS, Luanda. Fotografia aérea oficial.</p>
      </section>

      {/* 4. TIME-LAPSE */}
      <section className="d-tl" aria-label="Crescimento da base por satélite">
        <div className="d-tl-frame">
          {satellite.map((y, i) => (
            <img key={y} src={M(`sat/${y}.jpg`)} alt="" style={{ opacity: i <= year ? 1 : 0 }} loading="lazy" />
          ))}
          <div className="d-tl-year num" aria-live="polite">{satellite[year]}</div>
          <div className="d-tl-bar"><span style={{ transform: `scaleX(${(year + 1) / satellite.length})` }} /></div>
        </div>
        <p className="d-tl-cap">Construída a partir do mar. Imagens de satélite do vídeo institucional SONILS.</p>
      </section>

      {/* 5. NÚMEROS */}
      <section className="d-figs" aria-label="A base em números">
        <div className="d-figs-in">
          <div className="d-fig" key={fig}>
            <div className="d-fig-v num">{f.value}<small>{f.unit}</small></div>
            <p>{f.label}</p>
          </div>
          <ol className="d-figs-dots" aria-hidden="true">
            {figures.map((_, i) => <li key={i} className={i === fig ? 'on' : ''} />)}
          </ol>
          <p className="d-figs-note">{validarNota}</p>
        </div>
        <ul className="sr-only">{figures.map((x) => <li key={x.label}>{x.value} {x.unit} {x.label}</li>)}</ul>
      </section>

      {/* 6. SERVIÇOS */}
      <section className="d-svc" id="servicos">
        <h2 className="d-h2" data-reveal>Sete serviços. Um só perímetro.</h2>
        <div className="d-stack">
          {services.map((s, i) => (
            <article key={s.id} className="d-card" style={{ top: `${84 + i * 14}px` }}>
              <div className="d-card-m"><Media src={s.media} alt={s.title} /></div>
              <div className="d-card-t">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. PLANTA OFICIAL */}
      <section className="d-plan" aria-label="Planta oficial da base">
        <img src={M('img/satellite-base.jpg')} alt="Planta oficial da base SONILS sobre imagem de satélite, com cais e expansões de 1995 a 2008" />
        <div className="d-plan-cap">
          <h2>Cada cais, cada lote, cada expansão.</h2>
          <p>A planta oficial da base, sobre imagem de satélite.</p>
        </div>
      </section>

      {/* 8. CAMPOS */}
      <section className="d-fields">
        <div className="d-row">{[...fields, ...fields].map((x, i) => <span key={i}>{x}</span>)}</div>
        <div className="d-row d-row-y">{[...fields].reverse().concat([...fields].reverse()).map((x, i) => <span key={i}>{x}</span>)}</div>
        <div className="d-fields-copy">
          <h2 className="d-h2" data-reveal>Os grandes projectos de águas profundas passaram por aqui.</h2>
          <div className="d-ops">
            {recentOps.map((o) => <article key={o.title} data-reveal><h3>{o.title}</h3><p>{o.text}</p></article>)}
          </div>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className="d-safety" id="seguranca">
        <div className="d-safety-img"><Media src="img/fire-titan" alt="Viaturas de combate a incêndio da SONILS no cais" /></div>
        <div className="d-safety-panel">
          <h2>{safety.title}</h2>
          <p>{safety.text}</p>
          <a className="d-emerg num" href={`tel:${contacts[3].tel.replace(/\s/g, '')}`}><Phone size={20} weight="bold" /> Emergência {contacts[3].tel}</a>
          <ul>{safety.authorities.map((a) => <li key={a.acr}><b>{a.acr}</b> {a.name}</li>)}</ul>
        </div>
      </section>

      {/* 9. PESSOAS */}
      <section className="d-people" id="pessoas">
        <div className="d-people-img"><img src={M('img/team.jpg')} alt="Equipa SONILS" /></div>
        <div className="d-people-copy">
          <div className="d-pct num">99%</div>
          <h2>{people.title}</h2>
          <p>{people.text}</p>
        </div>
      </section>

      {/* NOTÍCIAS */}
      <section className="d-news" id="noticias">
        <h2 className="d-h2" data-reveal>Notícias</h2>
        <div className="d-news-row">
          {news.map((n) => (
            <a key={n.title} href={n.href} className="d-news-i" data-reveal>
              <img src={M(`${n.img}.jpg`)} alt="" loading="lazy" />
              <time>{n.date}</time>
              <h3>{n.title} <ArrowUpRight size={18} weight="bold" /></h3>
            </a>
          ))}
        </div>
      </section>

      {/* FINAL */}
      <footer className="d-end" id="contactos">
        <div className="d-end-video"><Media src="video/sunset-vessel" /></div>
        <div className="d-end-in">
          <h2>Falemos da sua operação.</h2>
          <div className="d-end-grid">
            {contacts.map((c) => (
              <div key={c.label} className={c.label === 'Emergência' ? 'emerg' : ''}>
                <span>{c.label}</span>
                <a className="num" href={`tel:${c.tel.replace(/\s/g, '')}`}>{c.tel}</a>
                {c.mail && <a href={`mailto:${c.mail}`}>{c.mail}</a>}
              </div>
            ))}
          </div>
          <div className="d-end-foot">
            <Logo size={48} />
            <address>{address}</address>
            <nav aria-label="Acessos">{access.map((a) => <a key={a.label} href={a.href}>{a.label}</a>)}</nav>
          </div>
        </div>
      </footer>
      <Switcher current="d" />
    </div>
  )
}
