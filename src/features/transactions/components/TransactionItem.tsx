import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../../shared/utils'
import type { Transaction } from '../../../shared/types'

interface TransactionItemProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

export function TransactionItem({ transaction, onEdit, onDelete }: TransactionItemProps) {
  const isIncome = transaction.type === 'income'

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {transaction.title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {transaction.category} • {formatDate(transaction.createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p
          className={`text-sm font-medium ${isIncome ? 'text-emerald-600' : 'text-red-500'}`}
        >
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </p>
        <button
          onClick={() => onEdit(transaction)}
          className="p-1 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
