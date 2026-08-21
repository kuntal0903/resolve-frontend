import { useState } from 'react';
import { X, Server, Shield, Activity, Globe } from 'lucide-react';

export default function AssetModal({ asset, onClose }) {
  if (!asset) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.75)', backdropFilter: 'blur(6px)', zIndex: 300 }} />
      <div role="dialog" aria-label={`Asset details for ${asset.name || asset.title}`} aria-modal="true" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), var(--glow-blue)', zIndex: 301, padding: '24px', color: 'var(--text-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Server size={24} color="var(--accent-blue)" />
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>{asset.name || asset.title}</h2>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{asset.ip} · {asset.type || 'Server'}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close modal" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: 12, background: 'var(--bg-raised)', borderRadius: 8 }}><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Status</div><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--low)' }}>{asset.status || 'Active'}</div></div>
          <div style={{ padding: 12, background: 'var(--bg-raised)', borderRadius: 8 }}><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Risk Score</div><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--high)' }}>{asset.riskScore || '82/100'}</div></div>
        </div>
        <button onClick={onClose} className="btn btn--primary" style={{ width: '100%' }}>Close Asset Details</button>
      </div>
    </>
  );
}
