const items = [
  { href: '/a', label: 'A · Relatório' },
  { href: '/b', label: 'B · Planta' },
  { href: '/c', label: 'C · Fachada' },
  { href: '/d', label: 'D · Cinema' },
]

export function Switcher({ current }: { current: 'a' | 'b' | 'c' | 'd' }) {
  return (
    <nav className="switcher" aria-label="Propostas de design">
      <span>Proposta</span>
      {items.map((i) => (
        <a key={i.href} href={i.href} aria-current={i.href === `/${current}` ? 'page' : undefined}>
          {i.label}
        </a>
      ))}
    </nav>
  )
}
