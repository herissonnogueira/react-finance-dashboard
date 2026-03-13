import axios from 'axios'
import type { Transaction } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
})

interface CreateTransactionData {
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
}

interface UpdateTransactionData {
  title?: string
  amount?: number
  type?: 'income' | 'expense'
  category?: string
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get<Transaction[]>('/transactions')
  return response.data
}

export async function createTransaction(
  data: CreateTransactionData,
): Promise<Transaction> {
  const response = await api.post<Transaction>('/transactions', data)
  return response.data
}

export async function updateTransaction(
  id: string,
  data: UpdateTransactionData,
): Promise<Transaction> {
  const response = await api.put<Transaction>(`/transactions/${id}`, data)
  return response.data
}

export async function deleteTransaction(id: string): Promise<void> {
  await api.delete(`/transactions/${id}`)
}
