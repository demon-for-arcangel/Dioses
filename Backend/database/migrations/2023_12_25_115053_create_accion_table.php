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
        Schema::create('accion', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dios_id')->constrained();
            $table->string('tipo_accion');
            $table->foreignId('objetivo_accion')->nullable()->constrained('humano');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accion');
    }
};
