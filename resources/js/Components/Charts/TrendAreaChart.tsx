import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TrendAreaChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return <div className="flex h-full items-center justify-center text-on-surface-variant font-medium">No data available</div>;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-outline-variant/20 bg-surface/95 p-4 shadow-xl backdrop-blur-md min-w-[150px]">
                    <p className="mb-2 border-b border-outline-variant/10 pb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={`item-${index}`} className="flex justify-between gap-6 py-1 text-sm font-bold" style={{ color: entry.color }}>
                            <span>{entry.name}:</span>
                            <span>{entry.value}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0057bd" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#0057bd" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff9742" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ff9742" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e9eb" vertical={false} />
                <XAxis dataKey="name" axisLine={{ stroke: '#d9dde0'}} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#747779' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#747779' }} dx={0} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#595c5e' }} />
                <Area type="monotone" dataKey="Baru" name="Hires" stroke="#0057bd" strokeWidth={3} fillOpacity={1} fill="url(#colorHires)" activeDot={{ r: 5, fill: '#0057bd', stroke: '#fff', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="Resign" name="Exits" stroke="#ff9742" strokeWidth={3} fillOpacity={1} fill="url(#colorExits)" activeDot={{ r: 5, fill: '#ff9742', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
