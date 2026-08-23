import { useState } from 'react';
import {
  X,
  ShieldAlert,
  Flame,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export default function ThreatModal({ threat, onClose }) {
  const [mitigated, setMitigated] = useState(false);

  if (!threat) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.8)', zIndex: 400 }} />

      <div
        role="dialog"
        aria-label={`Threat details for ${threat.title}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-lg)',
          zIndex: 401,
          padding: 24,
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), var(--glow-blue)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: threat.severity === 'critical' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                color: threat.severity === 'critical' ? 'var(--critical)' : 'var(--high)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: threat.severity === 'critical' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(249, 115, 22, 0.3)',
              }}
            >
              <Flame size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{threat.title}</h2>
                <span className={`severity-badge severity-badge--${threat.severity}`}>{threat.severity}</span>
              </div>
              <span className="mono" style={{ fontSize: 12, color: 'var(--neon-blue)' }}>
                {threat.cve || 'THREAT-INTEL-01'} • Active Exploitation Detected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {mitigated && (
          <div style={{ padding: '10px 14px', marginBottom: 16, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--low)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--low)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={14} /> Threat mitigation playbook deployed across edge WAF.
          </div>
        )}

        <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>Threat Description</h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {threat.desc || 'Active threat campaign observed targeting exposed cloud services and edge infrastructure.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ background: 'var(--bg-raised)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>Threat Vector</span>
            <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>Remote Code Execution (RCE)</strong>
          </div>
          <div style={{ background: 'var(--bg-raised)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>EPSS Score</span>
            <strong style={{ fontSize: 13, color: 'var(--critical)' }}>0.9412 (High Probability)</strong>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a
            href={`https://nvd.nist.gov/vuln/detail/${threat.cve || ''}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
            style={{ textDecoration: 'none' }}
          >
            NVD Details <ExternalLink size={14} />
          </a>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn--secondary" onClick={() => setMitigated(true)}>
              <ShieldCheck size={14} /> Apply WAF Rule
            </button>
            <button className="btn btn--primary" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
