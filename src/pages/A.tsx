import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Phone } from '@phosphor-icons/react'
import {
  hero, figures, services, timeline, satellite, fields, recentOps, residents,
  safety, people, news, contacts, access, address, validarNota, M,
} from '../data'
import { Media, Logo } from '../components/Media'
import { Nav } from '../components/Nav'
import { Count } from '../components/Count'
import { Switcher } from '../components/Switcher'
import { gsap, ScrollTrigger, useReveal, useSmoothScroll, reduced } from '../lib/motion'
import './a.css'

export default function A() {
  const root = useRef<HTMLDivElement>(null)
  const [svc, setSvc] = useState(0)
  const [year, setYear] = useState(0)
  useSmoothScroll()
  useReveal(root)

  useEffect(() => {
    document.title = 'SONILS | Centro Logístico de Serviços Integrados'
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      if (!reduced()) {
        // Capa: o título sobe linha a linha, o plano de vídeo abre de baixo para cima.
        gsap.from('.a-title .w > span', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.06, delay: 0.1 })
        gsap.from('.a-cover-side > *', { opacity: 0, y: 16, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.5 })
        gsap.fromTo('.a-plate', { clipPath: 'inset(18% 6% 0% 6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut', delay: 0.2 })
        gsap.fromTo('.a-plate video', { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.a-plate', start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.utils.toArray<HTMLElement>('.a-parallax').forEach((el) => {
          gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      }

      // Crescimento: secção fixa, o scroll avança os anos de satélite.
      mm.add('(min-width: 900px)', () => {
        ScrollTrigger.create({
          trigger: '.a-growth',
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.4}`,
          pin: true,
          scrub: true,
          onUpdate: (st) => setYear(Math.min(satellite.length - 1, Math.floor(st.progress * satellite.length))),
        })
      })

      // Serviços: o item activo acompanha o scroll.
      gsap.utils.toArray<HTMLElement>('.a-svc-item').forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setSvc(i) })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const words = hero.title.split(' ')
  const phase = timeline.filter((t) => Number(t.year) <= Number(satellite[year])).at(-1)

  return (
    <div ref={root} className="pa" id="top">
      <Nav className="nav a-nav" />

      {/* CAPA */}
      <section className="a-cover">
        <div className="a-cover-in">
          <h1 className="a-title" aria-label={hero.title}>
            {words.map((w, i) => (
              <span key={i} aria-hidden="true"><span className="w"><span>{w}</span></span>{i < words.length - 1 ? ' ' : ''}</span>
            ))}
          </h1>
          <div className="a-cover-side">
            <p>{hero.sub}</p>
            <div className="a-ctas">
              <a href="#contactos" className="btn a-btn-ink">{hero.primary} <ArrowRight size={18} weight="bold" /></a>
              <a href="#base" className="btn a-btn-line">{hero.secondary}</a>
            </div>
          </div>
        </div>
        <div className="a-plate">
          <Media src="video/hero-psv" priority />
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="a-figures" id="base">
        <div className="a-wrap">
          <h2 className="a-h2" data-reveal>Uma base à escala da indústria que serve.</h2>
          <p className="a-lead" data-reveal>
            Um perímetro auto-suficiente junto ao porto comercial de Luanda, perto do aeroporto e dos campos de
            águas profundas.
          </p>
          <dl className="a-fig-grid">
            {figures.map((f, i) => (
              <div className="a-fig" key={i} data-reveal data-delay={(i % 3) * 0.06}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="a-fig-v"><Count value={f.value} /><small>{f.unit}</small><sup>1</sup></span>
                  <span className="a-fig-l">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="a-note"><sup>1</sup> {validarNota}</p>
        </div>
      </section>

      {/* CRESCIMENTO */}
      <section className="a-growth" aria-label="Crescimento da base, 2000 a 2016">
        <div className="a-growth-in">
          <div className="a-growth-text">
            <h2 className="a-h2">Construída a partir do mar.</h2>
            <p className="a-lead">
              De um aterro em 1995 a uma frente marítima contínua. A base cresceu com cada geração de projectos offshore.
            </p>
            <div className="a-year num" aria-live="polite">{satellite[year]}</div>
            {phase && (
              <div className="a-phase">
                <strong>{phase.title}</strong>
                <span>{phase.text}</span>
              </div>
            )}
          </div>
          <figure className="a-sat">
            {satellite.map((y, i) => (
              <img key={y} src={M(`sat/${y}.jpg`)} alt={`Base SONILS vista por satélite, ${y}`} style={{ opacity: i <= year ? 1 : 0 }} loading="lazy" />
            ))}
            <figcaption>Imagens de satélite, vídeo institucional SONILS</figcaption>
          </figure>
          <ol className="a-rail" aria-hidden="true">
            {satellite.map((y, i) => <li key={y} className={i <= year ? 'on' : ''}>{y}</li>)}
          </ol>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="a-svc" id="servicos">
        <div className="a-wrap a-svc-in">
          <div className="a-svc-list">
            <h2 className="a-h2" data-reveal>Tudo o que uma operação offshore precisa em terra.</h2>
            <ol>
              {services.map((s, i) => (
                <li key={s.id} className={`a-svc-item ${i === svc ? 'on' : ''}`}>
                  <button onClick={() => setSvc(i)} aria-pressed={i === svc}>
                    <h3>{s.title}</h3>
                  </button>
                  <p>{s.text}</p>
                  <div className="a-svc-mobile"><Media src={s.media} alt={s.title} /></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="a-svc-media" aria-hidden="true">
            {services.map((s, i) => (
              <div key={s.id} className={`a-svc-frame ${i === svc ? 'on' : ''}`}>
                <Media src={s.media} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPOS */}
      <section className="a-fields">
        <div className="a-marquee" aria-hidden="true">
          <div className="a-marquee-track">
            {[...fields, ...fields].map((f, i) => <span key={i}>{f}</span>)}
          </div>
        </div>
        <div className="a-wrap a-fields-in">
          <div>
            <h2 className="a-h2" data-reveal>Os grandes projectos de águas profundas passaram por aqui.</h2>
            <p className="a-lead" data-reveal>
              Girassol, Dalia, PSVM, Pazflor e, mais recentemente, Kaombo e Agogo. A base apoia a logística dos
              operadores que produzem o petróleo de Angola.
            </p>
            <p className="a-sr">Campos apoiados: {fields.join(', ')}.</p>
          </div>
          <div className="a-ops">
            {recentOps.map((o) => (
              <article key={o.title} data-reveal>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="a-band">
          <div className="a-parallax"><Media src="video/sunset-vessel" /></div>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className="a-safety" id="seguranca">
        <div className="a-wrap a-safety-in">
          <div className="a-safety-photo" data-reveal="clip">
            <img src={M('img/fire-titan.jpg')} alt="Viaturas de combate a incêndio da SONILS no cais" loading="lazy" />
          </div>
          <div className="a-safety-text">
            <h2 className="a-h2" data-reveal>{safety.title}</h2>
            <p className="a-lead" data-reveal>{safety.text}</p>
            <ul className="a-assets">
              {safety.assets.map((a) => (
                <li key={a.name} data-reveal><strong>{a.name}</strong><span>{a.detail}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="a-wrap">
          <h3 className="a-h3" data-reveal>Autoridades presentes na base</h3>
          <ul className="a-auth">
            {safety.authorities.map((a) => (
              <li key={a.acr} data-reveal><strong>{a.acr}</strong><span>{a.name}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLIENTES */}
      <section className="a-clients" id="clientes">
        <div className="a-wrap a-clients-in">
          <div>
            <h2 className="a-h2" data-reveal>Operadores e empresas de serviços com instalações dedicadas na base.</h2>
            <p className="a-lead" data-reveal>Mais de 80 empresas do sector usam a base. Algumas das que aqui têm lotes, escritórios e oficinas próprias:</p>
          </div>
          <ul className="a-res">
            {residents.map((r, i) => <li key={r} data-reveal="fade" data-delay={i * 0.03}>{r}</li>)}
          </ul>
        </div>
        <div className="a-wide" data-reveal="clip">
          <Media src="video/base-aerial" />
          <span>Base SONILS, Luanda. Imagem aérea institucional.</span>
        </div>
      </section>

      {/* PESSOAS */}
      <section className="a-people" id="pessoas">
        <div className="a-wrap a-people-in">
          <figure className="a-people-photo" data-reveal="clip">
            <img src={M('img/team.jpg')} alt="Equipa SONILS com fardas de operação" loading="lazy" />
          </figure>
          <div className="a-people-text">
            <div className="a-big num" data-reveal>99<small>%</small></div>
            <h2 className="a-h2" data-reveal>{people.title}</h2>
            <p className="a-lead" data-reveal>{people.text}</p>
            <p data-reveal>{people.community}</p>
            <a className="btn a-btn-line" href="https://www.sonils.co.ao/soc/">SONILS Acreditar <ArrowUpRight size={16} weight="bold" /></a>
          </div>
        </div>
      </section>

      {/* NOTÍCIAS */}
      <section className="a-news" id="noticias">
        <div className="a-wrap">
          <h2 className="a-h2" data-reveal>Notícias</h2>
          <ul className="a-news-list">
            {news.map((n) => (
              <li key={n.title} data-reveal>
                <a href={n.href}>
                  <img src={M(`${n.img}.jpg`)} alt="" loading="lazy" />
                  <time>{n.date}</time>
                  <h3>{n.title}</h3>
                  <ArrowUpRight size={20} weight="bold" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACTOS */}
      <footer className="a-foot" id="contactos">
        <div className="a-wrap">
          <h2 className="a-foot-title">Precisa de cais, espaço ou carga em Luanda?</h2>
          <div className="a-foot-grid">
            {contacts.map((c) => (
              <div key={c.label} className={c.label === 'Emergência' ? 'emerg' : ''}>
                <span className="lbl">{c.label}</span>
                <a href={`tel:${c.tel.replace(/\s/g, '')}`} className="num"><Phone size={16} weight="bold" /> {c.tel}</a>
                {c.mail && <a href={`mailto:${c.mail}`}>{c.mail}</a>}
              </div>
            ))}
          </div>
          <div className="a-foot-bottom">
            <Logo size={48} />
            <address>{address}</address>
            <nav aria-label="Acessos">
              {access.map((a) => <a key={a.label} href={a.href}>{a.label}</a>)}
            </nav>
          </div>
        </div>
      </footer>
      <Switcher current="a" />
    </div>
  )
}
