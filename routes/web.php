<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/about-our-company', [PageController::class, 'about'])->name('about_us');
Route::get('/contact-support', [PageController::class, 'contact'])->name('contact_support');
Route::get('/FAQs', [PageController::class, 'FAQs'])->name('FAQs');
Route::get('/investment', [PageController::class, 'investment'])->name('investment');

Route::middleware(['auth'])->group(function () {
    // Check if registration is complete
    Route::get('/complete-registration', [PageController::class, 'complete_registration'])->name('complete_registration');
    Route::post('/complete-profile', [ProfileController::class, 'complete_profile'])->name('complete_profile');
    // Check if account haave been approved
    Route::get('/pending_approval', [PageController::class, 'pending_approval'])->name('pending_approval');

    Route::middleware(['register_is_complete', 'account.approved'])->group(function () {
        // User Dashboard routes
        Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
        Route::get('/my-investments', [PageController::class, 'my_investments'])->name('my_investments');
        Route::get('/my-transactions', [PageController::class, 'my_transactions'])->name('my_transactions');
        Route::get('/manage-account', [PageController::class, 'manage_account'])->name('manage_account');
    });

    Route::middleware(['admin.access'])->group(function () {
        // User Dashboard routes
        Route::get('/manage-dashboard', [PageController::class, 'admin_dashboard'])->name('admin.dashboard');
        Route::get('/manage-users-account', [PageController::class, 'users_account'])->name('admin.users_account');
        Route::get('/manage-investment-plans', [PageController::class, 'investment_plans'])->name('admin.investment_plans');
        Route::get('/manage-payment-options', [PageController::class, 'payment_options'])->name('admin.payment_options');
        Route::get('/manage-transactions', [PageController::class, 'manage_transactions'])->name('manage_transactions');
        Route::get('/manage-faqs', [PageController::class, 'manage_faqs'])->name('admin.manage_faqs');
    });

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
