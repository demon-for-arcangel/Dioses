<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AfinidadDiosHumano extends Model
{
    protected $table = 'afinidad_dios_humano';

    protected $fillable = [
        'dios_id',
        'humano_id',
        'puntuacion_afinidad',
    ];

    public function dios(){
        return $this -> belongsTo(Dios::class, 'dios_id');
    }

    public function humano(){
        return $this -> belongsTo(Humano::class, 'humano_id');
    }
}
