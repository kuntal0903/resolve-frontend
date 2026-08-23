import { useState } from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import VulnerabilityTable from '../components/VulnerabilityTable';
import VulnerabilityModal from '../components/VulnerabilityModal';

export default function VulnerabilitiesPage() {
  const [selectedVuln, setSelectedVuln] = useState(null);

  return (
    <main style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertTriangle size={22} color="var(--critical)" /> Vulnerability Management & CVE Tracking
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
          All detected software vulnerabilities across your external infrastructure.
        </p>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
        <VulnerabilityTable onSelectVuln={(v) => setSelectedVuln(v)} />
      </div>

      <VulnerabilityModal vuln={selectedVuln} onClose={() => setSelectedVuln(null)} />
    </main>
  );
}
