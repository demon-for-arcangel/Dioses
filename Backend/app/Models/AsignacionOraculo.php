<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsignacionOraculo extends Model
{
    protected $table = 'asignacion_oraculo';

    protected $fillable = [
        'dios_id',
        'oraculo_id',
        'humano_id',
    ];

    public function dios(){
        return $this->belongsTo(Dios::class, 'dios_id');
    }

    public function oraculo(){
        return $this->belongsTo(Oraculo::class, 'oraculo_id');
    }

    public function humano(){
        return $this->belongsTo(Humano::class, 'humano_id');
    }
}