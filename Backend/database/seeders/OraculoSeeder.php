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
        DB::table('oraculo')->insert([
            'id' => 6,
            'pregunta' => '¿Podemos experimentar el mundo de manera objetiva?',
            'tipo' => 'valoracion',
            'cantidad_destino' => 70,
            'prueba_libre_id' => null,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => 1,
        ]);
        DB::table('oraculo')->insert([
            'id' => 7,
            'pregunta' => '¿Existe una ética objetiva?',
            'tipo' => 'valoracion',
            'cantidad_destino' => 70,
            'prueba_libre_id' => null,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => 2,
        ]);
        DB::table('oraculo')->insert([
            'id' => 8,
            'pregunta' => '¿Le gustaría ser inmortal si pudiera?',
            'tipo' => 'valoracion',
            'cantidad_destino' => 70,
            'prueba_libre_id' => null,
            'prueba_eleccion_id' => null,
            'prueba_valoracion_id' => 3,
        ]);
        DB::table('oraculo')->insert([
            'id' => 9,
            'pregunta' => 'Estás en una casa y se declara un incendio.  Sólo puedes llevar una cosa y hay un gato y un cuadro muy valioso: ¿qué salvas?',
            'tipo' => 'eleccion',
            'cantidad_destino' => 70,
            'prueba_libre_id' => null,
            'prueba_eleccion_id' => 1,
            'prueba_valoracion_id' => null,
        ]);
        DB::table('oraculo')->insert([
            'id' => 10,
            'pregunta' => '¿Eres libre en tus elecciones?',
            'tipo' => 'eleccion',
            'cantidad_destino' => 70,
            'prueba_libre_id' => null,
            'prueba_eleccion_id' => 2,
            'prueba_valoracion_id' => null,
        ]);
    }
}