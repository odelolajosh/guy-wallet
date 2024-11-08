import { Suspense } from "react"
import { Fallback } from "../fallback"

export const PlainLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Fallback className="min-h-screen" />}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </Suspense>
);
