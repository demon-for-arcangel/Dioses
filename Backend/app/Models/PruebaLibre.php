<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PruebaLibre extends Model
{
    protected $table = 'prueba_libre';

    public function oraculos(){
        return $this->hasMany(Oraculo::class, 'prueba_libre_id');
    }
}
