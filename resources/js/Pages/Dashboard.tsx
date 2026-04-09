import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Welcome banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 p-6 text-white shadow-xl shadow-violet-500/20 sm:p-8">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative">
                        <h1 className="text-2xl font-bold sm:text-3xl">Selamat Datang di HR Dashboard 👋</h1>
                        <p className="mt-2 max-w-xl text-sm text-white/80">
                            Kelola data karyawan, pantau statistik, dan buat laporan dengan mudah.
                            Semua dalam satu platform yang terintegrasi.
                        </p>
                    </div>
                </div>

                {/* Placeholder stat cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Total Karyawan Aktif', value: '--', icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10 dark:bg-blue-500/20' },
                        { label: 'Karyawan Resign', value: '--', icon: UserX, color: 'from-rose-500 to-pink-500', bgColor: 'bg-rose-500/10 dark:bg-rose-500/20' },
                        { label: 'Turnover Rate', value: '--%', icon: TrendingUp, color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-500/10 dark:bg-amber-500/20' },
                        { label: 'Retention Rate', value: '--%', icon: UserCheck, color: 'from-emerald-500 to-green-500', bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20' },
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

                {/* Chart placeholder area */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {['Distribusi Gender', 'Status Kepegawaian', 'Distribusi Region (POH)', 'Level Jabatan'].map((title) => (
                        <div
                            key={title}
                            className="flex h-72 flex-col items-center justify-center rounded-xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50"
                        >
                            <div className="h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30" />
                            <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{title}</p>
                            <p className="mt-1 text-xs text-slate-400">Chart akan ditampilkan di Fase 2</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
