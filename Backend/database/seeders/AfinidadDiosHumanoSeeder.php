<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AfinidadDiosHumanoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('afinidad_dios_humano')->insert([
            'dios_id' => 1,
            'humano_id' => 2,
            'puntuacion_afinidad' => 75,
        ]);
    }
}
