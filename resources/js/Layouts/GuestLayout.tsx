import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Ambient Background Orbs */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -left-64 -top-64 h-[500px] w-[500px] rounded-full bg-violet-500/20 mix-blend-multiply blur-3xl filter dark:bg-violet-600/30 dark:mix-blend-screen" />
                <div className="absolute -right-64 -top-64 h-[500px] w-[500px] rounded-full bg-indigo-500/20 mix-blend-multiply blur-3xl filter dark:bg-indigo-600/30 dark:mix-blend-screen" />
                <div className="absolute -bottom-64 left-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 mix-blend-multiply blur-3xl filter dark:bg-fuchsia-600/30 dark:mix-blend-screen" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6 sm:px-0">
                <div className="mb-8 flex justify-center">
                    <Link href="/">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/30 shadow-xl ring-1 ring-white/20 backdrop-blur-xl dark:bg-slate-900/50 dark:ring-white/10">
                            <ApplicationLogo className="h-10 w-10 text-violet-600 dark:text-violet-400" />
                        </div>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl bg-white/70 px-8 py-10 shadow-2xl ring-1 ring-slate-900/5 backdrop-blur-xl dark:bg-slate-900/60 dark:ring-white/10">
                    {children}
                </div>
                
                <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                    &copy; {new Date().getFullYear()} HR Analytics System V2.
                </p>
            </div>
        </div>
    );
}
