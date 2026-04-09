<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id_number',
        'full_name',
        'gender',
        'employment_status',
        'poh_id',
        'level_id',
        'join_date',
        'resign_date',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'join_date' => 'date',
            'resign_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    // Relationships
    public function poh(): BelongsTo
    {
        return $this->belongsTo(MasterPoh::class, 'poh_id');
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(MasterLevel::class, 'level_id');
    }

    // Scopes
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeResigned(Builder $query): Builder
    {
        return $query->where('is_active', false)->whereNotNull('resign_date');
    }

    public function scopeByPeriod(Builder $query, int $year, ?int $month = null): Builder
    {
        $query->whereYear('join_date', '<=', $year);

        if ($month) {
            $query->where(function ($q) use ($year, $month) {
                $q->whereNull('resign_date')
                  ->orWhere(function ($q2) use ($year, $month) {
                      $q2->whereYear('resign_date', '>=', $year)
                         ->whereMonth('resign_date', '>=', $month);
                  });
            });
        }

        return $query;
    }

    public function scopeResignedInPeriod(Builder $query, int $year, ?int $month = null): Builder
    {
        $query->whereNotNull('resign_date')->whereYear('resign_date', $year);

        if ($month) {
            $query->whereMonth('resign_date', $month);
        }

        return $query;
    }
}
