import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

// Regi\u00f3n SIDEBAR: aloja el panel de Control de L\u00edmites (FR-018).
export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-full border-t border-slate-800 bg-surface-900 p-4 sm:p-6 md:w-80 md:border-l md:border-t-0">
      {children}
    </aside>
  );
}
