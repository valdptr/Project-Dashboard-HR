import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6'];

export function PieDonutChart({ data, type = 'pie' }: { data: any[], type?: 'pie' | 'donut' }) {
    if (!data || data.length === 0) {
        return <div className="flex h-full items-center justify-center text-sm text-slate-400">Tidak ada data</div>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={type === 'donut' ? 60 : 0}
                    outerRadius={80}
                    paddingAngle={type === 'donut' ? 5 : 0}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#334155', fontWeight: 500 }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
    );
}
