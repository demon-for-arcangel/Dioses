<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oraculo extends Model
{
    protected $table = 'oraculo';

    protected $fillable = [
        'pregunta',
        'palabras_clave_correctas',
        'caracteristica',
        'cantidad_destino',
        'prueba_libre_id',
        'prueba_eleccion_id',
        'prueba_valoracion_id',
    ];
    
    public function pruebaLibre(){
        return $this->belongsTo(PruebaLibre::class, 'prueba_libre_id');
    }

    public function pruebaEleccion(){
        return $this->belongsTo(PruebaEleccion::class, 'prueba_eleccion_id');
    }

    public function pruebaValoracion(){
        return $this->belongsTo(PruebaValoracion::class, 'prueba_valoracion_id');
    }

    public function resultadosPrueba(){
        return $this->hasMany(ResultadoPrueba::class, 'prueba_id');
    }

    public function humanoDestino(){
        return $this->belongsTo(Humano::class, 'cantidad_destino');
    }
}
