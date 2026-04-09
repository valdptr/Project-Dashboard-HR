<?php

namespace Database\Seeders;

use App\Models\MasterLevel;
use App\Models\MasterPoh;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        // Seed POH regions
        $regions = [
            'Jawa',
            'Sumatera',
            'Kalimantan',
            'Sulawesi',
            'Papua',
            'Bali & Nusa Tenggara',
            'Maluku',
        ];

        foreach ($regions as $region) {
            MasterPoh::firstOrCreate(['region_name' => $region]);
        }

        // Seed Job Levels
        $levels = [
            ['level_name' => 'BOD', 'sort_order' => 1],
            ['level_name' => 'Manager', 'sort_order' => 2],
            ['level_name' => 'Supervisor', 'sort_order' => 3],
            ['level_name' => 'Officer', 'sort_order' => 4],
            ['level_name' => 'Administrator', 'sort_order' => 5],
            ['level_name' => 'Non Staff', 'sort_order' => 6],
        ];

        foreach ($levels as $level) {
            MasterLevel::firstOrCreate(
                ['level_name' => $level['level_name']],
                ['sort_order' => $level['sort_order']]
            );
        }

        // Seed Users
        User::firstOrCreate(
            ['email' => 'admin@hrdashboard.com'],
            [
                'name' => 'Admin HR',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'viewer@hrdashboard.com'],
            [
                'name' => 'Eksekutif',
                'password' => Hash::make('password'),
                'role' => 'viewer',
            ]
        );
    }
}
