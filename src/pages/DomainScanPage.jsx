import { useState } from 'react';
import { Globe, Search, RefreshCw, Radio } from 'lucide-react';

const RECON_RESULTS = [
  { subdomain: 'api.asm-shield.io', ip: '52.91.44.120', status: '200 OK', ports: '80, 443', cloud: 'AWS us-east-1' },
  { subdomain: 'staging-docs.asm.io', ip: '18.118.22.40', status: '404 Vulnerable CNAME', ports: '80', cloud: 'AWS CloudFront' },
  { subdomain: 'auth-gateway.internal-asm.dev', ip: '34.201.10.88', status: '200 OK', ports: '443, 8443', cloud: 'AWS us-west-2' },
  { subdomain: 'cache-cluster.prod.internal', ip: '10.0.4.12', status: 'Exposed Internal', ports: '6379', cloud: 'GCP us-central1' },
];

export default function DomainScanPage() {
  const [targetDomain, setTargetDomain] = useState('asm-shield.io');
  const [isScanning, setIsScanning] = useState(false);

  const handleStartScan = (e) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2500);
  };

  return (
    <main style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Globe size={22} color="var(--accent-cyan)" /> Subdomain Reconnaissance & Passive DNS
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
          Discover hidden subdomains, dangling CNAME records, and unauthorized shadow IT.
        </p>
      </div>

      <form onSubmit={handleStartScan} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <input
          type="text"
          value={targetDomain}
          onChange={(e) => setTargetDomain(e.target.value)}
          placeholder="e.g. yourcompany.com"
          style={{ flex: 1, padding: '12px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: 14 }}
        />
        <button type="submit" className="btn btn--primary" disabled={isScanning}>
          {isScanning ? <RefreshCw size={16} className="spin-icon" /> : <Search size={16} />}
          {isScanning ? 'Reconnaissance in progress...' : 'Start Subdomain Enumeration'}
        </button>
      </form>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-raised)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px' }}>Subdomain</th>
              <th style={{ padding: '12px 16px' }}>IP Address</th>
              <th style={{ padding: '12px 16px' }}>HTTP Response / Risk</th>
              <th style={{ padding: '12px 16px' }}>Open Ports</th>
              <th style={{ padding: '12px 16px' }}>Infrastructure</th>
            </tr>
          </thead>
          <tbody>
            {RECON_RESULTS.map((r, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="mono" style={{ padding: '14px 16px', color: 'var(--neon-blue)', fontWeight: 600 }}>{r.subdomain}</td>
                <td className="mono" style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{r.ip}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    background: r.status.includes('Vulnerable') || r.status.includes('Exposed') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                    color: r.status.includes('Vulnerable') || r.status.includes('Exposed') ? 'var(--critical)' : 'var(--low)',
                  }}>
                    {r.status}
                  </span>
                </td>
                <td className="mono" style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{r.ports}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{r.cloud}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
