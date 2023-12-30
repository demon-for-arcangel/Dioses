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
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('sabiduria')->nullable();
            $table->integer('nobleza')->nullable();
            $table->integer('virtud')->nullable();
            $table->integer('maldad')->nullable();
            $table->integer('audacia')->nullable();
            $table->foreignId('dios_id')->nullable()->constrained('dios');
            $table->foreignId('humano_id')->nullable()->constrained('humano');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
