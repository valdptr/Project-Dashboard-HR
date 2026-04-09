<?php

namespace App\Imports;

use App\Models\Employee;
use App\Models\MasterLevel;
use App\Models\MasterPoh;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class EmployeeImport implements ToModel, WithHeadingRow, WithValidation, SkipsEmptyRows
{
    private $pohs;
    private $levels;

    public function __construct()
    {
        // Cache masters to avoid DB hits on every row
        $this->pohs = MasterPoh::all()->pluck('id', 'region_name')->mapWithKeys(function ($item, $key) {
            return [strtolower(trim($key)) => $item];
        })->toArray();

        $this->levels = MasterLevel::all()->pluck('id', 'level_name')->mapWithKeys(function ($item, $key) {
            return [strtolower(trim($key)) => $item];
        })->toArray();
    }

    public function model(array $row)
    {
        // Convert Excel dates if necessary
        $joinDate = is_numeric($row['join_date']) 
            ? Carbon::instance(Date::excelToDateTimeObject($row['join_date']))
            : Carbon::parse($row['join_date']);
            
        $resignDate = null;
        if (!empty($row['resign_date'])) {
            $resignDate = is_numeric($row['resign_date']) 
                ? Carbon::instance(Date::excelToDateTimeObject($row['resign_date']))
                : Carbon::parse($row['resign_date']);
        }

        $pohName = strtolower(trim($row['poh']));
        $levelName = strtolower(trim($row['level']));

        // If POH or Level not found via strict names, default to 1 or fail
        // Since we have validation, it will stop before reaching here if it's invalid.
        $pohId = $this->pohs[$pohName] ?? null;
        $levelId = $this->levels[$levelName] ?? null;

        return new Employee([
            'employee_id_number' => $row['nik'],
            'full_name' => $row['nama_lengkap'],
            'gender' => $row['gender'] === 'Laki-Laki' ? 'Male' : 'Female',
            'employment_status' => strtoupper(trim($row['status'])),
            'poh_id' => $pohId,
            'level_id' => $levelId,
            'join_date' => $joinDate,
            'resign_date' => $resignDate,
            'is_active' => is_null($resignDate),
        ]);
    }

    public function rules(): array
    {
        return [
            'nik' => 'required|unique:employees,employee_id_number',
            'nama_lengkap' => 'required|string|max:150',
            'gender' => 'required|in:Laki-Laki,Perempuan',
            'status' => 'required|in:PKWT,PKWTT',
            'poh' => ['required', function($attribute, $value, $fail) {
                if (!isset($this->pohs[strtolower(trim($value))])) {
                    $fail('POH "' . $value . '" tidak ditemukan di database.');
                }
            }],
            'level' => ['required', function($attribute, $value, $fail) {
                if (!isset($this->levels[strtolower(trim($value))])) {
                    $fail('Level "' . $value . '" tidak ditemukan di database.');
                }
            }],
            'join_date' => 'required',
        ];
    }
}
