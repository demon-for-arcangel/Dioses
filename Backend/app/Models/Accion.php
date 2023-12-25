<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accion extends Model
{
    protected $table = 'accion';

    protected $fillable = [
        'dios_id',
        'tipo_acion',
        'objetivo',
    ];

    public function dios(){
        return $this -> belongsTo(Dios::class, 'dios_id');
    }

    public function humano(){
        return $this -> belongsTo(Humano::class, 'objetivo');
    }
}