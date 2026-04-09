import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SimpleBarChart({ data, layout = 'horizontal', color = '#6366f1' }: { data: any[], layout?: 'horizontal' | 'vertical', color?: string }) {
    if (!data || data.length === 0) {
        return <div className="flex h-full items-center justify-center text-sm text-slate-400">Tidak ada data</div>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout={layout}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                {layout === 'horizontal' ? (
                    <>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    </>
                ) : (
                    <>
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} hide />
                        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={100} />
                    </>
                )}
                
                <Tooltip
                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill={color} radius={layout === 'horizontal' ? [4, 4, 0, 0] : [0, 4, 4, 0]} barSize={32} />
            </BarChart>
        </ResponsiveContainer>
    );
}
