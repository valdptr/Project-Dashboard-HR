<?php

namespace App\Http\Controllers;

use App\Exports\EmployeeTemplateExport;
use App\Imports\EmployeeImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function index()
    {
        return Inertia::render('Employee/Import');
    }

    public function downloadTemplate()
    {
        return Excel::download(new EmployeeTemplateExport, 'Template_Karyawan.xlsx');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:10240', // 10MB max
        ]);

        try {
            Excel::import(new EmployeeImport, $request->file('file'));
            
            return redirect()->route('employees.index')->with('success', 'Data karyawan berhasil diimpor!');
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            $failures = $e->failures();
            $errors = [];
            
            foreach ($failures as $failure) {
                $row = $failure->row();
                $errorMsg = implode(', ', $failure->errors());
                $errors[] = "Baris $row: $errorMsg";
            }
            
            return back()->withErrors(['import' => $errors]);
        } catch (\Exception $e) {
            return back()->withErrors(['import' => ['Terjadi kesalahan saat mengimpor file: ' . $e->getMessage()]]);
        }
    }
}
