<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'min_deposit',
        'max_deposit',
        'mining_duration',
        'timing_parameter',
        'percentage',
        'ref_bonus',
        'return_principal',
    ];
    
    protected $casts = [
        'percentage' => 'integer',
        'min_deposit' => 'integer',
        'max_deposit' => 'integer',
        'mining_duration' => 'integer',
    ];
}
