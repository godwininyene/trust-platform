<?php

use App\Http\Controllers\Api\DataController;
use App\Http\Controllers\Api\MiningController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\DataCollector\DataCollector;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('fetch-countries', function (Request $request){
    return DB::select("SELECT * FROM countries");
})->name('api.fetch_countries');

// Unauthenticated API routes
Route::get('fetch_plans', [DataController::class, 'fetch_plans'])->name('api.fetch_plans');
Route::get('fetch_faqs', [DataController::class, 'fetch_faqs'])->name('api.fetch_faqs');
Route::post('save_contact', [DataController::class, 'save_contact'])->name('api.save_contact');

// API routes
Route::middleware('auth')->group(function () {
    // User Routes
    Route::get('fetch-statistics', [DataController::class, 'Statistics'])->name('api.fetch_statistics');
    Route::get('fetch-invest-statistics', [DataController::class, 'Invest_statistics'])->name('api.fetch_invest_statistics');
    Route::post('make-investment', [MiningController::class, 'make_investment'])->name('api.make_investment');
    Route::get('fetch-transactions', [MiningController::class, 'FetchTransactions'])->name('api.fetch_transactions');
    Route::get('fetch-payment-options', [MiningController::class, 'FetchPaymentOptions'])->name('api.fetch_payment_options');
    Route::get('fetch-wallet-details', [MiningController::class, 'FetchWalletDetails'])->name('api.fetch_wallet_details');
    Route::get('fetch-bank-accounts', [MiningController::class, 'FetchBankAccounts'])->name('api.fetch_bank_accounts');
    Route::post('save-bank-accounts', [MiningController::class, 'SaveBankAccounts'])->name('api.save_bank_account');
    Route::post('save-deposit', [MiningController::class, 'saveDeposit'])->name('api.save_deposit');
    Route::post('save-withdrawal', [MiningController::class, 'saveWithdrawal'])->name('api.save_withdrawal');
    Route::get('fetch_referrals', [MiningController::class, 'fatchReferrals'])->name('api.fetch_referrals');
    Route::post('update_user', [DataController::class, 'updateUser'])->name('api.update_user');

    // Admin Routes
    Route::get('fetch_users', [DataController::class, 'fetchUsers'])->name('api.fetch_users');
    Route::post('update_user_status', [DataController::class, 'updateUserStatus'])->name('api.update_user_status');
    Route::post('delete_user', [DataController::class, 'deleteUser'])->name('api.delete_user');
    Route::post('fund_user', [DataController::class, 'fundUser'])->name('api.fund_user');
    Route::get('all-statistics', [DataController::class, 'allStatistics'])->name('api.all_statistics');
    Route::post('add-plan', [DataController::class, 'addPlan'])->name('api.add_plan');
    Route::post('update-plan', [DataController::class, 'updatePlan'])->name('api.update_plan');
    Route::delete('delete-plan', [DataController::class, 'deletePlan'])->name('api.delete_plan');
    Route::post('add-payment-option', [DataController::class, 'addPaymentOption'])->name('api.add_payment_option');
    Route::get('fetch-payment-option', [DataController::class, 'fetchPaymentOptions'])->name('api.admin.fetch_payment_options');
    Route::post('update-payment-option', [DataController::class, 'updatePaymentOptions'])->name('api.update_pay_option');
    Route::delete('delete-payment-option', [DataController::class, 'deletePaymentOptions'])->name('api.delete_payment_option');
    Route::get('admin-fetch-transactions', [DataController::class, 'adminFetchTransactions'])->name('api.admin.fetch_transactions');
    Route::get('admin-fetch-investments', [DataController::class, 'adminFetchInvestments'])->name('api.admin.fetch_investments');
    Route::post('admin-approve-transaction', [MiningController::class, 'approveTransaction'])->name('api.approve_transaction');
    Route::post('admin-decline-transaction', [MiningController::class, 'declineTransaction'])->name('api.decline_transaction');
    Route::post('add-faqs', [DataController::class, 'addFaq'])->name('api.add_faq');
    Route::delete('delete-faqs', [DataController::class, 'deleteFaq'])->name('api.delete_faq');
});
