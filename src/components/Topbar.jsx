import { useState } from 'react';
import {
  Bell,
  Sun,
  Moon,
  Compass,
  Menu,
  Activity,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import SystemStatusModal from './SystemStatusModal';

export default function Topbar({ activePage, onMobileToggle, onNavigate, onNotifToggle, notifOpen }) {
  const { theme, setTheme } = useTheme();
  const [statusOpen, setStatusOpen] = useState(false);

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Attack Surface Overview';
      case 'assets': return 'Assets Inventory';
      case 'vulnerabilities': return 'Vulnerability Management';
      case 'threats': return 'Threat Intelligence Feed';
      case 'domain-scan': return 'Subdomain Reconnaissance';
      case 'settings': return 'System Settings';
      default: return 'ASM Shield';
    }
  };

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('blue');
    else setTheme('dark');
  };

  return (
    <>
      <header className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="topbar__icon-btn"
            onClick={onMobileToggle}
            style={{ display: 'none' }}
            aria-label="Toggle Navigation"
          >
            <Menu size={18} />
          </button>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            {getPageTitle()}
          </h1>
        </div>

        <div className="topbar__actions">
          <button
            className="topbar__icon-btn"
            onClick={() => setStatusOpen(true)}
            title="System Sensor Telemetry"
          >
            <Activity size={16} color="var(--low)" />
          </button>

          <button
            className="topbar__icon-btn"
            onClick={toggleTheme}
            title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
          >
            {theme === 'dark' && <Moon size={16} color="var(--neon-blue)" />}
            {theme === 'light' && <Sun size={16} color="var(--medium)" />}
            {theme === 'blue' && <Compass size={16} color="var(--accent-cyan)" />}
          </button>

          <button
            className="topbar__icon-btn"
            onClick={onNotifToggle}
            title="Notifications"
            style={{ background: notifOpen ? 'rgba(59, 130, 246, 0.2)' : undefined }}
          >
            <Bell size={16} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: 'var(--critical)', borderRadius: '50%' }} />
          </button>

          <div
            className="topbar__avatar"
            onClick={() => onNavigate('settings')}
            title="SecOps User Admin Profile"
          >
            SO
          </div>
        </div>
      </header>

      <SystemStatusModal isOpen={statusOpen} onClose={() => setStatusOpen(false)} />
    </>
  );
}
