import { ShieldAlert, ExternalLink } from 'lucide-react';

const THREATS = [
  { id: 1, title: 'Active Exploitation of CVE-2026-1042', severity: 'critical', desc: 'RCE observed in Apache Struts 2 endpoint in wild.', cve: 'CVE-2026-1042' },
  { id: 2, title: 'Malicious Subdomain Takeover Campaign', severity: 'high', desc: 'S3 CNAME hijacking targeting AWS US-East region.', cve: 'TACTIC-TA0040' },
  { id: 3, title: 'SSRF Flaw Discovered in Spring Boot', severity: 'medium', desc: 'Unauthenticated internal port probing vulnerability.', cve: 'CVE-2026-0981' },
];

export default function ThreatFeed({ onSelectThreat }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {THREATS.map((t) => (
        <div
          key={t.id}
          style={{
            padding: 12,
            background: 'var(--bg-raised)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            cursor: onSelectThreat ? 'pointer' : 'default',
          }}
          onClick={() => onSelectThreat && onSelectThreat(t)}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <ShieldAlert size={18} color={t.severity === 'critical' ? 'var(--critical)' : 'var(--high)'} style={{ marginTop: 2 }} />
            <div>
              <strong style={{ fontSize: 13, color: 'var(--text-primary)', display: 'block' }}>{t.title}</strong>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '2px 0 4px' }}>{t.desc}</p>
              <span className="mono" style={{ fontSize: 11, color: 'var(--neon-blue)' }}>{t.cve}</span>
            </div>
          </div>
          <ExternalLink size={14} color="var(--text-muted)" />
        </div>
      ))}
    </div>
  );
}
