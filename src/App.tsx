import { Header, Container } from './layouts'
import { SummaryCard, MonthlyChart } from './features/dashboard/components'
import { TransactionList } from './features/transactions/components'
import { CategoryChart } from './features/categories/components'
import type { Transaction } from './shared/types'

const monthlyData = [
  { month: 'Jan', income: 4200, expenses: 3100 },
  { month: 'Fev', income: 4800, expenses: 3400 },
  { month: 'Mar', income: 5100, expenses: 3200 },
  { month: 'Abr', income: 4900, expenses: 3600 },
  { month: 'Mai', income: 5250, expenses: 3420 },
  { month: 'Jun', income: 5400, expenses: 3100 },
]

const transactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário',
    amount: 5250,
    type: 'income',
    category: 'Trabalho',
    date: '2025-01-25',
    createdAt: '2025-01-25T10:00:00',
  },
  {
    id: '2',
    description: 'Aluguel',
    amount: 1500,
    type: 'expense',
    category: 'Moradia',
    date: '2025-01-20',
    createdAt: '2025-01-20T09:00:00',
  },
  {
    id: '3',
    description: 'Supermercado',
    amount: 450.5,
    type: 'expense',
    category: 'Alimentação',
    date: '2025-01-18',
    createdAt: '2025-01-18T15:30:00',
  },
  {
    id: '4',
    description: 'Freelance',
    amount: 800,
    type: 'income',
    category: 'Trabalho',
    date: '2025-01-15',
    createdAt: '2025-01-15T14:00:00',
  },
  {
    id: '5',
    description: 'Internet',
    amount: 120,
    type: 'expense',
    category: 'Serviços',
    date: '2025-01-10',
    createdAt: '2025-01-10T08:00:00',
  },
]

const categoryData = [
  { name: 'Moradia', value: 1500, color: '#3b82f6' },
  { name: 'Alimentação', value: 450.5, color: '#10b981' },
  { name: 'Serviços', value: 120, color: '#f59e0b' },
]

function App() {
  const income = 5250.0
  const expenses = 3420.5
  const balance = income - expenses

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard title="Saldo" value={balance} />
          <SummaryCard title="Receitas" value={income} variant="income" />
          <SummaryCard title="Despesas" value={expenses} variant="expense" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MonthlyChart data={monthlyData} />
          <CategoryChart data={categoryData} />
        </div>
        <TransactionList transactions={transactions} />
      </Container>
    </div>
  )
}

export default App
