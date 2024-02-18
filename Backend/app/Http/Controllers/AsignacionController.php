<?php

namespace App\Http\Controllers;

use App\Models\Oraculo;
use App\Models\ResultadoOraculo;
use App\Models\PruebaLibre;
use App\Models\PruebaEleccion;
use App\Models\PruebaValoracion;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
class AsignacionController extends Controller
{
    public function mostrarAsignacionesUsuario($userId){
        try {
            $asignaciones = DB::table('asignacion_oraculo')
                ->join('humano', 'asignacion_oraculo.humano_id', '=', 'humano.id')
                ->join('user', 'humano.user_id', '=', 'user.id')
                ->join('oraculo', 'oraculo.id', '=', 'asignacion_oraculo.oraculo_id')
                ->leftJoin('resultado_oraculo', function ($join) {
                    $join->on('asignacion_oraculo.humano_id', '=', 'resultado_oraculo.humano_id')
                        ->on('asignacion_oraculo.oraculo_id', '=', 'resultado_oraculo.prueba_id');
                })
                ->select(
                    'asignacion_oraculo.*',
                    'oraculo.pregunta',
                    'oraculo.tipo',
                    'resultado_oraculo.resultado' 
                )
                ->where('user.id', $userId)
                ->whereNull('resultado_oraculo.resultado')
                ->orWhere('resultado_oraculo.resultado', '=', null) //incluir asignaciones sin resultados
                ->get();
    
            return response()->json($asignaciones, 200);
        } catch (Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function pruebasResueltasHumano($userId){
        try {
            $asignaciones = DB::table('asignacion_oraculo')
                ->join('humano', 'asignacion_oraculo.humano_id', '=', 'humano.id')
                ->join('user', 'humano.user_id', '=', 'user.id')
                ->join('oraculo', 'oraculo.id', '=', 'asignacion_oraculo.oraculo_id')
                ->join('resultado_oraculo', function ($join) {
                    $join->on('asignacion_oraculo.humano_id', '=', 'resultado_oraculo.humano_id')
                        ->on('asignacion_oraculo.oraculo_id', '=', 'resultado_oraculo.prueba_id');
                })
                ->select(
                    'asignacion_oraculo.*',
                    'oraculo.pregunta',
                    'oraculo.tipo',
                    'resultado_oraculo.resultado' 
                )
                ->where('user.id', $userId)
                ->whereNotNull('resultado_oraculo.resultado') // pruebas con resultados
                ->get();
    
            return response()->json($asignaciones, 200);
        } catch (Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }    

    public function asignarPrueba(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'dios_id' => 'required|integer',
                'oraculo_id' => 'required|integer',
                'humano_id' => 'required|integer',
            ]);
    
            $existe = DB::table('asignacion_oraculo')
                ->where('dios_id', $validatedData['dios_id'])
                ->where('oraculo_id', $validatedData['oraculo_id'])
                ->where('humano_id', $validatedData['humano_id'])
                ->first();
    
            if ($existe) {
                throw new Exception('La asignación ya existe', 400);
            }
    
            DB::table('asignacion_oraculo')->insert($validatedData);
    
            return response()->json(['message' => 'Prueba asignada exitosamente'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function asignarPruebaMultiple(Request $request, $dios_id, $oraculo_id)
    {
        $validator = Validator::make($request->all(), [
            'humano_ids' => 'required|array',
            'humano_ids.*' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()],  400);
        }
    
        $humanoIds = $request->input('humano_ids');
    
        $existentes = DB::table('asignacion_oraculo')
            ->where('oraculo_id', $oraculo_id)
            ->whereIn('humano_id', $humanoIds)
            ->get();
    
        if (!$existentes->isEmpty()) {
            return response()->json(['error' => 'Al menos una asignación ya existe para el oráculo ' . $oraculo_id],  400);
        }
    
        $nuevasAsignaciones = array_map(function ($humanoId) use ($dios_id, $oraculo_id) {
            return [
                'dios_id' => $dios_id,
                'oraculo_id' => $oraculo_id,
                'humano_id' => $humanoId,
            ];
        }, $humanoIds);
    
        DB::table('asignacion_oraculo')->insert($nuevasAsignaciones);
    
        return response()->json(['message' => 'Pruebas asignadas exitosamente'],  200);
    }

    public function guardarRespuesta(Request $request){
        try {
            $humano_id = $request->input('humano_id');
            $prueba_id = $request->input('prueba_id');
            $resultado = $request->input('resultado');
    
            $respuestaExistente = ResultadoOraculo::where('humano_id', $humano_id)
                ->where('prueba_id', $prueba_id)
                ->first();
    
            if ($respuestaExistente) {
                $respuestaExistente->resultado = $resultado;
                $respuestaExistente->save();
                return response()->json(['message' => 'La respuesta ya estaba realizada'], 200);
            } else {
                $tipoPrueba = $this->infoTipoPrueba($prueba_id);
    
                switch ($tipoPrueba) {
                    case 'libre':
                        return $this->guardarRespuestaLibre($request, $humano_id, $prueba_id, $resultado);
                    case 'valoracion':
                        return $this->guardarRespuestaValoracion($request, $humano_id, $prueba_id, $resultado);
                    case 'eleccion':
                        return $this->guardarRespuestaEleccion($request, $humano_id, $prueba_id, $resultado);
                    default:
                        throw new Exception('Tipo de prueba desconocido');
                }
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    private function infoTipoPrueba($prueba_id){
        $tipoPrueba = DB::table('oraculo')->where('id', $prueba_id)->value('tipo');
        return $tipoPrueba;
    }

    private function guardarRespuestaLibre(Request $request, $humano_id, $prueba_id, $resultado){
        try {
            $respuestaExistente = ResultadoOraculo::firstOrNew([
                'humano_id' => $humano_id,
                'prueba_id' => $prueba_id,
            ]);
    
            $respuestaExistente->resultado = $resultado;
            $respuestaExistente->save();
    
            if (!is_string($resultado)) {
                throw new Exception('El resultado de la prueba libre debe ser una cadena');
            }
    
            $respuestaCreada = $respuestaExistente; 
    
            $this->comprobarRespuesta($request, $respuestaCreada->id);
    
            return response()->json(['message' => 'Respuesta guardada con éxito', 'resultado' => $respuestaCreada], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function guardarRespuestaValoracion(Request $request, $humano_id, $prueba_id, $resultado){
        try {
            $respuestaExistente = ResultadoOraculo::where('humano_id', $humano_id)
                                            ->where('prueba_id', $prueba_id)
                                            ->exists();
    
            if ($respuestaExistente) {
                return response()->json(['message' => 'La respuesta ya estaba realizada'], 200);
            } else {
                $respuestaCreada = ResultadoOraculo::create([
                    'humano_id' => $humano_id,
                    'prueba_id' => $prueba_id,
                    'resultado' => $resultado
                ]);
                if (!is_numeric($resultado)) {
                    throw new Exception('El resultado de la prueba de valoración debe ser un número');
                }
                $this->comprobarRespuesta($request, $respuestaCreada->id);
                return response()->json(['message' => 'Respuesta valoración guardada con éxito', 'resultado' => $respuestaCreada], 200);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function guardarRespuestaEleccion(Request $request, $humano_id, $prueba_id, $resultado){
        try {
            $respuestaExistente = ResultadoOraculo::where('humano_id', $humano_id)
                                            ->where('prueba_id', $prueba_id)
                                            ->exists();

            if ($respuestaExistente) {
                return response()->json(['message' => 'La respuesta ya estaba realizada'], 200);
            } else { 
                $respuestaCreada = ResultadoOraculo::create([
                    'humano_id' => $humano_id,
                    'prueba_id' => $prueba_id,
                    'resultado' => $resultado
                ]);
                $this->comprobarRespuesta($request, $respuestaCreada->id);
                return response()->json(['message' => 'Respuesta elección guardada con éxito', 'resultado' => $respuestaCreada], 200);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function comprobarRespuesta(Request $request, $id){
        $respuestaHumano = ResultadoOraculo::find($id);
    
        if (!$respuestaHumano) {
            return response()->json(['error' => 'Respuesta del humano no encontrada'], 404);
        }
    
        $oraculo = $respuestaHumano->oraculo;
    
        if (!$oraculo) {
            return response()->json(['error' => 'Oráculo no encontrado'], 404);
        }
    
        $tipoPregunta = $oraculo->tipo;
    
        $puntuacion = 0;
    
        switch ($tipoPregunta) {
            case 'libre':
                $pruebaLibre = $oraculo->pruebaLibre; 
                if (!$pruebaLibre) {
                    return response()->json(['error' => 'Prueba libre no encontrada'], 404);
                }
    
                $respuestaCorrecta = $pruebaLibre->palabra_clave;
    
                $puntuacion = ($respuestaHumano->resultado === $respuestaCorrecta) ? 10 : -5;
                break;
            case 'valoracion':
                $pruebaValoracion = $oraculo->pruebaValoracion; 
                if (!$pruebaValoracion) {
                    return response()->json(['error' => 'Prueba de valoración no encontrada'], 404);
                }
    
                $valorMaximo = $pruebaValoracion->valor_maximo;
    
                $puntuacion = ($respuestaHumano->resultado == $valorMaximo) ? 10 : -5;
                break;
            case 'eleccion':
                $pruebaEleccion = $oraculo->pruebaEleccion; // Accede a la relación directamente
                if (!$pruebaEleccion) {
                    return response()->json(['error' => 'Prueba de elección no encontrada'], 404);
                }
    
                $opcionCorrecta = $pruebaEleccion->opcion_correcta;
    
                $puntuacion = ($respuestaHumano->resultado === $opcionCorrecta) ? 10 : -5;
                break;
            default:
                return response()->json(['error' => 'Tipo de pregunta no válido'], 400);
        }
    
        $humano = $respuestaHumano->humano;
    
        if (!$humano) {
            return response()->json(['error' => 'Humano no encontrado'], 404);
        }
    
        $humano->destino += $puntuacion;
        $humano->save();
        return response()->json(['puntuacion' => $puntuacion, 'puntuacion_total' => $humano->puntuacion]);
    }
}