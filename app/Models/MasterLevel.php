<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MasterLevel extends Model
{
    use HasFactory;

    protected $table = 'master_level';

    protected $fillable = ['level_name', 'sort_order'];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'level_id');
    }
}
