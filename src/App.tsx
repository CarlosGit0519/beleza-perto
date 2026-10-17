import { useMemo, useState, type FormEvent } from 'react';
import type { Product, Professional } from './types';

const professionals: Professional[] = [
  { id: 'p1', name: 'Studio Raiz', category: 'Tranças', region: 'Portugal', city: 'Lisboa', rating: '4,9', reviews: 28, price: 55, image: 'photo-1560869713-7d0a29430803', alt: 'Tranças longas em cabelo natural', tags: ['Box braids', 'Twists'], bio: 'Um perfil exemplo dedicado a estilos protetores e tranças personalizadas.' },
  { id: 'p2', name: 'Ateliê Djamila', category: 'Unhas', region: 'Cabo Verde', city: 'Praia', rating: '4,8', reviews: 16, price: 25, image: 'photo-1604654894610-df63bc536371', alt: 'Manicure com acabamento cuidado', tags: ['Manicure', 'Nail art'], bio: 'Perfil ilustrativo para serviços de manicure e decoração de unhas.' },
  { id: 'p3', name: 'Luz & Pele', category: 'Maquilhagem', region: 'Portugal', city: 'Porto', rating: '5,0', reviews: 12, price: 40, image: 'photo-1487412947147-5cebf100ffc2', alt: 'Maquilhagem profissional', tags: ['Eventos', 'Noivas'], bio: 'Exemplo de maquilhadora para eventos e ocasiões especiais.' },
  { id: 'p4', name: 'Cachos da Nia', category: 'Cabelo', region: 'Cabo Verde', city: 'Mindelo', rating: '4,9', reviews: 21, price: 30, image: 'photo-1529139574466-a303027c1d8b', alt: 'Cabelo encaracolado com estilo', tags: ['Caracóis', 'Hidratação'], bio: 'Perfil fictício de especialista em cabelo natural e cuidado de caracóis.' },
  { id: 'p5', name: 'Mãos de seda', category: 'Unhas', region: 'Angola', city: 'Luanda', rating: '4,7', reviews: 9, price: 20, image: 'photo-1610992015732-2449b76344bc', alt: 'Unhas com nail art', tags: ['Gel', 'Nail art'], bio: 'Uma demonstração de perfil para profissionais de unhas em Luanda.' },
  { id: 'p6', name: 'Trama & Arte', category: 'Tranças', region: 'Portugal', city: 'Setúbal', rating: '4,8', reviews: 14, price: 60, image: 'photo-1535632066927-ab7c9ab60908', alt: 'Acessórios e estilo de cabelo', tags: ['Cornrows', 'Penteados'], bio: 'Exemplo de profissional com opções de tranças e penteados criativos.' },
];

const products: Product[] = [
  { id: 'x1', name: 'Rotina de hidratação', category: 'Cabelo & cuidado', description: 'Ideias de produtos para uma rotina de cuidado capilar.', region: 'Portugal · Cabo Verde', image: 'photo-1608248543803-ba4f8c70ae0b', alt: 'Produtos de cuidado pessoal' },
  { id: 'x2', name: 'Essenciais de maquilhagem', category: 'Maquilhagem', description: 'Uma seleção ilustrativa para criar looks à tua maneira.', region: 'Portugal · verificar envio', image: 'photo-1596462502278-27bfdc403348', alt: 'Produtos de maquilhagem' },
  { id: 'x3', name: 'Pequenos rituais', category: 'Bem-estar', description: 'Cuidados e acessórios para os teus momentos.', region: 'Disponibilidade a confirmar', image: 'photo-1611930022073-b7a4ba5fcccd', alt: 'Frascos de produtos de beleza' },
];

const imageUrl = (id: string, width = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
const loadFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem('miriam-beauty-favorites') ?? '[]';
    return JSON.parse(stored) as string[];
  }
  catch { return []; }
};

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null);
  const [toast, setToast] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('pt');
    return professionals.filter((p) => (!q || `${p.name} ${p.city} ${p.category} ${p.tags.join(' ')}`.toLocaleLowerCase('pt').includes(q)) && (!category || p.category === category) && (!region || p.region === region));
  }, [query, category, region]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem('miriam-beauty-favorites', JSON.stringify(next));
    notify(next.includes(id) ? 'Guardado nos favoritos deste navegador.' : 'Removido dos favoritos.');
  }

  function showProfile(person: Professional) {
    setModal({ title: person.name, content: `${person.bio}\n\n${person.category} · ${person.city}, ${person.region}\n★ ${person.rating} — ${person.reviews} avaliações de exemplo\nPreço indicativo: €${person.price} a partir de` });
  }

  function showProduct(product: Product) {
    setModal({ title: product.name, content: `${product.description}\n\nEste não é um produto real nem está disponível para compra. No lançamento, serão apresentados links de lojas parceiras e destinos de envio confirmados.\nRegião indicativa: ${product.region}` });
  }

  function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setModal(null);
    notify('Demonstração concluída. Nenhum dado foi guardado.');
  }

  const favoriteNames = [...professionals, ...products].filter((item) => favorites.includes(item.id)).map((item) => item.name);

  return <>
    <div className="top-note">UMA PLATAFORMA DE BELEZA FEITA PARA DIFERENTES REGIÕES</div>
    <header className="wrap header"><a className="brand" href="#inicio" aria-label="Miriam Beauty — início">Miriam <span>Beauty</span></a><nav aria-label="Navegação principal"><a href="#servicos">Serviços</a><a href="#produtos">Produtos</a><a href="#inspiracao">Inspiração</a><a href="#regioes">Regiões</a></nav><div className="nav-actions"><button className="icon-btn" type="button" aria-label="Ver favoritos" onClick={() => notify(favoriteNames.length ? `Favoritos: ${favoriteNames.join(', ')}` : 'Ainda não guardaste favoritos. Usa o coração nos cartões.')}>♡ <span>{favorites.length}</span></button><a className="nav-cta" href="#profissionais">Para profissionais ↗</a></div></header>
    <main>
      <section className="wrap hero" id="inicio"><div><div className="eyebrow">O teu espaço de beleza</div><h1>Beleza que<br/><em>te aproxima.</em></h1><p>Descobre profissionais, guarda as tuas inspirações e encontra produtos para o teu estilo — começamos em Cabo Verde e Portugal, com espaço para crescer.</p><div className="hero-actions"><a className="button" href="#servicos">Encontrar serviços ↗</a><a className="button light" href="#produtos">Explorar produtos</a></div><div className="hero-foot">Pesquisa por região · Favoritos · Recomendações editoriais</div></div><div className="hero-image"><img src={imageUrl('photo-1522337360788-8b13dee7a37e', 1000)} alt="Profissional a cuidar do cabelo de uma cliente"/><div className="image-tag">O teu estilo, ao teu ritmo<small>Uma ideia ilustrativa de plataforma</small></div></div></section>
      <div className="trust-row"><div className="wrap trust-items"><div><b>Serviços</b>Encontra o teu estilo</div><div><b>Produtos</b>Ideias para a tua rotina</div><div><b>Regiões</b>CV · PT · AO e mais</div><div><b>Comunidade</b>Feita para crescer contigo</div></div></div>
      <section className="section white" id="servicos"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Descobre profissionais</div><h2>Um serviço à tua medida</h2></div><p>Explora exemplos de perfis e filtra por categoria, localização ou nome.</p></div><div className="searchbar" role="search"><input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Nome ou palavra-chave" aria-label="Pesquisar por nome ou palavra-chave"/><select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filtrar categoria"><option value="">Todas as categorias</option>{['Tranças', 'Cabelo', 'Unhas', 'Maquilhagem'].map((item) => <option key={item}>{item}</option>)}</select><select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Filtrar região"><option value="">Todas as regiões</option>{['Cabo Verde', 'Portugal', 'Angola'].map((item) => <option key={item}>{item}</option>)}</select><button className="button" type="button" onClick={() => { setQuery(''); setCategory(''); setRegion(''); }}>Limpar filtros</button></div><p className="filter-note">Os perfis abaixo são fictícios e servem apenas para demonstrar como o catálogo poderá funcionar.</p><div className="cards" aria-live="polite">{filtered.length ? filtered.map((person) => <article className="pro-card" key={person.id}><div className="pro-photo"><img src={imageUrl(person.image)} alt={person.alt} loading="lazy"/><span className="badge">Perfil demonstrativo</span><button className={`favorite ${favorites.includes(person.id) ? 'active' : ''}`} onClick={() => toggleFavorite(person.id)} aria-label={`Guardar ${person.name}`}>{favorites.includes(person.id) ? '♥' : '♡'}</button></div><div className="pro-body"><div className="pro-meta"><span>{person.category} · {person.city}, {person.region}</span><span className="rating">★ {person.rating} ({person.reviews})</span></div><h3>{person.name}</h3><p>{person.bio}</p><div className="chips">{person.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div><div className="card-bottom"><span className="price">€{person.price} <small>a partir de</small></span><button className="text-link" onClick={() => showProfile(person)}>Ver perfil →</button></div></div></article>) : <div className="empty-state">Não encontrámos exemplos com estes filtros. Experimenta outra região ou categoria.</div>}</div><div className="category-row">{[['〰', 'Tranças', 'Box braids, twists e mais'], ['✳', 'Cabelo', 'Cortes e cuidados'], ['♡', 'Unhas', 'Manicure e nail art'], ['✧', 'Maquilhagem', 'Looks para cada ocasião']].map(([icon, name, caption]) => <button className="category" key={name} onClick={() => { setCategory(name); document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' }); }}><span>{icon}</span><b>{name}</b><small>{caption}</small></button>)}</div></div></section>
      <section className="section" id="produtos"><div className="wrap"><div className="section-head"><div><div className="eyebrow">A tua prateleira de inspiração</div><h2>Produtos para cuidar do teu estilo</h2></div><p>Recomendações demonstrativas organizadas por necessidade e região.</p></div><div className="product-grid">{products.map((product) => <article className="product" key={product.id}><img src={imageUrl(product.image)} alt={product.alt} loading="lazy"/><button className={`favorite ${favorites.includes(product.id) ? 'active' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={`Guardar ${product.name}`}>{favorites.includes(product.id) ? '♥' : '♡'}</button><div className="product-body"><div className="product-label">{product.category}</div><h3>{product.name}</h3><p>{product.description}</p><div className="pro-meta"><span>{product.region}</span><button className="text-link" onClick={() => showProduct(product)}>Ver detalhes →</button></div></div></article>)}</div><div className="disclosure">Demonstração: estes produtos não estão à venda. No futuro, links de afiliado serão identificados e a disponibilidade de envio dependerá de cada loja.</div></div></section>
      <section className="section white" id="inspiracao"><div className="wrap editorial"><div className="editorial-image"><img src={imageUrl('photo-1521590832167-7bcbfaa6381f', 1000)} alt="Espaço de beleza com materiais de cuidado"/></div><div className="editorial-copy"><div className="eyebrow">Caderno de beleza</div><h2>Cuida das tranças, cuida de ti</h2><p>Uma boa rotina começa com gestos simples. Este conteúdo é ilustrativo e mostra como a plataforma poderá juntar informação útil às recomendações de produtos.</p><ul><li>Protege o cabelo à noite com um lenço ou touca de cetim.</li><li>Segue as instruções de utilização dos produtos escolhidos.</li><li>Se sentires desconforto, pede orientação a um profissional.</li></ul><a className="text-link" href="#produtos">Explorar ideias de cuidado →</a></div></div></section>
      <section className="section" id="regioes"><div className="wrap regions"><div className="region-visual"><img src={imageUrl('photo-1516815231560-8f41ec531527', 1000)} alt="Paisagem costeira de uma ilha"/><div className="region-stamp">Beleza sem fronteiras</div></div><div className="region-copy"><div className="eyebrow">Uma plataforma, várias regiões</div><h2>Mais perto, onde quer que estejas.</h2><p>A experiência poderá adaptar serviços e recomendações ao país escolhido. Cada produto terá informação sobre a loja, moeda e destinos de envio quando estiver disponível.</p><div className="region-list"><span className="pill">Cabo Verde</span><span className="pill">Portugal</span><span className="pill">Angola</span><span className="pill">Outras regiões</span></div><div className="note">Os perfis e exemplos deste protótipo não representam parceiros reais. Disponibilidade, preços, custos e prazos devem ser confirmados com cada fornecedor.</div></div></div></section>
      <section className="section white"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Como poderá funcionar</div><h2>Do primeiro clique ao teu próximo look</h2></div><p>Um percurso simples para clientes e profissionais.</p></div><div className="steps"><article className="step"><b>01</b><h3>Escolhe a região</h3><p>Seleciona o país e a cidade para explorar opções relevantes.</p></article><article className="step"><b>02</b><h3>Descobre e compara</h3><p>Consulta serviços, estilos, indicações e produtos recomendados.</p></article><article className="step"><b>03</b><h3>Contacta diretamente</h3><p>Quando houver parceiros, combina disponibilidade e detalhes com o profissional ou a loja.</p></article></div></div></section>
      <section className="join" id="profissionais"><div className="wrap join-inner"><div><div className="eyebrow">És profissional de beleza?</div><h2>O teu talento merece ser descoberto.</h2><p>Estamos a desenhar uma plataforma para dar visibilidade a profissionais. Deixa uma manifestação de interesse demonstrativa — não será enviada nem guardada num servidor nesta versão.</p></div><button className="button" onClick={() => setModal({ title: 'Manifesta o teu interesse', content: 'Este formulário é apenas uma demonstração e não envia nem guarda dados.' })}>Manifestar interesse ↗</button></div></section>
    </main>
    <footer className="footer"><div className="wrap"><div className="footer-top"><div><a className="brand" href="#inicio">Miriam <span>Beauty</span></a><p>Beleza, cuidado e inspiração para diferentes regiões.</p></div><div className="footer-links"><a href="#servicos">Serviços</a><a href="#produtos">Produtos</a><a href="#inspiracao">Inspiração</a><a href="#profissionais">Profissionais</a></div></div><div className="legal"><span>© 2026 Miriam Beauty · Protótipo ilustrativo</span><span>Privacidade · Termos · Divulgação de afiliados</span></div></div></footer>
    {modal && <div className="modal open" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}><div className="modal-card"><button className="modal-close" aria-label="Fechar" onClick={() => setModal(null)}>×</button><div className="eyebrow">Demonstração</div><h2 id="modalTitle">{modal.title}</h2><p className="modal-text">{modal.content}</p>{modal.title.includes('interesse') && <form onSubmit={submitInterest}><label>Nome profissional<input required placeholder="Como te chamam?"/></label><label>Serviço principal<select><option>Tranças</option><option>Cabelo</option><option>Unhas</option><option>Maquilhagem</option></select></label><label>País ou região<input placeholder="Ex.: Praia, Cabo Verde"/></label><button className="button">Ver demonstração</button></form>}<div className="notice">Nenhuma marcação, compra ou candidatura será enviada. Os dados apresentados são fictícios.</div></div></div>}
    <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
  </>;
}
