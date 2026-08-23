import { useState } from 'react';
import {
  Download,
  FileText,
  Clock,
  CheckCircle,
  Loader,
  Table,
  FileJson,
  FileType,
} from 'lucide-react';

const FORMATS = [
  { id: 'csv',  label: 'CSV',  icon: Table },
  { id: 'json', label: 'JSON', icon: FileJson },
  { id: 'pdf',  label: 'PDF',  icon: FileType },
];

export default function ExportCard({ onExport }) {
  const [activeFormat, setActiveFormat] = useState('csv');
  const [status, setStatus]             = useState('idle');

  const handleExport = async () => {
    setStatus('loading');
    try {
      await (onExport ? onExport(activeFormat) : fakeExport());
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Export failed:', err);
      setStatus('idle');
    }
  };

  const fakeExport = () =>
    new Promise((res) => setTimeout(res, 1800));

  const getButtonContent = () => {
    if (status === 'loading') return { icon: <Loader size={16} className="spin" />, label: 'Generating…' };
    if (status === 'success') return { icon: <CheckCircle size={16} />,            label: 'Downloaded!' };
    return { icon: <Download size={16} />, label: `Export ${activeFormat.toUpperCase()}` };
  };

  const { icon: btnIcon, label: btnLabel } = getButtonContent();

  return (
    <div
      className="export-card"
      role="region"
      aria-label="Asset Report Export"
    >
      <div className="export-card__info">
        <h3>
          <FileText size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-cyan)' }} />
          Asset Report
        </h3>
        <p>
          Export a full snapshot of your attack surface — assets, vulnerabilities,
          risk scores, and remediation status.
        </p>

        <div className="export-card__meta">
          <div className="export-card__meta-item">
            <CheckCircle size={12} color="var(--low)" />
            1,284 Assets Included
          </div>
          <div className="export-card__meta-item">
            <Clock size={12} />
            Last export: 2h ago
          </div>
          <div className="export-card__meta-item mono">
            v2.4-ASM
          </div>
        </div>
      </div>

      <div className="export-card__controls">
        <div className="export-card__format-picker" role="radiogroup" aria-label="Export format">
          {FORMATS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="radio"
              aria-checked={activeFormat === id}
              className={`format-btn ${activeFormat === id ? 'active' : ''}`}
              onClick={() => setActiveFormat(id)}
              type="button"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <button
          className={`btn-export ${status}`}
          onClick={handleExport}
          disabled={status === 'loading'}
          type="button"
          aria-label={`Export asset report as ${activeFormat.toUpperCase()}`}
        >
          {btnIcon}
          <span>{btnLabel}</span>
        </button>
      </div>
    </div>
  );
}
