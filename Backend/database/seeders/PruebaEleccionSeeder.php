<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PruebaEleccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prueba_eleccion')->insert([
            'id' => 1,
            'opcion_1' => 'Gato',
            'opcion_2' => 'Cuadro Valioso',
            'opcion_correcta' => 'Gato'
        ]);

        DB::table('prueba_eleccion')->insert([
            'id' => 2,
            'opcion_1' => 'Si',
            'opcion_2' => 'No',
            'opcion_correcta' => 'Si'
        ]);
    }
}
