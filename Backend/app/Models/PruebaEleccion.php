<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PruebaEleccion extends Model
{
    protected $table = 'prueba_eleccion';

    protected $fillable = [
        'opcion_1',
        'opcion_2',
        'opcion_correcta'
    ];

    public function oraculos(){
        return $this->hasMany(Oraculo::class, 'prueba_eleccion_id');
    }
}
