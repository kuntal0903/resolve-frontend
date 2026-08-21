import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DATA = {
  '7d': [
    { day: 'Aug 2',  critical: 12, high: 28, medium: 41 },
    { day: 'Aug 3',  critical: 15, high: 31, medium: 38 },
    { day: 'Aug 4',  critical: 11, high: 27, medium: 44 },
    { day: 'Aug 5',  critical: 18, high: 34, medium: 52 },
    { day: 'Aug 6',  critical: 14, high: 29, medium: 48 },
    { day: 'Aug 7',  critical: 22, high: 38, medium: 55 },
    { day: 'Aug 8',  critical: 19, high: 35, medium: 51 },
  ],
  '30d': [
    { day: 'Jul 10', critical: 8,  high: 20, medium: 30 },
    { day: 'Jul 13', critical: 10, high: 22, medium: 35 },
    { day: 'Jul 16', critical: 7,  high: 19, medium: 33 },
    { day: 'Jul 19', critical: 13, high: 25, medium: 40 },
    { day: 'Jul 22', critical: 9,  high: 21, medium: 37 },
    { day: 'Jul 25', critical: 16, high: 30, medium: 45 },
    { day: 'Jul 28', critical: 11, high: 26, medium: 42 },
    { day: 'Jul 31', critical: 14, high: 28, medium: 47 },
    { day: 'Aug 3',  critical: 15, high: 31, medium: 38 },
    { day: 'Aug 6',  critical: 14, high: 29, medium: 48 },
    { day: 'Aug 8',  critical: 19, high: 35, medium: 51 },
  ],
  '90d': [
    { day: 'May',    critical: 5,  high: 14, medium: 22 },
    { day: 'Jun W1', critical: 7,  high: 17, medium: 28 },
    { day: 'Jun W2', critical: 6,  high: 15, medium: 25 },
    { day: 'Jun W3', critical: 9,  high: 19, medium: 32 },
    { day: 'Jun W4', critical: 8,  high: 18, medium: 30 },
    { day: 'Jul W1', critical: 10, high: 22, medium: 35 },
    { day: 'Jul W2', critical: 13, high: 26, medium: 40 },
    { day: 'Jul W3', critical: 11, high: 23, medium: 38 },
    { day: 'Jul W4', critical: 16, high: 30, medium: 45 },
    { day: 'Aug W1', critical: 19, high: 35, medium: 51 },
  ],
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-md)', padding: '12px 16px', fontSize: 12, boxShadow: 'var(--glow-blue)' }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700, marginLeft: 'auto' }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function RiskChart({ range = '7d', data }) {
  const chartData = data || DATA[range] || DATA['7d'];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradCritical" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} /></linearGradient>
          <linearGradient id="gradHigh" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.30} /><stop offset="95%" stopColor="#f97316" stopOpacity={0.02} /></linearGradient>
          <linearGradient id="gradMedium" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#eab308" stopOpacity={0.25} /><stop offset="95%" stopColor="#eab308" stopOpacity={0.02} /></linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12, color: 'var(--text-secondary)' }} formatter={(value) => <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{value}</span>} />
        <Area type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={1.5} fill="url(#gradMedium)" dot={false} />
        <Area type="monotone" dataKey="high" stroke="#f97316" strokeWidth={1.5} fill="url(#gradHigh)" dot={false} />
        <Area type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} fill="url(#gradCritical)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
