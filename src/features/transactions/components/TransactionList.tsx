import type { Transaction } from '../../../shared/types'
import { TransactionItem } from './TransactionItem'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-4">
        Últimas Transações
      </h3>
      {transactions.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Nenhuma transação ainda.
        </p>
      ) : (
        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  )
}
