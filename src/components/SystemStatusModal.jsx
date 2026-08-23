import { useState } from 'react';
import {
  X,
  Server,
  Activity,
  CheckCircle2,
  HardDrive,
  Cpu,
  RefreshCw,
} from 'lucide-react';

export default function SystemStatusModal({ isOpen, onClose }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefreshSensors = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.8)', zIndex: 400 }} />

      <div
        role="dialog"
        aria-label="System Health Telemetry"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '600px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-lg)',
          zIndex: 401,
          padding: 24,
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), var(--glow-blue)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Activity size={20} color="var(--low)" />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Scanner & Engine Status</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: 'var(--bg-raised)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Scanner Cluster A</span>
              <CheckCircle2 size={14} color="var(--low)" />
            </div>
            <strong style={{ fontSize: 14, color: 'var(--text-primary)' }}>100% Operational</strong>
            <span style={{ fontSize: 11, color: 'var(--neon-blue)', display: 'block', marginTop: 4 }}>us-east-1 (12 nodes)</span>
          </div>

          <div style={{ background: 'var(--bg-raised)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Threat Feeds API</span>
              <CheckCircle2 size={14} color="var(--low)" />
            </div>
            <strong style={{ fontSize: 14, color: 'var(--text-primary)' }}>Synced (12ms)</strong>
            <span style={{ fontSize: 11, color: 'var(--neon-cyan)', display: 'block', marginTop: 4 }}>Live Sync Active</span>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>Node Metrics</h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Cpu size={14} /> CPU Utilization</span>
                <span className="mono">18.4%</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-raised)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: '18.4%', height: '100%', background: 'var(--accent-blue)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><HardDrive size={14} /> Buffer Pool Storage</span>
                <span className="mono">42.1%</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-raised)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: '42.1%', height: '100%', background: 'var(--accent-cyan)' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Engine Build: <span className="mono">v2.4.9-release</span></span>
          <button className="btn btn--secondary" onClick={handleRefreshSensors} disabled={isRefreshing}>
            <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} />
            {isRefreshing ? 'Pinging Node...' : 'Ping Engine Cluster'}
          </button>
        </div>
      </div>
    </>
  );
}
