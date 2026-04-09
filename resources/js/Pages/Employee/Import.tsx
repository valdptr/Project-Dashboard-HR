import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, UploadCloud, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Import() {
    const { errors, flash } = usePage().props as any;
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, reset } = useForm({
        file: null as File | null,
    });

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        setData('file', file);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('import.upload'), {
            forceFormData: true,
            onSuccess: () => reset('file'),
        });
    };

    return (
        <AuthenticatedLayout header="Import Data Karyawan">
            <Head title="Import Data" />

            <div className="mx-auto max-w-4xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('employees.index')}
                            className="rounded-full bg-white p-2 text-slate-500 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-slate-800/80 dark:hover:text-slate-200"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                                Import Masal (Excel)
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Import data karyawan dalam jumlah besar menggunakan file Excel.
                            </p>
                        </div>
                    </div>
                    <a
                        href={route('import.template')}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-emerald-400 dark:ring-slate-700 dark:hover:bg-slate-800/80"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        Unduh Template
                    </a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-900/50">
                    <div className="p-6 sm:p-8">
                        {/* Status Messages */}
                        {flash?.success && (
                            <div className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <p className="text-sm font-medium">{flash.success}</p>
                            </div>
                        )}

                        {(errors.file || errors.import) && (
                            <div className="mb-6 rounded-lg bg-rose-50 p-4 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="mt-0.5 h-5 w-5 text-rose-500 shrink-0" />
                                    <div className="text-sm font-medium">
                                        <p className="mb-2">Gagal mengimpor file:</p>
                                        <ul className="list-inside list-disc space-y-1">
                                            {errors.file && <li>{errors.file}</li>}
                                            {errors.import && (Array.isArray(errors.import) ? errors.import : [errors.import]).map((err: string, i: number) => (
                                                <li key={i}>{err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div
                                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
                                    dragActive
                                        ? 'border-violet-500 bg-violet-50 dark:border-violet-500 dark:bg-violet-500/10'
                                        : 'border-slate-300 hover:border-violet-400 dark:border-slate-700 dark:hover:border-violet-500/50'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => inputRef.current?.click()}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    accept=".xlsx,.xls,.csv"
                                    onChange={handleChange}
                                />
                                
                                <div className="rounded-full bg-violet-100 p-4 dark:bg-violet-900/30">
                                    <UploadCloud className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                                </div>
                                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-200">
                                    Pilih file atau drag and drop
                                </h3>
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    Excel atau CSV maksimal 10MB. Gunakan template yang telah disediakan.
                                </p>
                                
                                {data.file && (
                                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                                        {data.file.name}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <PrimaryButton disabled={!data.file || processing} className="w-full sm:w-auto justify-center bg-violet-600 hover:bg-violet-700">
                                    <UploadCloud className="mr-2 h-4 w-4" />
                                    Mulai Import Data
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
