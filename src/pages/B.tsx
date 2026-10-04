import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Phone } from '@phosphor-icons/react'
import {
  hero, figures, services, fields, recentOps, residents, safety, people, news,
  contacts, access, address, validarNota, M,
} from '../data'
import { Media, Logo } from '../components/Media'
import { Nav } from '../components/Nav'
import { Count } from '../components/Count'
import { Compare } from '../components/Compare'
import { Switcher } from '../components/Switcher'
import { gsap, useReveal, useSmoothScroll, reduced } from '../lib/motion'
import './b.css'

/* ---------- Geometria do esquema da base (ilustrativo, sem escala) ---------- */
const P0 = [20, 400], P1 = [560, 360], P2 = [1180, 50]
const bez = (t: number) => {
  const u = 1 - t
  return [u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]]
}
const norm = (t: number) => {
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0])
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1])
  const l = Math.hypot(dx, dy)
  return [-dy / l, dx / l] // lado de terra
}
const at = (t: number, o: number) => { const p = bez(t), n = norm(t); return [p[0] + n[0] * o, p[1] + n[1] * o] }
const zonePath = (t0: number, t1: number, o0: number, o1: number) => {
  const N = 16, pts: number[][] = []
  for (let i = 0; i <= N; i++) pts.push(at(t0 + ((t1 - t0) * i) / N, o0))
  for (let i = N; i >= 0; i--) pts.push(at(t0 + ((t1 - t0) * i) / N, o1))
  return 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L') + 'Z'
}
const curve = (o: number, t0 = 0, t1 = 1) => {
  const pts: number[][] = []
  for (let i = 0; i <= 48; i++) pts.push(at(t0 + ((t1 - t0) * i) / 48, o))
  return 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L')
}

const zones = [
  { n: 1, name: 'Cais', text: 'Frente de atracação contínua para navios de apoio offshore e de longo curso.', t: [0.04, 0.96], o: [0, 22], media: 'img/tug-quay' },
  { n: 2, name: 'Terminal de passageiros', text: 'Rotação de equipas entre a base e as unidades offshore.', t: [0.07, 0.2], o: [30, 128], media: 'video/deck' },
  { n: 3, name: 'Armazéns e oficinas', text: 'Áreas cobertas para armazenagem, manutenção e preparação.', t: [0.22, 0.44], o: [30, 150], media: 'img/vessel-forklift' },
  { n: 4, name: 'Lotes dedicados', text: 'Bases próprias de operadores e empresas de serviços petrolíferos.', t: [0.46, 0.72], o: [30, 170], media: 'img/aerial-2018' },
  { n: 5, name: 'Doca de pesados', text: 'Cargas de projecto e equipamento submarino.', t: [0.74, 0.93], o: [30, 140], media: 'img/cranes' },
  { n: 6, name: 'Energia e água', text: 'Centrais próprias e produção de água industrial.', t: [0.26, 0.5], o: [162, 236], media: 'img/dusk-crane' },
  { n: 7, name: 'Bombeiros e emergência', text: 'Primeira intervenção 24 horas, ambulância e barco-ambulância.', t: [0.55, 0.68], o: [182, 250], media: 'img/fire-titan' },
]

export default function B() {
  const root = useRef<HTMLDivElement>(null)
  const [zone, setZone] = useState(0)
  useSmoothScroll()
  useReveal(root)

  const geo = useMemo(() => zones.map((z) => {
    const c = at((z.t[0] + z.t[1]) / 2, (z.o[0] + z.o[1]) / 2)
    return { d: zonePath(z.t[0], z.t[1], z.o[0], z.o[1]), cx: c[0], cy: c[1] }
  }), [])

  useEffect(() => {
    document.title = 'SONILS | Planta da Base'
    const ctx = gsap.context(() => {
      if (reduced()) return
      gsap.from('.b-tb > *', { opacity: 0, y: 14, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.25 })
      gsap.fromTo('.b-frame', { clipPath: 'inset(8% 8% 8% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' })
      gsap.from('.b-dim-top', { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'expo.out', delay: 0.8 })
      // Traçado da planta com o scroll
      gsap.utils.toArray<SVGPathElement>('.b-draw').forEach((p) => {
        const len = p.getTotalLength()
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: '.b-plan', start: 'top 85%', end: 'top 25%', scrub: 0.6 },
        })
      })
      gsap.from('.b-zone', { opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: '.b-plan', start: 'top 40%' } })
      gsap.utils.toArray<HTMLElement>('.b-dim-line').forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: 'center', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const z = zones[zone]

  return (
    <div ref={root} className="pb" id="top">
      <Nav className="nav b-nav" />

      {/* HERO: folha de desenho */}
      <section className="b-hero">
        <div className="b-dim b-dim-top" aria-hidden="true"><span>Frente marítima de Luanda</span></div>
        <div className="b-frame">
          <Media src="video/quay-aerial" priority className="b-hero-media" />
          <div className="b-tb">
            <h1>{hero.title}</h1>
            <p>{hero.sub}</p>
            <div className="b-ctas">
              <a className="btn b-btn-ink" href="#contactos">{hero.primary} <ArrowRight size={18} weight="bold" /></a>
              <a className="btn b-btn-line" href="#base">Ver a planta</a>
            </div>
            <dl className="b-tb-cells">
              <div><dt>Operador</dt><dd>SONILS, Lda.</dd></div>
              <div><dt>Local</dt><dd className="num">Luanda · 8°47′S 13°15′E</dd></div>
              <div><dt>Em operação</dt><dd className="num">Desde 1995</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* PLANTA */}
      <section className="b-plan" id="base">
        <div className="b-wrap">
          <div className="b-plan-head">
            <h2 className="b-h2" data-reveal>Uma cidade industrial entre o porto e o oceano.</h2>
            <p className="b-lead" data-reveal>Cais, armazéns, lotes dedicados, energia, água e emergência dentro do mesmo perímetro. Toque numa zona.</p>
          </div>
          <div className="b-plan-grid">
            <figure className="b-svg">
              <svg viewBox="0 0 1200 620" role="img" aria-label="Esquema ilustrativo das zonas da base SONILS">
                <defs>
                  <pattern id="b-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#9fb4b9" strokeWidth="1" />
                  </pattern>
                </defs>
                <path d={`${curve(0)} L1200,50 L1200,0 L0,0 L0,400 Z`} fill="url(#b-hatch)" opacity="0.5" />
                <path className="b-draw" d={curve(0)} fill="none" stroke="#1d1d1b" strokeWidth="2.2" />
                <path className="b-draw" d={curve(280)} fill="none" stroke="#1d1d1b" strokeWidth="1" strokeDasharray="6 5" />
                <path className="b-draw" d={curve(156, 0.04, 0.96)} fill="none" stroke="#1d1d1b" strokeWidth="0.8" opacity="0.5" />
                {zones.map((zz, i) => (
                  <g
                    key={zz.n}
                    className={`b-zone ${i === zone ? 'on' : ''} ${zz.n === 7 ? 'safety' : ''}`}
                    onMouseEnter={() => setZone(i)}
                    onClick={() => setZone(i)}
                  >
                    <path d={geo[i].d} />
                    <circle cx={geo[i].cx} cy={geo[i].cy} r="20" />
                    <text x={geo[i].cx} y={geo[i].cy + 6} textAnchor="middle">{zz.n}</text>
                  </g>
                ))}
                <text x="60" y="80" className="b-svg-sea">Baía de Luanda</text>
                <text x="980" y="590" className="b-svg-sea">Luanda</text>
              </svg>
              <figcaption>Esquema ilustrativo, sem escala. A validar com a planta oficial.</figcaption>
            </figure>
            <div className="b-legend">
              <ol>
                {zones.map((zz, i) => (
                  <li key={zz.n}>
                    <button className={i === zone ? 'on' : ''} onMouseEnter={() => setZone(i)} onFocus={() => setZone(i)} onClick={() => setZone(i)}>
                      <span className="b-badge num">{zz.n}</span>{zz.name}
                    </button>
                  </li>
                ))}
              </ol>
              <div className="b-detail">
                <div className="b-detail-media">
                  {zones.map((zz, i) => (
                    <div key={zz.n} className={`b-detail-f ${i === zone ? 'on' : ''}`}><Media src={zz.media} /></div>
                  ))}
                </div>
                <p><strong>{z.name}.</strong> {z.text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COTAS */}
      <section className="b-dims">
        <div className="b-wrap">
          <h2 className="b-h2" data-reveal>As cotas da base.</h2>
          <div className="b-dims-grid">
            {figures.map((f, i) => (
              <div key={i} className="b-dimc" data-reveal data-delay={(i % 3) * 0.06}>
                <div className="b-dim-line" aria-hidden="true" />
                <div className="b-dim-v"><Count value={f.value} /> <small>{f.unit}</small></div>
                <p>{f.label}</p>
              </div>
            ))}
          </div>
          <p className="b-note">{validarNota}</p>
        </div>
      </section>

      {/* CRESCIMENTO */}
      <section className="b-growth">
        <div className="b-wrap b-growth-in">
          <div>
            <h2 className="b-h2" data-reveal>Dezasseis anos de aterro, cais e lotes.</h2>
            <p className="b-lead" data-reveal>Arraste para comparar a frente marítima em 2000 e em 2016. A base foi construída a partir do mar, expansão a expansão.</p>
            <ul className="b-milestones" data-reveal>
              <li><b className="num">1995</b> Inauguração</li>
              <li><b className="num">1998</b> Primeira expansão</li>
              <li><b className="num">2004</b> Segunda expansão</li>
              <li><b className="num">2008</b> Terceira expansão</li>
              <li><b className="num">2009</b> Doca de pesados</li>
              <li><b className="num">2012</b> Extensão do cais</li>
            </ul>
          </div>
          <div data-reveal="fade">
            <Compare a="2000" b="2016" className="b-cmp" />
            <p className="b-cap">Imagens de satélite, vídeo institucional SONILS.</p>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="b-svc" id="servicos">
        <div className="b-wrap">
          <h2 className="b-h2" data-reveal>Detalhes de serviço.</h2>
          <div className="b-svc-grid">
            {services.map((s, i) => (
              <article key={s.id} className={`b-svc-c c${i}`} data-reveal data-delay={(i % 3) * 0.05}>
                <div className="b-svc-m"><Media src={s.media} alt={s.title} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OFFSHORE */}
      <section className="b-off">
        <div className="b-off-media"><Media src="video/platform-top" /></div>
        <div className="b-wrap b-off-in">
          <h2 className="b-h2" data-reveal>Em terra, para o que acontece no alto mar.</h2>
          <p className="b-lead" data-reveal>A base apoiou a logística dos primeiros projectos de águas profundas de Angola e continua a servir os novos desenvolvimentos.</p>
          <ul className="b-fields">
            {fields.map((f) => <li key={f} data-reveal="fade">{f}</li>)}
          </ul>
          <div className="b-ops">
            {recentOps.map((o) => (
              <article key={o.title} data-reveal>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className="b-safety" id="seguranca">
        <div className="b-wrap b-safety-in">
          <div>
            <h2 className="b-h2" data-reveal>{safety.title}</h2>
            <p className="b-lead" data-reveal>{safety.text}</p>
            <ul className="b-assets">
              {safety.assets.map((a) => <li key={a.name} data-reveal><b>{a.name}</b>{a.detail}</li>)}
            </ul>
          </div>
          <figure className="b-safety-photo" data-reveal="clip">
            <img src={M('img/fire-drill.jpg')} alt="Simulacro de combate a incêndio na base" loading="lazy" />
          </figure>
        </div>
        <div className="b-wrap">
          <ul className="b-auth">
            {safety.authorities.map((a) => <li key={a.acr} data-reveal><b>{a.acr}</b><span>{a.name}</span></li>)}
          </ul>
        </div>
      </section>

      {/* CLIENTES */}
      <section className="b-clients" id="clientes">
        <div className="b-wrap">
          <h2 className="b-h2" data-reveal>Residentes da base.</h2>
          <p className="b-lead" data-reveal>Operadores e empresas de serviços com lotes, escritórios e oficinas dedicadas.</p>
          <ul className="b-res">
            {residents.map((r, i) => <li key={r} data-reveal="fade" data-delay={i * 0.03}><span className="num">{String(i + 1).padStart(2, '0')}</span>{r}</li>)}
          </ul>
        </div>
      </section>

      {/* PESSOAS */}
      <section className="b-people" id="pessoas">
        <div className="b-wrap b-people-in">
          <figure data-reveal="clip"><img src={M('img/evacuation.jpg')} alt="Equipas da SONILS num simulacro de evacuação no cais" loading="lazy" /></figure>
          <div>
            <div className="b-pct num" data-reveal>99%</div>
            <h2 className="b-h2" data-reveal>{people.title}</h2>
            <p className="b-lead" data-reveal>{people.text}</p>
            <p className="b-sm" data-reveal>{people.community}</p>
          </div>
        </div>
      </section>

      {/* NOTÍCIAS */}
      <section className="b-news" id="noticias">
        <div className="b-wrap">
          <h2 className="b-h2" data-reveal>Notícias</h2>
          <div className="b-news-grid">
            {news.map((n, i) => (
              <a key={n.title} href={n.href} className={`b-news-i n${i}`} data-reveal>
                <img src={M(`${n.img}.jpg`)} alt="" loading="lazy" />
                <time>{n.date}</time>
                <h3>{n.title} <ArrowUpRight size={18} weight="bold" /></h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTOS: carimbo da folha */}
      <footer className="b-foot" id="contactos">
        <div className="b-wrap">
          <div className="b-stamp">
            <div className="b-stamp-head">
              <Logo size={52} />
              <h2>Planeie a sua operação na base.</h2>
            </div>
            <div className="b-stamp-grid">
              {contacts.map((c) => (
                <div key={c.label} className={c.label === 'Emergência' ? 'emerg' : ''}>
                  <span>{c.label}</span>
                  <a className="num" href={`tel:${c.tel.replace(/\s/g, '')}`}><Phone size={15} weight="bold" /> {c.tel}</a>
                  {c.mail && <a href={`mailto:${c.mail}`}>{c.mail}</a>}
                </div>
              ))}
            </div>
            <div className="b-stamp-foot">
              <address>{address}</address>
              <nav aria-label="Acessos">{access.map((a) => <a key={a.label} href={a.href}>{a.label}</a>)}</nav>
            </div>
          </div>
        </div>
      </footer>
      <Switcher current="b" />
    </div>
  )
}
