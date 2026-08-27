import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

// Región SIDEBAR: aloja el panel de Control de Límites y el Inspector de Seguridad (FR-018).
export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="flex w-full flex-col gap-6 border-t border-slate-800 bg-surface-900 p-4 sm:p-6 md:w-80 md:border-l md:border-t-0">
      {children}
    </aside>
  );
}
