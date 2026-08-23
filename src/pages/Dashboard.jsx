import { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Layers,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import KpiCard from '../components/KpiCard';
import RiskChart from '../components/RiskChart';
import VulnerabilityTable from '../components/VulnerabilityTable';
import ThreatFeed from '../components/ThreatFeed';
import ExportCard from '../components/ExportCard';
import VulnerabilityModal from '../components/VulnerabilityModal';
import ThreatModal from '../components/ThreatModal';

export default function Dashboard({ onExport }) {
  const [selectedVuln, setSelectedVuln] = useState(null);
  const [selectedThreat, setSelectedThreat] = useState(null);

  return (
    <main style={{ padding: 24, maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <KpiCard title="Total Discovered Assets" value="1,284" change="+12" trend="up" icon={Layers} color="blue" />
        <KpiCard title="Overall Surface Health" value="84 / 100" change="+3%" trend="up" icon={ShieldCheck} color="green" />
        <KpiCard title="Critical Flaws (Unpatched)" value="14" change="-2" trend="down" icon={AlertTriangle} color="red" />
        <KpiCard title="Active Threat Vectors" value="3" change="0" trend="neutral" icon={Flame} color="orange" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', height: 340, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>Risk & Exposure Telemetry (24h)</h3>
          <div style={{ flex: 1 }}>
            <RiskChart />
          </div>
        </div>

        <ExportCard onExport={onExport} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldAlert size={18} color="var(--critical)" /> Top Prioritized Vulnerabilities
          </h3>
          <VulnerabilityTable onSelectVuln={(v) => setSelectedVuln(v)} />
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flame size={18} color="var(--high)" /> Active Threat Intel
          </h3>
          <ThreatFeed onSelectThreat={(t) => setSelectedThreat(t)} />
        </div>
      </div>

      <VulnerabilityModal vuln={selectedVuln} onClose={() => setSelectedVuln(null)} />
      <ThreatModal threat={selectedThreat} onClose={() => setSelectedThreat(null)} />
    </main>
  );
}
