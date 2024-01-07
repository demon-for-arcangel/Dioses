<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dios')->insert([
            'id' => 1,
        ]);
        DB::table('dios')->insert([
            'id' => 2,
        ]);
        DB::table('dios')->insert([
            'id' => 3,
        ]);
    }
}
