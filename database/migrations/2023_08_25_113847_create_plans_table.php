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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('min_deposit', 15,2);
            $table->double('max_deposit', 15,2);
            $table->string('mining_duration');
            $table->enum('timing_parameter', ['hours', 'days'])->default('hours');
            $table->double('percentage', 15,2);
            $table->double('ref_bonus');
            $table->string('hashtag')->nullable();
            $table->string('currency')->default('USD')->nullable();
            $table->boolean('allow_referral')->default(true);
            $table->boolean('return_principal')->default(false)->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
