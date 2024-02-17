<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Models\User;
use App\Models\Dios;
use Illuminate\Support\Facades\DB;
use App\Models\Humano;

class AuthController extends Controller
{
    public function inicioSesion(Request $request){
        try {
            $request->validate([
                'email' => 'required|exists:user,email',
                'password' => 'required',
            ]); 
    
            if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
                $usuario = Auth::user();

                // Obtén el modelo Humano asociado al usuario
                $humano = Humano::where('user_id', $usuario->id)->first();

                $success['token'] = $usuario->createToken('LaravelSanctumAuth')->plainTextToken;
                $success['id'] = $usuario->id;
                $success['tipoUsuario'] = $usuario->tipo;
                $success['nombre'] = $usuario->nombre;
                $success['email'] = $usuario->email;
                $success['password'] = $usuario->password;
                $success['fecha_muerte'] = $humano ? $humano->fecha_muerte : null;
                
                return response()->json(["success" => true, "data" => $success, "message" => "User logged-in!"]);
            } else {
                return response()->json(['message' => 'Correo o contraseña incorrectos'], 401);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $cantidad = Auth::user()->tokens()->delete();
            return response()->json(["success"=>true, "message" => "Tokens Revoked: ".$cantidad],200);
        }
        else {
            return response()->json("Unauthorised",204);
        }

    }
}