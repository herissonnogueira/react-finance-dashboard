# Finance Dashboard

Dashboard financeiro feito em React com foco em componentização, tipagem, responsividade e integração com API REST.

## Tecnologias

- **React 19** com **TypeScript**
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **Recharts** para gráficos
- **Axios** para comunicação com a API
- **React Hot Toast** para notificações
- **Lucide React** para ícones

## Funcionalidades

- CRUD completo de transações integrado com API
- Resumo financeiro com saldo, receitas e despesas
- Gráficos de evolução mensal e despesas por categoria
- Criação e edição de transações via modal
- Confirmação antes de excluir
- Toast notifications de feedback
- Dark mode com persistência
- Modal acessível (ESC, aria attributes)
- Layout responsivo

## Pré-requisitos

- Node.js 20+
- [Finance Dashboard API](https://github.com/herissonnogueira/finance-dashboard-api) rodando na porta 3333

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  features/
    dashboard/      -> Cards de resumo e gráfico mensal
    transactions/   -> Lista, formulário e item de transação
    categories/     -> Gráfico de categorias
  layouts/          -> Header e Container
  shared/
    components/     -> Button e Modal
    hooks/          -> useDarkMode
    services/       -> Integração com a API (axios)
    types/          -> Interfaces TypeScript
    utils/          -> Formatação de moeda e data
```
