import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KpiCard({ title, value, change, trend, icon: Icon, color = 'blue' }) {
  const getTrendIcon = () => {
    if (trend === 'up')   return <TrendingUp size={13} />;
    if (trend === 'down') return <TrendingDown size={13} />;
    return <Minus size={13} />;
  };

  const getTrendClass = () => {
    if (trend === 'up')   return 'up';
    if (trend === 'down') return 'down';
    return 'neutral';
  };

  return (
    <div className={`kpi-card kpi-card--${color}`} role="region" aria-label={title}>
      <div className="kpi-card__header">
        <span className="kpi-card__title">{title}</span>
        {Icon && (
          <div className="kpi-card__icon-wrapper">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="kpi-card__value">{value}</div>

      {change && (
        <div className="kpi-card__footer">
          <span className={`kpi-card__badge ${getTrendClass()}`}>
            {getTrendIcon()}
            {change}
          </span>
          <span className="kpi-card__period">vs last 30 days</span>
        </div>
      )}
    </div>
  );
}
