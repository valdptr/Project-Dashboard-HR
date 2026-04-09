<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\MasterLevel;
use App\Models\MasterPoh;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function getDashboardData(?int $year = null)
    {
        $year = $year ?? Carbon::now()->year;

        $totalActive = Employee::active()->count();
        $totalResigned = Employee::resigned()->count();

        // Calculate Turnover & Retention
        $retentionData = $this->calculateRetentionAndTurnover($year);

        return [
            'overview' => [
                'total_active' => $totalActive,
                'total_resigned' => $totalResigned,
                'turnover_rate' => $retentionData['turnover_rate'],
                'retention_rate' => $retentionData['retention_rate'],
            ],
            'demographics' => [
                'gender' => $this->getGenderDistribution(),
                'status' => $this->getStatusDistribution(),
                'poh' => $this->getPohDistribution(),
                'level' => $this->getLevelDistribution(),
            ],
            'trends' => [
                'turnover_monthly' => $this->getMonthlyTurnoverTrend($year),
            ]
        ];
    }

    private function calculateRetentionAndTurnover(int $year)
    {
        $startOfYear = Carbon::create($year, 1, 1)->startOfDay();
        
        // Emp active at start of year
        $activeAtStart = Employee::where('join_date', '<=', $startOfYear)
            ->where(function ($q) use ($startOfYear) {
                $q->whereNull('resign_date')
                  ->orWhere('resign_date', '>=', $startOfYear);
            })->count();

        // Emp resigned during the year
        $resignedDuringYear = Employee::whereYear('resign_date', $year)->count();

        // New hires during the year
        $newHiresDuringYear = Employee::whereYear('join_date', $year)->count();

        $activeAtEnd = $activeAtStart + $newHiresDuringYear - $resignedDuringYear;

        // Turnover = (Resigned / Avg Employees) * 100
        $avgEmployees = ($activeAtStart + $activeAtEnd) / 2;
        $turnoverRate = $avgEmployees > 0 ? round(($resignedDuringYear / $avgEmployees) * 100, 1) : 0;

        // Retention = Active at Start who didn't resign / Active at Start
        $retainedFromStart = $activeAtStart - Employee::where('join_date', '<=', $startOfYear)
            ->whereYear('resign_date', $year)->count();
            
        $retentionRate = $activeAtStart > 0 ? round(($retainedFromStart / $activeAtStart) * 100, 1) : 0;

        return [
            'turnover_rate' => $turnoverRate,
            'retention_rate' => $retentionRate,
        ];
    }

    private function getGenderDistribution()
    {
        return Employee::active()
            ->select('gender as name', DB::raw('count(*) as value'))
            ->groupBy('gender')
            ->get();
    }

    private function getStatusDistribution()
    {
        return Employee::active()
            ->select('employment_status as name', DB::raw('count(*) as value'))
            ->groupBy('employment_status')
            ->get();
    }

    private function getPohDistribution()
    {
        return MasterPoh::withCount(['employees' => function ($q) {
                $q->where('is_active', true);
            }])
            ->orderByDesc('employees_count')
            ->get()
            ->map(function ($poh) {
                return [
                    'name' => $poh->region_name,
                    'value' => $poh->employees_count
                ];
            })
            ->filter(fn($item) => $item['value'] > 0)
            ->values();
    }

    private function getLevelDistribution()
    {
        return MasterLevel::withCount(['employees' => function ($q) {
                $q->where('is_active', true);
            }])
            ->orderBy('sort_order')
            ->get()
            ->map(function ($level) {
                return [
                    'name' => $level->level_name,
                    'value' => $level->employees_count
                ];
            })
            ->filter(fn($item) => $item['value'] > 0)
            ->values();
    }

    private function getMonthlyTurnoverTrend(int $year)
    {
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $trend = [];

        for ($i = 1; $i <= 12; $i++) {
            $monthData = Carbon::createFromDate($year, $i, 1);
            
            // Basic metric per month: how many resigned
            $resignedCount = Employee::whereYear('resign_date', $year)
                ->whereMonth('resign_date', $i)
                ->count();
                
            $hiredCount = Employee::whereYear('join_date', $year)
                ->whereMonth('join_date', $i)
                ->count();

            $trend[] = [
                'name' => $months[$i - 1],
                'Resign' => $resignedCount,
                'Baru' => $hiredCount
            ];
        }

        return $trend;
    }
}
