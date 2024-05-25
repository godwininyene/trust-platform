<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'Starter Plan',
            'min_deposit' => 30.0,
            'max_deposit' => 499.0,
            'mining_duration' => 24,
            'timing_parameter' => 'hours',
            'percentage' => 30,
            'ref_bonus' => 3,
        ]);

        Plan::create([
            'name' => 'Start Plus',
            'min_deposit' => 500.0,
            'max_deposit' => 999.0,
            'mining_duration' => 28,
            'timing_parameter' => 'hours',
            'percentage' => 50,
            'ref_bonus' => 3,
        ]);
    }
}
