const regions = [
  { code: 'CV', name: 'Cabo Verde', cities: ['Praia', 'Mindelo', 'Assomada'] },
  { code: 'PT', name: 'Portugal', cities: ['Lisboa', 'Porto', 'Setúbal'] },
  { code: 'AO', name: 'Angola', cities: ['Luanda', 'Benguela', 'Lobito'] }
];
const categories = [
  { id: 'tranças', name: 'Tranças' }, { id: 'cabelo', name: 'Cabelo' },
  { id: 'unhas', name: 'Unhas' }, { id: 'maquilhagem', name: 'Maquilhagem' }
];
const json = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };

export async function router(req, res, url) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Método não permitido' });
  if (url.pathname === '/api/health') return json(res, 200, { status: 'ok', service: 'beleza-perto-api' });
  if (url.pathname === '/api/regions') return json(res, 200, { data: regions });
  if (url.pathname === '/api/categories') return json(res, 200, { data: categories });
  if (url.pathname === '/api/services') return json(res, 200, { data: [], filters: { region: url.searchParams.get('region'), category: url.searchParams.get('category') }, message: 'O catálogo será preenchido quando os profissionais parceiros forem definidos.' });
  if (url.pathname === '/api/products') return json(res, 200, { data: [], filters: { region: url.searchParams.get('region'), category: url.searchParams.get('category') }, message: 'As recomendações serão adicionadas após validação dos parceiros e destinos de envio.' });
  return json(res, 404, { error: 'Endpoint não encontrado' });
}
