import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TrendAreaChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return <div className="flex h-full items-center justify-center text-slate-500">No data available</div>;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-white/10 bg-[#0A0A18]/90 p-4 shadow-xl backdrop-blur-md min-w-[150px]">
                    <p className="mb-2 border-b border-white/10 pb-2 text-xs font-bold text-slate-300">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={`item-${index}`} className="text-sm font-semibold flex justify-between gap-4 py-1" style={{ color: entry.color }}>
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
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF4081" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FF4081" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#cbd5e1' }} />
                <Area type="monotone" dataKey="hires" name="Hires (Join)" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorHires)" activeDot={{ r: 6, fill: '#00E5FF', stroke: '#fff', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="exits" name="Exits (Resign)" stroke="#FF4081" strokeWidth={3} fillOpacity={1} fill="url(#colorExits)" activeDot={{ r: 6, fill: '#FF4081', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
