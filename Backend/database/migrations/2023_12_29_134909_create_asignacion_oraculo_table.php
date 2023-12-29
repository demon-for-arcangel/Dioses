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
        Schema::create('asignacion_oraculo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dios_id')->constrained();
            $table->foreignId('oraculo_id')->constrained();
            $table->foreignId('humano_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignacion_oraculo');
    }
};
