<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\MasterLevel;
use App\Models\MasterPoh;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $pohIds = MasterPoh::pluck('id')->toArray();
        $levelIds = MasterLevel::pluck('id', 'level_name')->toArray();

        // Realistic distribution for levels
        $levelDistribution = [
            'BOD' => 3,
            'Manager' => 10,
            'Supervisor' => 18,
            'Officer' => 35,
            'Administrator' => 25,
            'Non Staff' => 34,
        ];

        $counter = 1;
        $names = $this->getNames();

        foreach ($levelDistribution as $levelName => $count) {
            $levelId = $levelIds[$levelName];

            for ($i = 0; $i < $count; $i++) {
                $gender = fake()->randomElement(['Male', 'Female']);
                $joinDate = Carbon::now()->subDays(rand(90, 1800));
                $isResigned = fake()->boolean(15); // 15% chance resigned
                $resignDate = $isResigned ? $joinDate->copy()->addDays(rand(60, 900)) : null;

                // Make sure resign_date is not in the future
                if ($resignDate && $resignDate->isFuture()) {
                    $resignDate = Carbon::now()->subDays(rand(5, 60));
                }

                $name = $names[$counter - 1] ?? fake()->name();

                Employee::create([
                    'employee_id_number' => 'EMP-' . str_pad($counter, 4, '0', STR_PAD_LEFT),
                    'full_name' => $name,
                    'gender' => $gender,
                    'employment_status' => fake()->randomElement(['PKWT', 'PKWTT']),
                    'poh_id' => fake()->randomElement($pohIds),
                    'level_id' => $levelId,
                    'join_date' => $joinDate,
                    'resign_date' => $resignDate,
                    'is_active' => !$isResigned,
                ]);

                $counter++;
            }
        }
    }

    private function getNames(): array
    {
        return [
            'Budi Santoso', 'Siti Rahayu', 'Agus Prabowo', 'Dewi Lestari', 'Andi Wijaya',
            'Sri Mulyani', 'Hendra Saputra', 'Rina Wati', 'Faisal Rahman', 'Nurul Hidayah',
            'Doni Pratama', 'Yuni Astuti', 'Rizky Aditya', 'Linda Permata', 'Arief Budiman',
            'Maya Sari', 'Bayu Anggara', 'Putri Ayu', 'Rahmat Hidayat', 'Dwi Cahyani',
            'Irfan Hakim', 'Kartika Sari', 'Joko Prasetyo', 'Nadia Kusuma', 'Hendri Gunawan',
            'Fitriani Dewi', 'Wahyu Setiawan', 'Ratna Kumala', 'Dimas Arya', 'Annisa Putri',
            'Rudi Hartono', 'Lina Marlina', 'Fajar Nugroho', 'Sari Indah', 'Teguh Wijayanto',
            'Wulan Sari', 'Gilang Ramadhan', 'Amira Zahra', 'Surya Dharma', 'Novi Yanti',
            'Eko Setiawan', 'Dina Melati', 'Yoga Pratama', 'Ayu Lestari', 'Bagus Firmansyah',
            'Citra Dewi', 'Haris Munandar', 'Eka Safitri', 'Reza Fahlevi', 'Indah Permatasari',
            'Taufik Hidayat', 'Nita Anggraeni', 'Arif Kurniawan', 'Sinta Maharani', 'Dedi Supriadi',
            'Lilis Suryani', 'Andrian Putra', 'Mega Fitria', 'Bambang Sutrisno', 'Rosa Amanda',
            'Yusuf Maulana', 'Diana Ramadhani', 'Fikri Azhari', 'Nur Ainun', 'Sigit Purnomo',
            'Vina Oktavia', 'Adi Nugraha', 'Tina Handayani', 'Ferdi Wahyudi', 'Elsa Septiani',
            'Muhamad Rizal', 'Anita Kusumawati', 'Rangga Pratama', 'Laras Wulandari', 'Putu Agus',
            'Mira Handoko', 'Galih Mahendra', 'Shinta Olivia', 'Darmawan Saputra', 'Karina Dewi',
            'Iman Prasetya', 'Yesi Anggraini', 'Oscar Panjaitan', 'Diana Puspitasari', 'Rizal Firmansyah',
            'Melani Sari', 'Tri Wahyudi', 'Rini Damayanti', 'Kevin Susanto', 'Aulia Rahma',
            'Prasetyo Budi', 'Lestari Utami', 'Farhan Akbar', 'Widya Ningsih', 'Sugeng Riyadi',
            'Novita Sari', 'Ilham Maulana', 'Paramita Sari', 'Cahyo Nugroho', 'Fitri Handayani',
            'Satria Wibowo', 'Intan Permata', 'Lukman Hakim', 'Yunita Candra', 'Arman Maulana',
            'Desi Ratnasari', 'Farid Setiawan', 'Niken Larasati', 'Ronaldo Simanjuntak', 'Bella Safira',
            'Iwan Kurniawan', 'Tiara Anindya', 'Wahid Abdillah', 'Mila Karmila', 'Danang Ari',
            'Suci Rahmawati', 'Erwin Prasetyo', 'Aisyah Putri', 'Ramdan Fauzi', 'Dewanti Sari',
            'Yogi Hermawan', 'Nadira Azzahra', 'Bima Sakti', 'Rahma Aulia', 'Angga Perwira',
        ];
    }
}
