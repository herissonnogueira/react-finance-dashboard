import { formatCurrency, formatDate } from '../../../shared/utils'
import type { Transaction } from '../../../shared/types'

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income'

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {transaction.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {transaction.category} • {formatDate(transaction.date)}
        </p>
      </div>
      <p
        className={`text-sm font-medium ${isIncome ? 'text-emerald-600' : 'text-red-500'}`}
      >
        {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
      </p>
    </div>
  )
}
