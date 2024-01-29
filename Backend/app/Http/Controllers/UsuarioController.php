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
    public function registrar(Request $request){
        try {
            $request->validate([
                'nombre' => 'required|string',
                'email' => 'required|email|unique:user,email',
                'password' => 'required|string|min:8',
            ]);
    
            $usuario = User::create([
                'nombre' => $request->input('nombre'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
                'tipo' => 'humano',
                'sabiduria' => rand(1, 5),
                'nobleza' => rand(1, 5),
                'virtud' => rand(1, 5),
                'maldad' => rand(1, 5),
                'audacia' => rand(1, 5),
            ]);
    
            $diosSeleccionado = $this -> asignarProteccion($usuario);
    
            $humano = Humano::where('user_id', $usuario->id)->first();
    
            if (!$humano || !$humano->dios_id) {
                if ($diosSeleccionado && $diosSeleccionado->user){
                    $afinidad = $this->calcularAfinidad(
                        $usuario->sabiduria, $usuario->nobleza, $usuario->virtud, $usuario->maldad, $usuario->audacia,
                        $diosSeleccionado->user->sabiduria, $diosSeleccionado->user->nobleza, $diosSeleccionado->user->virtud, $diosSeleccionado->user->maldad, $diosSeleccionado->user->audacia
                    );

                    $humano = Humano::create([
                        'user_id' => $usuario->id,
                        'dios_id' => $diosSeleccionado->id,
                        'destino' => 0,
                        'afinidad' => $afinidad,
                    ]); 
                }else{
                    throw new Exception('No se encontró un dios seleccionado o falta la relación de usuario en el dios seleccionado', 404);
                }           
            }
                 
            $msg = ['message' => 'Humano creado exitosamente', 'usuario' => $usuario];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }
    
        return response()->json(['mens' => $msg], $cod);
    } 

    public function crearUsuario(Request $request){
        try {
            $request->validate([
                'nombre' => 'required|string',
                'email' => 'required|email|unique:user,email',
                'password' => 'required|string|min:8',
                'sabiduria' => 'required|integer',
                'nobleza' => 'required|integer',
                'virtud' => 'required|integer',
                'maldad' => 'required|integer',
                'audacia' => 'required|integer',
            ]);
    
            $usuario = User::create([
                'nombre' => $request->input('nombre'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
                'tipo' => 'humano',
                'sabiduria' => $request->input('sabiduria'),
                'nobleza' => $request->input('nobleza'),
                'virtud' => $request->input('virtud'),
                'maldad' => $request->input('maldad'),
                'audacia' => $request->input('audacia'),
            ]);
    
            $diosSeleccionado = $this -> asignarProteccion($usuario);
    
            $humano = Humano::where('user_id', $usuario->id)->first();
    
            if (!$humano || !$humano->dios_id) {
                if ($diosSeleccionado && $diosSeleccionado->user){
                    $afinidad = $this->calcularAfinidad(
                        $usuario->sabiduria, $usuario->nobleza, $usuario->virtud, $usuario->maldad, $usuario->audacia,
                        $diosSeleccionado->user->sabiduria, $diosSeleccionado->user->nobleza, $diosSeleccionado->user->virtud, $diosSeleccionado->user->maldad, $diosSeleccionado->user->audacia
                    );

                    $humano = Humano::create([
                        'user_id' => $usuario->id,
                        'dios_id' => $diosSeleccionado->id,
                        'destino' => 0,
                        'afinidad' => $afinidad,
                    ]); 
                }else{
                    throw new Exception('No se encontró un dios seleccionado o falta la relación de usuario en el dios seleccionado', 404);
                }           
            }
                 
            $msg = ['message' => 'Humano creado exitosamente', 'usuario' => $usuario];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }
    
        return response()->json(['mens' => $msg], $cod);
    } 

    public function asignarProteccion(User $usuario){
        $sabiduriaUsuario = $usuario->sabiduria;
        $noblezaUsuario = $usuario->nobleza;
        $virtudUsuario = $usuario->virtud;
        $maldadUsuario = $usuario->maldad;
        $audaciaUsuario = $usuario->audacia;

        $dioses = Dios::with('user')->whereIn('user_id', [1, 2, 3])->get();

        $afinidadMaxima = PHP_INT_MAX;
        $diosSeleccionado = null;

        // Lógica
        foreach ($dioses as $dios) {
            $afinidad = $this->calcularAfinidad(
                $sabiduriaUsuario, $noblezaUsuario, $virtudUsuario, $maldadUsuario, $audaciaUsuario,
                $dios->user->sabiduria, $dios->user->nobleza, $dios->user->virtud, $dios->user->maldad, $dios->user->audacia
            );

            if ($afinidad < $afinidadMaxima) {
                $afinidadMaxima = $afinidad;
                $diosSeleccionado = $dios;
            }
        }

        if ($diosSeleccionado) {
            $humanoExistente = Humano::where('dios_id', $diosSeleccionado->id)->first();

            if (!$humanoExistente) {
                $usuario->update([
                    'sabiduria' => $diosSeleccionado->sabiduria,
                    'nobleza' => $diosSeleccionado->nobleza,
                    'virtud' => $diosSeleccionado->virtud,
                    'maldad' => $diosSeleccionado->maldad,
                    'audacia' => $diosSeleccionado->audacia,
                ]);
            }
            return $diosSeleccionado;
        } else {
            throw new Exception('No se pudo asignar la protección correctamente', 404);
        }
    }
    public function calcularAfinidad($sabiduriaUsuario, $noblezaUsuario, $virtudUsuario, $maldadUsuario, $audaciaUsuario, $sabiduriaDios, $noblezaDios, $virtudDios, $maldadDios, $audaciaDios){
        // Calculamos la diferencia absoluta entre cada par de características
        $diferenciaSabiduria = abs($sabiduriaUsuario - $sabiduriaDios);
        $diferenciaNobleza = abs($noblezaUsuario - $noblezaDios);
        $diferenciaVirtud = abs($virtudUsuario - $virtudDios);
        $diferenciaMaldad = abs($maldadUsuario - $maldadDios);
        $diferenciaAudacia = abs($audaciaUsuario - $audaciaDios);

        // Sumamos todas las diferencias para obtener una puntuación total
        $afinidad = $diferenciaSabiduria + $diferenciaNobleza + $diferenciaVirtud + $diferenciaMaldad + $diferenciaAudacia;

        return $afinidad;
    }

    public function listarHumanos(){
        $humanos = DB::table('humano')
            ->join('user', 'humano.user_id', '=', 'user.id')
            ->select('user.nombre', 'user.email')
            ->get();
    
        return response()->json(['humanos' => $humanos], 200);
    }
}