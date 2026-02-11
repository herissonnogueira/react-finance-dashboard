import { useState } from 'react'
import { Button } from '../../../shared/components'

interface TransactionFormData {
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
}

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void
  onCancel: () => void
  initialData?: TransactionFormData
}

const categories = [
  'Trabalho',
  'Moradia',
  'Alimentação',
  'Transporte',
  'Serviços',
  'Lazer',
  'Saúde',
  'Outros',
]

export function TransactionForm({ onSubmit, onCancel, initialData }: TransactionFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [amount, setAmount] = useState(initialData ? String(initialData.amount) : '')
  const [type, setType] = useState<'income' | 'expense'>(initialData?.type ?? 'expense')
  const [category, setCategory] = useState(initialData?.category ?? categories[0])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    onSubmit({
      title,
      amount: parseFloat(amount),
      type,
      category,
    })
  }

  const inputStyles =
    'w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputStyles}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Valor
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputStyles}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Tipo
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Receita
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Despesa
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Categoria
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputStyles}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          {initialData ? 'Salvar' : 'Adicionar'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
