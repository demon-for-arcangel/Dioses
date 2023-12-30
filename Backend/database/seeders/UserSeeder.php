<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user')->insert([
            'id' => 1,
            'nombre' => 'Usuario1',
            'email' => 'usuario1@example.com',
            'password' => bcrypt('contrasena1'),
            'sabiduria' => 80,
            'nobleza' => 75,
            'virtud' => 90,
            'maldad' => 20,
            'audacia' => 85,
            'dios_id' => 1,
            'humano_id' => null,
        ],
        [
            'id' => 2,
            'nombre' => 'Usuario2',
            'email' => 'usuario2@example.com',
            'password' => bcrypt('contrasena2'),
            'sabiduria' =>40,
            'nobleza' => 95,
            'virtud' => 60,
            'maldad' => 50,
            'audacia' => 35,
            'dios_id' => null,
            'humano_id' => 1,
        ]);
    }
}