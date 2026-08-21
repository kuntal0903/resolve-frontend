import { useState } from 'react';
import { Download, FileText, FileCode, Check, Loader2 } from 'lucide-react';

export default function ExportCard({ onExport }) {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleExportClick = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      if (onExport) onExport(selectedFormat);
      setTimeout(() => setDone(false), 3000);
    }, 1200);
  };

  return (
    <div className="export-card">
      <div className="export-card__info">
        <div className="export-card__title">Export Attack Surface Inventory</div>
        <div className="export-card__desc">Download complete report including asset specs, vulnerability indexes, and risk scores.</div>
      </div>
      <div className="export-card__controls">
        <div className="export-card__formats" role="group" aria-label="Export format">
          {['csv', 'json', 'pdf'].map((fmt) => (
            <button key={fmt} className={`format-chip ${selectedFormat === fmt ? 'active' : ''}`} onClick={() => setSelectedFormat(fmt)}>
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="btn btn--primary" onClick={handleExportClick} disabled={loading}>
          {loading ? <Loader2 size={14} className="spin-icon" /> : done ? <Check size={14} /> : <Download size={14} />}
          {loading ? 'Generating...' : done ? 'Downloaded!' : `Export ${selectedFormat.toUpperCase()}`}
        </button>
      </div>
    </div>
  );
}
