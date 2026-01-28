import { useState } from 'react'
import { Header, Container } from './layouts'
import { SummaryCard, MonthlyChart } from './features/dashboard/components'
import {
  TransactionList,
  TransactionForm,
} from './features/transactions/components'
import { CategoryChart } from './features/categories/components'
import { Button, Modal } from './shared/components'
import { useLocalStorage } from './shared/hooks'
import type { Transaction } from './shared/types'

const monthlyData = [
  { month: 'Jan', income: 4200, expenses: 3100 },
  { month: 'Fev', income: 4800, expenses: 3400 },
  { month: 'Mar', income: 5100, expenses: 3200 },
  { month: 'Abr', income: 4900, expenses: 3600 },
  { month: 'Mai', income: 5250, expenses: 3420 },
  { month: 'Jun', income: 5400, expenses: 3100 },
]

const initialTransactions: Transaction[] = [
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
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    'finance-transactions',
    initialTransactions
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  function handleAddTransaction(transaction: Transaction) {
    setTransactions([transaction, ...transactions])
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <Container>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
            Resumo
          </h2>
          <Button onClick={() => setIsModalOpen(true)}>Nova Transação</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <SummaryCard title="Saldo" value={balance} />
          <SummaryCard title="Receitas" value={income} variant="income" />
          <SummaryCard title="Despesas" value={expenses} variant="expense" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <MonthlyChart data={monthlyData} />
          <CategoryChart data={categoryData} />
        </div>

        <TransactionList transactions={transactions} />
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Transação"
      >
        <TransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default App
