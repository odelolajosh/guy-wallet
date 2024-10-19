import { RouterProvider } from 'react-router-dom'
import AppProvider from './providers/app'
import { router } from './routes'
import { Fallback } from './components/fallback'
import { Suspense } from 'react'
import { ThemeProvider } from './providers/theme'

function App() {
  return (
    <Suspense fallback={<Fallback className='min-h-screen' />}>
      <ThemeProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
