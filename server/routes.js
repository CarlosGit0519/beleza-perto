const regions = [
  { code: 'CV', name: 'Cabo Verde', cities: ['Praia', 'Mindelo', 'Assomada'] },
  { code: 'PT', name: 'Portugal', cities: ['Lisboa', 'Porto', 'Setúbal'] },
  { code: 'AO', name: 'Angola', cities: ['Luanda', 'Benguela', 'Lobito'] }
];
const categories = [
  { id: 'tranças', name: 'Tranças' }, { id: 'cabelo', name: 'Cabelo' },
  { id: 'unhas', name: 'Unhas' }, { id: 'maquilhagem', name: 'Maquilhagem' }
];
const services = [
  { id: 'demo-1', name: 'Studio Raiz', category: 'Tranças', region: 'Portugal', city: 'Lisboa', indicativePrice: 55, demo: true },
  { id: 'demo-2', name: 'Ateliê Djamila', category: 'Unhas', region: 'Cabo Verde', city: 'Praia', indicativePrice: 25, demo: true },
  { id: 'demo-3', name: 'Luz & Pele', category: 'Maquilhagem', region: 'Portugal', city: 'Porto', indicativePrice: 40, demo: true },
  { id: 'demo-4', name: 'Cachos da Nia', category: 'Cabelo', region: 'Cabo Verde', city: 'Mindelo', indicativePrice: 30, demo: true },
  { id: 'demo-5', name: 'Mãos de seda', category: 'Unhas', region: 'Angola', city: 'Luanda', indicativePrice: 20, demo: true },
  { id: 'demo-6', name: 'Trama & Arte', category: 'Tranças', region: 'Portugal', city: 'Setúbal', indicativePrice: 60, demo: true }
];
const products = [
  { id: 'demo-x1', name: 'Rotina de hidratação', category: 'Cabelo & cuidado', availability: 'Indicativa: Portugal e Cabo Verde', demo: true },
  { id: 'demo-x2', name: 'Essenciais de maquilhagem', category: 'Maquilhagem', availability: 'Envio a confirmar', demo: true },
  { id: 'demo-x3', name: 'Pequenos rituais', category: 'Bem-estar', availability: 'Disponibilidade a confirmar', demo: true }
];
const json = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
};
const filterBy = (items, url, fields) => items.filter(item => fields.every(field => {
  const value = url.searchParams.get(field.param);
  return !value || item[field.key]?.toLowerCase() === value.toLowerCase();
}));

export async function router(req, res, url) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Método não permitido' });
  if (url.pathname === '/api/health') return json(res, 200, { status: 'ok', service: 'beleza-perto-api' });
  if (url.pathname === '/api/regions') return json(res, 200, { data: regions });
  if (url.pathname === '/api/categories') return json(res, 200, { data: categories });
  if (url.pathname === '/api/services') {
    const data = filterBy(services, url, [{ param: 'region', key: 'region' }, { param: 'category', key: 'category' }]);
    return json(res, 200, { data, demonstration: true, notice: 'Todos os perfis e preços são ilustrativos; não representam parceiros reais.' });
  }
  if (url.pathname === '/api/products') {
    const data = filterBy(products, url, [{ param: 'category', key: 'category' }]);
    return json(res, 200, { data, demonstration: true, notice: 'Produtos ilustrativos; não disponíveis para compra nem com envio confirmado.' });
  }
  return json(res, 404, { error: 'Endpoint não encontrado' });
}
