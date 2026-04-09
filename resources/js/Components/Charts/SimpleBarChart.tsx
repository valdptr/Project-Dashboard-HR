import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SimpleBarChart({ data, layout = 'horizontal', color = '#00E5FF' }: { data: any[], layout?: 'horizontal' | 'vertical', color?: string }) {
    if (!data || data.length === 0) return <div className="flex h-full items-center justify-center text-slate-500">No data available</div>;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-white/10 bg-[#0A0A18]/90 p-3 shadow-xl backdrop-blur-md">
                    <p className="mb-1 text-xs font-bold text-slate-300">{label}</p>
                    <p className="text-sm font-semibold text-white" style={{ color: payload[0].fill }}>
                        {`Count: ${payload[0].value}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout={layout}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={layout === 'horizontal'} vertical={layout === 'vertical'} />
                {layout === 'horizontal' ? (
                    <>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    </>
                ) : (
                    <>
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={80} />
                    </>
                )}
                <Tooltip cursor={{ fill: '#ffffff05' }} content={<CustomTooltip />} />
                <Bar dataKey="total" fill={color} radius={[4, 4, 4, 4]} barSize={24} />
            </BarChart>
        </ResponsiveContainer>
    );
}
