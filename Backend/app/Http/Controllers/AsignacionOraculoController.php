<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AsignacionOraculo;

class AsignacionOraculoController extends Controller
{
    public function AsignacionesPorHumano($humanoId){
        $asignaciones = AsignacionOraculo::with(['oraculo', 'dios', 'humano'])
                            -> where('humano_id', $humanoId)
                            -> get();

        return response() -> json($asignaciones);
    }
}
