<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Faq;
use App\Models\Otp;
use App\Models\Plan;
use App\Models\User;
use App\Models\Mining;
use App\Models\Wallet;
use App\Models\Contact;
use App\Models\Transaction;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Models\PaymentOption;
use Illuminate\Http\Response;
use App\Models\UserBankAccount;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Notifications\OnboardNotify;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{
    use ApiResponse; 

    public function fetch_plans() : Response | JsonResponse {
        $plans = Plan::orderBy('id', 'asc')->get();
        return $this->sendResponse('Plans fetched successfully', [
            'plans' => $plans
        ]);
    }

    public function save_contact(Request $request) : Response | JsonResponse {
        $validate = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required'],
            'subject' => ['required'],
            'message' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $contact = new Contact;
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->subject = $request->subject;
        $contact->message = $request->message;
        if ($contact->save()) {
            return $this->sendResponse('Plans fetched successfully', [
                'contact' => $contact
            ]);
        } else {
            return $this->sendError("We could not process your request at the moment. Please try again", [], 500);
        }
    }

    public function fetchUsers() : Response | JsonResponse 
    {
        $users = User::with('wallet','transactions','mining', 'bankAccounts')->latest()->paginate(20);
        return $this->sendResponse('Users fetched successfully', [
            'users' => $users
        ]);
    }

    public function updateUserStatus(Request $request) : Response | JsonResponse 
    {
        User::where('id', $request->user_id)->update([
            'status' => $request->status,
            'approval_status' => $request->status
        ]);
        $user = User::where('id', $request->user_id)->with('wallet','transactions','mining')->first();
        
        if ($request->status === 'approved') {
            $user->notify(new OnboardNotify($user, $type = 'account_approved'));
        } 
        if ($request->status === 'denied') {
            $user->notify(new OnboardNotify($user, $type = 'account_denied'));
        }
        
        return $this->sendResponse('Users updated successfully', [
            'user' => $user
        ]);
    }

    public function updateUser(Request $request) : Response | JsonResponse 
    {
        $validate = Validator::make($request->all(), [
            'user_id' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("User could not be detected", $validate->errors(), 422);
        }

        $user = User::where('id', $request->user_id)->first();
        
        // validate and upload profile image
        if ($request->hasFile('avatar')) {
            $imageUpload = ImageUploader::UploadImage($request->file('avatar'), 'profile/images');
            if ($imageUpload['status']) {
                if ($user->profile_photo_path != 'default.png') {
                    try {
                        unlink($user->profile_photo_path);
                    } catch (\Throwable $th) {
                        
                    }
                }
                $user->profile_photo_path = $imageUpload['path'] . $imageUpload['name'];
            }
        }

        // Validate and update password
        if ($request->has('password')) {
            $validate = Validator::make($request->all(), [
                'current_password' => ['required'],
            ]);
    
            if ($validate->fails()) {
                return $this->sendError("Please, enter your old password for verification!", $validate->errors(), 422);
            }

            if (Hash::check($request->current_password, $user->password) == false) {
                return $this->sendError("Incorrect password entered!", [], 422);
            }

            $user->password = Hash::make($request->password);
        }

        // Update other parameters
        if(isset($request->firstname)){
            $user->firstname = $request->firstname;
        }
        if(isset($request->lastname)){
            $user->lastname = $request->lastname;
        }
        if(isset($request->email)){    
            $user->email = $request->email;
        }

        // Update the user information
        $user->update();
        
        return $this->sendResponse('Users updated successfully', [
            'user' => $user
        ]);
    }

    function deleteUser(Request $request) : Response | JsonResponse  
    {
        $user = User::where('id', $request->user_id)->first();
        Otp::where('user_id', $user->id)->delete();
        Transaction::where('user_id', $user->id)->delete();
        Mining::where('user_id', $user->id)->delete();
        Wallet::where('user_id', $user->id)->delete();
        UserBankAccount::where('user_id', $user->id)->delete();
        $user->delete();
        return $this->sendResponse('User delete successfully', [
            'user' => $user
        ]);
    }

    function fundUser(Request $request) : Response | JsonResponse  
    {
        $user =  User::where('id', $request->user_id)->with('wallet','transactions','mining')->first();
        if ($request->wallet_type == 'balance') {
            $user->wallet->balance += $request->amount;
        }
        if ($request->wallet_type == 'profit') {
            $user->wallet->balance += $request->amount;
            $user->wallet->profit += $request->amount;
        }
        if ($request->wallet_type == 'referral_balance') {
            $user->wallet->referral_balance += $request->amount;
        }
        // $deposit = new Transaction;
        // $deposit->user_id = $user->id;
        // $deposit->amount = $request->amount;
        // $deposit->currency = strtolower("USD");
        // $deposit->payment_channel = 'bank_payment';
        // $deposit->type =  $request->wallet_type == 'profit' ? 'mining' : 'deposit';
        // $deposit->status = 'success';


        
        if ($user->wallet->update()) {
            // $user->wallet->update();
            return $this->sendResponse('User account funded successfully', [
                'user' => $user
            ]);
        } else {
            return $this->sendError('Error funding this user account', [], 500);
        }
    }

    function allStatistics(Request $request) : Response | JsonResponse  
    {
        $transactions = Transaction::orderBy('created_at', 'DESC')->with(['user'])->take(5)->get();
        $investments = Mining::orderBy('created_at', 'DESC')->with(['user', 'plan'])->take(5)->get();
        return $this->sendResponse('User account funded successfully', [
            'transactions' => $transactions,
            'investments' =>$investments
        ]);
    }

    function Statistics(Request $request) : Response | JsonResponse  
    {
        $wallet = Wallet::where('user_id', $request->user()->id)->first();
        $transactions = Transaction::where('user_id', $request->user()->id)->orderBy('created_at', 'DESC')->with(['user'])->take(5)->get();
        $trans = Transaction::where('user_id', $request->user()->id)->get();
        $referrals = User::where('referral_id', $request->user()->account_id)->count();
        $investments = $this->getAllInvestStats($request->user());
        $totalDeposit = 0;
        $totalWithdraw = 0;
        foreach ($trans as $key => $tran) {
            if ($tran->type == 'deposit') {
                $totalDeposit += $tran->amount;
            }
            if ($tran->type == 'withdrawal') {
                $totalWithdraw += $tran->amount;
            }
        }
        return $this->sendResponse('User account funded successfully', [
            'transactions' => $transactions,
            'total_withdraw' => $totalWithdraw,
            'total_deposit' => $totalDeposit,
            'wallet' => $wallet,
            'investments' => $investments,
            'total_referrals' =>  $referrals
        ]);
    }

    private function getInvestStats($user){
        $investment = Mining::where('user_id', $user->id)->where('status', 'active')->with(['plan'])->orderBy('amount', 'DESC')->first();
        $totalDuration = 0;
        $currentLevel = 0;
        if (!empty($investment)) {
            $to = Carbon::createFromFormat('Y-m-d H:s:i', $investment->expiry_date);
            $from = Carbon::createFromFormat('Y-m-d H:s:i', $investment->created_at);
            $now = Carbon::createFromFormat('Y-m-d H:s:i', now());
            $totalDuration = $to->diffInHours($from);
            $currentLevel = $now->diffInHours($from);
        }
        return [
            'investment' => $investment,
            'totalDuration' => $totalDuration,
            'currentLevel' => $currentLevel,
            'percentage' => ($totalDuration != 0 || $currentLevel != 0) ?  (($currentLevel / $totalDuration) * 100) : 0,
        ];
    }

    private function getAllInvestStats($user){
        $minings = Mining::where('user_id', $user->id)->where('status', 'active')->with(['plan'])->orderBy('amount', 'DESC')->get();
        $investments = [];

        foreach ($minings as $key => $investment) {
            $totalDuration = 0;
            $currentLevel = 0;
            if (!empty($investment)) {
                $to = Carbon::createFromFormat('Y-m-d H:s:i', $investment->expiry_date);
                $from = Carbon::createFromFormat('Y-m-d H:s:i', $investment->created_at);
                $now = Carbon::createFromFormat('Y-m-d H:s:i', now());
                $totalDuration = $to->diffInHours($from);
                $currentLevel = $now->diffInHours($from);
            }
            array_push($investments, [
                'investment' => $investment,
                'totalDuration' => $totalDuration,
                'currentLevel' => $currentLevel,
                'percentage' => ($totalDuration != 0 || $currentLevel != 0) ?  (($currentLevel / $totalDuration) * 100) : 0,
            ]);
        }

        return $investments;
    }

    function Invest_statistics(Request $request) : Response | JsonResponse  
    {
        $wallet = Wallet::where('user_id', $request->user()->id)->first();
        $mining = Mining::where('user_id', $request->user()->id)->with(['plan'])->orderBy('created_at', 'DESC')->get();
        $totalProfit = 0;
        $totalInvestment = count($mining);
        $totalAmount = 0;
        foreach ($mining as $key => $investment) {
            $totalProfit += $investment->profit;
            $totalAmount += $investment->amount;
        }
        return $this->sendResponse('User account funded successfully', [
            'total_profit' => $totalProfit,
            'total_investment' => $totalInvestment,
            'total_amount' => $totalAmount,
            'investments' => $mining,
            'wallet' => $wallet,
        ]);
    }

    function addPlan(Request $request) : Response | JsonResponse  
    {
        $validate = Validator::make($request->all(), [
            'min_deposit' => ['required'],
            'percentage' => ['required'],
            'duration' => ['required'],
            'timing_param' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $save = Plan::create([
            'name' => $request->plan_name,
            'min_deposit' => $request->min_deposit,
            'max_deposit' => $request->max_deposit,
            'mining_duration' => $request->duration,
            'timing_parameter' => $request->timing_param,
            'percentage' => $request->percentage,
            'ref_bonus' => $request->ref_bonus,
            'return_principal' => filter_var($request->principal_return, FILTER_VALIDATE_BOOL),
        ]);

        if(!$save){
            return $this->sendError("Could not save plan due to an uneexpected error.", [], 500);
        }

        $plans = Plan::orderBy('id', 'asc')->get();

        return $this->sendResponse('Plan was saved successfully', [
            'plans' => $plans
        ]);
    }

    function updatePlan(Request $request) : Response | JsonResponse  
    {
        $validate = Validator::make($request->all(), [
            'plan_id' => ['required'],
            'min_deposit' => ['required'],
            'percentage' => ['required'],
            'duration' => ['required'],
            'timing_param' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $update = Plan::where('id', $request->plan_id)->update([
            'name' => $request->plan_name,
            'min_deposit' => $request->min_deposit,
            'max_deposit' => $request->max_deposit,
            'mining_duration' => $request->duration,
            'timing_parameter' => $request->timing_param,
            'percentage' => $request->percentage,
            'ref_bonus' => $request->ref_bonus,
            'return_principal' => $request->principal_return,
        ]);

        if(!$update){
            return $this->sendError("Could not update plan due to an uneexpected error.", [], 500);
        }

        $plans = Plan::orderBy('id', 'asc')->get();

        return $this->sendResponse('Plan was saved successfully', [
            'plans' => $plans
        ]);
    }

    function deletePlan(Request $request) : Response | JsonResponse  
    {
        $validate = Validator::make($request->all(), [
            'plan_id' => ['required']
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $delete = Plan::where('id', $request->plan_id)->delete();

        if(!$delete){
            return $this->sendError("Could not delete plan due to an uneexpected error.", [], 500);
        }

        $plans = Plan::orderBy('id', 'asc')->get();

        return $this->sendResponse('Plan was deleted successfully', [
            'plans' => $plans
        ]);
    }
    

    function addPaymentOption(Request $request) : Response | JsonResponse  | array
    {
        $validate = Validator::make($request->all(), [
            'pay_option' => ['required'],
            'bank' => ['required'],
            'account_number' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $logoUrl = null;
        if ($request->hasFile('image')) {
            $imageData = ImageUploader::UploadImage($request->file('image'), 'payments/images/options');
            if ($imageData['status'] == true) {
                $logoUrl = $imageData['path'] . $imageData['name'];
            }
        }

        $save = PaymentOption::create([
            'pay_option' => $request->pay_option,
            'bank' => $request->bank,
            'account_number' => $request->account_number,
            'image' => $logoUrl,
            'extra' => $request->extra,
            'display_status' => filter_var($request->display_status, FILTER_VALIDATE_BOOL),
        ]);

        if(!$save){
            return $this->sendError("Could not save payment option due to an unexpected error.", [], 500);
        }

        $pay_options = PaymentOption::orderBy('id', 'asc')->get();

        return $this->sendResponse('payment option was saved successfully', [
            'pay_options' => $pay_options
        ]);
    }

    public function fetchPaymentOptions() {
        $pay_options = PaymentOption::orderBy('id', 'asc')->get();
        return $this->sendResponse('payment options were fetched successfully', [
            'pay_options' => $pay_options
        ]);
    }

    function updatePaymentOptions(Request $request) : Response | JsonResponse  | array
    {
        $validate = Validator::make($request->all(), [
            'option_id' => ['required'],
            'pay_option' => ['required'],
            'bank' => ['required'],
            'account_number' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $logoUrl = null;
        if ($request->hasFile('image')) {
            $imageData = ImageUploader::UploadImage($request->file('image'), 'payments/images/options');
            if ($imageData['status'] == true) {
                $logoUrl = $imageData['path'] . $imageData['name'];
            }
        }

        $update = PaymentOption::where('id', $request->option_id)->update([
            'pay_option' => $request->pay_option,
            'bank' => $request->bank,
            'account_number' => $request->account_number,
            'image' => $logoUrl,
            'extra' => $request->extra,
            'display_status' => filter_var($request->display_status, FILTER_VALIDATE_BOOL),
        ]);

        if(!$update){
            return $this->sendError("Could not update payment option due to an unexpected error.", [], 500);
        }

        $pay_options = PaymentOption::orderBy('id', 'asc')->get();

        return $this->sendResponse('payment option was updated successfully', [
            'pay_options' => $pay_options
        ]);
    }

    function deletePaymentOptions(Request $request) : Response | JsonResponse  
    {
        $validate = Validator::make($request->all(), [
            'option_id' => ['required']
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $delete = PaymentOption::where('id', $request->option_id)->delete();

        if(!$delete){
            return $this->sendError("Could not delete payment option due to an uneexpected error.", [], 500);
        }

        $pay_options = PaymentOption::orderBy('id', 'asc')->get();

        return $this->sendResponse('payment option was updated successfully', [
            'pay_options' => $pay_options
        ]);
    }

    public function adminFetchTransactions(Request $request) : Response | JsonResponse | string
    {
        $transactions = Transaction::orderBy('created_at', 'DESC')->with(['user'])->paginate(20);
        return $this->sendResponse('Transactions fetched successfully', [
            'transactions' => $transactions,
        ]);
    }

    public function adminFetchInvestments(Request $request):Response | JsonResponse{
        $investments = Mining::orderBy('created_at', 'DESC')->with(['user', 'plan'])->paginate(20);
        return $this->sendResponse('Investments fetched successfully', [
            'investments' => $investments,
        ]);
    }

    function addFaq(Request $request) : Response | JsonResponse  | array
    {
        $validate = Validator::make($request->all(), [
            'question' => ['required'],
            'answer' => ['required'],
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $save = Faq::create([
            'question' => $request->question,
            'answer' => $request->answer,
        ]);

        if(!$save){
            return $this->sendError("Could not save question due to an unexpected error.", [], 500);
        }

        $faqs = Faq::orderBy('question', 'asc')->get();

        return $this->sendResponse('Question was saved successfully', [
            'faqs' => $faqs
        ]);
    }

    public function fetch_faqs(Request $request) {
        $faqs = Faq::orderBy('question', 'asc')->get();

        return $this->sendResponse('Questions were fetched successfully', [
            'faqs' => $faqs
        ]);
    }

    function deleteFaq(Request $request) : Response | JsonResponse  
    {
        $validate = Validator::make($request->all(), [
            'faq_id' => ['required']
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $delete = Faq::where('id', $request->faq_id)->delete();

        if(!$delete){
            return $this->sendError("Could not delete payment option due to an uneexpected error.", [], 500);
        }

        $faqs = Faq::orderBy('question', 'asc')->get();

        return $this->sendResponse('Question was updated successfully', [
            'faqs' => $faqs
        ]);
    }

}
