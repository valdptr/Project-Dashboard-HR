import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#00E5FF', '#FF4081', '#B388FF', '#FFAB40'];

export function PieDonutChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return <div className="flex h-full items-center justify-center text-slate-500">No data available</div>;

    const formattedData = data.map(item => ({
        name: item.gender,
        value: item.total
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-white/10 bg-[#0A0A18]/90 p-3 shadow-xl backdrop-blur-md">
                    <p className="text-xs font-semibold text-white">{`${payload[0].name}: ${payload[0].value}`}</p>
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
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
            </PieChart>
        </ResponsiveContainer>
    );
}
