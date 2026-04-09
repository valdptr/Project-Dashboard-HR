<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromArray;

class EmployeeTemplateExport implements FromArray, WithHeadings
{
    public function array(): array
    {
        return [
            [
                '123456789',
                'Budi Santoso',
                'Laki-Laki',
                'PKWT',
                'Jakarta Head Office',
                'Staff',
                '2023-01-15',
                ''
            ]
        ];
    }

    public function headings(): array
    {
        return [
            'NIK',
            'Nama Lengkap',
            'Gender',
            'Status',
            'POH',
            'Level',
            'Join Date',
            'Resign Date'
        ];
    }
}
