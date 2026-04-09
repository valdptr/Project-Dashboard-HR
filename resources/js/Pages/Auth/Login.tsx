import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { LogIn } from 'lucide-react';

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

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Selamat Datang
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Masuk ke HR Dashboard untuk mengelola analitik
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="mb-1 dark:text-slate-300" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full rounded-xl border-0 py-2.5 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 dark:bg-slate-900/50 dark:text-white dark:ring-slate-700/50 dark:focus:ring-violet-500"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="mb-1 flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" className="dark:text-slate-300" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full rounded-xl border-0 py-2.5 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 dark:bg-slate-900/50 dark:text-white dark:ring-slate-700/50 dark:focus:ring-violet-500"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <label className="flex cursor-pointer items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded border-slate-300 text-violet-600 focus:ring-violet-600 dark:border-slate-700 dark:bg-slate-900/50 dark:focus:ring-offset-slate-900"
                            onChange={(e) =>
                                setData('remember', e.target.checked as boolean)
                            }
                        />
                        <span className="ms-2 text-sm text-slate-600 dark:text-slate-400">
                            Ingat Saya
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-violet-600 dark:hover:bg-violet-500"
                >
                    <LogIn className="h-4 w-4" />
                    Masuk ke Dashboard
                </button>
            </form>
        </GuestLayout>
    );
}
