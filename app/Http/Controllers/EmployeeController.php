<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Models\MasterLevel;
use App\Models\MasterPoh;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::with(['poh', 'level']);

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where('full_name', 'ilike', '%' . $search . '%')
                  ->orWhere('employee_id_number', 'ilike', '%' . $search . '%');
        }

        if ($request->has('status') && $request->status != '') {
            if ($request->status === 'active') {
                $query->active();
            } else if ($request->status === 'resigned') {
                $query->resigned();
            }
        }

        $employees = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorizeAccess();

        return Inertia::render('Employee/Form', [
            'pohs' => MasterPoh::orderBy('region_name')->get(),
            'levels' => MasterLevel::orderBy('sort_order')->get(),
            'employee' => new Employee(),
            'isEdit' => false
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        Employee::create($request->validated());

        return redirect()->route('employees.index')->with('success', 'Data Karyawan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $this->authorizeAccess();

        return Inertia::render('Employee/Form', [
            'pohs' => MasterPoh::orderBy('region_name')->get(),
            'levels' => MasterLevel::orderBy('sort_order')->get(),
            'employee' => $employee,
            'isEdit' => true
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());

        return redirect()->route('employees.index')->with('success', 'Data Karyawan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $this->authorizeAccess();

        $employee->delete();

        return redirect()->route('employees.index')->with('success', 'Data Karyawan berhasil dihapus.');
    }

    private function authorizeAccess()
    {
        if (!request()->user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses ke halaman ini.');
        }
    }
}
