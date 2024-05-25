<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'pay_option',
        'bank',
        'account_number',
        'image',
        'extra',
        'display_status',
    ];
}
