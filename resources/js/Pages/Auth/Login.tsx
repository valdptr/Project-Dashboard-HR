import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="space-y-3 mb-10">
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Welcome Back</h1>
                <p className="text-on-surface-variant font-body text-lg">Access your HR intelligence dashboard</p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block font-label text-sm font-semibold text-on-surface-variant" htmlFor="email">
                        Email address
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant transition-colors group-focus-within:text-primary">
                            <span className="material-symbols-outlined text-[20px]">mail</span>
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="name@company.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-on-surface-variant/50"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block font-label text-sm font-semibold text-on-surface-variant" htmlFor="password">
                            Password
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-semibold text-primary hover:text-primary-dim transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant transition-colors group-focus-within:text-primary">
                            <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-on-surface-variant/50"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-lowest"
                        onChange={(e) => setData('remember', e.target.checked as boolean)}
                    />
                    <label className="ml-3 text-sm font-medium text-on-surface-variant" htmlFor="remember">
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 bg-primary text-on-primary font-headline font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:bg-primary-dim transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                    Sign In
                </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center py-6 mt-4">
                <div className="flex-grow border-t border-surface-container-high"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">
                    Or continue with
                </span>
                <div className="flex-grow border-t border-surface-container-high"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-low hover:bg-surface-container-high rounded-xl font-semibold transition-colors border border-outline-variant/10 text-on-surface">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.22-3.22C17.52 1.64 14.95 0 12 0 7.31 0 3.25 2.69 1.25 6.62l3.77 2.93c.9-2.69 3.42-4.51 6.98-4.51z" fill="#EA4335"></path>
                        <path d="M23.49 12.27c0-.82-.07-1.61-.21-2.37H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-2 3.73-4.94 3.73-8.59z" fill="#4285F4"></path>
                        <path d="M5.02 14.51c-.24-.7-.38-1.44-.38-2.21s.14-1.51.38-2.21L1.25 6.62C.45 8.21 0 10.05 0 12s.45 3.79 1.25 5.38l3.77-2.87z" fill="#FBBC05"></path>
                        <path d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.7-2.87c-1.08.73-2.47 1.16-4.24 1.16-3.56 0-6.08-2.32-6.98-4.51L1.25 17.62C3.25 21.31 7.31 24 12 24z" fill="#34A853"></path>
                    </svg>
                    <span className="text-sm">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-low hover:bg-surface-container-high rounded-xl font-semibold transition-colors border border-outline-variant/10 text-on-surface">
                    <svg className="w-5 h-5" viewBox="0 0 23 23">
                        <path d="M0 0h11v11H0z" fill="#f3f3f3"></path>
                        <path d="M12 0h11v11H12z" fill="#f3f3f3"></path>
                        <path d="M0 12h11v23H0z" fill="#f3f3f3"></path>
                        <path d="M12 12h11v11H12z" fill="#f3f3f3"></path>
                        <path d="M1 1h10v10H1z" fill="#f25022"></path>
                        <path d="M12 1h10v10H12z" fill="#7fbb00"></path>
                        <path d="M1 12h10v10H1z" fill="#00a1f1"></path>
                        <path d="M12 12h10v10H12z" fill="#ffbb00"></path>
                    </svg>
                    <span className="text-sm">Microsoft</span>
                </button>
            </div>
        </GuestLayout>
    );
}
