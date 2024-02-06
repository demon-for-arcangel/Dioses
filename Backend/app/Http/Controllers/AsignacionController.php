<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
        try {
            $validatedData = $request->validate([
                'humano_ids' => 'required|array',
                'humano_ids.*' => 'required|integer',
            ]);
    
            // Verificar existencia de asignaciones para el oráculo específico
            $existentes = DB::table('asignacion_oraculo')
                ->where('oraculo_id', $oraculo_id)
                ->whereIn('humano_id', $validatedData['humano_ids'])
                ->get();
    
            if (!$existentes->isEmpty()) {
                throw new Exception('Al menos una asignación ya existe para el oráculo ' . $oraculo_id,   400);
            }
    
            // Crear nuevas asignaciones para todos los humanos
            $nuevasAsignaciones = [];
            foreach ($validatedData['humano_ids'] as $humanoId) {
                $nuevasAsignaciones[] = [
                    'dios_id' => $dios_id,
                    'oraculo_id' => $oraculo_id,
                    'humano_id' => $humanoId,
                ];
            }
    
            // Insertar las nuevas asignaciones
            DB::table('asignacion_oraculo')->insert($nuevasAsignaciones);
    
            return response()->json(['message' => 'Pruebas asignadas exitosamente'],   200);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Error interno en el servidor', 'message' => $e->getMessage()],   500);
        }
    }
}