<?php

namespace App\Http\Controllers;

use App\Models\ResultadoOraculo;
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
                ->leftJoin('prueba_eleccion', 'oraculo.prueba_eleccion_id', '=', 'prueba_eleccion.id')
                ->select('asignacion_oraculo.*', 'oraculo.pregunta', 'oraculo.tipo', 'prueba_eleccion.opcion_1', 'prueba_eleccion.opcion_2')
                ->where('user.id', $userId)
                ->get();
    
            return response()->json($asignaciones, 200);    
        } catch (Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function guardarRespuesta(Request $request)
    {
        try {
            $humano_id = $request->input('humano_id');
            $prueba_id = $request->input('prueba_id');
            $resultado = $request->input('resultado');
    
            $resultadoExistente = ResultadoOraculo::where('humano_id', $humano_id)
                                                   ->where('prueba_id', $prueba_id)
                                                   ->first();
    
            if ($resultadoExistente) {
                $resultadoExistente->resultado = $resultado;
                $resultadoExistente->save();
                return response()->json(['message' => 'La respuesta ya estaba realizada'], 200);
            }
            else {
                $resultadoCreado = ResultadoOraculo::create([
                    'humano_id' => $humano_id,
                    'prueba_id' => $prueba_id,
                    'resultado' => $resultado
                ]);
                return response()->json(['message' => 'Respuesta guardada con éxito', 'resultado' => $resultadoCreado], 200);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
