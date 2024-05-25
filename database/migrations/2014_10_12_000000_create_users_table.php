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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname')->nullable();
            $table->string('email')->unique();
            $table->string('account_id')->nullable();
            $table->string('referral_id')->nullable()->default(null);
            $table->string('status')->default('active');
            $table->enum('role', ['admin', 'user'])->default('user');
            $table->string('phone')->nullable();
            $table->boolean('otp_verify')->nullable()->default(false);
            $table->string('gender')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('address')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('timezone')->nullable();
            $table->string('documenttype')->nullable();
            $table->boolean('is_verified')->nullable()->default(false);
            $table->string('profile_photo_path', 2048)->default('default.png');
            $table->string('id_card', 2048)->nullable();
            $table->string('id_card_back', 2048)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('approval_status', ['pending', 'approved', 'denied', 'deactivated'])->default('pending');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
