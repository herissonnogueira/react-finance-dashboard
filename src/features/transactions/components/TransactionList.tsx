import type { Transaction } from '../../../shared/types'
import { TransactionItem } from './TransactionItem'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-medium text-slate-900 mb-4">
        Últimas Transações
      </h3>
      {transactions.length === 0 ? (
        <p className="text-sm text-slate-500">Nenhuma transação ainda.</p>
      ) : (
        <div>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  )
}
