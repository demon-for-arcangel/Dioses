<?php

namespace App\Http\Controllers;

use App\Models\Dios;
use Illuminate\Http\Request;
use App\Models\Humano;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    public function crearUsuario(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'required|string',
                'email' => 'required|email|unique:user,email',
                'password' => 'required|string|min:8',
            ]);
    
            // Crear usuario
            $usuario = User::create([
                'nombre' => $request->input('nombre'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
                'sabiduria' => rand(1, 5),
                'nobleza' => rand(1, 5),
                'virtud' => rand(1, 5),
                'maldad' => rand(1, 5),
                'audacia' => rand(1, 5),
            ]);
    
            // Asignar valores aleatorios y protección
            $this -> asignarProteccion($usuario);
    
            // Verificar si el usuario tiene un humano asociado
            $humano = Humano::where('user_id', $usuario->id)->first();
    
            if (!$humano) {
                // Si no hay un humano asociado, crear uno con valores predeterminados
                $humano = Humano::create([
                    'user_id' => $usuario->id,
                    'dios_id' => null,
                    'destino' => null,
                    'afinidad' => null,
                ]);
            }
    
            $msg = ['message' => 'Humano creado exitosamente', 'usuario' => $usuario];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }
    
        return response()->json(['mens' => $msg], $cod);
    }  
    
    public function asignarProteccion(User $usuario)
    {
        // Características de los humanos
        $sabiduriaUsuario = $usuario->sabiduria;
        $noblezaUsuario = $usuario->nobleza;
        $virtudUsuario = $usuario->virtud;
        $maldadUsuario = $usuario->maldad;
        $audaciaUsuario = $usuario->audacia;
    
        // Características de los dioses
        $dioses = Dios::whereIn('id', [1, 2, 3])->get();
    
        $afinidadMaxima = 0;
        $diosSeleccionado = null;
    
        // Lógica
        foreach ($dioses as $dios) {
            $afinidad = $this->calcularAfinidad(
                $sabiduriaUsuario, $noblezaUsuario, $virtudUsuario, $maldadUsuario, $audaciaUsuario,
                $dios->sabiduria, $dios->nobleza, $dios->virtud, $dios->maldad, $dios->audacia
            );
    
            if ($afinidad > $afinidadMaxima) {
                $afinidadMaxima = $afinidad;
                $diosSeleccionado = $dios;
            }
        }
    
        if ($diosSeleccionado) {
            // Asignar las características del dios al usuario
            /*$usuario->update([
                'sabiduria' => $diosSeleccionado->sabiduria,
                'nobleza' => $diosSeleccionado->nobleza,
                'virtud' => $diosSeleccionado->virtud,
                'maldad' => $diosSeleccionado->maldad,
                'audacia' => $diosSeleccionado->audacia,
            ]);*/
    
            // Verificar si el usuario tiene un humano asociado
            $humano = Humano::where('user_id', $usuario->id)->first();
    
            if ($humano) {
                // Asignar el dios a la tabla Humano
                $humano->update([
                    'dios_id' => $diosSeleccionado->id,
                ]);
            } else {
                // Si no hay un humano asociado, crear uno con el dios asignado
                Humano::create([
                    'user_id' => $usuario->id,
                    'dios_id' => $diosSeleccionado->id,
                    'destino' => null,
                    'afinidad' => $afinidad,
                ]);
            }
    
            return $diosSeleccionado->id;
        } else {
            throw new Exception('No se pudo asignar la protección correctamente', 404);
        }
    }
    
    private function calcularAfinidad($sabiduriaUsuario, $noblezaUsuario, $virtudUsuario, $maldadUsuario, $audaciaUsuario, $sabiduriaDios, $noblezaDios, $virtudDios, $maldadDios, $audaciaDios){
        $afinidad = (
            abs($sabiduriaUsuario - $sabiduriaDios) +
            abs($noblezaUsuario - $noblezaDios) +
            abs($virtudUsuario - $virtudDios) +
            abs($maldadUsuario - $maldadDios) +
            abs($audaciaUsuario - $audaciaDios)
        );
        return $afinidad;
    }
}