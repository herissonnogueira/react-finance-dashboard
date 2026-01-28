import { formatCurrency } from '../../../shared/utils'

type Variant = 'default' | 'income' | 'expense'

interface SummaryCardProps {
  title: string
  value: number
  variant?: Variant
}

const variantStyles: Record<Variant, string> = {
  default: 'text-slate-900 dark:text-white',
  income: 'text-emerald-600',
  expense: 'text-red-500',
}

export function SummaryCard({
  title,
  value,
  variant = 'default',
}: SummaryCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <p className={`text-2xl font-semibold ${variantStyles[variant]}`}>
        {formatCurrency(value)}
      </p>
    </div>
  )
}
