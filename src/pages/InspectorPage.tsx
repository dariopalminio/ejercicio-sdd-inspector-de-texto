import { useTextDocument } from '../hooks/useTextDocument';
import { useTextMetrics } from '../hooks/useTextMetrics';
import { AppLayout } from '../components/layout/AppLayout';
import { Sidebar } from '../components/layout/Sidebar';
import { MainContent } from '../components/text-inspector/MainContent';
import { LimitsPanel } from '../components/limits/LimitsPanel';
import { SecurityPanel } from '../components/security/SecurityPanel';

export function InspectorPage() {
  const { content, setContent, clear } = useTextDocument();
  const metrics = useTextMetrics(content);

  return (
    <AppLayout
      sidebar={
        <Sidebar>
          <LimitsPanel metrics={metrics} />
          <SecurityPanel content={content} />
        </Sidebar>
      }
    >
      <MainContent content={content} onChange={setContent} onClear={clear} metrics={metrics} />
    </AppLayout>
  );
}
