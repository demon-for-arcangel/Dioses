<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PruebaValoracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prueba_valoracion')->insert([
            'id' => 1,
            'valor_maximo' => 3,
        ]);
        DB::table('prueba_valoracion')->insert([
            'id' => 2,
            'valor_maximo' => 4,
        ]);
        DB::table('prueba_valoracion')->insert([
            'id' => 3,
            'valor_maximo' => 5,
        ]);
    }
}
