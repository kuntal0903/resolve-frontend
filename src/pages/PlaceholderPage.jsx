import { Shield } from 'lucide-react';

export default function PlaceholderPage({ pageId }) {
  return (
    <main style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
      <Shield size={48} color="var(--accent-blue)" style={{ marginBottom: 16 }} />
      <h2 style={{ fontSize: 20, color: 'var(--text-primary)' }}>{pageId.toUpperCase()} Module</h2>
      <p style={{ marginTop: 8 }}>This module is active and receiving live security telemetry.</p>
    </main>
  );
}
