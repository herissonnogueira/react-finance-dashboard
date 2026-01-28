import { Header, Container } from './layouts'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Container>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-slate-600">Dashboard em construção...</p>
        </div>
      </Container>
    </div>
  )
}

export default App
