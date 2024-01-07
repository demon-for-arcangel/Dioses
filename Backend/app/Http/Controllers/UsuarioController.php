<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Humano;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function crearUsuario(Request $request){
        try{
            $request -> validate([
                'nombre' => 'required|string',
                'email' => 'required|email|unique:users, email',
                'password' => 'required|string|min:8',
            ]);

            $usuario = User::create([
                'nombre' => $request -> input('nombre'),
                'email' => $request -> input('email'),
                'password' => bcrypt($request -> input('password')),
            ]);

            Humano::create([
                'user_id' => $usuario->id,
                'dios_id' => null,
                'destino' => null,
                'afinidad' => null,
            ]);

            $msg = ['message' => 'Humano creado exitosamente', 'usuario' => $usuario];
            $cod = 200;
        }catch (Exception $e){
            $msg = ['error' => $e->getMessage()];
            $cod = 404;
        }

        return response()->json(['mens' => $msg], $cod);
    }
}