<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'firstname' => 'Emmanuel',
            'lastname' => 'Ejimadu',
            'email' => 'support@trust-platformfinance.com',
            'password' => Hash::make('admin2024'),
            'role' => 'admin',
            'status' => 'active',
            'otp_verify' => true,
            'account_id' => 'tpf' . time(),
            'is_verified' => true,
            'approval_status' => 'approved',
        ]);

        $wallet = Wallet::create([
            'user_id' => $user->id,
            'balance' => 0,
            'profit' => 0,
            'referral_balance' => 0,
        ]);

        event(new Registered($user));
    }
}
