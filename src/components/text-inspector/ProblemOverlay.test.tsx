import { render, screen } from '@testing-library/react';
import { ProblemOverlay } from './ProblemOverlay';

describe('ProblemOverlay', () => {
  it('shows a badge for each detected artifact when visible', () => {
    render(<ProblemOverlay content={'A\u200BB\uFEFFC\u0001D'} visible />);

    expect(screen.getByText('[ZWS]')).toBeInTheDocument();
    expect(screen.getByText('[BOM]')).toBeInTheDocument();
    expect(screen.getByText('[CTRL]')).toBeInTheDocument();
    expect(screen.getAllByText(/\[|A|B|C|D/).length).toBeGreaterThan(0);
  });

  it('shows no problems and no badges for clean content', () => {
    render(<ProblemOverlay content="Texto limpio" visible />);

    expect(screen.getByText('Sin problemas')).toBeInTheDocument();
    expect(screen.queryByText('[ZWS]')).not.toBeInTheDocument();
  });

  it('does not render while hidden', () => {
    render(<ProblemOverlay content={'A\u200BB'} visible={false} />);

    expect(screen.queryByText('[ZWS]')).not.toBeInTheDocument();
  });
});