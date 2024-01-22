<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class AsignacionController extends Controller
{
    public function mostrarAsignacionesUsuario($userId){
        try {
            $asignaciones = DB::table('asignacion_oraculo')
                ->join('humano', 'asignacion_oraculo.humano_id', '=', 'humano.id')
                ->join('user', 'humano.user_id', '=', 'user.id')
                ->join('oraculo', 'oraculo.id', '=', 'asignacion_oraculo.oraculo_id')
                ->select('asignacion_oraculo.*', 'oraculo.pregunta', 'oraculo.tipo')
                ->where('user.id', $userId)
                ->get();
    
            return response()->json($asignaciones, 200);    
        }catch (Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
