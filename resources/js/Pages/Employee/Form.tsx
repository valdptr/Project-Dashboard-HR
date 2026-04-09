import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, User, Calendar, Briefcase, MapPin } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ employee, pohs, levels, isEdit }: any) {
    const { data, setData, post, put, processing, errors } = useForm({
        employee_id_number: employee.employee_id_number || '',
        full_name: employee.full_name || '',
        gender: employee.gender || 'Male',
        employment_status: employee.employment_status || 'PKWT',
        poh_id: employee.poh_id || (pohs.length > 0 ? pohs[0].id : ''),
        level_id: employee.level_id || (levels.length > 0 ? levels[0].id : ''),
        join_date: employee.join_date ? employee.join_date.split('T')[0] : '',
        resign_date: employee.resign_date ? employee.resign_date.split('T')[0] : '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('employees.update', employee.id));
        } else {
            post(route('employees.store'));
        }
    };

    return (
        <AuthenticatedLayout header={isEdit ? 'Edit Data Karyawan' : 'Tambah Karyawan Baru'}>
            <Head title={isEdit ? 'Edit Karyawan' : 'Tambah Karyawan'} />

            <div className="mx-auto max-w-4xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={route('employees.index')}
                        className="rounded-full bg-white p-2 text-slate-500 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-slate-800/80 dark:hover:text-slate-200"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                        {isEdit ? 'Edit Karyawan' : 'Tambah Karyawan'}
                    </h2>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-900/50">
                    <form onSubmit={submit} className="p-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {/* Profile Info Section */}
                            <div className="col-span-1 sm:col-span-2">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-200">
                                    <User className="h-4 w-4 text-violet-500" /> Profil Karyawan
                                </h3>
                                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="employee_id_number" value="NIK" />
                                        <TextInput
                                            id="employee_id_number"
                                            name="employee_id_number"
                                            value={data.employee_id_number}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('employee_id_number', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.employee_id_number} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="full_name" value="Nama Lengkap" />
                                        <TextInput
                                            id="full_name"
                                            name="full_name"
                                            value={data.full_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.full_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="gender" value="Gender" />
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={data.gender}
                                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                                            onChange={(e) => setData('gender', e.target.value)}
                                            required
                                        >
                                            <option value="Male">Laki-Laki (Male)</option>
                                            <option value="Female">Perempuan (Female)</option>
                                        </select>
                                        <InputError message={errors.gender} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 sm:col-span-2 my-4 border-t border-slate-200 dark:border-slate-800" />

                            {/* Job Details Section */}
                            <div className="col-span-1 sm:col-span-2">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-200">
                                    <Briefcase className="h-4 w-4 text-emerald-500" /> Pekerjaan & Penempatan
                                </h3>
                                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="employment_status" value="Status Kepegawaian" />
                                        <select
                                            id="employment_status"
                                            name="employment_status"
                                            value={data.employment_status}
                                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                                            onChange={(e) => setData('employment_status', e.target.value)}
                                            required
                                        >
                                            <option value="PKWT">PKWT</option>
                                            <option value="PKWTT">PKWTT</option>
                                        </select>
                                        <InputError message={errors.employment_status} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="level_id" value="Level Jabatan" />
                                        <select
                                            id="level_id"
                                            name="level_id"
                                            value={data.level_id}
                                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                                            onChange={(e) => setData('level_id', e.target.value)}
                                            required
                                        >
                                            {levels.map((level: any) => (
                                                <option key={level.id} value={level.id}>{level.level_name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.level_id} className="mt-2" />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <InputLabel htmlFor="poh_id" value={`Point of Hire (POH)`} />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <select
                                                id="poh_id"
                                                name="poh_id"
                                                value={data.poh_id}
                                                className="block w-full rounded-md border-slate-300 pl-10 shadow-sm focus:border-violet-500 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                                                onChange={(e) => setData('poh_id', e.target.value)}
                                                required
                                            >
                                                {pohs.map((poh: any) => (
                                                    <option key={poh.id} value={poh.id}>{poh.region_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <InputError message={errors.poh_id} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 sm:col-span-2 my-4 border-t border-slate-200 dark:border-slate-800" />

                            {/* Dates Section */}
                            <div className="col-span-1 sm:col-span-2">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-200">
                                    <Calendar className="h-4 w-4 text-blue-500" /> Kehadiran
                                </h3>
                                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="join_date" value="Tanggal Bergabung (Join Date)" />
                                        <TextInput
                                            id="join_date"
                                            type="date"
                                            name="join_date"
                                            value={data.join_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('join_date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.join_date} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="resign_date">
                                            Tanggal Resign <span className="text-sm font-normal text-slate-400">(Opsional)</span>
                                        </InputLabel>
                                        <TextInput
                                            id="resign_date"
                                            type="date"
                                            name="resign_date"
                                            value={data.resign_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('resign_date', e.target.value)}
                                        />
                                        <p className="mt-1 text-xs text-slate-500">
                                            *(Kosongkan jika karyawan masih aktif)
                                        </p>
                                        <InputError message={errors.resign_date} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                            <Link
                                href={route('employees.index')}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            >
                                Batal
                            </Link>
                            <PrimaryButton disabled={processing} className="w-full sm:w-auto justify-center bg-violet-600 hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-700 gap-2">
                                <Save className="h-4 w-4" />
                                {isEdit ? 'Simpan Perubahan' : 'Tambah Karyawan'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
