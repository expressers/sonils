import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Phone } from '@phosphor-icons/react'
import {
  hero, figures, services, satellite, timeline, fields, recentOps, residents,
  safety, people, news, contacts, access, address, validarNota, M,
} from '../data'
import { Media, Logo } from '../components/Media'
import { Nav } from '../components/Nav'
import { Count } from '../components/Count'
import { Switcher } from '../components/Switcher'
import { gsap, ScrollTrigger, useReveal, useSmoothScroll, reduced } from '../lib/motion'
import './c.css'

export default function C() {
  const root = useRef<HTMLDivElement>(null)
  const [year, setYear] = useState(satellite.length - 1)
  useSmoothScroll()
  useReveal(root)

  useEffect(() => {
    document.title = 'SONILS | Fachada'
    const ctx = gsap.context(() => {
      // O vidro clareia quando o painel entra no ecrã. Nada desliza.
      gsap.utils.toArray<HTMLElement>('.c-glass').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: () => el.classList.add('lit') })
      })
      if (!reduced()) {
        gsap.from('.c-hero .c-pane', { opacity: 0, duration: 1.4, ease: 'power2.out', stagger: 0.12 })
        gsap.from('.c-hero h1', { opacity: 0, filter: 'blur(12px)', duration: 1.6, ease: 'expo.out', delay: 0.2 })
      }
      setYear(0)
      ScrollTrigger.create({
        trigger: '.c-growth',
        start: 'top 60%',
        end: 'bottom 70%',
        onUpdate: (st) => setYear(Math.min(satellite.length - 1, Math.floor(st.progress * satellite.length))),
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const phase = timeline.filter((t) => Number(t.year) <= Number(satellite[year])).at(-1)

  return (
    <div ref={root} className="pc" id="top">
      <Nav className="nav c-nav" />

      <div className="c-wall">
        {/* HERO */}
        <section className="c-bay c-hero">
          <div className="c-pane c-p-title">
            <h1>{hero.title}</h1>
          </div>
          <div className="c-pane c-p-video c-glass lit">
            <Media src="video/hero-psv" priority />
          </div>
          <div className="c-pane c-p-sub">
            <p>{hero.sub}</p>
            <a href="#base" className="c-link">{hero.secondary} <ArrowRight size={16} weight="bold" /></a>
          </div>
          <a href="#contactos" className="c-pane c-p-cta">
            <span>{hero.primary}</span>
            <ArrowRight size={32} weight="bold" />
          </a>
          <a href={`tel:${contacts[3].tel.replace(/\s/g, '')}`} className="c-pane c-p-emerg">
            <span>Emergência 24 h</span>
            <strong className="num">{contacts[3].tel}</strong>
          </a>
        </section>

        {/* NÚMEROS */}
        <section className="c-bay c-figs" id="base">
          <div className="c-pane c-p-head">
            <h2 className="c-h2" data-reveal="fade">Uma base à escala da indústria que serve.</h2>
            <p className="c-note">{validarNota}</p>
          </div>
          {figures.map((f, i) => (
            <div key={i} className={`c-pane c-fig ${i === 0 ? 'y' : ''}`}>
              <div className="c-fig-v"><Count value={f.value} /><small>{f.unit}</small></div>
              <p>{f.label}</p>
            </div>
          ))}
        </section>

        {/* SERVIÇOS */}
        <section className="c-bay c-svc" id="servicos">
          <div className="c-pane c-p-head">
            <h2 className="c-h2" data-reveal="fade">Sete serviços, um só perímetro.</h2>
            <p className="c-lead">Do cais à oficina, tudo o que uma operação offshore precisa em terra.</p>
          </div>
          {services.map((s, i) => (
            <article key={s.id} className={`c-pane c-glass c-svc-p s${i}`}>
              <Media src={s.media} alt={s.title} />
              <div className="c-svc-t">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </section>

        {/* CRESCIMENTO */}
        <section className="c-growth">
          <div className="c-bay c-growth-in">
            <div className="c-pane c-growth-text">
              <h2 className="c-h2">Construída a partir do mar.</h2>
              <div className="c-year num">{satellite[year]}</div>
              {phase && <p><strong>{phase.title}.</strong> {phase.text}</p>}
            </div>
            <figure className="c-pane c-sat">
              {satellite.map((y, i) => (
                <img key={y} src={M(`sat/${y}.jpg`)} alt={`A base em ${y}`} style={{ opacity: i <= year ? 1 : 0 }} loading="lazy" />
              ))}
              <figcaption>Imagens de satélite, vídeo institucional SONILS</figcaption>
            </figure>
            <ol className="c-pane c-years" aria-hidden="true">
              {satellite.map((y, i) => <li key={y} className={i === year ? 'on' : ''}>{y}</li>)}
            </ol>
          </div>
        </section>

        {/* CAMPOS */}
        <section className="c-bay c-fields">
          <div className="c-pane c-glass c-fields-v"><Media src="video/sunset-vessel" /></div>
          <div className="c-pane c-p-head">
            <h2 className="c-h2" data-reveal="fade">Os grandes projectos de águas profundas passaram por aqui.</h2>
          </div>
          {fields.map((f) => <div key={f} className="c-pane c-field">{f}</div>)}
          {recentOps.map((o) => (
            <article key={o.title} className="c-pane c-op">
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </section>

        {/* SEGURANÇA */}
        <section className="c-bay c-safety" id="seguranca">
          <div className="c-pane c-p-red">
            <h2 className="c-h2">{safety.title}</h2>
          </div>
          <div className="c-pane c-glass c-safety-img">
            <img src={M('img/firefighters.jpg')} alt="Equipa de bombeiros da SONILS" loading="lazy" />
          </div>
          <div className="c-pane c-safety-t">
            <p className="c-lead">{safety.text}</p>
            <ul>{safety.assets.map((a) => <li key={a.name}><b>{a.name}</b> {a.detail}</li>)}</ul>
          </div>
          {safety.authorities.map((a) => (
            <div key={a.acr} className="c-pane c-auth"><b>{a.acr}</b><span>{a.name}</span></div>
          ))}
        </section>

        {/* CLIENTES */}
        <section className="c-bay c-clients" id="clientes">
          <div className="c-pane c-p-head">
            <h2 className="c-h2" data-reveal="fade">Quem tem casa na base.</h2>
            <p className="c-lead">Operadores e empresas de serviços com lotes, escritórios e oficinas dedicadas.</p>
          </div>
          {residents.map((r) => <div key={r} className="c-pane c-res">{r}</div>)}
        </section>

        {/* PESSOAS */}
        <section className="c-bay c-people" id="pessoas">
          <div className="c-pane c-glass c-people-img"><img src={M('img/team.jpg')} alt="Equipa SONILS" loading="lazy" /></div>
          <div className="c-pane c-fig y c-pct"><div className="c-fig-v num">99<small>%</small></div><p>dos colaboradores são angolanos</p></div>
          <div className="c-pane c-people-t">
            <h2 className="c-h2">{people.title}</h2>
            <p className="c-lead">{people.community}</p>
            <a className="c-link" href="https://www.sonils.co.ao/soc/">SONILS Acreditar <ArrowUpRight size={16} weight="bold" /></a>
          </div>
        </section>

        {/* NOTÍCIAS */}
        <section className="c-bay c-news" id="noticias">
          <div className="c-pane c-p-head"><h2 className="c-h2">Notícias</h2></div>
          {news.map((n) => (
            <a key={n.title} href={n.href} className="c-pane c-news-i">
              <div className="c-glass"><img src={M(`${n.img}.jpg`)} alt="" loading="lazy" /></div>
              <time>{n.date}</time>
              <h3>{n.title}</h3>
            </a>
          ))}
        </section>

        {/* CONTACTOS */}
        <footer className="c-bay c-foot" id="contactos">
          <div className="c-pane c-p-cta c-foot-cta">
            <h2>Precisa de cais, espaço ou carga em Luanda?</h2>
          </div>
          {contacts.map((c) => (
            <div key={c.label} className={`c-pane c-contact ${c.label === 'Emergência' ? 'c-p-emerg' : ''}`}>
              <span>{c.label}</span>
              <a className="num" href={`tel:${c.tel.replace(/\s/g, '')}`}><Phone size={15} weight="bold" /> {c.tel}</a>
              {c.mail && <a href={`mailto:${c.mail}`}>{c.mail}</a>}
            </div>
          ))}
          <div className="c-pane c-foot-end">
            <Logo size={44} />
            <address>{address}</address>
            <nav aria-label="Acessos">{access.map((a) => <a key={a.label} href={a.href}>{a.label}</a>)}</nav>
          </div>
        </footer>
      </div>
      <Switcher current="c" />
    </div>
  )
}
