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
        Schema::create('resultado_oraculo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('humano_id')->constrained();
            $table->foreignId('prueba_id')->constrained('oraculo');
            $table->string('resultado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resultado_oraculo');
    }
};
