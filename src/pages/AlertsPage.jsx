import { useState } from 'react';
import {
  BellRing,
  ShieldAlert,
  Radio,
  Clock,
  Filter,
} from 'lucide-react';
import AlertModal from '../components/AlertModal';

const ALERTS_DATA = [
  { id: 'ALT-9901', title: 'Remote Code Execution Exploit Attempt', severity: 'critical', asset: 'api-prod-01.us-east.asm-shield.io', time: '4m ago', status: 'Active', desc: 'Attacker injected malformed HTTP payload attempting buffer overflow against Apache Struts 2.' },
  { id: 'ALT-9902', title: 'Subdomain Takeover Vector Vulnerability', severity: 'high', asset: 'staging-docs.asm.io', time: '18m ago', status: 'Active', desc: 'Stale DNS CNAME record pointing to deleted S3 bucket detected.' },
  { id: 'ALT-9903', title: 'Unauthenticated Redis Instance Exposed', severity: 'critical', asset: 'cache-cluster.prod.internal', time: '42m ago', status: 'Active', desc: 'Port 6379 accessible directly from external internet without auth password.' },
  { id: 'ALT-9904', title: 'Expired TLS/SSL Security Certificate', severity: 'warning', asset: 'auth-gateway.internal-asm.dev', time: '2h ago', status: 'Investigating', desc: 'SSL certificate expired 2 hours ago causing client handshake errors.' },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(ALERTS_DATA);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  const handleResolveAlert = (alertId) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, status: 'Resolved' } : a)));
  };

  return (
    <main style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <BellRing size={22} color="var(--critical)" /> Security Incident & Alert Log
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Real-time security telemetry alerts triggered across your external attack surface.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            className="s-select"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            style={{ padding: '6px 12px', fontSize: 13, background: 'var(--bg-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="high">High Only</option>
            <option value="warning">Warning Only</option>
          </select>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-raised)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px' }}>Alert ID</th>
              <th style={{ padding: '12px 16px' }}>Incident Title</th>
              <th style={{ padding: '12px 16px' }}>Severity</th>
              <th style={{ padding: '12px 16px' }}>Target Asset</th>
              <th style={{ padding: '12px 16px' }}>Time</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alt) => (
              <tr
                key={alt.id}
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => setSelectedAlert(alt)}
              >
                <td className="mono" style={{ padding: '14px 16px', color: 'var(--neon-blue)', fontWeight: 600 }}>{alt.id}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {alt.severity === 'critical' && <ShieldAlert size={16} color="var(--critical)" />}
                    {alt.severity === 'high' && <Radio size={16} color="var(--high)" />}
                    {alt.severity === 'warning' && <Clock size={16} color="var(--medium)" />}
                    {alt.title}
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span className={`severity-badge severity-badge--${alt.severity}`}>{alt.severity}</span>
                </td>
                <td className="mono" style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{alt.asset}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{alt.time}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    background: alt.status === 'Resolved' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: alt.status === 'Resolved' ? 'var(--low)' : 'var(--critical)',
                  }}>
                    {alt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} onResolve={handleResolveAlert} />
    </main>
  );
}
