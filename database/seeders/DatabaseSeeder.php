<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(WalletAddress::class);
        // $this->call(PlanSeeder::class);
        $this->call([
            UserSeed::class,
            PlanSeed::class
        ]);
        $sql = storage_path('sql/countries.sql');
        DB::unprepared(file_get_contents($sql));
    }
}
