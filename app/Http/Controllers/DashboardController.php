<?php

namespace App\Http\Controllers;

use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private $analyticsService;

    public function __construct(AnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    public function index(Request $request)
    {
        $year = $request->input('year', date('Y'));
        
        $data = $this->analyticsService->getDashboardData((int) $year);

        return Inertia::render('Dashboard', [
            'dashboardData' => $data,
            'filters' => [
                'year' => $year,
            ]
        ]);
    }
}
