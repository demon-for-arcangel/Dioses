<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResultadoPruebaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('resultado_prueba')->insert([
            'id' => 1,
            'humano_id' => 2,
            'prueba_id' => 1,
            'resultado' => 'Éxito',
        ]);
    }
}
