<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResultadoOraculoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('resultado_oraculo')->insert([
            'id' => 1,
            'humano_id' => 1,
            'prueba_id' => 1,
            'resultado' => 'Éxito',
        ]);
    }
}