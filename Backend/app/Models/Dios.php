<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dios extends Model
{
    protected $table = 'dios';

    protected $fillable = [
        'user_id',
        'created_at',
        'updated_at',
    ];

    public function asignacionesOraculo()
    {
        return $this->hasMany(AsignacionOraculo::class, 'dios_id');
    }

    public function humanos()
    {
        return $this->hasMany(Humano::class, 'dios_id');
    }

    public function user(){
        return $this -> belongsTo(User::class, 'user_id');
    }
}
