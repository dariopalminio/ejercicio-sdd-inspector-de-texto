interface ClearTextButtonProps {
  onClear: () => void;
  disabled?: boolean;
}

// Botón nativo "Vaciar": foco/activación por teclado (Enter/Espacio) gratis vía <button> (FR-003/FR-005).
export function ClearTextButton({ onClear, disabled = false }: ClearTextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClear}
      disabled={disabled}
      className="self-end rounded-lg bg-accent-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Vaciar
    </button>
  );
}
