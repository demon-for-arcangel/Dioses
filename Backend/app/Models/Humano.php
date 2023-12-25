<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Humano extends Model
{
    protected $table = 'humano';

    protected $fillable = [
        'destino',
        'dios_id',
    ];

    public function dios(){
        return $this -> belongsTo(Dios::class, 'dios_id');
    }

    public function acciones(){
        return $this -> hasMany(Accion::class, 'objetivo_accion');
    }

    public function afinidades(){
        return $this -> hasMany(AfinidadDiosHumano::class, 'humano_id');
    }

    public function eliminado(){
        return $this -> hasOne(Eliminado::class, 'humano_id');
    }

    public function oraculos(){
        return $this -> hasMany(Oraculo::class, 'cantidad_destino');
    }

    public function resultadosPruebas(){
        return $this -> hayMany(ResultadoPrueba::class, 'humano_id');
    }

    public function usuario(){
        return $this -> hasOne(User::class, 'humano_id');
    }
}
