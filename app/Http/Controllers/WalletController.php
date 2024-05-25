<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public static function CreateWallet(User $user)
    {
        $user->wallet()->create([
            'balance' => 0,
            'profit' => 0,
            'referral_balance' => 0
        ]);
    }
}
