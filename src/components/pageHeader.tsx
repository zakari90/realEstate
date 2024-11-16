import { ReactNode } from "react"

export function PageHeader({ children }: { children: ReactNode }) {
  return <h1 className="text-3xl font-bold  mb-8">{children}</h1>
}