<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->enum('type', ['deposit', 'withdrawal', 'mining']);
            $table->double('amount');
            $table->string('currency')->nullable()->default('USD');
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->string('image')->nullable();
            $table->foreignId('payout_bank')->nullable();
            $table->enum('payment_channel', ['bank_payment', 'crypto_wallet'])->nullable()->default('bank_payment');
            $table->foreignId('payment_channel_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
