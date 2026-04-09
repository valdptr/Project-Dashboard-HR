import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SimpleBarChart({ data, layout = 'horizontal', color = '#0057bd' }: { data: any[], layout?: 'horizontal' | 'vertical', color?: string }) {
    if (!data || data.length === 0) return <div className="flex h-full items-center justify-center text-on-surface-variant font-medium">No data available</div>;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-outline-variant/20 bg-surface/95 p-4 shadow-xl backdrop-blur-md">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</p>
                    <p className="text-sm font-bold text-on-surface" style={{ color: payload[0].fill }}>
                        {`Jumlah: ${payload[0].value}`}
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
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e9eb" horizontal={layout === 'horizontal'} vertical={layout === 'vertical'} />
                {layout === 'horizontal' ? (
                    <>
                        <XAxis dataKey="name" axisLine={{ stroke: '#d9dde0'}} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#747779' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#747779' }} />
                    </>
                ) : (
                    <>
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#747779' }} />
                        <YAxis type="category" dataKey="name" axisLine={{ stroke: '#d9dde0'}} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#747779' }} width={80} />
                    </>
                )}
                <Tooltip cursor={{ fill: '#eef1f3' }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill={color} radius={[2, 2, 2, 2]} barSize={16} />
            </BarChart>
        </ResponsiveContainer>
    );
}
