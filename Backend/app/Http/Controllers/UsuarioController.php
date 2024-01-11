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
                'sabiduria' => 5,
                'nobleza' => 5,
                'virtud' => 5,
                'maldad' => 3,
                'audacia' => rand(1, 5),
            ]);
    
            // Asignar valores aleatorios y protección
            $this -> asignarProteccion($usuario);
    
            // Verificar si el usuario tiene un humano asociado
            $humano = Humano::where('user_id', $usuario->id)->first();
    
            if (!$humano) {
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
    
        // Calcula la suma de atributos del humano
        $sumaAtributosHumano = $sabiduriaUsuario + $noblezaUsuario + $virtudUsuario + $maldadUsuario + $audaciaUsuario;
    
        // Inicializa variables para la menor y mayor suma de atributos
        $minSumaAtributos = PHP_INT_MAX;
        $maxSumaAtributos = -PHP_INT_MAX;
    
        // Inicializa variables para los dioses asociados a la menor y mayor suma de atributos
        $diosMenor = null;
        $diosMayor = null;
    
        // Lógica
        foreach ($dioses as $dios) {
            // Calcula la suma de atributos de cada dios
            $sumaAtributosDios = $dios->sabiduria + $dios->nobleza + $dios->virtud + $dios->maldad + $dios->audacia;
    
            // Actualiza variables si se encuentra una menor o mayor suma de atributos
            if ($sumaAtributosDios < $minSumaAtributos) {
                $minSumaAtributos = $sumaAtributosDios;
                $diosMenor = $dios;
            }
    
            if ($sumaAtributosDios > $maxSumaAtributos) {
                $maxSumaAtributos = $sumaAtributosDios;
                $diosMayor = $dios;
            }
        }
    
        // Encuentra el dios restante (el que no es ni el menor ni el mayor)
        $diosRestante = $dioses->whereNotIn('id', [$diosMenor->id, $diosMayor->id])->first();
    
        // Calcula la suma de atributos del dios restante
        $sumaAtributosDiosRestante = $diosRestante->sabiduria + $diosRestante->nobleza + $diosRestante->virtud + $diosRestante->maldad + $diosRestante->audacia;
    
        // Compara la suma de atributos del humano con las sumas de los dioses
        if ($sumaAtributosHumano < $minSumaAtributos) {
            $diosSeleccionado = $diosMenor;
        } elseif ($sumaAtributosHumano > $maxSumaAtributos) {
            $diosSeleccionado = $diosMayor;
        } else {
            // Compara la suma de atributos del humano con la del dios restante
            if ($sumaAtributosHumano < $sumaAtributosDiosRestante) {
                $diosSeleccionado = $diosMenor;
            } else {
                $diosSeleccionado = $diosRestante;
            }
        }
    
        // Asigna el dios seleccionado al humano
        $humano = Humano::where('user_id', $usuario->id)->first();
    
        if ($humano) {
            $humano->update([
                'dios_id' => $diosSeleccionado->id,
            ]);
        } else {
            Humano::create([
                'user_id' => $usuario->id,
                'dios_id' => $diosSeleccionado->id,
                'destino' => null,
                'afinidad' => abs($sumaAtributosHumano - ($diosSeleccionado->sabiduria + $diosSeleccionado->nobleza + $diosSeleccionado->virtud + $diosSeleccionado->maldad + $diosSeleccionado->audacia)),
            ]);
        }

        return response()->json([
            'dios_seleccionado' => $diosSeleccionado,
        ]);
    
    }
}