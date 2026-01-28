import { useState } from 'react'
import { Button } from '../../../shared/components'
import { generateId, getCurrentDate } from '../../../shared/utils'
import type { Transaction } from '../../../shared/types'

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void
  onCancel: () => void
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

export function TransactionForm({ onSubmit, onCancel }: TransactionFormProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState(getCurrentDate())

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const transaction: Transaction = {
      id: generateId(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
      createdAt: new Date().toISOString(),
    }

    onSubmit(transaction)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Descrição
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Valor
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
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
            <span className="text-sm text-slate-700">Receita</span>
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
            <span className="text-sm text-slate-700">Despesa</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Categoria
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Data
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          Adicionar
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
