import { Suspense } from "react"
import { Fallback } from "../fallback"

export const PlainLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Fallback className="min-h-screen" />}>
    {children}
  </Suspense>
);
