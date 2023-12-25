<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PruebaEleccion extends Model
{
    protected $table = 'prueba_eleccion';

    protected $fillable = [
        'opciones',
        'palabras_clave_correctas',
    ];

    public function oraculos(){
        return $this->hasMany(Oraculo::class, 'prueba_eleccion_id');
    }
}
