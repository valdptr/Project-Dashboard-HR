import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Users,
    FileUp,
    Sun,
    Moon,
    Menu,
    X,
    LogOut,
    User,
    ChevronDown,
    Shield,
    Eye,
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: LayoutDashboard, roles: ['admin', 'viewer'] },
    { name: 'Data Karyawan', href: 'employees.index', icon: Users, roles: ['admin', 'viewer'] },
    { name: 'Import Data', href: 'import.index', icon: FileUp, roles: ['admin'] },
];

function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return true;
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110 dark:text-yellow-400"
            title={dark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
        >
            <Sun className={`h-5 w-5 transition-all duration-500 ${dark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
            <Moon className={`absolute h-5 w-5 transition-all duration-500 ${dark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        </button>
    );
}

function RoleBadge({ role }: { role: string }) {
    const isAdmin = role === 'admin';
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isAdmin
                ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30'
                : 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
        }`}>
            {isAdmin ? <Shield className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {isAdmin ? 'Admin' : 'Viewer'}
        </span>
    );
}

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage().props as any;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const currentRoute = (name: string) => {
        try {
            return route().current(name) || route().current(name + '.*');
        } catch {
            return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex h-full flex-col border-r border-white/10 bg-white/80 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/95">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between px-5">
                        <Link href={route('dashboard')} className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
                                <LayoutDashboard className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold tracking-tight text-slate-800 dark:text-white">HR Dashboard</h1>
                                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Manajemen Karyawan</p>
                            </div>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Menu Utama
                        </p>
                        {navigation
                            .filter(item => item.roles.includes(user.role))
                            .map((item) => {
                                const isActive = currentRoute(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={route(item.href)}
                                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-700 shadow-sm ring-1 ring-violet-500/20 dark:from-violet-500/20 dark:to-indigo-500/20 dark:text-violet-300'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                                        }`}
                                    >
                                        <item.icon className={`h-5 w-5 transition-colors ${
                                            isActive ? 'text-violet-500 dark:text-violet-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                                        }`} />
                                        {item.name}
                                        {isActive && (
                                            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
                                        )}
                                    </Link>
                                );
                            })}
                    </nav>

                    {/* User info at bottom */}
                    <div className="border-t border-slate-200/50 p-3 dark:border-slate-700/50">
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-sm font-bold text-white shadow-md">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">{user.name}</p>
                                <RoleBadge role={user.role} />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/20 bg-white/70 px-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        {header && (
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">{header}</h2>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* User dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-xs font-bold text-white">
                                    {user.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <span className="hidden font-medium text-slate-700 dark:text-slate-300 sm:block">{user.name}</span>
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-slate-200/50 bg-white p-1.5 shadow-xl shadow-black/5 dark:border-slate-700 dark:bg-slate-800">
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                                        >
                                            <User className="h-4 w-4" />
                                            Profil
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Keluar
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
