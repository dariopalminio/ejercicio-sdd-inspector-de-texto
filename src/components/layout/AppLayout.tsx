import { ReactNode } from 'react';
import { Topbar } from './Topbar';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

// Envuelve MAIN CONTENT (+ SIDEBAR opcional) con el TOPBAR/HEADER y el FOOTER compartidos (FR-015/016/017/018).
export function AppLayout({ children, sidebar }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-900 text-slate-100">
      <Topbar />
      <div className="flex flex-1 flex-col md:flex-row">
        {children}
        {sidebar}
      </div>
      <Footer />
    </div>
  );
}
