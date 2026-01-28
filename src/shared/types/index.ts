// Transaction types
export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  createdAt: string
}

// Category types
export interface Category {
  id: string
  name: string
  color: string
  icon?: string
}

// Summary types
export interface Summary {
  balance: number
  income: number
  expenses: number
}

// Chart data types
export interface ChartDataPoint {
  name: string
  income: number
  expenses: number
}

export interface CategoryChartData {
  name: string
  value: number
  color: string
}
