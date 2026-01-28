import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../shared/hooks'

export function Header() {
  const { isDark, toggle } = useDarkMode()

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
          Finance Dashboard
        </h1>
        <button
          onClick={toggle}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}
