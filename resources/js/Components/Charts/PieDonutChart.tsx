import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Lumina Dashboard specific colors
const COLORS = ['#0057bd', '#62fae3', '#6e9fff', '#50ebd5'];

export function PieDonutChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return <div className="flex h-full items-center justify-center text-on-surface-variant font-medium">No data available</div>;

    const formattedData = data;

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-outline-variant/20 bg-surface/95 p-3 shadow-xl backdrop-blur-md">
                    <p className="text-xs font-semibold tracking-wide text-on-surface">{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={formattedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                >
                    {formattedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#595c5e', paddingTop: '10px' }} />
            </PieChart>
        </ResponsiveContainer>
    );
}
