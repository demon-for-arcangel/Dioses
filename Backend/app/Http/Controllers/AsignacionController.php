<?php

namespace App\Http\Controllers;

use App\Models\ResultadoOraculo;
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
                ->leftJoin('prueba_eleccion', 'oraculo.prueba_eleccion_id', '=', 'prueba_eleccion.id')
                ->select('asignacion_oraculo.*', 'oraculo.pregunta', 'oraculo.tipo', 'prueba_eleccion.opcion_1', 'prueba_eleccion.opcion_2')
                ->where('user.id', $userId)
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
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'humano_ids' => 'required|array',
            'humano_ids.*' => 'required|integer',
        ]);
    
        // Si la validación falla, retornar un error
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()],  400);
        }
    
        // Obtener los IDs de humano validados
        $humanoIds = $request->input('humano_ids');
    
        // Verificar si ya existen asignaciones para el oráculo específico
        $existentes = DB::table('asignacion_oraculo')
            ->where('oraculo_id', $oraculo_id)
            ->whereIn('humano_id', $humanoIds)
            ->get();
    
        // Si alguna asignación ya existe, retornar un error
        if (!$existentes->isEmpty()) {
            return response()->json(['error' => 'Al menos una asignación ya existe para el oráculo ' . $oraculo_id],  400);
        }
    
        // Preparar las nuevas asignaciones
        $nuevasAsignaciones = array_map(function ($humanoId) use ($dios_id, $oraculo_id) {
            return [
                'dios_id' => $dios_id,
                'oraculo_id' => $oraculo_id,
                'humano_id' => $humanoId,
            ];
        }, $humanoIds);
    
        // Insertar las nuevas asignaciones en la base de datos
        DB::table('asignacion_oraculo')->insert($nuevasAsignaciones);
    
        // Retornar una respuesta de éxito
        return response()->json(['message' => 'Pruebas asignadas exitosamente'],  200);
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

