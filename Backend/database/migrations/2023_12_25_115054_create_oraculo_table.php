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
        Schema::create('oraculo', function (Blueprint $table) {
            $table->id();
            $table->string('pregunta');
            $table->string('palabras_clave_correctas');
            $table->string('caracteristica');
            $table->integer('cantidad_destino');
            $table->foreignId('prueba_libre_id')->nullable()->constrained('prueba_libre');
            $table->foreignId('prueba_eleccion_id')->nullable()->constrained('prueba_eleccion');
            $table->foreignId('prueba_valoracion_id')->nullable()->constrained('prueba_valoracion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oraculo');
    }
};
