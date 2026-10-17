# Beleza Perto

Protótipo de uma plataforma de beleza para descobrir serviços, inspiração e recomendações de produtos por região. A interface inclui dados inteiramente fictícios para demonstrar a experiência antes de existirem parceiros.

> **Demonstração:** os perfis, avaliações, preços, produtos, fotografias e indicações de disponibilidade são exemplos. Não existem marcações, compras ou recomendações comerciais reais nesta versão.

## Executar localmente

Requer Node.js 20 ou superior.

```sh
npm run dev
```

Abre `http://localhost:3000`. O servidor disponibiliza o frontend e a API demonstrativa.

## Funcionalidades demonstrativas

- Pesquisa de perfis por nome, categoria e região, com filtros combináveis.
- Catálogo de perfis com localização, descrição, avaliações e preço meramente indicativo.
- Favoritos guardados localmente no navegador, sem conta de utilizador ou envio para servidor.
- Detalhes de perfil e produto em janelas modais.
- Formulário de interesse para profissionais que confirma a interação, mas não envia nem guarda dados.
- Categorias, conteúdo editorial e informação regional para Cabo Verde, Portugal e Angola.
- Layout adaptável a dispositivos móveis.

## API demonstrativa

| Método | Rota | Utilização |
| --- | --- | --- |
| GET | `/api/health` | Estado do serviço |
| GET | `/api/regions` | Regiões e cidades de exemplo |
| GET | `/api/categories` | Categorias de serviços |
| GET | `/api/services?region=Portugal&category=Tranças` | Perfis demonstrativos filtrados |
| GET | `/api/products?category=Maquilhagem` | Produtos demonstrativos filtrados |

## Configuração futura

`.env.example` documenta os nomes de configuração reservados para base de dados, email, afiliados e pagamentos. Ainda não estão ligados fornecedores externos, e não se devem colocar chaves secretas no frontend. Antes de adicionar contas, formulários persistentes, marcações ou pagamentos, será necessário selecionar os serviços adequados, desenhar o modelo de dados, adicionar autenticação e proteção contra abuso, e rever privacidade e requisitos legais dos mercados de operação.

## GitHub

O repositório está em [CarlosGit0519/beleza-perto](https://github.com/CarlosGit0519/beleza-perto). O workflow GitHub Actions executa `npm run check` nos pushes e pull requests para `main`.
