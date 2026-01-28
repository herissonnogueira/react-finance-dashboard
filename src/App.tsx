import { Header, Container } from './layouts'
import { SummaryCard, MonthlyChart } from './features/dashboard/components'

const monthlyData = [
  { month: 'Jan', income: 4200, expenses: 3100 },
  { month: 'Fev', income: 4800, expenses: 3400 },
  { month: 'Mar', income: 5100, expenses: 3200 },
  { month: 'Abr', income: 4900, expenses: 3600 },
  { month: 'Mai', income: 5250, expenses: 3420 },
  { month: 'Jun', income: 5400, expenses: 3100 },
]

function App() {
  const income = 5250.0
  const expenses = 3420.5
  const balance = income - expenses

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard title="Saldo" value={balance} />
          <SummaryCard title="Receitas" value={income} variant="income" />
          <SummaryCard title="Despesas" value={expenses} variant="expense" />
        </div>
        <MonthlyChart data={monthlyData} />
      </Container>
    </div>
  )
}

export default App
