<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dios extends Model
{
    protected $table = 'dios';

    public function acciones(){
        return $this -> hasMany(Accion::class, 'dios_id');
    }

    public function afinidades(){
        return $this -> hasMany(AfinidadDiosHumano::class, 'dios_id');
    }

    public function humanos(){
        return $this -> hasMany(Humano::class, 'dios_id');
    }
}
