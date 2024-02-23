<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PruebaLibreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prueba_libre')->insert([
            'id' => 1,
            'palabra_clave' => 'destino'
        ]);
        DB::table('prueba_libre')->insert([
            'id' => 2,
            'palabra_clave' => 'felicidad'
        ]);
        DB::table('prueba_libre')->insert([
            'id' => 3,
            'palabra_clave' => 'nada'
        ]);
        DB::table('prueba_libre')->insert([
            'id' => 4,
            'palabra_clave' => 'mito'
        ]);
        DB::table('prueba_libre')->insert([
            'id' => 5,
            'palabra_clave' => 'si'
        ]);
    }
}
