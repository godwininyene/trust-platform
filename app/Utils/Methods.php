<?

namespace App\Utils;

use App\Models\User;
use App\Models\Wallet;

class Methods
{
    public  static function creditReferralBonus(User $user, float $amount, float $percentage) 
    {
        $referral = User::where('account_id', $user->referral_id)->first();
        if (!empty($referral)) {
            $referral_bonus = ($percentage / 100) * $amount;
            $wallet = Wallet::where('user_id', $referral->id)->first();
            $wallet->referral_balance += $referral_bonus;
            $wallet->update();
        }
    }
}
