import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users, UserCheck, UserX, Activity, Download, Loader2 } from 'lucide-react';
import { PieDonutChart } from '@/Components/Charts/PieDonutChart';
import { SimpleBarChart } from '@/Components/Charts/SimpleBarChart';
import { TrendAreaChart } from '@/Components/Charts/TrendAreaChart';
import { exportDashboardToPDF } from '@/lib/pdfExport';
import { useState } from 'react';

export default function Dashboard({ dashboardData, filters }: any) {
    const { overview, demographics, trends } = dashboardData || {};
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await exportDashboardToPDF('dashboard-content', `HR-Workforce-Pulse-${filters?.year || new Date().getFullYear()}.pdf`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <AuthenticatedLayout header="Workforce Pulse">
            <Head title="Workforce Pulse" />

            <div className="space-y-8">
                {/* Top Controls */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        <span className="text-sm font-medium tracking-wider text-cyan-400 uppercase">Live Data Feed</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-white shadow-inner">
                            Q3 FY{new Date().getFullYear()}
                        </div>
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-fuchsia-600/20 transition-all hover:scale-105 hover:from-fuchsia-500 hover:to-indigo-500 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            Generate Report
                        </button>
                    </div>
                </div>

                <div id="dashboard-content" className="space-y-8 bg-[#050511] p-0">
                    {/* KPI Cards Row */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Custom Card 1 */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-2xl backdrop-blur-3xl">
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                                    <Users className="h-6 w-6 text-cyan-400" />
                                </div>
                                <h3 className="text-sm font-medium text-slate-400">Total Active</h3>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-4xl font-black text-white">{overview?.total_active || 0}</div>
                                <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Live</div>
                            </div>
                        </div>

                        {/* Custom Card 2 */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-2xl backdrop-blur-3xl">
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                                    <Activity className="h-6 w-6 text-fuchsia-400" />
                                </div>
                                <h3 className="text-sm font-medium text-slate-400">Turnover Rate</h3>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-4xl font-black text-white">{overview?.turnover_rate || '0.0'}%</div>
                                <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-md flex items-center gap-1">
                                    +1.2%
                                </div>
                            </div>
                        </div>

                        {/* Custom Card 3 */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-2xl backdrop-blur-3xl">
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-500/10 blur-3xl" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                                    <UserX className="h-6 w-6 text-rose-400" />
                                </div>
                                <h3 className="text-sm font-medium text-slate-400">Attrition</h3>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-4xl font-black text-white">{overview?.total_resigned || 0}</div>
                                <div className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md flex items-center gap-1">
                                    -0.8%
                                </div>
                            </div>
                        </div>

                        {/* Custom Card 4 */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-2xl backdrop-blur-3xl">
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                                    <UserCheck className="h-6 w-6 text-indigo-400" />
                                </div>
                                <h3 className="text-sm font-medium text-slate-400">Retention</h3>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-4xl font-black text-white">{overview?.retention_rate || '0.0'}%</div>
                                <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md flex items-center gap-1">
                                    +2.1%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Rows */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Gender Donut */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-lg lg:col-span-1">
                            <h3 className="mb-6 font-semibold tracking-wide text-white">Gender Diversity</h3>
                            <div className="h-64">
                                <PieDonutChart data={demographics?.gender} />
                            </div>
                        </div>

                        {/* Status Progress */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-lg lg:col-span-1">
                            <h3 className="mb-6 font-semibold tracking-wide text-white">Employment Status</h3>
                            <div className="h-64">
                                <SimpleBarChart data={demographics?.status} layout="vertical" color="#00E5FF" />
                            </div>
                        </div>

                        {/* Region Bars */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-lg lg:col-span-1">
                            <h3 className="mb-6 font-semibold tracking-wide text-white">Regional Distribution</h3>
                            <div className="h-64">
                                <SimpleBarChart data={demographics?.poh} layout="vertical" color="#FF4081" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Trend Area Chart - Full width styled */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-lg lg:col-span-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-indigo-900/10 to-transparent pointer-events-none" />
                            <h3 className="mb-6 font-semibold tracking-wide text-white">Workforce Growth Trend</h3>
                            <div className="h-80">
                                <TrendAreaChart data={trends?.monthly} />
                            </div>
                        </div>

                        {/* Level Bars */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A18] p-6 shadow-lg lg:col-span-1">
                            <h3 className="mb-6 font-semibold tracking-wide text-white">Organizational Levels</h3>
                            <div className="h-80">
                                <SimpleBarChart data={demographics?.level} layout="horizontal" color="#B388FF" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
