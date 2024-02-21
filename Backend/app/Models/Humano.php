<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Humano extends Model
{
    protected $table = 'humano';

    protected $fillable = [
        'destino',
        'afinidad',
        'fecha_muerte',
        'dios_id',
        'user_id',
        'created_at',
        'updated_at',
    ];

    public function dios(){
        return $this -> belongsTo(Dios::class, 'dios_id');
    }

    public function user(){
        return $this -> belongsTo(User::class, 'user_id');
    }

    public function asignacionesOraculo(){
        return $this -> hasMany(AsignacionOraculo::class, 'humano_id');
    }

    public function resultadosOraculos(){
        return $this -> hayMany(ResultadoOraculo::class, 'humano_id');
    }
}
