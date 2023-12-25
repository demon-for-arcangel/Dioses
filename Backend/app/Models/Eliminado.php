<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eliminado extends Model
{
    protected $table = 'eliminado';

    protected $fillable = [
        'humano_id',
        'fecha_muerte',
    ];

    public function humano(){
        return $this -> belongsTo(Humano::class, 'humano_id');
    }
}
