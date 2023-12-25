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
            'correo' => 'usuario1@example.com',
            'contrasena' => bcrypt('contrasena1'),
            'sabiduria' => 80,
            'nobleza' => 75,
            'virtud' => 90,
            'maldad' => 20,
            'audacia' => 85,
            'tipo' => 'dios',
            'dios_id' => 1,
            'humano_id' => 2,
        ]);
    }
}
