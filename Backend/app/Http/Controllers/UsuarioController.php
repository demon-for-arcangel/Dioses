<?php

namespace App\Http\Controllers;

use App\Models\Dios;
use App\Models\Humano;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
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
                'img' => ('https://dioses-griegos-daw2.s3.eu-north-1.amazonaws.com/humano.jpg'),
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
            ->select('humano.id as id', 'user.nombre', 'user.email', 'humano.fecha_muerte')
            ->get();
    
        return response()->json(['humanos' => $humanos], 200);
    }

    public function listarUsuariosPorEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:user,email',
            ]);

            $email = $request->input('email');

            $usuarios = DB::table('user')
                ->where('email', $email)
                ->get();

            $msg = ['usuarios' => $usuarios];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }

        return response()->json(['mens' => $msg], $cod);
    }

    public function restablecerPass(Request $request){
        $email = $request->input('email');
        // /* $vecValidator = [
            // "email" => $email,
            //]; 
            $messages = [
                'email' => [
                    'required' => 'Es necesario el email del usuario',
                    'exists' => 'Este usuario no existe'
                    ]
                ];
                
        // /* $validator = Validator::make($vecValidator, [
        //     'email' => 'required|exists:user,email',
        // ], $messages); 
 
        // /* if ($validator->fails()) {
        //     return response()->json(["msg" => $validator->errors(), "status" => 400], 400);
       //  }
         $user = User::where('email', $email)->get();
         $randPass = 123456;
         
         $newPass = bcrypt($randPass);
         try {
             
             $user[0]->password=$newPass;
             $user[0]->save();
            
             try {
                 Mail::send('resetPassword', ['username' => $user[0]['name'], 'password' => $randPass], function ($message) use ($user) {
                     $message->to($user[0]['email'])->subject('Recuperación de contraseña ' . $user[0]['name']);
                     $message->from('marinalaguna2004@gmail.com', 'Dioses');
                 });
     
                 return response()->json(["msg" => $randPass, "status" => 200], 200);
             } catch (\Exception $exception) {
                 return response()->json(["msg" => $exception->getMessage()], 500);
             }
         } catch (\Exception $exception) {
             return response()->json(["msg" => $exception->getMessage()], 500);
         }
    }

    public function nuevoHumano(Request $request, $diosId){
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
                'img' => ('https://dioses-griegos-daw2.s3.eu-north-1.amazonaws.com/humano.jpg'),
                'tipo' => 'humano',
                'sabiduria' => rand(1, 5),
                'nobleza' => rand(1, 5),
                'virtud' => rand(1, 5),
                'maldad' => rand(1, 5),
                'audacia' => rand(1, 5),
            ]);
    
            $diosSeleccionado = Dios::findOrFail($diosId);

            $sabiduriaUsuario = $usuario->sabiduria;
            $noblezaUsuario = $usuario->nobleza;
            $virtudUsuario = $usuario->virtud;
            $maldadUsuario = $usuario->maldad;
            $audaciaUsuario = $usuario->audacia;

            $afinidad = $this->calcularAfinidad(
                $sabiduriaUsuario, $noblezaUsuario, $virtudUsuario, $maldadUsuario, $audaciaUsuario,
                $diosSeleccionado->user->sabiduria, $diosSeleccionado->user->nobleza, $diosSeleccionado->user->virtud, $diosSeleccionado->user->maldad, $diosSeleccionado->user->audacia
            );
    
            $humano = Humano::create([
                'user_id' => $usuario->id,
                'dios_id' => $diosSeleccionado->id,
                'destino' => 0,
                'afinidad' => $afinidad,
            ]);
    
            $msg = ['message' => 'Humano creado exitosamente', 'usuario' => $usuario, 'humano' => $humano];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }
    
        return response()->json(['mens' => $msg], $cod);
    }
    
    public function modificarHumano(Request $request, $id){
        try {
            $request->validate([
                'nombre' => 'sometimes|string',
                'email' => 'sometimes|email|unique:user,email,' . $id, 
                'sabiduria' => 'sometimes|integer',
                'nobleza' => 'sometimes|integer',
                'virtud' => 'sometimes|integer',
                'maldad' => 'sometimes|integer',
                'audacia' => 'sometimes|integer',
            ]);

            $usuario = User::findOrFail($id);

            $usuario->nombre = $request->input('nombre', $usuario->nombre);
            $usuario->email = $request->input('email', $usuario->email);
            $usuario->sabiduria = $request->input('sabiduria', $usuario->sabiduria);
            $usuario->nobleza = $request->input('nobleza', $usuario->nobleza);
            $usuario->virtud = $request->input('virtud', $usuario->virtud);
            $usuario->maldad = $request->input('maldad', $usuario->maldad);
            $usuario->audacia = $request->input('audacia', $usuario->audacia);

            $usuario->save();

            $msg = ['message' => 'Usuario modificado exitosamente'];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 500;
        }
        return response()->json(['mens' => $msg], $cod);
    }

    public function eliminarHumano($id){
        try {
            $humano = Humano::with('user')->find($id);
    
            if (!$humano) {
                throw new Exception('Humano no encontrado', 404);
            }
    
            $fechaActual = now()->toDateString(); 
    
            $humano->fecha_muerte = $fechaActual;
    
            $humano->save();
    
            $msg = ['message' => 'Fecha de muerte actualizada exitosamente'];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 500;
        }
    
        return response()->json(['mens' => $msg], $cod);
    }

    public function listarHumanosProtegidos(Request $request, $id){
        try {
            $dios = Dios::findOrFail($id);
    
            $humanosProtegidos = Humano::where('dios_id', $dios->id)->get();
    
            $userIds = $humanosProtegidos->pluck('user_id')->toArray();
    
            $usuarios = User::whereIn('id', $userIds)->get(['id', 'nombre']);
    
            $humanosConNombres = $humanosProtegidos->map(function ($humano) use ($usuarios) {
                $usuario = $usuarios->where('id', $humano->user_id)->first();
                $humano->nombre_usuario = $usuario ? $usuario->nombre : null;
                return $humano;
            });
    
            return response()->json(['humanosProtegidos' => $humanosConNombres], 200);
        } catch(Exception $e) {
            return response()->json(['error' => 'Error al listar humanos protegidos'], 500);
        }
    }

    public function obtenerIdDelDios($usuarioId){
        $dios = Dios::where('user_id', $usuarioId)->first();

        if ($dios) {
            $id_dios = $dios->id;
            return response()->json(['id_dios' => $id_dios]);
        } else {
            return response()->json(['error' => 'No se encontro el id del dios'], 500);
        }
    }

    public function obtenerIdHumano($usuarioId){
        $humano = Humano::where('user_id', $usuarioId)->first();

        if ($humano) {
            $id_humano = $humano->id;
            return response()->json(['id_humano' => $id_humano]);
        } else {
            return response()->json(['error' => 'No se encontro el id del humano'], 500);
        }
    }

    public function consultarHumano($id){
        try {
            $humano = Humano::with('user')->find($id);

            if (!$humano) {
                throw new Exception('Humano no encontrado', 404);
            }

            $usuario = $humano->user;

            $datosUsuario = [
                'nombre' => $usuario->nombre,
                'email' => $usuario->email,
                'img' => $usuario->img,
                'sabiduria' => $usuario->sabiduria,
                'nobleza' => $usuario->nobleza,
                'virtud' => $usuario->virtud,
                'maldad' => $usuario->maldad,
                'audacia' => $usuario->audacia,
            ];

            $humanoData = [
                'id' => $humano->id,
                'dios_id' => $humano->dios_id,
                'destino' => $humano->destino,
                'afinidad' => $humano->afinidad,
                'fecha_muerte' => $humano->fecha_muerte,
            ];

            $msg = ['datosUsuario' => $datosUsuario, 'humano' => $humanoData];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }

        return response()->json(['mens' => $msg], $cod);
    }

    public function consultarUser($id){
        try {
            $user = User::with('humano')->find($id);
    
            if (!$user) {
                throw new Exception('Usuario no encontrado', 404);
            }
    
            $datosUsuario = [
                'nombre' => $user->nombre,
                'email' => $user->email,
                'img' => $user->img,
                'sabiduria' => $user->sabiduria,
                'nobleza' => $user->nobleza,
                'virtud' => $user->virtud,
                'maldad' => $user->maldad,
                'audacia' => $user->audacia,
                'fecha_muerte' => $user->humano->fecha_muerte,
                'ubicacion' => $user->humano->ubicacion,
            ];
    
            $msg = ['datosUsuario' => $datosUsuario];
            $cod = 200;
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }
    
        return response()->json(['mens' => $msg], $cod);
    }    
    
    public function subirImagen(Request $request){
        
        $msg=['max'=>'El campo se excede del tamaño máximo'];
    
        $validator=Validator::make($request->all(),[
            'image'=>'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ],$msg);

        if ($validator->fails()) {
            return response()->json($validator->errors(),202);
        }

        if ($request->hasFile('image')) {
            $file=$request->file('image');
            $path=$file->store('perfiles','s3');
            
            $url=Storage::disk('s3')->url($path);
            return response()->json(['path'=>$path,'url'=>$url],202);
        }
        return response()->json(['error'=>'No se recibió ningún archivo.'],400);
    }

    public function actualizarImagenUsuario(Request $request){
        try {

            $id=$request->get('id');

            $usuario=User::find($id);

            $usuario->img=$request->get('img');
            
            $usuario->save();
            
            $msg=$usuario;
            $cod=200;

        } catch (Exception $e) {
            $msg=$e;
            $cod=404;
        }

        return response()->json($msg,$cod);
    }

    public function modificarPassword(Request $request, $id){
        try {
            $request->validate([
                'old_password' => 'required|string',
                'new_password' => 'required|string|min:8',
            ]);
    
            $oldPassword = $request->input('old_password');
            $newPassword = $request->input('new_password');
    
            $usuario = User::findOrFail($id);
    
            if (!Hash::check($oldPassword, $usuario->password)) {
                throw new Exception('La contraseña antigua no coincide', 400);
            }
    
            $usuario->password = bcrypt($newPassword);
            $usuario->save();
    
            $msg = ['message' => 'Contraseña modificada exitosamente'];
            $cod = 200;
    
        } catch (Exception $e) {
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }
    
        return response()->json($msg, $cod);
    }
}

