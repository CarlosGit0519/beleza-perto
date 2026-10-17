# Beleza Perto

Protótipo React + TypeScript de uma plataforma de beleza para descobrir serviços, inspiração e recomendações de produtos por região. Os perfis, avaliações, preços, produtos e destinos são dados inteiramente fictícios para demonstrar a experiência antes de existirem parceiros.

## Tecnologias

- React 19 e TypeScript em modo estrito
- Vite para desenvolvimento e compilação do frontend
- API inicial em Node.js, separada do frontend
- GitHub Actions para validação de tipos e compilação

## Executar localmente

Requer Node.js 20 ou superior. Instala as dependências com `npm install`. Abre dois terminais na pasta do projeto:

```sh
npm run api
```

```sh
npm run dev
```

Abre o URL mostrado pelo Vite (normalmente `http://localhost:5173`). O frontend encaminha `/api` para o servidor local na porta 3000. Para compilar e servir a versão de produção:

```sh
npm run build
npm start
```

## Funcionalidades demonstrativas

- Pesquisa de perfis por nome, categoria e região, com filtros combináveis.
- Catálogo de perfis com localização, descrição, avaliações e preço meramente indicativo.
- Favoritos guardados localmente no navegador, sem conta de utilizador ou envio para servidor.
- Detalhes de perfil e produto em janelas modais.
- Formulário de interesse demonstrativo, sem envio nem armazenamento de dados.
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

`.env.example` documenta nomes reservados para base de dados, email, afiliados e pagamentos. Ainda não há fornecedores externos ligados. Não coloques chaves secretas no frontend. Antes de adicionar contas, formulários persistentes, marcações ou pagamentos, será necessário selecionar fornecedores, desenhar o modelo de dados, adicionar autenticação e proteção contra abuso e rever privacidade e requisitos legais nos mercados de operação.

## GitHub

O repositório está em [CarlosGit0519/beleza-perto](https://github.com/CarlosGit0519/beleza-perto). O workflow GitHub Actions instala dependências, verifica TypeScript e compila o frontend em pushes e pull requests para `main`.
