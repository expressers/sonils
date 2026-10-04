// Conteúdo recolhido de sonils.co.ao (Out 2026) e de imprensa sectorial.
// Valores marcados com `validar: true` vêm do site actual, que tem dados contraditórios.

export const M = (p: string) => `/media/${p}`

export const nav = [
  { label: 'A Base', href: '#base' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Segurança', href: '#seguranca' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Pessoas', href: '#pessoas' },
  { label: 'Notícias', href: '#noticias' },
]

export const hero = {
  title: 'A base que move o offshore de Angola.',
  sub: 'Centro Logístico de Serviços Integrados em Luanda. Cais, carga, engenharia e instalações dedicadas, num só perímetro, desde 1995.',
  primary: 'Falar com a Direcção Comercial',
  secondary: 'Conhecer a base',
}

export const figures = [
  { value: '1.359.684', unit: 'm²', label: 'de área industrial e logística, com mais de 15 km de estradas internas', validar: true },
  { value: '1.733', unit: 'm', label: 'de cais, com 12,5 m de profundidade', validar: true },
  { value: '58.350', unit: 'm²', label: 'cobertos de armazéns e oficinas', validar: true },
  { value: '22,25', unit: 'MW', label: 'produzidos por duas centrais próprias, mais 10 MW da rede e 2 MW solares', validar: true },
  { value: '13.209', unit: 'm³', label: 'de água industrial produzida por dia', validar: true },
  { value: '320', unit: 'lugares', label: 'no terminal de passageiros', validar: true },
]

export const services = [
  { id: 'cais', title: 'Cais e operações marítimas', text: 'Cais dedicado de águas profundas para navios de apoio offshore, atracação de longo curso e doca de pesados.', media: 'video/pier-aerial' },
  { id: 'carga', title: 'Movimentação de carga', text: 'Frota de gruas, empilhadores e transporte para carga geral, tubulares, contentores e cargas de projecto.', media: 'img/cranes' },
  { id: 'armazens', title: 'Armazéns e oficinas', text: 'Áreas cobertas e parques abertos para armazenagem, manutenção e preparação de equipamento.', media: 'img/vessel-forklift' },
  { id: 'instalacoes', title: 'Instalações dedicadas', text: 'Lotes, escritórios e oficinas construídos à medida de cada operador ou empresa de serviços.', media: 'img/aerial-2018' },
  { id: 'engenharia', title: 'Engenharia e manutenção', text: 'Desenvolvimento de infra-estruturas, manutenção de instalações e apoio técnico às operações dos clientes.', media: 'img/doca' },
  { id: 'utilities', title: 'Energia, água e comunicações', text: 'Base auto-suficiente: produção própria de energia e água industrial, restauração, transportes e rede de comunicações.', media: 'img/dusk-crane' },
  { id: 'passageiros', title: 'Terminal de passageiros', text: 'Terminal construído de raiz para a rotação de equipas entre a base e as unidades offshore.', media: 'video/deck' },
]

export const timeline = [
  { year: '1993', title: 'Estudo de viabilidade', text: 'A Sonangol estuda um centro logístico em Luanda, alternativa às bases do Soyo e de Pointe-Noire.' },
  { year: '1995', title: 'Inauguração', text: 'Abre o Centro Logístico de Serviços Integrados, em concessão com a Empresa Portuária de Luanda.' },
  { year: '1998', title: 'Primeira expansão', text: 'A base cresce ao ritmo dos primeiros projectos de águas profundas.' },
  { year: '2004', title: 'Segunda expansão', text: 'Novos aterros e lotes para operadores e empresas de serviços.' },
  { year: '2008', title: 'Terceira expansão', text: 'A frente de mar ganha a forma actual.' },
  { year: '2009', title: 'Doca de pesados', text: 'Capacidade para cargas de projecto e equipamento submarino.' },
  { year: '2012', title: 'Extensão do cais', text: 'Mais frente de atracação para a frota de apoio offshore.' },
  { year: '2025', title: '30 anos', text: 'Três décadas a apoiar a indústria petrolífera angolana.' },
]

// Fotogramas do vídeo institucional "Growth of the OSC" (SONILS).
export const satellite = ['2000', '2001', '2004', '2005', '2006', '2008', '2009', '2010', '2011', '2012', '2016']

export const fields = ['Girassol', 'Dalia', 'Rosa', 'Pazflor', 'PSVM', 'Greater Plutonio', 'Kizomba', 'Kaombo', 'Agogo']

export const recentOps = [
  { title: 'Bóia CALM para o Bloco 0', text: 'Recepção e armazenagem na doca de pesados de um novo sistema de amarração CALM para a Chevron (2025).' },
  { title: 'Primeiro transpooling de tubo flexível em Angola', text: 'Com a Subsea 7: 2.321 m de tubo flexível, 771 toneladas, para o desenvolvimento Agogo da Azule Energy (2025).' },
]

export const residents = [
  'TotalEnergies', 'bp', 'Halliburton', 'SLB', 'Baker Hughes', 'Aker Solutions',
  'TechnipFMC', 'Fugro', 'Expro', 'GE Oil & Gas', 'Prezioso', 'Octomar',
]

export const safety = {
  title: 'Segurança é a licença para operar.',
  text: 'Equipa de primeira intervenção 24 horas, viaturas de combate a incêndio, ambulância e barco-ambulância para evacuação médica por mar. Simulacros regulares com clientes e o Safety Day anual.',
  assets: [
    { name: 'Titan', detail: '11.356 L de água, 1.415 L de espuma' },
    { name: 'Barco-ambulância', detail: 'Evacuação médica por via marítima' },
    { name: 'Primeira intervenção', detail: 'Bombeiros e motoristas de emergência, 24 h' },
  ],
  authorities: [
    { acr: 'SIC', name: 'Serviço de Investigação Criminal' },
    { acr: 'Capitania', name: 'Autoridade marítima' },
    { acr: 'CUP', name: 'Comando da Unidade Portuária' },
    { acr: 'Polícia Fiscal', name: 'Fiscalização de mercadorias' },
    { acr: 'AGT', name: 'Posto aduaneiro e fiscal' },
    { acr: 'SME', name: 'Migração e Estrangeiros' },
  ],
}

export const people = {
  title: 'Capacidade angolana, construída aqui.',
  text: '99% dos colaboradores da SONILS são angolanos. Transferência de conhecimento e tecnologia é parte do que a base produz.',
  community: 'Através do programa SONILS Acreditar, investimos em educação, saúde e ambiente nas comunidades vizinhas da Boavista e de Luanda.',
}

export const news = [
  { date: 'Mar 2026', title: 'SONILS e Sonangol inauguram escola no município dos Mulenvos', img: 'img/school', href: 'https://www.sonils.co.ao/sonils-e-sonangol-inauguram-escola-no-municipio-dos-mulenvos/' },
  { date: '2025', title: 'Presidente da Namíbia visita a base e elogia a capacidade operacional', img: 'img/namibia', href: 'https://www.sonils.co.ao/presidente-da-namibia-visita-a-base-sonils-e-elogia-a-capacidade-operacional-e-contributo-para-angola-2/' },
  { date: '2025', title: 'Safety Day e Safety Run 2025 reúnem colaboradores e clientes', img: 'img/firefighters', href: 'https://www.sonils.co.ao/galeria/' },
]

export const access = [
  { label: 'Entrar na base', href: 'https://www.sonils.co.ao/entrar/' },
  { label: 'Portal do cliente', href: 'https://www.sonils.co.ao/portal-do-cliente/' },
  { label: 'Recrutamento', href: 'https://www.sonils.co.ao/' },
]

export const contacts = [
  { label: 'Geral', tel: '+244 222 670 400', mail: 'info@sonils.co.ao' },
  { label: 'Direcção Comercial', tel: '+244 222 670 521', mail: 'sonils.comercial@sonils.co.ao' },
  { label: 'Operações', tel: '+244 222 670 497', mail: 'sonils.opt@sonils.co.ao' },
  { label: 'Emergência', tel: '+244 933 526 950' },
]

export const address = 'Base SONILS, Rua 6, Boavista, Luanda, Angola'
export const validarNota = 'Valores retirados do site actual da SONILS. A validar antes da publicação.'
