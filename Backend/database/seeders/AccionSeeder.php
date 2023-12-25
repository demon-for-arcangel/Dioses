<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('accion')->insert([
            'dios_id' => 1,
            'tipo_accion' => 'Bendición',
            'objetivo' => 2,
        ]);
    }
}
