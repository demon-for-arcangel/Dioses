<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HumanoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('humano')->insert([
            'id' => 1,
            'destino' => 40,
            'afinidad' => 30,
            'fecha_muerte' => '20/06/2050',
            'dios_id' => 1,
            'user_id' => 4
        ]);
    }
}
