<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultadoOraculo extends Model
{
    protected $fillable = [
        'humano_id',
        'prueba_id',
        'resultado',
    ];

    public function humano()
    {
        return $this->belongsTo(Humano::class, 'humano_id');
    }

    public function oraculo()
    {
        return $this->belongsTo(Oraculo::class, 'prueba_id');
    }
}
