import { useState } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('asm_live_99a80b7c12de456');
  const [autoScan, setAutoScan] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Settings size={22} color="var(--accent-purple)" /> System Settings & Integration
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
          Configure API credentials, scan schedules, and security notification hooks.
        </p>
      </div>

      {saved && (
        <div style={{ padding: '12px 16px', marginBottom: 20, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--low)', borderRadius: 'var(--radius-md)', color: 'var(--low)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={16} /> System settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} style={{ background: 'var(--bg-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>API Ingestion Token</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'monospace' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="checkbox"
            id="autoScan"
            checked={autoScan}
            onChange={(e) => setAutoScan(e.target.checked)}
            style={{ width: 16, height: 16 }}
          />
          <label htmlFor="autoScan" style={{ fontSize: 13, color: 'var(--text-primary)', cursor: 'pointer' }}>
            Enable continuous 24/7 background attack surface scanning
          </label>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn--primary">
            <Save size={16} /> Save Configuration
          </button>
        </div>
      </form>
    </main>
  );
}
