<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PruebaValoracion extends Model
{
    protected $table = 'prueba_valoracion';

    protected $fillable = [
        'valor_maximo',
    ];

    public function oraculos(){
        return $this->hasMany(Oraculo::class, 'prueba_valoracion_id');
    }
}
