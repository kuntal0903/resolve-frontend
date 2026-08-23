import { useState } from 'react';
import { Eye, ShieldAlert, ExternalLink } from 'lucide-react';
import ThreatModal from '../components/ThreatModal';

const THREATS_LIST = [
  { id: 'T-01', title: 'Active Exploitation of CVE-2026-1042', severity: 'critical', desc: 'RCE observed in Apache Struts 2 endpoint in wild.', cve: 'CVE-2026-1042' },
  { id: 'T-02', title: 'Malicious Subdomain Takeover Campaign', severity: 'high', desc: 'S3 CNAME hijacking targeting AWS US-East region.', cve: 'TACTIC-TA0040' },
  { id: 'T-03', title: 'SSRF Flaw Discovered in Spring Boot', severity: 'medium', desc: 'Unauthenticated internal port probing vulnerability.', cve: 'CVE-2026-0981' },
];

export default function ThreatsPage() {
  const [selectedThreat, setSelectedThreat] = useState(null);

  return (
    <main style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Eye size={22} color="var(--high)" /> Threat Intelligence Feed
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
          Live global threat intelligence correlated with your attack surface.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {THREATS_LIST.map((t) => (
          <div
            key={t.id}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20, cursor: 'pointer' }}
            onClick={() => setSelectedThreat(t)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span className={`severity-badge severity-badge--${t.severity}`}>{t.severity}</span>
              <ExternalLink size={16} color="var(--text-muted)" />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{t.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>{t.desc}</p>
            <span className="mono" style={{ fontSize: 12, color: 'var(--neon-blue)' }}>{t.cve}</span>
          </div>
        ))}
      </div>

      <ThreatModal threat={selectedThreat} onClose={() => setSelectedThreat(null)} />
    </main>
  );
}
