import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieDonutChart } from '@/Components/Charts/PieDonutChart';
import { SimpleBarChart } from '@/Components/Charts/SimpleBarChart';
import { TrendAreaChart } from '@/Components/Charts/TrendAreaChart';
import { exportDashboardToPDF } from '@/lib/pdfExport';
import { useState } from 'react';

export default function Dashboard({ dashboardData }: any) {
    const { overview, demographics, trends } = dashboardData || {};
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await exportDashboardToPDF('dashboard-content', `Lumina-Insights-${new Date().getFullYear()}.pdf`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Workforce Insights" />

            <div id="dashboard-content" className="space-y-8">
                {/* Page Title Area */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
                    <div>
                        <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Workforce Insights</h2>
                        <p className="text-on-surface-variant font-body mt-1">Real-time organizational performance metrics and talent distribution.</p>
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-xl text-xs font-semibold shadow-sm text-on-surface-variant border border-outline-variant/10">
                            <span className="material-symbols-outlined text-[16px] mr-2">calendar_today</span>
                            FY {new Date().getFullYear()}
                        </div>
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold text-on-surface hover:bg-surface-variant transition-colors disabled:opacity-50"
                        >
                            {isExporting ? 'Generating...' : 'Download PDF'}
                        </button>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Turnover Rate Card */}
                    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200 border border-outline-variant/5">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Turnover Rate</span>
                            <span className="text-error bg-error/10 text-[10px] px-2 py-0.5 rounded-full font-bold">+1.2%</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <h3 className="text-4xl font-headline font-extrabold text-on-surface">{overview?.turnover_rate || '0.0'}%</h3>
                            <div className="w-24 h-12 flex items-end space-x-1 opacity-80">
                                <div className="w-2 bg-surface-container-high h-4 rounded-t-sm"></div>
                                <div className="w-2 bg-surface-container-high h-6 rounded-t-sm"></div>
                                <div className="w-2 bg-primary-container h-10 rounded-t-sm"></div>
                                <div className="w-2 bg-primary h-8 rounded-t-sm"></div>
                                <div className="w-2 bg-error h-12 rounded-t-sm"></div>
                            </div>
                        </div>
                    </div>

                    {/* Attrition Card */}
                    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] hover:-translate-y-0.5 transition-transform duration-200 border border-outline-variant/5">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Attrition (Resigned)</span>
                            <span className="text-secondary bg-secondary/10 text-[10px] px-2 py-0.5 rounded-full font-bold">-0.5%</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <h3 className="text-4xl font-headline font-extrabold text-on-surface">{overview?.total_resigned || 0}</h3>
                            <div className="w-24 h-12 flex items-end space-x-1 opacity-80">
                                <div className="w-2 bg-secondary h-6 rounded-t-sm"></div>
                                <div className="w-2 bg-secondary-container h-8 rounded-t-sm"></div>
                                <div className="w-2 bg-secondary-fixed h-5 rounded-t-sm"></div>
                                <div className="w-2 bg-secondary h-10 rounded-t-sm"></div>
                                <div className="w-2 bg-secondary-dim h-4 rounded-t-sm"></div>
                            </div>
                        </div>
                    </div>

                    {/* Retention Card */}
                    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] hover:-translate-y-0.5 transition-transform duration-200 border border-outline-variant/5">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Retention Rate</span>
                            <span className="text-secondary bg-secondary/10 text-[10px] px-2 py-0.5 rounded-full font-bold">+2.4%</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <h3 className="text-4xl font-headline font-extrabold text-on-surface">{overview?.retention_rate || '0.0'}%</h3>
                            <div className="w-24 h-12 flex items-end space-x-1 opacity-80">
                                <div className="w-2 bg-primary-container h-10 rounded-t-sm"></div>
                                <div className="w-2 bg-primary h-12 rounded-t-sm"></div>
                                <div className="w-2 bg-primary-dim h-9 rounded-t-sm"></div>
                                <div className="w-2 bg-primary h-11 rounded-t-sm"></div>
                                <div className="w-2 bg-primary-fixed-dim h-12 rounded-t-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row: Bento Grid Layout */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Gender Distribution (Donut) */}
                    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] border border-outline-variant/5 flex flex-col">
                        <h4 className="text-sm font-bold text-on-surface mb-8">Gender Distribution</h4>
                        <div className="flex-1 relative min-h-[250px]">
                            <PieDonutChart data={demographics?.gender} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                                <span className="text-3xl font-headline font-black text-on-surface">{overview?.total_active || 0}</span>
                                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">Total Staff</span>
                            </div>
                        </div>
                    </div>

                    {/* Employment Status & Growth Trend (Mixed) */}
                    <div className="col-span-12 lg:col-span-8 grid grid-rows-2 gap-6">
                        {/* Employment Status (Horizontal Bar) */}
                        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] border border-outline-variant/5">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-sm font-bold text-on-surface">Employment Status</h4>
                            </div>
                            <div className="h-32">
                                <SimpleBarChart data={demographics?.status} layout="horizontal" color="#0057bd" />
                            </div>
                        </div>

                        {/* Workforce Growth Trend */}
                        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] border border-outline-variant/5">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-sm font-bold text-on-surface">Workforce Growth Trend</h4>
                            </div>
                            <div className="h-40">
                                <TrendAreaChart data={trends?.turnover_monthly} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Org Level Breakdown (Horizontal Bar) */}
                    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] border border-outline-variant/5">
                        <h4 className="text-sm font-bold text-on-surface mb-6">Organizational Level Breakdown</h4>
                        <div className="h-64">
                            <SimpleBarChart data={demographics?.level} layout="vertical" color="#50ebd5" />
                        </div>
                    </div>

                    {/* Regional Distribution as Bar Chart Instead of Image Map */}
                    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_10px_30px_rgba(44,47,49,0.04)] border border-outline-variant/5 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-sm font-bold text-on-surface">Distribution by Point of Hire (POH)</h4>
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-widest">Regional Data</span>
                        </div>
                        <div className="h-64 flex-1 w-full relative">
                            <SimpleBarChart data={demographics?.poh} layout="vertical" color="#6e9fff" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
