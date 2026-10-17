# Beleza Perto

Protótipo de uma plataforma para encontrar serviços de beleza e recomendações de produtos por região. A versão atual é uma base inicial: não tem parceiros, compras, reservas, contas de utilizador nem dados comerciais reais.

## Executar localmente

Requer Node.js 20 ou superior. Na pasta do projeto:

```sh
npm run dev
```

Abre `http://localhost:3000`. A API inicial está em `/api`.

## API disponível

| Método | Rota | Utilização |
| --- | --- | --- |
| GET | `/api/health` | Estado do serviço |
| GET | `/api/regions` | Regiões e cidades iniciais |
| GET | `/api/categories` | Categorias de serviços |
| GET | `/api/services?region=PT&category=unhas` | Estrutura do catálogo de serviços |
| GET | `/api/products?region=CV` | Estrutura do catálogo de produtos |

Os catálogos devolvem listas vazias enquanto não houver parceiros confirmados.

## Configuração e integrações

1. Copia `.env.example` para `.env` para configuração local. Nunca guardes `.env` no Git.
2. Configura `DATABASE_URL` quando escolhermos o fornecedor e modelo de dados.
3. Configura email apenas quando existir domínio e fornecedor transacional.
4. Usa IDs/links de afiliado só após aprovação nos programas correspondentes.
5. Pagamentos não estão ligados: as compras de afiliados ocorrem na loja externa.

Não coloques chaves secretas no HTML ou em código enviado ao navegador. Em produção, guarda-as nos secrets do fornecedor de alojamento.

## Git e GitHub

O projeto está preparado para GitHub Actions. Para ligar a um repositório remoto que cries na tua conta:

```sh
git init -b main
git add .
git commit -m "Preparar base do Beleza Perto"
git remote add origin https://github.com/TEU_UTILIZADOR/beleza-perto.git
git push -u origin main
```

Depois, ativa GitHub Pages ou liga o repositório a um serviço de alojamento que suporte Node.js. O workflow valida a sintaxe da API em cada push e pull request.

## Próximas decisões de produto

- Confirmar nome, domínio e identidade visual.
- Definir cidades de lançamento em Cabo Verde e Portugal.
- Escolher alojamento e base de dados quando os primeiros parceiros forem conhecidos.
- Definir como serão recebidos pedidos de contacto/marcação e como serão moderados os perfis.
- Rever privacidade, cookies, termos, divulgação de afiliados e requisitos legais para os mercados de operação antes do lançamento público.
