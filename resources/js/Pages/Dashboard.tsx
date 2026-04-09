import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Users, UserCheck, UserX, TrendingUp, Download, Loader2 } from 'lucide-react';
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
            await exportDashboardToPDF('dashboard-content', `HR-Report-${filters?.year || new Date().getFullYear()}.pdf`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <AuthenticatedLayout header="Dashboard Analytics">
            <Head title="Dashboard Analytics" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                        Ringkasan Periode {filters?.year || new Date().getFullYear()}
                    </h2>
                    <div className="mt-2 flex gap-2 sm:mt-0">
                        {/* Placeholder for filter dropdown */}
                        <div className="inline-flex rounded-lg bg-white p-1 text-sm shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                            <button className="rounded px-3 py-1 font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100">Tahun Ini</button>
                        </div>
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-70"
                        >
                            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            <span className="hidden sm:inline">Export PDF</span>
                        </button>
                    </div>
                </div>

                <div id="dashboard-content" className="space-y-6 rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-2 sm:p-0">
                    {/* Stat cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Total Karyawan Aktif', value: overview?.total_active || 0, icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10 dark:bg-blue-500/20' },
                        { label: 'Karyawan Resign', value: overview?.total_resigned || 0, icon: UserX, color: 'from-rose-500 to-pink-500', bgColor: 'bg-rose-500/10 dark:bg-rose-500/20' },
                        { label: 'Turnover Rate', value: `${overview?.turnover_rate || 0}%`, icon: TrendingUp, color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-500/10 dark:bg-amber-500/20' },
                        { label: 'Retention Rate', value: `${overview?.retention_rate || 0}%`, icon: UserCheck, color: 'from-emerald-500 to-green-500', bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="group relative overflow-hidden rounded-xl border border-slate-200/50 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:border-slate-700/50 dark:bg-slate-800/50"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                                    <p className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                                </div>
                                <div className={`rounded-lg p-2.5 ${stat.bgColor}`}>
                                    <stat.icon className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ fill: 'none', stroke: 'currentColor' }} />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Demographics - Gender */}
                    <div className="flex h-[360px] flex-col rounded-xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Distribusi Gender</h3>
                        <div className="mt-4 flex-1">
                            <PieDonutChart data={demographics?.gender} type="pie" />
                        </div>
                    </div>

                    {/* Demographics - Status */}
                    <div className="flex h-[360px] flex-col rounded-xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Status Kepegawaian</h3>
                        <div className="mt-4 flex-1">
                            <PieDonutChart data={demographics?.status} type="donut" />
                        </div>
                    </div>

                    {/* Turnover Trend */}
                    <div className="col-span-1 flex h-[400px] flex-col rounded-xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50 lg:col-span-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Tren Rekrutmen vs Resign {filters?.year || ''}</h3>
                        <div className="mt-4 flex-1">
                            <TrendAreaChart data={trends?.turnover_monthly} />
                        </div>
                    </div>

                    {/* Demographics - POH */}
                    <div className="flex h-[360px] flex-col rounded-xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Distribusi POH (Region)</h3>
                        <div className="mt-4 flex-1">
                            <SimpleBarChart data={demographics?.poh} layout="horizontal" color="#ec4899" />
                        </div>
                    </div>

                    {/* Demographics - Level */}
                    <div className="flex h-[360px] flex-col rounded-xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Distribusi Level Jabatan</h3>
                        <div className="mt-4 flex-1">
                            <SimpleBarChart data={demographics?.level} layout="vertical" color="#14b8a6" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
