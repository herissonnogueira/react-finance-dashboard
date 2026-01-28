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
}

export function MonthlyChart({ data }: MonthlyChartProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">
                Evolução Mensal
            </h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip />
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
