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
            'palabras_clave_correctas' => 'destino, futuro, predestinación',
            'caracteristica' => 'Adivinación',
            'cantidad_destino' => 3,
            'prueba_libre_id' => 1,
            'prueba_eleccion_id' => 2,
            'prueba_valoracion_id' => 3,
        ]);
    }
}
