import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const { url } = usePage();

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen">
            {/* Sidebar Navigation Shell */}
            <aside className="h-screen w-64 hidden md:flex fixed left-0 top-0 bg-[#eef1f3] flex-col py-6 space-y-2 z-50 shadow-sm border-r border-outline-variant/10">
                <div className="px-8 mt-2 mb-10">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                        </div>
                        <h1 className="text-xl font-headline font-extrabold text-slate-900 tracking-tight">Lumina HR</h1>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-10">Intelligence Suite</p>
                </div>
                
                <nav className="flex-1 space-y-1">
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center px-8 py-3 transition-all duration-200 ${
                            url.startsWith('/dashboard') 
                                ? 'text-primary border-r-4 border-primary bg-white/60 font-semibold' 
                                : 'text-slate-600 hover:bg-white/30 font-medium'
                        }`}
                    >
                        <span className="material-symbols-outlined mr-4">dashboard</span>
                        <span className="text-[13px]">Dashboard</span>
                    </Link>
                    
                    <Link
                        href={route('employees.index')}
                        className={`flex items-center px-8 py-3 transition-all duration-200 ${
                            url.startsWith('/employees') 
                                ? 'text-primary border-r-4 border-primary bg-white/60 font-semibold' 
                                : 'text-slate-600 hover:bg-white/30 font-medium'
                        }`}
                    >
                        <span className="material-symbols-outlined mr-4">groups</span>
                        <span className="text-[13px]">Workforce</span>
                    </Link>
                </nav>
                
                <div className="px-6 mt-auto space-y-4">
                    <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold text-sm shadow-sm hover:opacity-90 hover:shadow-md transition-all active:scale-95">
                        Create Report
                    </button>
                    <div className="pt-4 border-t border-outline-variant/10 space-y-1">
                        <Link href="#" className="flex items-center px-2 py-2 text-slate-600 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined mr-3 text-[20px]">help</span>
                            <span className="text-xs font-medium">Support</span>
                        </Link>
                        <Link method="post" href={route('logout')} as="button" className="w-full flex items-center px-2 py-2 text-slate-600 hover:text-error transition-colors">
                            <span className="material-symbols-outlined mr-3 text-[20px]">logout</span>
                            <span className="text-xs font-medium">Sign Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Canvas */}
            <main className="md:ml-64 min-h-screen flex flex-col">
                {/* Top Bar */}
                <header className="w-full sticky top-0 z-40 bg-surface/95 backdrop-blur-md flex justify-between items-center px-4 md:px-8 h-16 border-b border-outline-variant/10">
                    <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-64 md:w-96 border border-outline-variant/10 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all">
                        <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">search</span>
                        <input className="bg-transparent border-none focus:ring-0 p-0 text-sm w-full placeholder:text-on-surface-variant outline-none" placeholder="Search analytics..." type="text"/>
                    </div>
                    
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <button className="p-2 text-on-surface-variant hover:bg-slate-200/50 rounded-full transition-colors relative">
                            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-error ring-2 ring-surface"></span>
                            <span className="material-symbols-outlined text-[22px]">notifications</span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:bg-slate-200/50 rounded-full transition-colors hidden sm:block">
                            <span className="material-symbols-outlined text-[22px]">settings</span>
                        </button>
                        
                        <div className="flex items-center ml-2 pl-2 md:ml-4 md:pl-4 border-l border-outline-variant/20 cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="text-right mr-3 hidden sm:block">
                                <p className="text-xs font-bold text-on-surface capitalize">{user.name}</p>
                                <p className="text-[10px] text-on-surface-variant capitalize">{user.role}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-surface-container-low">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1">
                    {children}
                </div>
            </main>

            {/* Mobile Sidebar Toggle (Optional but good practice) */}
            <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform z-50">
                <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
        </div>
    );
}
