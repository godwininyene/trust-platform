<?php

namespace App\Http\Controllers\Api;

use DateTime;
use Carbon\Carbon;
use App\Models\Plan;
use App\Models\User;
use App\Models\Mining;
use App\Models\Wallet;
use App\Utils\Methods;
use App\Models\Transaction;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Mail\MailTransaction;
use App\Models\PaymentOption;
use Illuminate\Http\Response;
use App\Models\UserBankAccount;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Notifications\InvestmentNotification;

class MiningController extends Controller
{
    use ApiResponse; 

    public static function daily_mining_old()
    {
        try {
            $today = Carbon::now();
            $mining = Mining::where('status','active')->get();
            foreach($mining as $value){
                $todayDate = new DateTime(Carbon::now());
                $lastUp = new DateTime($value->updated_at);
                $days = (int)date_diff($todayDate, $lastUp)->days;
                if ($days > 0) {
                    $plan = Plan::where('id', $value->plan_id)->first();
                    $wallet = Wallet::where('user_id', $value->user_id)->first();
                    if ($value->expiry_date <= date("Y-m-d", strtotime($today))) {
                        $value->status = 'completed';
                        $totalInterest = (($plan->percentage / 100) * $value->amount);
                        $to = Carbon::createFromFormat('Y-m-d H:s:i', $value->expiry_date);
                        $from = Carbon::createFromFormat('Y-m-d H:s:i', $value->created_at);
                        $totalDuration = $to->diffInHours($from);
                        $hourly_interest = $totalInterest / $totalDuration;
                        $wallet->profit += ($totalInterest - ($wallet->profit + $hourly_interest));
                        $value->profit += ($totalInterest - ($value->profit + $hourly_interest));
                        $value->updated_at = Carbon::now();
                        $wallet->update();
                        $value->update();
                    } 
                    else {
                        $totalInterest = (($plan->percentage / 100) * $value->amount);
                        $to = Carbon::createFromFormat('Y-m-d H:s:i', $value->expiry_date);
                        $from = Carbon::createFromFormat('Y-m-d H:s:i', $value->created_at);
                        $totalDuration = $to->diffInHours($from);
                        $hourly_interest = $totalInterest / $totalDuration;
                        $wallet->profit = $wallet->profit + $hourly_interest;
                        $value->profit = $value->profit + $hourly_interest;
                        $wallet->update();
                        $value->updated_at = Carbon::now();
                        $value->update();
                    }
                    Log::channel('cron_jobs')->info(Carbon::now());
                    Log::channel('cron_jobs')->info($wallet);
                }
            }
        } catch (\Throwable $th) {
            Log::channel('cron_jobs')->info($th);
        }
    }

    public static function daily_mining() {
        try {
            $today = Carbon::now();
            $mining = Mining::where('status','active')->get();
            foreach($mining as $value){
                $todayDate = Carbon::now();
                $lastUp = Carbon::createFromTimestamp($value->updated_at);
                $hours = $today->diffInHours($lastUp);
                if ($hours > 0) {
                    $plan = Plan::where('id',$value->plan_id)->first();
                    $wallet = Wallet::where('user_id', $value->user_id)->first();
                    if ($value->expiry_date <= $today->getTimestamp()) {
                        $wallet->profit = $wallet->profit + (($plan->percentage / 100) * $value->amount);
                        $wallet->balance = $wallet->balance + $value->amount + (($plan->percentage / 100) * $value->amount);
                        $value->profit = (($plan->percentage / 100) * $value->amount);
                        $value->status = 'completed';
                        $value->updated_at = Carbon::now()->getTimestamp();
                        $wallet->update();
                        $value->update();
                    } else {
                        $to = Carbon::createFromTimestamp($value->expiry_date);
                        $from = Carbon::createFromTimestamp($value->created_at);
                        $totalDuration = $to->diffInHours($from);
                        $hourly_interest = ((($plan->percentage / 100) * $value->amount) / $totalDuration) * $hours;
                        $value->profit = $value->profit + $hourly_interest;
                        $wallet->update();
                        $value->updated_at = Carbon::now()->getTimestamp();
                        $value->update();
                    }
                    Log::channel('cron_jobs')->info(Carbon::now());
                    Log::channel('cron_jobs')->info($wallet);
                }
            }
        } catch (\Throwable $th) {
            Log::channel('cron_jobs')->info($th);
        }
    }

  
    
    function make_investment(Request $request) : Response | JsonResponse | string
    {
        $validate = Validator::make($request->all(), [
            'amount' => ['required'],
            'plan_id' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields; Plan ID or Amount", $validate->errors(), 422);
        }

        $user = User::where('id', $request->user()->id)->first();
        $wallet = Wallet::where('user_id', $user->id)->first();
        $plan = Plan::where('id',$request->plan_id)->first();

        if ($plan->min_deposit > $request->amount) {
            return $this->sendError('You cannot invest lesser than the minimum deposit of $' . number_format($plan->min_deposit, 2), [], 422);
        }

        $today = time();
        $expiryDate = strtotime("+".$plan->mining_duration.$plan->timing_parameter, $today);

        if($wallet->balance >= $request->amount) {
            $wallet->balance -= $request->amount;
            $mining = new Mining;
            $mining->user_id = $user->id;
            $mining->plan_id = $plan->id;
            $mining->amount = $request->amount;
            $mining->expiry_date = \DB::raw("FROM_UNIXTIME($expiryDate)");
            if ($mining->save()) {
                if ($wallet->update()) {
                    if ($user->referral_id) {
                        // Methods::creditReferralBonus($user, $mining->amount, $plan->percentage);
                        $referral = User::where('account_id', $user->referral_id)->first();
                        if (!empty($referral)) {
                            $referral_bonus = ($plan->percentage / 100) * $mining->amount;
                            $wallet = Wallet::where('user_id', $referral->id)->first();
                            $wallet->referral_balance += $referral_bonus;
                            $wallet->update();
                        }
                    }
                    $user->notify(new InvestmentNotification($user, $wallet, $mining, $plan));
                    return $this->sendResponse('Plan was saved successfully', [
                        'wallet' => $wallet,
                        'mining' => $mining,
                    ]);
                } else {
                    return $this->sendError('Could not update wallet balance.', [], 500);
                }
            } else {
                return $this->sendError('Could not update wallet balance.', [], 500);
            }
        } else {
            return $this->sendError('Insufficient wallet balance. Kindly check your balance and try again.', [], 422);;
        }
    }

    public function FetchTransactions(Request $request) : Response | JsonResponse | string
    {
        $transactions = Transaction::where('user_id', $request->user()->id)->orderBy('created_at', 'DESC')->with(['user'])->paginate(20);
        return $this->sendResponse('Transactions fetched successfully', [
            'transactions' => $transactions,
        ]);
    }
    
    public function fetchPaymentOptions() {
        $pay_options = PaymentOption::where('display_status', true)->orderBy('id', 'asc')->get();
        return $this->sendResponse('payment options were fetched successfully', [
            'pay_options' => $pay_options
        ]);
    }

    public function FetchWalletDetails(Request $request) {
        $wallet = Wallet::where('user_id', $request->user()->id)->first();
        return $this->sendResponse('payment options were fetched successfully', [
            'wallet' => $wallet
        ]);
    }

    public function FetchBankAccounts(Request $request) {
        $accounts = UserBankAccount::where('user_id', $request->user()->id)->get();
        return $this->sendResponse('user bank accounts were fetched successfully', [
            'accounts' => $accounts
        ]);
    }

    public function SaveBankAccounts(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'bank_name' => ['required'],
            'account_number' => ['required'],
            'account_name' => ['required']
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $account = new UserBankAccount();
        $account->user_id = $request->user()->id;
        $account->bank_name = $request->bank_name;
        $account->account_number = $request->account_number;
        $account->account_name = $request->account_name;
        $account->account_type = $request->account_type;
        if ($account->save()) {
            $accounts = UserBankAccount::where('user_id', $request->user()->id)->get();
            return $this->sendResponse('Bank account details were saved successfully', [
                'accounts' => $accounts
            ]);
        } else {
            return $this->sendError("We could not save your bank account details at the moment. Please try again", [], 500);
        }
    }

    public function saveDeposit(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'pay_option' => ['required'],
            'amount' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }
        
        $imageUrl = null;
        if ($request->hasFile('image')) {
            $imageData = ImageUploader::UploadImage($request->file('image'), 'payments/images/options');
            if ($imageData['status'] == true) {
                $imageUrl = $imageData['path'] . $imageData['name'];
            }
        }

        $transaction = new Transaction();
        $transaction->user_id = $request->user()->id;
        $transaction->amount = $request->amount;
        $transaction->currency = isset($request->currency) ? $request->currency : 'USD';
        $transaction->type = 'deposit';
        $transaction->image = $imageUrl;
        if ($transaction->save()) {
            Mail::to($request->user()->email)->bcc('adanielchisom23@gmail.com')->send(new MailTransaction('deposit', $request->user(), $transaction));
            return $this->sendResponse('Transaction saved successfully', [
                'transaction' => $transaction
            ]);
        } else {
            return $this->sendError("We could not process your request at the moment. Please try again", [], 500);
        }
    }

    public function saveWithdrawal(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'pay_option' => ['required'],
            'amount' => ['required'],
            'bank_id'  => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $transaction = new Transaction();
        $transaction->user_id = $request->user()->id;
        $transaction->amount = $request->amount;
        $transaction->currency = isset($request->currency) ? $request->currency : 'USD';
        $transaction->type = 'withdrawal';
        $transaction->payout_bank = isset($request->bank_id) ? $request->bank_id : null;
        if ($transaction->save()) {
            $wallet = Wallet::where('user_id', $transaction->user_id)->first();
            if ($request->pay_option == 'profit') {
                $wallet->profit -= $transaction->amount;
            } elseif ($request->pay_option == 'referral_balance') {
                $wallet->referral_balance -= $transaction->amount;
            } else {
                $wallet->balance -= $transaction->amount;
            }
            $wallet->update();
            Mail::to($request->user()->email)->bcc('adanielchisom23@gmail.com')->send(new MailTransaction('withdraw', $request->user(), $transaction));
            return $this->sendResponse('Transaction saved successfully', [
                'transaction' => $transaction
            ]);
        } else {
            return $this->sendError("We could not process your request at the moment. Please try again", [], 500);
        }
    }

    public function approveTransaction(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'transaction_id' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Invalid or Missing transaction id", $validate->errors(), 422);
        }

        $transaction = Transaction::where('id', $request->transaction_id)->first();
        if (!empty($transaction)) {
            if ($transaction->status == 'pending' || $transaction->status == 'failed') {
                $user = User::where('id', $transaction->user_id)->first();
                if ($transaction->type == "deposit") {
                    $wallet = Wallet::where('user_id', $transaction->user_id)->first();
                    // if ($deposit->save()) {
                    $wallet->balance = $wallet->balance + $transaction->amount;
                    if ($wallet->update()) {
                        $transaction->status = 'success';
                        $transaction->update();
                        Mail::to($user->email)->bcc('adanielchisom23@gmail.com')->send(new MailTransaction('confirmed_deposit',$user, $transaction));
                        // Fetch aand return all transactions
                        $allTransactions = Transaction::orderBy('created_at', 'DESC')->with(['user'])->paginate(20);
                        return $this->sendResponse('Transactions fetched successfully', [
                            'transactions' => $allTransactions,
                        ]);
                    } else {
                        return $this->sendError("Could not update wallet balance due to an unexpected error!", [], 500);
                    }
                }
                if ($transaction->type == "withdrawal") {
                    $transaction->status = 'success';
                    $transaction->update();
                    Mail::to($user->email)->bcc('adanielchisom23@gmail.com')->send(new MailTransaction('confirmed_withdraw',$user, $transaction));
                    // Fetch aand return all transactions
                    $allTransactions = Transaction::orderBy('created_at', 'DESC')->with(['user'])->paginate(20);
                    return $this->sendResponse('Transactions fetched successfully', [
                        'transactions' => $allTransactions,
                    ]);
                }
            } else {
                return $this->sendError("Transaction already processed and cannot be re-updated!", [], 422);
            }
        } else {
            return $this->sendError("Could not find details of the selected transaction!", [], 404);
        }
        
    }

    public function declineTransaction(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'transaction_id' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Invalid or Missing transaction id", $validate->errors(), 422);
        }

        $transaction = Transaction::where('id', $request->transaction_id)->first();
        if (!empty($transaction)) {
            if ($transaction->status !== 'failed') {
                $user = User::where('id', $transaction->user_id)->first();
                $user = User::where('id', $transaction->user_id)->first();
                if ($transaction->type == "deposit") {
                    $transaction->status = 'failed';
                    $transaction->update();
                    Mail::to($user->email)->bcc('adanielchisom23@gmail.com')->send(new MailTransaction('unconfirmed_deposit',$user, $transaction));
                    // Fetch aand return all transactions
                    $allTransactions = Transaction::orderBy('created_at', 'DESC')->with(['user'])->paginate(20);
                    return $this->sendResponse('Transactions fetched successfully', [
                        'transactions' => $allTransactions,
                    ]);
                }
                if ($transaction->type == "withdrawal") {
                    $wallet = Wallet::where('user_id', $transaction->user_id)->first();
                    // if ($deposit->save()) {
                    $wallet->balance = $wallet->balance + $transaction->amount;
                    $transaction->status = 'failed';
                    if($transaction->update()){
                        $wallet->update();
                        Mail::to($user->email)->bcc('adanielchisom23@gmail.com')->send(new MailTransaction('unconfirmed_withdraw', $user, $transaction));
                        // Fetch aand return all transactions
                        $allTransactions = Transaction::orderBy('created_at', 'DESC')->with(['user'])->paginate(20);
                        return $this->sendResponse('Transactions fetched successfully', [
                            'transactions' => $allTransactions,
                        ]);
                    }
                }
            } else {
                return $this->sendError("Transaction already declined!", [], 500);
            }
        } else {
            return $this->sendError("Could not find details of the selected transaction!", [], 404);
        }
        
    }

    public function fatchReferrals(Request $request) : Response | JsonResponse 
    {
        $referrals = User::where('referral_id', $request->user()->account_id)->latest()->paginate(20);
        $total_referrals = User::where('referral_id', $request->user()->account_id)->count();
        return $this->sendResponse('Referrals fetched successfully', [
            'referrals' => $referrals,
            'total' => $total_referrals,
        ]);
    }
}