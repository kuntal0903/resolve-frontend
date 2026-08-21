import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiCard({ icon, label, value, variant = 'blue', barFill = 50, trend, trendValue, subLeft, subRight, onClick }) {
  return (
    <article className={`kpi-card kpi-card--${variant}`} role="button" tabIndex={0} aria-label={`${label}: ${value}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="kpi-card__header">
        <div className="kpi-card__icon-wrap">{icon}</div>
        {trend && trendValue && (
          <div className={`kpi-card__trend kpi-card__trend--${trend}`}>
            {trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="kpi-card__value">{value}</div>
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__bar-track" role="progressbar" aria-valuenow={barFill} aria-valuemin={0} aria-valuemax={100}>
        <div className="kpi-card__bar-fill" style={{ width: `${barFill}%` }} />
      </div>
      {(subLeft || subRight) && (
        <div className="kpi-card__sub">
          <span>{subLeft}</span>
          <span>{subRight}</span>
        </div>
      )}
    </article>
  );
}
