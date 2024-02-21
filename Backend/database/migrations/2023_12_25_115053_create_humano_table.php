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
        Schema::create('humano', function (Blueprint $table) {
            $table->id();
            $table->integer('destino')->default(0);
            $table->integer('afinidad');
            $table->string('fecha_muerte')->nullable();
            $table->enum('ubicacion', ['Campos Eliseos', 'Tartaro'])->nullable();
            $table->bigInteger('dios_id')->unsigned();
            $table->foreignId('user_id')->nullable()->constrained('user');
            $table->timestamps();

            $table->foreign('dios_id')->references('id')->on('dios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('humano');
    }
};
