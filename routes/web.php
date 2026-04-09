<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Placeholder routes for navigation (will be replaced in Fase 2-4)
    Route::get('/employees', function () {
        return Inertia::render('Dashboard'); // Placeholder
    })->name('employees.index');

    Route::get('/import', function () {
        return Inertia::render('Dashboard'); // Placeholder
    })->middleware('role:admin')->name('import.index');
});

require __DIR__.'/auth.php';
