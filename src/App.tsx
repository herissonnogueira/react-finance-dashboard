import { Header, Container } from './layouts'
import { SummaryCard } from './features/dashboard/components'

function App() {
  const income = 5250.00
  const expenses = 3420.50
  const balance = income - expenses

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Saldo" value={balance} />
          <SummaryCard title="Receitas" value={income} variant="income" />
          <SummaryCard title="Despesas" value={expenses} variant="expense" />
        </div>
      </Container>
    </div>
  )
}

export default App
