import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { time: '00:00', risk: 78, vulns: 24, threats: 5 },
  { time: '04:00', risk: 82, vulns: 28, threats: 7 },
  { time: '08:00', risk: 74, vulns: 19, threats: 4 },
  { time: '12:00', risk: 88, vulns: 32, threats: 12 },
  { time: '16:00', risk: 84, vulns: 29, threats: 9 },
  { time: '20:00', risk: 80, vulns: 26, threats: 6 },
  { time: '24:00', risk: 76, vulns: 22, threats: 4 },
];

export default function RiskChart() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="vulnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.1)" />
          <XAxis dataKey="time" stroke="#4a6080" fontSize={11} tickLine={false} />
          <YAxis stroke="#4a6080" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: '#0d1626',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: '8px',
              color: '#f0f4ff',
              fontSize: '12px',
            }}
          />
          <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#riskGrad)" name="Risk Score" />
          <Area type="monotone" dataKey="vulns" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#vulnGrad)" name="Active Flaws" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
