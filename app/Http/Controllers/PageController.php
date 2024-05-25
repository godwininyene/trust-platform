<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MiningController;

class PageController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }

    public function about(Request $request){
        return Inertia::render('About', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }

    public function contact(Request $request){
        return Inertia::render('Contact', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }

    public function investment(Request $request){
        return Inertia::render('Investment', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }

    public function FAQs(Request $request){
        return Inertia::render('FAQs', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }

    public function complete_registration(Request $request)
    {
        return Inertia::render('Admin/CompleteRegistration');
    }

    public function pending_approval()
    {
        $user = auth()->user();
        if($user->approval_status == 'approved'){
            return redirect()->route('dashboard');
        }
        return Inertia::render('Admin/PendingVerification');
    }

    // Authentication Pages
    public function dashboard(Request $request)
    {
        // Do Daily Mining
        MiningController::daily_mining();
        // Goto Admin dashboard if role is admin
        if ($request->user()->role == 'admin') {
            return redirect()->route('admin.dashboard');
        }

        // Continue if role is not admin
        $wallet = Wallet::where('user_id', $request->user()->id)->first();
        return Inertia::render('Admin/Dashboard', [
            'wallet' => $wallet,
        ]);
    }
    public function my_investments(Request $request)
    {
        return Inertia::render('Admin/Investments');
    }
    public function my_transactions(Request $request)
    {
        return Inertia::render('Admin/Transactions');
    }
    public function manage_account(Request $request)
    {
        return Inertia::render('Admin/Account');
    }


    // Admin routes
    public function admin_dashboard(Request $request)
    {
        $wallets = Wallet::all();
        $total_balance = 0;
        $total_profit = 0;
        $total_referral_balance = 0;
        foreach ($wallets as $wallet) {
            $total_balance = $total_balance + $wallet->balance;
            $total_profit = $total_profit + $wallet->profit;
            $total_referral_balance = $total_referral_balance + $wallet->referral_balance;
        }
        return Inertia::render('Admin/Manage/Dashboard', [
            'stats' => [
                'total_balance' => $total_balance,
                'total_profit' => $total_profit,
                'total_referral_balance' => $total_referral_balance,
                'total_users' => User::where('role', '!=', 'admin')->count(),
            ]
        ]);
    }

    public function users_account() {
        return Inertia::render('Admin/Manage/UserAccounts');
    }

    public function investment_plans() {
        return Inertia::render('Admin/Manage/InvestmentPlans');
    }

    public function payment_options() {
        return Inertia::render('Admin/Manage/PaymentOptions');
    }

    public function manage_transactions(Request $request)
    {
        return Inertia::render('Admin/Manage/Transactions');
    }

    public function manage_faqs(Request $request)
    {
        return Inertia::render('Admin/Manage/FaqManager');
    }
}
