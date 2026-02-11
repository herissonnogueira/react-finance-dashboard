import { useEffect, useState } from 'react'
import { Header, Container } from './layouts'
import { SummaryCard, MonthlyChart } from './features/dashboard/components'
import {
  TransactionList,
  TransactionForm,
} from './features/transactions/components'
import { CategoryChart } from './features/categories/components'
import { Button, Modal } from './shared/components'
import { useDarkMode } from './shared/hooks'
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from './shared/services'
import type { Transaction } from './shared/types'

const categoryColors: Record<string, string> = {
  Trabalho: '#6366f1',
  Moradia: '#3b82f6',
  Alimentação: '#10b981',
  Transporte: '#f59e0b',
  Serviços: '#ef4444',
  Lazer: '#8b5cf6',
  Saúde: '#ec4899',
  Outros: '#94a3b8',
}

function App() {
  const { isDark, toggle } = useDarkMode()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(() => setError('Erro ao carregar transações'))
      .finally(() => setLoading(false))
  }, [])

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  const categoryData = Object.entries(
    transactions
      .filter((t) => t.type === 'expense')
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {}),
  ).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name] || '#94a3b8',
  }))

  const monthlyData = Object.entries(
    transactions.reduce<
      Record<string, { income: number; expenses: number }>
    >((acc, t) => {
      const month = new Date(t.createdAt).toLocaleDateString('pt-BR', {
        month: 'short',
      })
      if (!acc[month]) acc[month] = { income: 0, expenses: 0 }
      if (t.type === 'income') acc[month].income += t.amount
      else acc[month].expenses += t.amount
      return acc
    }, {}),
  ).map(([month, data]) => ({
    month: month.charAt(0).toUpperCase() + month.slice(1),
    ...data,
  }))

  function handleOpenEdit(transaction: Transaction) {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  async function handleDeleteTransaction(id: string) {
    await deleteTransaction(id)
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  async function handleSubmitTransaction(data: {
    title: string
    amount: number
    type: 'income' | 'expense'
    category: string
  }) {
    if (editingTransaction) {
      const updated = await updateTransaction(editingTransaction.id, data)
      setTransactions((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t)),
      )
    } else {
      const created = await createTransaction(data)
      setTransactions((prev) => [created, ...prev])
    }
    handleCloseModal()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header isDark={isDark} onToggleTheme={toggle} />
      <Container>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
            Resumo
          </h2>
          <Button onClick={() => { setEditingTransaction(null); setIsModalOpen(true) }}>Nova Transação</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <SummaryCard title="Saldo" value={balance} />
          <SummaryCard title="Receitas" value={income} variant="income" />
          <SummaryCard title="Despesas" value={expenses} variant="expense" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <MonthlyChart data={monthlyData} isDark={isDark} />
          <CategoryChart data={categoryData} isDark={isDark} />
        </div>

        <TransactionList transactions={transactions} onEdit={handleOpenEdit} onDelete={handleDeleteTransaction} />
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTransaction ? 'Editar Transação' : 'Nova Transação'}
      >
        <TransactionForm
          onSubmit={handleSubmitTransaction}
          onCancel={handleCloseModal}
          initialData={editingTransaction ?? undefined}
        />
      </Modal>
    </div>
  )
}

export default App
