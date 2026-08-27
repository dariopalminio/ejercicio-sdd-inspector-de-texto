import { useSecurityReport } from '../../hooks/useSecurityReport';

interface SecurityPanelProps {
  content: string;
}

// Panel "Inspector de Seguridad" del SIDEBAR (FR-027 a FR-031, FR-033).
export function SecurityPanel({ content }: SecurityPanelProps) {
  const { count, status } = useSecurityReport(content);
  const isAlert = status === 'alert';

  return (
    <div className="flex flex-col gap-2 border-t border-slate-800 pt-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        Inspector de Seguridad
      </h2>
      <p className={`text-sm font-medium ${isAlert ? 'text-amber-400' : 'text-accent-400'}`}>
        {isAlert
          ? `Artefactos detectados: ${count}`
          : 'Texto seguro: no se detectaron caracteres ocultos'}
      </p>
    </div>
  );
}
