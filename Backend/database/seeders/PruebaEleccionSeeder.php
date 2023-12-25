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
            'opciones' => 'Opción A, Opción B, Opción C',
            'palabras_clave_correctas' => 'correcta',
        ]);
    }
}
