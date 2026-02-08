import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface ChartData {
  month: string
  income: number
  expenses: number
}

interface MonthlyChartProps {
  data: ChartData[]
  isDark: boolean
}

export function MonthlyChart({ data, isDark }: MonthlyChartProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
        Evolução Mensal
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: isDark ? 'none' : '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
              labelStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
              itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              name="Receitas"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Despesas"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
