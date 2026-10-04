import { ArrowRight } from '@phosphor-icons/react'
import { Logo, Media } from '../components/Media'
import './index.css'

const props = [
  {
    href: '/a',
    tag: 'A',
    name: 'Relatório Anual',
    text: 'A SONILS como um relatório de referência: capa amarela, planos de vídeo em página inteira e o crescimento da base contado ano a ano por satélite.',
    media: 'video/hero-psv',
  },
  {
    href: '/b',
    tag: 'B',
    name: 'Planta da Base',
    text: 'O site desenhado como a planta técnica da base: linhas que se traçam com o scroll, zonas que abrem vídeo, cotas reais do cais e da área.',
    media: 'video/quay-aerial',
  },
  {
    href: '/c',
    tag: 'C',
    name: 'Fachada',
    text: 'Uma parede de aço e vidro: caixilhos negros, painéis claros que se iluminam e cor da marca reservada para o que importa.',
    media: 'video/sunset-vessel',
  },
  {
    href: '/d',
    tag: 'D',
    name: 'Cinema',
    text: 'A home como um filme: o nome SONILS abre-se para o mar, travelling sobre a base real, time-lapse de satélite e cenas que se sucedem com o scroll.',
    media: 'video/platform-top',
  },
]

export default function Index() {
  return (
    <main className="ix">
      <header className="ix-head">
        <Logo size={56} />
        <div>
          <h1>SONILS. Redesign do website institucional</h1>
          <p>Quatro propostas de home page para revisão. Expressers, Outubro 2026.</p>
        </div>
      </header>
      <ul className="ix-list">
        {props.map((p) => (
          <li key={p.href}>
            <a href={p.href} className="ix-card">
              <div className="ix-media">
                <Media src={p.media} />
                <span className="ix-tag" aria-hidden="true">{p.tag}</span>
              </div>
              <div className="ix-body">
                <h2>{p.name}</h2>
                <p>{p.text}</p>
                <span className="ix-go">
                  Abrir proposta <ArrowRight size={16} weight="bold" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
