import { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, CheckCircle2, Clock, MapPin, Tag } from 'lucide-react';

export default function AlertModal({ alert, onClose }) {
  if (!alert) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.75)', backdropFilter: 'blur(6px)', zIndex: 300 }} />
      <div role="dialog" aria-label={`Alert details for ${alert.title}`} aria-modal="true" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), var(--glow-blue)', zIndex: 301, padding: '24px', color: 'var(--text-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--critical)' }}>{alert.severity || 'Critical'} Alert</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{alert.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close modal" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>{alert.desc || alert.description}</p>
        <button onClick={onClose} className="btn btn--primary" style={{ width: '100%' }}>Acknowledge & Close</button>
      </div>
    </>
  );
}
