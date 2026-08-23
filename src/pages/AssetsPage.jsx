import { useState } from 'react';
import {
  Layers,
  Server,
  Filter,
  RefreshCw,
} from 'lucide-react';
import AssetModal from '../components/AssetModal';

const ASSETS_DATA = [
  { id: 'AST-101', name: 'api-prod-01.us-east.asm-shield.io', ip: '52.91.44.120', type: 'API Endpoint', risk: 'Critical', status: 'Online', vulns: 3, os: 'Linux (Ubuntu 22.04 LTS)' },
  { id: 'AST-102', name: 'auth-gateway.internal-asm.dev', ip: '34.201.10.88', type: 'Authentication Server', risk: 'High', status: 'Online', vulns: 2, os: 'Linux (Debian 11)' },
  { id: 'AST-103', name: 'cdn-edge-99.global.asm.net', ip: '13.224.9.15', type: 'CDN Node', risk: 'Medium', status: 'Online', vulns: 1, os: 'Alpine Linux' },
  { id: 'AST-104', name: 'staging-docs.asm.io', ip: '18.118.22.40', type: 'Web Server', risk: 'High', status: 'Online', vulns: 4, os: 'Linux (Amazon Linux 2)' },
];

export default function AssetsPage() {
  const [assets] = useState(ASSETS_DATA);
  const [filterRisk, setFilterRisk] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredAssets = assets.filter((a) => {
    if (filterRisk === 'all') return true;
    return a.risk.toLowerCase() === filterRisk.toLowerCase();
  });

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1800);
  };

  return (
    <main style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Layers size={22} color="var(--accent-blue)" /> Asset Inventory & Cloud Infrastructure
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Discovered digital assets across cloud providers, IP ranges, and domain names.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              className="s-select"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              style={{ padding: '6px 12px', fontSize: 13, background: 'var(--bg-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical Risk</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>

          <button className="btn btn--secondary" onClick={handleTriggerSync} disabled={isSyncing}>
            <RefreshCw size={14} className={isSyncing ? 'spin-icon' : ''} />
            {isSyncing ? 'Discovering...' : 'Sync Cloud Assets'}
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-raised)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px' }}>Asset ID</th>
              <th style={{ padding: '12px 16px' }}>Asset Domain / Hostname</th>
              <th style={{ padding: '12px 16px' }}>IP Address</th>
              <th style={{ padding: '12px 16px' }}>Type</th>
              <th style={{ padding: '12px 16px' }}>Risk Score</th>
              <th style={{ padding: '12px 16px' }}>Vulnerabilities</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((ast) => (
              <tr
                key={ast.id}
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => setSelectedAsset(ast)}
              >
                <td className="mono" style={{ padding: '14px 16px', color: 'var(--neon-blue)', fontWeight: 600 }}>{ast.id}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Server size={16} color="var(--accent-cyan)" />
                    {ast.name}
                  </div>
                </td>
                <td className="mono" style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{ast.ip}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{ast.type}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span className={`severity-badge severity-badge--${ast.risk.toLowerCase()}`}>{ast.risk}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <strong style={{ color: ast.vulns > 0 ? 'var(--critical)' : 'var(--low)' }}>{ast.vulns} Flaws</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssetModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
    </main>
  );
}
