import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';

export default function Index({ employees, filters }: any) {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user.role === 'admin';
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('employees.index'), { search, status }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data karyawan ini?')) {
            router.delete(route('employees.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header="Data Karyawan">
            <Head title="Data Karyawan" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
                        <div className="relative w-full max-w-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-xl border-0 py-2 pl-10 pr-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 dark:bg-slate-800/50 dark:text-slate-200 dark:ring-slate-700 dark:focus:ring-violet-500"
                                placeholder="Cari NIK atau Nama..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="block rounded-xl border-0 py-2 pl-3 pr-8 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 dark:bg-slate-800/50 dark:text-slate-200 dark:ring-slate-700 dark:focus:ring-violet-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="resigned">Resign</option>
                        </select>
                        <button
                            type="submit"
                            className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700"
                        >
                            <Filter className="h-4 w-4" />
                        </button>
                    </form>

                    {isAdmin && (
                        <Link
                            href={route('employees.create')}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                        >
                            <Plus className="h-4 w-4" />
                            Tambah Data
                        </Link>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-900/50">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Karyawan
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        POH & Level
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Tanggal Join
                                    </th>
                                    {isAdmin && (
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Aksi</span>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-transparent">
                                {employees.data.length > 0 ? (
                                    employees.data.map((employee: any) => (
                                        <tr key={employee.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                                        <User className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-slate-200">
                                                            {employee.full_name}
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                            {employee.employee_id_number}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-slate-900 dark:text-slate-200">{employee.poh?.region_name}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">{employee.level?.level_name}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        employee.is_active 
                                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' 
                                                            : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                                                    }`}>
                                                        {employee.is_active ? 'Aktif' : 'Resign'}
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        {employee.employment_status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(employee.join_date).toLocaleDateString('id-ID')}
                                                {!employee.is_active && employee.resign_date && (
                                                    <div className="text-xs text-rose-500 mt-0.5">
                                                        - {new Date(employee.resign_date).toLocaleDateString('id-ID')}
                                                    </div>
                                                )}
                                            </td>
                                            {isAdmin && (
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('employees.edit', employee.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-400"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(employee.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/20 dark:hover:text-rose-400"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={isAdmin ? 5 : 4} className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                            Data karyawan tidak ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {employees.links && employees.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-slate-200/50 bg-slate-50/50 px-4 py-3 dark:border-slate-700/50 dark:bg-slate-800/30 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-slate-700 dark:text-slate-400">
                                        Menampilkan <span className="font-medium">{employees.from || 0}</span> sampai{' '}
                                        <span className="font-medium">{employees.to || 0}</span> dari{' '}
                                        <span className="font-medium">{employees.total}</span> hasil
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        {employees.links.map((link: any, i: number) => {
                                            const isFirst = i === 0;
                                            const isLast = i === employees.links.length - 1;
                                            
                                            return (
                                                <Link
                                                    key={i}
                                                    href={link.url || '#'}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                        link.active
                                                            ? 'z-10 bg-violet-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600'
                                                            : 'text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 dark:ring-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                                                    } ${isFirst ? 'rounded-l-md px-2' : ''} ${isLast ? 'rounded-r-md px-2' : ''} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: link.label.replace('&laquo; Previous', '&lsaquo;').replace('Next &raquo;', '&rsaquo;') 
                                                    }}
                                                />
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
