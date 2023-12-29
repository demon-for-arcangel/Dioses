<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dios extends Model
{
    protected $table = 'dios';

    public function asignacionesOraculo()
    {
        return $this->hasMany(AsignacionOraculo::class, 'dios_id');
    }

    public function humanos()
    {
        return $this->hasMany(Humano::class, 'dios_id');
    }

    public function usuarios()
    {
        return $this->hasMany(User::class, 'dios_id');
    }
}
