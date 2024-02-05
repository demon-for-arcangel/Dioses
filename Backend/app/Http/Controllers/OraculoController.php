<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use League\Config\Exception\ValidationException;

class OraculoController extends Controller
{
    public function mostrarOraculos()
    {
        try {
            $oraculos = DB::table('oraculo')
                ->leftJoin('prueba_libre', 'oraculo.prueba_libre_id', '=', 'prueba_libre.id')
                ->leftJoin('prueba_eleccion', 'oraculo.prueba_eleccion_id', '=', 'prueba_eleccion.id')
                ->leftJoin('prueba_valoracion', 'oraculo.prueba_valoracion_id', '=', 'prueba_valoracion.id')
                ->select(
                    'oraculo.*',
                    'prueba_libre.palabra_clave',
                    'prueba_eleccion.opcion_1',
                    'prueba_eleccion.opcion_2',
                    'prueba_valoracion.valor_maximo'
                )
                ->get();
            return response()->json(['oraculos' => $oraculos], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function listarOraculoId($id)
    {
        try {
            $oraculo = DB::table('oraculo')
                ->leftJoin('prueba_libre', 'oraculo.prueba_libre_id', '=', 'prueba_libre.id')
                ->leftJoin('prueba_eleccion', 'oraculo.prueba_eleccion_id', '=', 'prueba_eleccion.id')
                ->leftJoin('prueba_valoracion', 'oraculo.prueba_valoracion_id', '=', 'prueba_valoracion.id')
                ->select('oraculo.*', 'prueba_libre.palabra_clave', 'prueba_eleccion.opciones', 'prueba_valoracion.valor_maximo')
                ->where('oraculo.id', $id)
                ->first();

            if (!$oraculo) {
                throw new Exception('Prueba de oráculo no encontrada', 404);
            }

            return response()->json(['oraculo' => $oraculo], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function mostrarOraculosAsignados($userId){
        try {
            $pruebasAsignadas = DB::table('asignacion_oraculo')
                ->join('oraculo', 'asignacion_oraculo.oraculo_id', '=', 'oraculo.id')
                ->leftJoin('prueba_libre', 'oraculo.prueba_libre_id', '=', 'prueba_libre.id')
                ->leftJoin('prueba_eleccion', 'oraculo.prueba_eleccion_id', '=', 'prueba_eleccion.id')
                ->leftJoin('prueba_valoracion', 'oraculo.prueba_valoracion_id', '=', 'prueba_valoracion.id')
                ->select('oraculo.*', 'prueba_libre.palabra_clave', 'prueba_eleccion.opciones', 'prueba_valoracion.valor_maximo')
                ->where('asignacion_oraculo.humano_id', $userId)
                ->get();
    
            if ($pruebasAsignadas->isEmpty()) {
                return response()->json(['message' => 'No se encontraron pruebas asignadas para el usuario'], 404);
            }
    
            return response()->json(['pruebasAsignadas' => $pruebasAsignadas], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crearOraculo(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'pregunta' => 'required|string',
                'tipo' => 'required|string',
                'cantidad_destino' => 'required|integer',
                'palabra_clave' => 'sometimes|string',
                'opcion_1' => 'sometimes|string',
                'opcion_2' => 'sometimes|string',
                'valor_maximo' => 'sometimes|integer',
            ]);
    
            // Creación de la prueba libre
            if (isset($validatedData['palabra_clave'])) {
                $pruebaLibreId = DB::table('prueba_libre')->insertGetId(['palabra_clave' => $validatedData['palabra_clave']]);
                $validatedData['prueba_libre_id'] = $pruebaLibreId;
                unset($validatedData['palabra_clave']);
            }
    
            // Creación de la prueba de elección
            if (isset($validatedData['opcion_1']) || isset($validatedData['opcion_2'])) {
                $pruebaEleccionId = DB::table('prueba_eleccion')->insertGetId([
                    'opcion_1' => $validatedData['opcion_1'] ?? 'valor_por_defecto',
                    'opcion_2' => $validatedData['opcion_2'] ?? 'valor_por_defecto'
                ]);
                $validatedData['prueba_eleccion_id'] = $pruebaEleccionId;
                unset($validatedData['opcion_1']);
                unset($validatedData['opcion_2']);
            }

            // Creación de la prueba de valoración
            if (isset($validatedData['valor_maximo'])) {
                $pruebaValoracionId = DB::table('prueba_valoracion')->insertGetId([
                    'valor_maximo' => $validatedData['valor_maximo'],
                ]);
                $validatedData['prueba_valoracion_id'] = $pruebaValoracionId;
                unset($validatedData['valor_maximo']);
            }
    
            $id = DB::table('oraculo')->insertGetId($validatedData);
            $oraculo = DB::table('oraculo')->where('id', $id)->first();
    
            return response()->json(['message' => 'Prueba de oráculo creada exitosamente', 'oraculo' => $oraculo], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    public function actualizarOraculo(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'pregunta' => 'sometimes|required|string',
                'caracteristica' => 'sometimes|required|string',
                'cantidad_destino' => 'sometimes|required|integer',
                'prueba_libre_id' => 'sometimes|required|integer',
                'prueba_valoracion_id' => 'sometimes|required|integer',
                'prueba_eleccion_id' => 'sometimes|required|integer',
                'palabra_clave' => 'sometimes|required|string',
                'opcion_1' => 'sometimes|required|string',
                'opcion_2' => 'sometimes|required|string',
                'valor_maximo' => 'sometimes|required|integer',
            ]);
    
            // Obtener el oráculo existente
            $oraculo = DB::table('oraculo')->where('id', $id)->first();
            if (!$oraculo) {
                throw new Exception('Prueba de oráculo no encontrada', 404);
            }
    
            // Actualizar palabra clave de prueba libre si está presente
            if (isset($validatedData['prueba_libre_id']) && isset($validatedData['palabra_clave'])) {
                DB::table('prueba_libre')->where('id', $validatedData['prueba_libre_id'])
                    ->update(['palabra_clave' => $validatedData['palabra_clave']]);
            }
    
            // Actualizar opciones de prueba de elección si están presentes
            if (isset($validatedData['prueba_eleccion_id']) && (isset($validatedData['opcion_1']) || isset($validatedData['opcion_2']))) {
                DB::table('prueba_eleccion')->where('id', $validatedData['prueba_eleccion_id'])
                    ->update([
                        'opcion_1' => $validatedData['opcion_1'] ?? $oraculo->opcion_1,
                        'opcion_2' => $validatedData['opcion_2'] ?? $oraculo->opcion_2
                    ]);
            }
    
            // Actualizar valor máximo de prueba de valoración si está presente
            if (isset($validatedData['prueba_valoracion_id']) && isset($validatedData['valor_maximo'])) {
                DB::table('prueba_valoracion')->where('id', $validatedData['prueba_valoracion_id'])
                    ->update(['valor_maximo' => $validatedData['valor_maximo']]);
            }
    
            // Eliminar datos específicos de la actualización
            unset($validatedData['prueba_libre_id']);
            unset($validatedData['prueba_eleccion_id']);
            unset($validatedData['prueba_valoracion_id']);
            unset($validatedData['palabra_clave']);
            unset($validatedData['opcion_1']);
            unset($validatedData['opcion_2']);
            unset($validatedData['valor_maximo']);
    
            // Actualizar el oráculo
            DB::table('oraculo')->where('id', $id)->update($validatedData);
    
            // Obtener el oráculo actualizado
            $updatedOraculo = DB::table('oraculo')->where('id', $id)->first();
    
            return response()->json(['message' => 'Prueba de oráculo actualizada exitosamente', 'oraculo' => $updatedOraculo], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }        

    public function eliminarOraculo($id)
    {
        try {
            $oraculo = DB::table('oraculo')->where('id', $id)->first();
            if (!$oraculo) {
                throw new Exception('Prueba de oráculo no encontrada', 404);
            }
            
            // Eliminar primero la referencia en la tabla oraculo
            DB::table('oraculo')->where('id', $id)->delete();
    
            // Luego, eliminar la fila correspondiente en la tabla específica
            switch ($oraculo->tipo) {
                case 'libre':
                    $this->eliminarPruebaLibre($oraculo->prueba_libre_id);
                    break;
                case 'eleccion':
                    $this->eliminarPruebaEleccion($oraculo->prueba_eleccion_id);
                    break;
                case 'valoracion':
                    $this->eliminarPruebaValoracion($oraculo->prueba_valoracion_id);
                    break;
            }
    
            return response()->json(['message' => 'Prueba de oráculo y prueba asociada eliminadas exitosamente'], 200);
        } catch (Exception $e) {
            // Asegúrate de usar \Exception si no estás importando la clase Exception con use en la parte superior
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    private function eliminarPruebaLibre($id)
    {
        DB::table('prueba_libre')->where('id', $id)->delete();
    }
    
    private function eliminarPruebaEleccion($id)
    {
        DB::table('prueba_eleccion')->where('id', $id)->delete();
    }
    
    private function eliminarPruebaValoracion($id)
    {
        DB::table('prueba_valoracion')->where('id', $id)->delete();
    }
}