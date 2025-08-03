import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Route = "/" | "/login" | "/forgot-password" | "/leads" | "/companies" | "/deals" | "/calendar" | "/reports" | "/settings"

interface RouterContextType {
  currentPath: Route
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<Route>("/")

  const navigate = (path: string) => {
    setCurrentPath(path as Route)
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}