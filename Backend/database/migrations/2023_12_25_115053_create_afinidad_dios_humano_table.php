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
        Schema::create('afinidad_dios_humano', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dios_id')->constrained('dios');
            $table->foreignId('humano_id')->constrained('humano');
            $table->integer('puntuacion_afinidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('afinidad_dios_humano');
    }
};
