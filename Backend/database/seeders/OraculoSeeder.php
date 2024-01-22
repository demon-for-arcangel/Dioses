<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OraculoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('oraculo')->insert([
            'id' => 1,
            'pregunta' => '¿Cuál es tu destino?',
            'tipo' => 'libre',
            'cantidad_destino' => 70,
            'prueba_libre_id' => 1,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => null,
        ]);
        DB::table('oraculo')->insert([
            'id' => 2,
            'pregunta' => '¿Cuál es el secreto para ser feliz?',
            'tipo' => 'libre',
            'cantidad_destino' => 70,
            'prueba_libre_id' => 2,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => null,
        ]);
        DB::table('oraculo')->insert([
            'id' => 3,
            'pregunta' => '¿Por qué hay algo en vez de nada?',
            'tipo' => 'libre',
            'cantidad_destino' => 70,
            'prueba_libre_id' => 3,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => null,
        ]);
        DB::table('oraculo')->insert([
            'id' => 4,
            'pregunta' => '¿Es el altruismo real o un mito?',
            'tipo' => 'libre',
            'cantidad_destino' => 70,
            'prueba_libre_id' => 4,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => null,
        ]);
        DB::table('oraculo')->insert([
            'id' => 5,
            'pregunta' => '¿Tenemos libre albedrío?',
            'tipo' => 'libre',
            'cantidad_destino' => 70,
            'prueba_libre_id' => 5,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => null,
        ]);
    }
}