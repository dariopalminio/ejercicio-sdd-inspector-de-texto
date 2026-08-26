import { ReactNode } from 'react';
import { Topbar } from './Topbar';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

// Envuelve MAIN CONTENT con el TOPBAR/HEADER y el FOOTER compartidos de la página (FR-015/FR-016/FR-017).
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-900 text-slate-100">
      <Topbar />
      {children}
      <Footer />
    </div>
  );
}
