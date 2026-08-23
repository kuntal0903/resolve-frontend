import { useState } from 'react';
import {
  Bell,
  X,
  ShieldAlert,
  CheckCheck,
  Radio,
  Clock,
  ArrowRight,
} from 'lucide-react';

const INITIAL_NOTIFS = [
  { id: 1, type: 'critical', title: 'RCE Vulnerability Detected', desc: 'CVE-2026-1042 found on api-prod-01.us-east.asm-shield.io', time: '5m ago', read: false },
  { id: 2, type: 'warning',  title: 'Subdomain Takeover Risk',   desc: 'Stale CNAME pointing to unallocated S3 bucket on staging-docs.asm.io', time: '22m ago', read: false },
  { id: 3, type: 'info',     title: 'Surface Scan Completed',   desc: 'Weekly scan finished. 1,284 assets updated across 14 cloud accounts.', time: '1h ago', read: true },
  { id: 4, type: 'warning',  title: 'Expired SSL Certificate',   desc: 'auth-gateway.internal-asm.dev cert expired 2 hours ago.', time: '3h ago', read: true },
];

export default function NotificationsPanel({ isOpen, onClose, onNavigate }) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  if (!isOpen) return null;

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.5)', zIndex: 300 }} />

      <div
        role="dialog"
        aria-label="Notifications Panel"
        style={{
          position: 'fixed',
          top: 70,
          right: 20,
          width: 380,
          maxHeight: 'calc(100vh - 90px)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), var(--glow-blue)',
          zIndex: 301,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-raised)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="var(--accent-blue)" />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Security Notifications</h3>
            {unreadCount > 0 && (
              <span className="mono" style={{ background: 'var(--critical)', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>
                {unreadCount} NEW
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{ background: 'none', border: 'none', color: 'var(--neon-blue)', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <CheckCheck size={14} /> Mark Read
              </button>
            )}
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} aria-label="Close notifications">
              <X size={16} />
            </button>
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '10px 0' }}>
          {notifs.length === 0 ? (
            <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No notifications
            </div>
          ) : (
            notifs.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '12px 18px',
                  borderBottom: '1px solid var(--border)',
                  background: n.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  position: 'relative',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ marginTop: 2 }}>
                  {n.type === 'critical' && <ShieldAlert size={16} color="var(--critical)" />}
                  {n.type === 'warning'  && <Radio size={16} color="var(--high)" />}
                  {n.type === 'info'     && <Clock size={16} color="var(--accent-blue)" />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <strong style={{ fontSize: 13, color: n.read ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{n.title}</strong>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>{n.desc}</p>
                </div>

                <button
                  onClick={() => clearNotification(n.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-raised)', textAlign: 'center' }}>
          <button
            className="btn btn--ghost"
            style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}
            onClick={() => {
              if (onNavigate) onNavigate('alerts');
              onClose();
            }}
          >
            View All Incident Logs <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
