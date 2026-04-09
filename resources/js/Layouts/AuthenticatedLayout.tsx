import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { LayoutDashboard, Users, UserPlus, LogOut, ChevronDown, Bell, Search, Settings, UploadCloud } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user.role === 'admin';
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Force Dark Theme for Stitch Design
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-[#050511]', 'text-slate-200');
    }, []);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { name: 'Analytics', href: '#', icon: Search },
        { name: 'Workforce', href: route('employees.index'), icon: Users },
        // Only admin sees import
        ...(isAdmin ? [{ name: 'Data Upload', href: route('import.index'), icon: UploadCloud }] : []),
    ];

    return (
        <div className="min-h-screen bg-[#050511] font-sans text-slate-300 selection:bg-fuchsia-500/30">
            {/* Sidebar Left */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-white/5 bg-[#0A0A18] hidden md:flex">
                <div className="flex h-20 items-center px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 shadow-lg shadow-indigo-500/20">
                            <ApplicationLogo className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-wider text-white">
                            KINETIC<span className="text-fuchsia-500">HR</span>
                        </span>
                    </Link>
                </div>

                <div className="px-6 py-4">
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 p-0.5">
                                <div className="h-full w-full rounded-full bg-[#0A0A18] border-2 border-transparent object-cover">
                                    <div className="h-full w-full rounded-full bg-white/10" />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-white">{auth.user.name}</p>
                                <p className="text-[10px] uppercase tracking-wider text-fuchsia-400">
                                    {isAdmin ? 'Executive Portal' : 'Viewer Portal'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 px-4 py-4">
                    <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Main Menu
                    </p>
                    {navigation.map((item) => {
                        const active = route().current(item.name === 'Data Upload' ? 'import.*' : (item.name === 'Workforce' ? 'employees.*' : 'dashboard'));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
                                    active
                                        ? 'bg-fuchsia-500/10 text-fuchsia-400 shadow-[inset_4px_0_0_0_rgb(232,121,249)]'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                }`}
                            >
                                <Icon className={`h-5 w-5 ${active ? 'text-fuchsia-400' : 'text-slate-500'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col md:pl-64">
                {/* Top Nav */}
                <header className="sticky top-0 z-40 border-b border-white/5 bg-[#050511]/80 backdrop-blur-xl">
                    <div className="flex h-20 items-center justify-between px-6 lg:px-8">
                        <div className="flex flex-1 items-center gap-4">
                            {header && <h1 className="text-2xl font-semibold tracking-tight text-white">{header}</h1>}
                        </div>
                        <div className="flex items-center gap-6">
                            {/* Search */}
                            <div className="relative hidden lg:block">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search pulse..."
                                    className="h-10 w-64 rounded-full border border-white/10 bg-[#0A0A18] pl-10 pr-4 text-sm text-white placeholder-slate-500 ring-offset-slate-950 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                />
                            </div>
                            <button className="relative text-slate-400 hover:text-white">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-cyan-500 text-[8px] font-bold text-black">
                                    3
                                </span>
                            </button>
                            <button className="text-slate-400 hover:text-white">
                                <Settings className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
