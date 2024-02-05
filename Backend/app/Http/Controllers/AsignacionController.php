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

    public function asignarPruebaMultiple(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'dios_id' => 'required|integer',
                'oraculo_ids' => 'required|array',
                'oraculo_ids.*' => 'required|integer',
                'humano_ids' => 'required|array',
                'humano_ids.*' => 'required|integer',
            ]);

            // Validar la existencia de asignaciones previas
            $existentes = DB::table('asignacion_oraculo')
                ->whereIn('oraculo_id', $validatedData['oraculo_ids'])
                ->whereIn('humano_id', $validatedData['humano_ids'])
                ->get();

            if (!$existentes->isEmpty()) {
                throw new Exception('Al menos una asignación ya existe', 400);
            }

            // Crear nuevas asignaciones
            $nuevasAsignaciones = [];
            foreach ($validatedData['oraculo_ids'] as $oraculoId) {
                foreach ($validatedData['humano_ids'] as $humanoId) {
                    $nuevasAsignaciones[] = [
                        'dios_id' => $validatedData['dios_id'],
                        'oraculo_id' => $oraculoId,
                        'humano_id' => $humanoId,
                    ];
                }
            }

            DB::table('asignacion_oraculo')->insert($nuevasAsignaciones);

            return response()->json(['message' => 'Pruebas asignadas exitosamente'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }


/*     public function asignarPrueba(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'dios_id' => 'required|integer',
                'oraculos' => 'required|array', // 'oraculos' es un arreglo de oráculos a asignar
                'oraculos.*.id' => 'required|integer', // Cada oráculo debe tener un ID
                'humanos' => 'required|array', // 'humanos' es un arreglo de humanos a asignar
                'humanos.*.id' => 'required|integer', // Cada humano debe tener un ID
            ]);

            foreach ($validatedData['oraculos'] as $oraculo) {
                foreach ($validatedData['humanos'] as $humano) {
                    // Verificar si la asignación ya existe
                    $existingAssignment = DB::table('asignacion_oraculo')
                        ->where('dios_id', $validatedData['dios_id'])
                        ->where('oraculo_id', $oraculo['id'])
                        ->where('humano_id', $humano['id'])
                        ->first();

                    if (!$existingAssignment) {
                        // Insertar la nueva asignación
                        DB::table('asignacion_oraculo')->insert([
                            'dios_id' => $validatedData['dios_id'],
                            'oraculo_id' => $oraculo['id'],
                            'humano_id' => $humano['id'],
                        ]);
                    }
                }
            }

            return response()->json(['message' => 'Pruebas asignadas exitosamente'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    } */
}