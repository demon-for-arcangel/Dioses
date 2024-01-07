<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsignacionOraculoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('asignacion_oraculo')->insert([
            'id' => 1,
            'dios_id' => 1,
            'oraculo_id' => 1,
            'humano_id' => 1,
        ]);
    }
}
