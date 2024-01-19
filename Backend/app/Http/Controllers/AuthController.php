<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Models\User;
use App\Models\Dios;
use Illuminate\Support\Facades\DB;

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

                $array = [];

                $success['token'] = $usuario->createToken('access_token',$array)->plainTextToken;
                $success['id'] = $usuario->id;
                $success['tipoUsuario'] = $usuario->tipo;
                $success['nombre'] = $usuario->nombre;
                $success['email'] = $usuario->email;
                $success['password'] = $usuario->password;
    
                return response()->json(["success" => true, "data" => $success, "message" => "User logged-in!"]);
            } else {
                return response()->json(['message' => 'Correo o contraseña incorrectos'], 401);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function cerrarSesion($id){
        $usuario = User::find($id);
        if($usuario){
            $usuario->tokens()->delete();
            return response()->json(["success"=>true, "message"=>"Tokens Revoked: "], 200);
        }else{
            return response()->json("Unauthorised", 204);
        }
    }
}