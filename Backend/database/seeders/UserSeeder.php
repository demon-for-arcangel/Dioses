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
            'nombre' => 'Zeus',
            'email' => 'zeus@gmail.com',
            'password' => bcrypt('admin123'),
            'sabiduria' => 5,
            'nobleza' => 3,
            'virtud' => 1,
            'maldad' => 2,
            'audacia' => 5,
            'dios_id' => 1,
            'humano_id' => null,
        ],);
        DB::table('user')->insert([
            'id' => 2,
            'nombre' => 'Poseidón',
            'email' => 'poseidon@gmail.com',
            'password' => bcrypt('admin123'),
            'sabiduria' => 5,
            'nobleza' => 4,
            'virtud' => 2,
            'maldad' => 2,
            'audacia' => 5,
            'dios_id' => 2,
            'humano_id' => null,
        ]);
        DB::table('user')->insert([
            'id' => 3,
            'nombre' => 'Hades',
            'email' => 'hades@gmail.com',
            'password' => bcrypt('admin123'),
            'sabiduria' => 5,
            'nobleza' =>4,
            'virtud' => 4,
            'maldad' => 4,
            'audacia' => 2,
            'dios_id' => 3,
            'humano_id' => null,
        ]);
        DB::table('user')->insert([
            'id' => 4,
            'nombre' => 'Usuario1',
            'email' => 'usuario1@gmail.com',
            'password' => bcrypt('admin123'),
            'sabiduria' => 3,
            'nobleza' =>2,
            'virtud' => 2,
            'maldad' => 5,
            'audacia' => 1,
            'dios_id' => null,
            'humano_id' => 1,
        ]);
    }
}