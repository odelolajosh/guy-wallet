import { Suspense } from "react";
import { AppHeader } from "../app-header";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { ScrollRestoration } from "react-router-dom";
import { Fallback } from "../fallback";

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <AppSidebar />
    <main className="w-full bg-muted">
      <AppHeader className="mb-4" />
      <div className='max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Suspense fallback={<Fallback className="min-h-screen" />}>
          {children}
        </Suspense>
      </div>
      <ScrollRestoration />
    </main>
  </SidebarProvider>
);
