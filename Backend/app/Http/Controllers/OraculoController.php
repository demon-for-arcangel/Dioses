<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class OraculoController extends Controller
{
    public function mostrarOraculos()
    {
        try {
            $oraculos = DB::table('oraculo')
                ->leftJoin('prueba_libre', 'oraculo.prueba_libre_id', '=', 'prueba_libre.id')
                ->leftJoin('prueba_eleccion', 'oraculo.prueba_eleccion_id', '=', 'prueba_eleccion.id')
                ->leftJoin('prueba_valoracion', 'oraculo.prueba_valoracion_id', '=', 'prueba_valoracion.id')
                ->select('oraculo.*', 'prueba_libre.palabra_clave', 'prueba_eleccion.opciones', 'prueba_valoracion.valor_maximo')
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
                'caracteristica' => 'required|string',
                'cantidad_destino' => 'required|integer',
            ]);

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
                'pregunta' => 'required|string',
                'caracteristica' => 'required|string',
                'cantidad_destino' => 'required|integer',
            ]);

            DB::table('oraculo')->where('id', $id)->update($validatedData);
            $oraculo = DB::table('oraculo')->where('id', $id)->first();

            return response()->json(['message' => 'Prueba de oráculo actualizada exitosamente', 'oraculo' => $oraculo], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminarOraculo($id)
    {
        try {
            $oraculo = DB::table('oraculo')->where('id', $id)->first();
            if (!$oraculo) {
                throw new Exception('Prueba de oráculo no encontrada', 404);
            }

            DB::table('oraculo')->where('id', $id)->delete();
            return response()->json(['message' => 'Prueba de oráculo eliminada exitosamente'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}